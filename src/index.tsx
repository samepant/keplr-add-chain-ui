import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

export interface KeplrCoin {
  coinDenom: string;
  coinMinimalDenom: string;
  coinDecimals: number;
}

export interface KeplrChainDefinition {
  chainId: string;
  chainName: string;
  rpc: string;
  rest: string;
  bip44: {
    coinType: number;
  };
  bech32Config: {
    bech32PrefixAccAddr: string;
    bech32PrefixAccPub: string;
    bech32PrefixValAddr: string;
    bech32PrefixValPub: string;
    bech32PrefixConsAddr: string;
    bech32PrefixConsPub: string;
  };
  currencies: KeplrCoin[];
  feeCurrencies: KeplrCoin[];
  stakeCurrency: KeplrCoin;
  coinType: number;
  gasPriceStep: {
    low: number;
    average: number;
    high: number;
  };
}

declare global {
  interface Window {
    keplr: {
      enable: (chainId: string) => any;
      experimentalSuggestChain: (chainInfo: KeplrChainDefinition) => void;
    };
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
