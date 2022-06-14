import React, { useEffect, useState } from "react";
import Input from "./Input";
import { KeplrChainDefinition } from "./index";
import "./App.css";

const keplrChainDataBoilerplate: KeplrChainDefinition = {
  chainId: "",
  chainName: "",
  rpc: "",
  rest: "",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "",
    bech32PrefixAccPub: "",
    bech32PrefixValAddr: "",
    bech32PrefixValPub: "",
    bech32PrefixConsAddr: "",
    bech32PrefixConsPub: "",
  },
  currencies: [
    {
      coinDenom: "",
      coinMinimalDenom: "",
      coinDecimals: 6,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "",
      coinMinimalDenom: "",
      coinDecimals: 6,
    },
  ],
  stakeCurrency: {
    coinDenom: "",
    coinMinimalDenom: "",
    coinDecimals: 6,
  },
  coinType: 118,
  gasPriceStep: {
    low: 1,
    average: 1,
    high: 1,
  },
};

function App() {
  const [chainId, setChainId] = useState("");
  const [chainName, setChainName] = useState("");
  const [rpcEndpoint, setRpcEndpoint] = useState("");
  const [restEndpoint, setRestEndpoint] = useState("");
  const [addressPrefix, setAddressPrefix] = useState("");
  const [coinDenom, setCoinDenom] = useState("");
  const [coinMinDenom, setCoinMinDenom] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    const value = e.target.value;

    switch (key) {
      case "chainId":
        setChainId(value);
        break;
      case "chainName":
        setChainName(value);
        break;
      case "rpcEndpoint":
        setRpcEndpoint(value);
        break;
      case "restEndpoint":
        setRestEndpoint(value);
        break;
      case "addressPrefix":
        setAddressPrefix(value);
        break;
      case "coinDenom":
        setCoinDenom(value);
        break;
      case "coinMinDenom":
        setCoinMinDenom(value);
        break;
      default:
        console.log("No state to update");
    }
  };

  const addChainToKeplr = async () => {
    if (!window.keplr) {
      alert("The Keplr extension must be installed");
      return;
    }
    const chainData = keplrChainDataBoilerplate;

    chainData.chainId = chainId;
    chainData.chainName = chainName;
    chainData.rpc = rpcEndpoint;
    chainData.rest = restEndpoint;
    chainData.bech32Config.bech32PrefixAccAddr = addressPrefix;
    chainData.bech32Config.bech32PrefixAccPub = addressPrefix + "pub";
    chainData.bech32Config.bech32PrefixValAddr = addressPrefix + "valoper";
    chainData.bech32Config.bech32PrefixValPub = addressPrefix + "valoperpub";
    chainData.bech32Config.bech32PrefixConsAddr = addressPrefix + "valcons";
    chainData.bech32Config.bech32PrefixConsPub = addressPrefix + "valconspub";
    chainData.currencies[0].coinDenom = coinDenom;
    chainData.currencies[0].coinMinimalDenom = coinMinDenom;
    chainData.feeCurrencies[0].coinDenom = coinDenom;
    chainData.feeCurrencies[0].coinMinimalDenom = coinMinDenom;
    chainData.stakeCurrency.coinDenom = coinDenom;
    chainData.stakeCurrency.coinMinimalDenom = coinMinDenom;

    try {
      await window.keplr.experimentalSuggestChain(chainData);
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="w-8/12 flex flex-col items-center m-auto mt-10 mb-10">
        <h1 className="text-3xl font-bold underline ">
          Add a chain to your Keplr wallet 😮
        </h1>
        <form>
          <Input
            type="text"
            name="chainId"
            label="Chain Id"
            value={chainId}
            onChange={onChange}
          />
          <Input
            type="text"
            name="chainName"
            label="Chain Name"
            value={chainName}
            onChange={onChange}
          />
          <Input
            type="text"
            name="rpcEndpoint"
            label="RPC Endpoint"
            value={rpcEndpoint}
            onChange={onChange}
            helperText="This should be something like 'http://127.0.0.1:26657'"
          />
          <Input
            type="text"
            name="restEndpoint"
            label="Rest Endpoint"
            value={restEndpoint}
            onChange={onChange}
            helperText="This should be something like 'http://127.0.0.1:1317'"
          />
          <Input
            type="text"
            name="addressPrefix"
            label="Address Prefix"
            value={addressPrefix}
            onChange={onChange}
          />
          <Input
            type="text"
            name="coinDenom"
            label="Coin Denom"
            value={coinDenom}
            onChange={onChange}
          />
          <Input
            type="text"
            name="coinMinDenom"
            label="Coin Minimum Denomination"
            value={coinMinDenom}
            onChange={onChange}
          />
          <button
            onClick={addChainToKeplr}
            className="w-full bg-lime-500 p-4 font-bold "
          >
            Add to Keplr
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
