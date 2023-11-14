# @impersonator/iframe

An iframe component that allows to open dapps with any Ethereum address impersonated.

## Usage

Wrap your App in the `ImpersonatorIframeProvider` as follows:

```jsx
import { ImpersonatorIframeProvider } from "@impersonator/iframe";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ImpersonatorIframeProvider>
      <App />
    </ImpersonatorIframeProvider>
  </React.StrictMode>
);
```

Then use the `ImpersonatorIframe` component to open the dapp you want to impersonate:

```jsx
import {
  ImpersonatorIframe,
  useImpersonatorIframe,
} from "@impersonator/iframe";

function App() {
  const { latestTransaction } = useImpersonatorIframe();

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
        <h1>Latest transaction</h1>
        <pre>{JSON.stringify(latestTransaction, null, 2)}</pre>
      </div>
    </>
  );
}
```

The `latestTransaction` object from `useImpersonatorIframe` hook will contain the latest transaction sent by the dapp.

<img src="https://raw.githubusercontent.com/impersonator-eth/iframe/master/.github/ss1.png">

The hook also provides the following:

```jsx
const {
  // Modify address to impersonate
  setAddress,
  // The current dapp URL
  appUrl,
  // Modify the current dapp URL
  setAppUrl,
  // Modify the RPC URL
  setRpcUrl,
  iframeRef,
  // The latest transaction sent by the dapp
  latestTransaction,
  // To approve the transaction request from the dapp
  onUserTxConfirm,
  // To reject the transaction request from the dapp
  onTxReject,
} = useImpersonatorIframe();
```
