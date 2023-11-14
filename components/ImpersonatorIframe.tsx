import { useEffect } from "react";
import { useImpersonatorIframe } from "../contexts/ImpersonatorIframeContext";

interface Props {
  width: number | string;
  height: number | string;
  src: string;
  address: string;
  rpcUrl: string;
  onLoad?: () => void;
}

export const ImpersonatorIframe = ({
  width,
  height,
  src,
  address,
  rpcUrl,
  onLoad,
}: Props) => {
  const { iframeRef, setAddress, setAppUrl, setRpcUrl } =
    useImpersonatorIframe();

  useEffect(() => {
    if (src && address && setAddress) {
      setAppUrl(src);
      setAddress(address);
      setRpcUrl(rpcUrl);
    }
  }, [src, setAppUrl, address, setAddress, rpcUrl, setRpcUrl]);

  return (
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
  );
};
