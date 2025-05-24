import { ImpersonatorIframe } from "./components/ImpersonatorIframe";
import { Transaction } from "../types";

interface AppProps {
  transactions: Array<{
    tx: Transaction;
    timestamp: string;
    status: "pending" | "approved" | "rejected";
    hash?: string;
  }>;
}

function App({ transactions }: AppProps) {
  return (
    <>
      <ImpersonatorIframe
        width={"1000px"}
        height={"500px"}
        src="https://app.uniswap.org"
        address="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" // vitalik.eth
        rpcUrl="https://eth.llamarpc.com"
      />
      <div>
        <h2>Transaction Requests</h2>
        <pre>{JSON.stringify(transactions, null, 2)}</pre>
      </div>
    </>
  );
}

export default App;
