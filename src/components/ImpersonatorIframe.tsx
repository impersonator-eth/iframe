import { useEffect } from "react";
import { useImpersonatorIframe } from "../contexts/ImpersonatorIframeContext";

interface Props {
  width: number | string;
  height: number | string;
  src: string;
  address: string;
  rpcUrl: string;
  paymasterRpcUrl?: string,
  onLoad?: () => void;
}

export const ImpersonatorIframe = ({
  width,
  height,
  src,
  address,
  rpcUrl,
  paymasterRpcUrl,
  onLoad,
}: Props) => {
  const { iframeRef, setAddress, setAppUrl, setRpcUrl, setPaymasterRpcUrl, isReady } =
    useImpersonatorIframe();

  useEffect(() => {
    if (src && address && setAddress) {
      setAppUrl(src);
      setAddress(address);
      setRpcUrl(rpcUrl);
    }
    if (paymasterRpcUrl) {
      setPaymasterRpcUrl(paymasterRpcUrl);
    }
  }, [src, setAppUrl, address, setAddress, rpcUrl, setRpcUrl, paymasterRpcUrl, setPaymasterRpcUrl]);

  return isReady ? (
    <iframe
      width={width}
      height={height}
      style={{
        background: "white",
      }}
      src={src}
      ref={iframeRef}
      onLoad={onLoad}
    />
  ) : null;
};
