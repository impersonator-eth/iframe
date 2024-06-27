// gnosis safe code reference: https://github.com/apoorvlathey/safe-react/blob/main/src/routes/safe/components/Apps/components/AppFrame.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { http, getAddress, createPublicClient, PublicClient, Hash, isHex, fromHex } from "viem";
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

type SafeInjectContextType = {
  iframeRef: React.RefObject<HTMLIFrameElement> | null;
  isReady: boolean;
};

export const DappscoutIframeContext = createContext<SafeInjectContextType>({
  iframeRef: null,
  isReady: false,
});

interface IframeProps {
  children: React.ReactNode;
  address?: string;
  appUrl?: string;
  rpcUrl?: string;
  sendTransaction?: (tx: Transaction) => Promise<string>;
  signMessage?: (message: string) => Promise<string>;
  signTypedData?: (typedData: EIP712TypedData) => Promise<string>;
}

export const DappscoutIframeProvider: React.FunctionComponent<IframeProps> = ({
  children, address, appUrl, rpcUrl, sendTransaction, signMessage, signTypedData,
}) => {
  const [publicClient, setPublicClient] = useState<PublicClient>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number>();

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

  const onUserTxConfirm = useCallback((data: object, requestId: RequestId) => {
    // Safe Apps SDK V1 Handler
    sendMessageToIFrame({ messageId: "TRANSACTION_CONFIRMED", data }, requestId);
    // Safe Apps SDK V2 Handler
    communicator?.send(data, requestId as string);
  }, [communicator, sendMessageToIFrame]);

  const onTxReject = useCallback((requestId: RequestId) => {
    // Safe Apps SDK V1 Handler
    sendMessageToIFrame({ messageId: "TRANSACTION_REJECTED", data: {} }, requestId);
    // Safe Apps SDK V2 Handler
    communicator?.send("Transaction was rejected", requestId as string, true);
  }, [communicator, sendMessageToIFrame]);

  useEffect(() => {
    if (!rpcUrl) return;

    const publicClient = createPublicClient({ transport: http(rpcUrl) });
    setPublicClient(publicClient);

    async function getChainId() {
      const chainId = await publicClient.getChainId();
      setChainId(chainId);
    }
    getChainId();
  }, [rpcUrl]);

  useEffect(() => {
    if (!publicClient || !chainId) return;

    communicator?.on(Methods.getSafeInfo, async () => ({
      safeAddress: address,
      chainId: chainId,
      owners: [],
      threshold: 1,
      isReadOnly: false,
    }));

    communicator?.on(Methods.getEnvironmentInfo, async () => ({
      origin: document.location.origin,
    }));

    communicator?.on(Methods.rpcCall, async (msg) => {
      console.log("communicator.rpcCall", msg);
      const params = msg.data.params as RPCPayload;
      try {
        const response = (await publicClient.request({
          method: params.call,
          params: params.params,
        })) as MethodToResponse["rpcCall"];
        return response;
      } catch (err) {
        return err;
      }
    });

    communicator?.on(Methods.getTxBySafeTxHash, async (msg) => {
      console.log("communicator.getTxBySafeTxHash", msg);
      const { safeTxHash } = msg.data.params as { safeTxHash: Hash };

      // some RPCs don't return timestamp with txn so using blockNumber to check if txn confirmed or not
      const { blockNumber, to, input, value } = await publicClient.getTransaction({ hash: safeTxHash });
      const { timestamp } = await publicClient.getBlock({ blockNumber });

      const response: TransactionDetails = {
        txId: safeTxHash,
        txStatus: blockNumber
          ? TransactionStatus.SUCCESS
          : TransactionStatus.PENDING,
        executedAt: Number(timestamp),
        txInfo: {
          type: "Custom",
          to: {
            value: to ?? "",
          },
          dataSize: input,
          value: value.toString(),
          isCancellation: false,
        },
        txHash: safeTxHash,
      };

      return response;
    });

    communicator?.on(Methods.sendTransactions, async (msg) => {
      console.log("communicator.sendTransactions", msg);
      try {
        const transactions = (msg.data.params as { txs: Transaction[] }).txs.map(
          // remove maxFeePerGas and maxPriorityFeePerGas from txs because they cause an error sometimes
          ({ to, maxFeePerGas, maxPriorityFeePerGas, ...rest }) => ({ // eslint-disable-line @typescript-eslint/no-unused-vars
            to: getAddress(to), // checksummed
            ...rest,
          })
        );
        const safeTxHash = await sendTransaction?.(transactions[0]);
        onUserTxConfirm({ safeTxHash }, msg.data.id as string);
      } catch (err) {
        onTxReject(msg.data.id as string);
      }
    });

    communicator?.on(Methods.signMessage, async (msg) => {
      console.log("communicator.signMessage", msg);
      try {
        const { message } = msg.data.params as SignMessageParams;
        const msgStr = isHex(message) ? fromHex(message, 'string') : message;
        const signature = await signMessage?.(msgStr);
        onUserTxConfirm({ signature }, msg.data.id as string);
      } catch (err) {
        onTxReject(msg.data.id as string);
      }
    });

    communicator?.on(Methods.signTypedMessage, async (msg) => {
      console.log("communicator.signTypedMessage", msg);
      try {
        const { typedData } = msg.data.params as SignTypedMessageParams;
        const signature = await signTypedData?.(typedData);
        onUserTxConfirm({ signature }, msg.data.id as string);
      } catch (err) {
        onTxReject(msg.data.id as string);
      }
    });

    setIsReady(true);
  }, [
    communicator, address, publicClient, onUserTxConfirm, onTxReject,
    sendTransaction, signMessage, signTypedData, chainId,
  ]);

  return (
    <DappscoutIframeContext.Provider value={{ iframeRef, isReady }}>
      {children}
    </DappscoutIframeContext.Provider>
  );
};

export const useDappscoutIframe = () =>
  useContext(DappscoutIframeContext);
