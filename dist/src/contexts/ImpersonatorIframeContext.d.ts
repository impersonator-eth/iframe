import { default as React } from 'react';
import { InterfaceMessageIds, InterfaceMessageProps, RequestId, Transaction } from '../../types';

interface TransactionWithId extends Transaction {
    id: number | string;
}
type SafeInjectContextType = {
    address: string | undefined;
    appUrl: string | undefined;
    rpcUrl: string | undefined;
    paymasterRpcUrl: string | undefined;
    setPaymasterRpcUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
    iframeRef: React.RefObject<HTMLIFrameElement> | null;
    latestTransaction: TransactionWithId | undefined;
    setAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
    setAppUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
    setRpcUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
    sendMessageToIFrame: <T extends InterfaceMessageIds>(message: InterfaceMessageProps<T>, requestId?: RequestId) => void;
    onUserTxConfirm: (safeTxHash: string, requestId: RequestId) => void;
    onTxReject: (requestId: RequestId) => void;
    isReady: boolean;
};
export declare const ImpersonatorIframeContext: React.Context<SafeInjectContextType>;
interface FCProps {
    children: React.ReactNode;
}
export declare const ImpersonatorIframeProvider: React.FunctionComponent<FCProps>;
export declare const useImpersonatorIframe: () => SafeInjectContextType;
export {};
