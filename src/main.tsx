import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ImpersonatorIframeProvider } from "../src/contexts/ImpersonatorIframeContext.tsx";
import { Transaction } from "../types";

function Root() {
  const [transactions, setTransactions] = useState<
    Array<{
      tx: Transaction;
      timestamp: string;
      status: "pending" | "approved" | "rejected";
      hash?: string;
    }>
  >([]);

  const handleSendTransaction = async (tx: Transaction) => {
    console.log("Transaction request received:", tx);

    // Add to transactions list
    const newTx = {
      tx,
      timestamp: new Date().toLocaleTimeString(),
      status: "pending" as const,
    };

    setTransactions((prev) => [...prev, newTx]);

    // Simulate approval after 2 seconds (in real app, you'd show a modal for user approval)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate mock transaction hash (32 bytes = 64 hex chars)
    const hash =
      "0x" +
      Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");

    // Update status to approved
    setTransactions((prev) =>
      prev.map((t, index) =>
        index === prev.length - 1 ? { ...t, status: "approved", hash } : t
      )
    );

    return hash;
  };

  return (
    <ImpersonatorIframeProvider sendTransaction={handleSendTransaction}>
      <App transactions={transactions} />
    </ImpersonatorIframeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
