import { ImpersonatorIframe } from "./components/ImpersonatorIframe";

function App() {
  return (
    <>
      <ImpersonatorIframe
        width={"1000px"}
        height={"500px"}
        src="https://app.uniswap.org"
        address="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" // vitalik.eth
        rpcUrl="https://eth.llamarpc.com"
        paymasterRpcUrl="https://eth.llamarpc.com"
      />
    </>
  );
}

export default App;
