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
} from "../../types";

interface TransactionWithId extends Transaction {
  id: number | string;
}

type SafeInjectContextType = {
  address: string | undefined;
  appUrl: string | undefined;
  rpcUrl: string | undefined;
  iframeRef: React.RefObject<HTMLIFrameElement> | null;
  latestTransaction: TransactionWithId | undefined;
  setAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
  setAppUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRpcUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  sendMessageToIFrame: <T extends InterfaceMessageIds>(
    message: InterfaceMessageProps<T>,
    requestId?: RequestId
  ) => void;
  onUserTxConfirm: (safeTxHash: string, requestId: RequestId) => void;
  onTxReject: (requestId: RequestId) => void;
  isReady: boolean;
};

export const ImpersonatorIframeContext = createContext<SafeInjectContextType>({
  address: undefined,
  appUrl: undefined,
  rpcUrl: undefined,
  iframeRef: null,
  latestTransaction: undefined,
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

  const onUserTxConfirm = (safeTxHash: string, requestId: RequestId) => {
    // Safe Apps SDK V1 Handler
    sendMessageToIFrame(
      {
        messageId: "TRANSACTION_CONFIRMED", // INTERFACE_MESSAGES.TRANSACTION_CONFIRMED
        data: { safeTxHash },
      },
      requestId
    );

    // Safe Apps SDK V2 Handler
    communicator?.send({ safeTxHash }, requestId as string);
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message } = msg.data.params as SignMessageParams;

      // openSignMessageModal(message, msg.data.id, Methods.signMessage)
    });

    communicator?.on(Methods.signTypedMessage, async (msg) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { typedData } = msg.data.params as SignTypedMessageParams;

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
