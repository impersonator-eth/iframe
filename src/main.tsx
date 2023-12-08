import React from "react";
import ReactDOM from "react-dom/client";
import { DappscoutIframeProvider } from "../src/contexts/DappscoutIframeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DappscoutIframeProvider>
      <div></div>
    </DappscoutIframeProvider>
  </React.StrictMode>
);
