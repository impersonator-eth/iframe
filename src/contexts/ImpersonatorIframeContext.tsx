// gnosis safe code reference: https://github.com/apoorvlathey/safe-react/blob/main/src/routes/safe/components/Apps/components/AppFrame.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { providers, utils } from "ethers";
import { useAppCommunicator } from "../../helpers/communicator";
import {
  InterfaceMessageIds,
  InterfaceMessageProps,
  Methods,
  MethodToResponse,
  RequestId,
  RPCPayload,
  SignMessageParams,
  SignTypedMessageParams,
  Transaction,
  TransactionDetails,
  TransactionStatus,
  EIP712TypedData,
} from "../../types";

interface TransactionWithId extends Transaction {
  id: number | string;
}

interface MessageWithId {
  id: number | string;
  message: string;
}

interface TypedDataWithId extends EIP712TypedData {
  id: number | string;
}

type SafeInjectContextType = {
  address: string | undefined;
  appUrl: string | undefined;
  rpcUrl: string | undefined;
  iframeRef: React.RefObject<HTMLIFrameElement> | null;
  latestTransaction: TransactionWithId | undefined;
  latestMessageToSign: MessageWithId | undefined;
  latestTypedDataToSign: TypedDataWithId | undefined;
  setAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
  setAppUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRpcUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  sendMessageToIFrame: <T extends InterfaceMessageIds>(
    message: InterfaceMessageProps<T>,
    requestId?: RequestId
  ) => void;
  onUserTxConfirm: (data: object, requestId: RequestId) => void;
  onTxReject: (requestId: RequestId) => void;
  isReady: boolean;
};

export const ImpersonatorIframeContext = createContext<SafeInjectContextType>({
  address: undefined,
  appUrl: undefined,
  rpcUrl: undefined,
  iframeRef: null,
  latestTransaction: undefined,
  latestMessageToSign: undefined,
  latestTypedDataToSign: undefined,
  setAddress: () => {},
  setAppUrl: () => {},
  setRpcUrl: () => {},
  sendMessageToIFrame: () => {},
  onUserTxConfirm: () => {},
  onTxReject: () => {},
  isReady: false,
});

interface FCProps {
  children: React.ReactNode;
}

export const ImpersonatorIframeProvider: React.FunctionComponent<FCProps> = ({
  children,
}) => {
  const [address, setAddress] = useState<string>();
  const [appUrl, setAppUrl] = useState<string>();
  const [rpcUrl, setRpcUrl] = useState<string>();
  const [provider, setProvider] = useState<providers.StaticJsonRpcProvider>();
  const [latestTransaction, setLatestTransaction] =
    useState<TransactionWithId>();
  const [latestMessageToSign, setLatestMessageToSign] =
    useState<MessageWithId>();
  const [latestTypedDataToSign, setLatestTypedDataToSign] =
    useState<TypedDataWithId>();
  const [isReady, setIsReady] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const communicator = useAppCommunicator(iframeRef);

  const sendMessageToIFrame = useCallback(
    function <T extends InterfaceMessageIds>(
      message: InterfaceMessageProps<T>,
      requestId?: RequestId
    ) {
      const requestWithMessage = {
        ...message,
        requestId: requestId || Math.trunc(window.performance.now()),
        version: "0.4.2",
      };

      if (iframeRef) {
        iframeRef.current?.contentWindow?.postMessage(
          requestWithMessage,
          appUrl!
        );
      }
    },
    [iframeRef, appUrl]
  );

  const onUserTxConfirm = (data: object, requestId: RequestId) => {
    // Safe Apps SDK V1 Handler
    sendMessageToIFrame(
      {
        messageId: "TRANSACTION_CONFIRMED", // INTERFACE_MESSAGES.TRANSACTION_CONFIRMED
        data,
      },
      requestId
    );

    // Safe Apps SDK V2 Handler
    communicator?.send(data, requestId as string);
  };

  const onTxReject = (requestId: RequestId) => {
    console.log("onTxReject", requestId);

    // Safe Apps SDK V1 Handler
    sendMessageToIFrame(
      {
        messageId: "TRANSACTION_REJECTED", // INTERFACE_MESSAGES.TRANSACTION_REJECTED
        data: {},
      },
      requestId
    );

    // Safe Apps SDK V2 Handler
    communicator?.send("Transaction was rejected", requestId as string, true);
  };

  useEffect(() => {
    if (!rpcUrl) return;

    setProvider(new providers.StaticJsonRpcProvider(rpcUrl));
  }, [rpcUrl]);

  useEffect(() => {
    if (!provider) return;

    communicator?.on(Methods.getSafeInfo, async () => ({
      safeAddress: address,
      chainId: (await provider.getNetwork()).chainId,
      owners: [],
      threshold: 1,
      isReadOnly: false,
    }));

    communicator?.on(Methods.getEnvironmentInfo, async () => ({
      origin: document.location.origin,
    }));

    communicator?.on(Methods.rpcCall, async (msg) => {
      const params = msg.data.params as RPCPayload;

      try {
        const response = (await provider.send(
          params.call,
          params.params
        )) as MethodToResponse["rpcCall"];
        return response;
      } catch (err) {
        return err;
      }
    });

    communicator?.on(Methods.sendTransactions, (msg) => {
      console.log("communicator.sendTransactions", msg);

      const transactions = (msg.data.params as { txs: Transaction[] }).txs.map(
        ({ to, ...rest }) => ({
          to: utils.getAddress(to), // checksummed
          ...rest,
        })
      );
      setLatestTransaction({
        id: msg.data.id,
        ...transactions[0],
      });
      // openConfirmationModal(transactions, msg.data.params.params, msg.data.id)
    });

    communicator?.on(Methods.getTxBySafeTxHash, async (msg) => {
      console.log("communicator.getTxBySafeTxHash", msg);
      const { safeTxHash } = msg.data.params as { safeTxHash: string };

      // some RPCs don't return timestamp with txn so using blockNumber to check if txn confirmed or not
      const { timestamp, blockNumber, to, data, value } =
        await provider.getTransaction(safeTxHash);

      const response: TransactionDetails = {
        txId: safeTxHash,
        txStatus: blockNumber
          ? TransactionStatus.SUCCESS
          : TransactionStatus.PENDING,
        executedAt: timestamp,
        txInfo: {
          type: "Custom",
          to: {
            value: to ?? "",
          },
          dataSize: data,
          value: value.toString(),
          isCancellation: false,
        },
        txHash: safeTxHash,
      };

      return response;
    });

    communicator?.on(Methods.signMessage, async (msg) => {
      const { message } = msg.data.params as SignMessageParams;
      setLatestMessageToSign({
        id: msg.data.id,
        message,
      });
      // openSignMessageModal(message, msg.data.id, Methods.signMessage)
    });

    communicator?.on(Methods.signTypedMessage, async (msg) => {
      const { typedData } = msg.data.params as SignTypedMessageParams;
      setLatestTypedDataToSign({
        id: msg.data.id,
        ...typedData,
      });
      // openSignMessageModal(typedData, msg.data.id, Methods.signTypedMessage)
    });

    setIsReady(true);
  }, [communicator, address, provider]);

  return (
    <ImpersonatorIframeContext.Provider
      value={{
        address,
        appUrl,
        rpcUrl,
        iframeRef,
        latestTransaction,
        latestMessageToSign,
        latestTypedDataToSign,
        setAddress,
        setAppUrl,
        setRpcUrl,
        sendMessageToIFrame,
        onUserTxConfirm,
        onTxReject,
        isReady,
      }}
    >
      {children}
    </ImpersonatorIframeContext.Provider>
  );
};

export const useImpersonatorIframe = () =>
  useContext(ImpersonatorIframeContext);
