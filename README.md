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
  return (
    <ImpersonatorIframe
      width={"1000px"}
      height={"500px"}
      src="https://app.uniswap.org"
      address="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" // vitalik.eth
      rpcUrl="https://eth.llamarpc.com"
    />
  );
}
```

## Handling Transactions and Signatures

To handle transactions and message signing from the dapp, pass callback functions to the provider:

```jsx
import { ImpersonatorIframeProvider } from "@impersonator/iframe";

function AppWithHandlers() {
  const handleTransaction = async (tx) => {
    console.log("Transaction request:", tx);
    // Process the transaction and return the transaction hash
    return "0x..."; // Return the tx hash
  };

  const handleSignMessage = async (message) => {
    console.log("Sign message request:", message);
    // Sign the message and return the signature
    return "0x..."; // Return the signature
  };

  const handleSignTypedData = async (typedData) => {
    console.log("Sign typed data request:", typedData);
    // Sign the typed data and return the signature
    return "0x..."; // Return the signature
  };

  return (
    <ImpersonatorIframeProvider
      sendTransaction={handleTransaction}
      signMessage={handleSignMessage}
      signTypedData={handleSignTypedData}
    >
      <App />
    </ImpersonatorIframeProvider>
  );
}
```

## Provider Props

The `ImpersonatorIframeProvider` accepts the following optional props:

- `address`: Initial address to impersonate
- `appUrl`: Initial dapp URL
- `rpcUrl`: Initial RPC URL
- `sendTransaction`: Callback function to handle transaction requests
- `signMessage`: Callback function to handle message signing
- `signTypedData`: Callback function to handle typed data signing

You can set initial values directly on the provider:

```jsx
<ImpersonatorIframeProvider
  address="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
  appUrl="https://app.uniswap.org"
  rpcUrl="https://eth.llamarpc.com"
>
  <App />
</ImpersonatorIframeProvider>
```

## Hook API

The `useImpersonatorIframe` hook provides:

```jsx
const {
  // Reference to the iframe element
  iframeRef,
  // Whether the iframe is ready to receive messages
  isReady,
  // Modify address to impersonate
  setAddress,
  // Modify the current dapp URL
  setAppUrl,
  // Modify the RPC URL
  setRpcUrl,
} = useImpersonatorIframe();
```

## Example with Dynamic Configuration

```jsx
import React, { useState } from "react";
import {
  ImpersonatorIframe,
  useImpersonatorIframe,
} from "@impersonator/iframe";

function DynamicImpersonator() {
  const { setAddress, setRpcUrl, isReady } = useImpersonatorIframe();
  const [currentAddress, setCurrentAddress] = useState(
    "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
  );

  const handleAddressChange = (newAddress) => {
    setCurrentAddress(newAddress);
    setAddress(newAddress);
  };

  return (
    <div>
      <input
        type="text"
        value={currentAddress}
        onChange={(e) => handleAddressChange(e.target.value)}
        placeholder="Enter address to impersonate"
      />
      {isReady && (
        <ImpersonatorIframe
          width={"1000px"}
          height={"500px"}
          src="https://app.uniswap.org"
          address={currentAddress}
          rpcUrl="https://eth.llamarpc.com"
        />
      )}
    </div>
  );
}
```

<img src="https://raw.githubusercontent.com/impersonator-eth/iframe/master/.github/ss1.png">

## Dependencies

This package uses [viem](https://viem.sh/) for Ethereum interactions.
