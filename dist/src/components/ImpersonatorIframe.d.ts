interface Props {
    width: number | string;
    height: number | string;
    src: string;
    address: string;
    rpcUrl: string;
    paymasterRpcUrl?: string;
    onLoad?: () => void;
}
export declare const ImpersonatorIframe: ({ width, height, src, address, rpcUrl, paymasterRpcUrl, onLoad, }: Props) => import("react/jsx-runtime").JSX.Element | null;
export {};
