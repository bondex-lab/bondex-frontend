import { ChainInfo } from "@keplr-wallet/types";

export const CHAIN_ID = process.env.REACT_APP_CHAIN_ID || "wasm-chain-1";
export const RPC_ENDPOINT = process.env.REACT_APP_RPC_ENDPOINT || "http://127.0.0.1:26657/";
export const REST_ENDPOINT = process.env.REACT_APP_REST_ENDPOINT || "http://127.0.0.1:1317";
export const DENOM = process.env.REACT_APP_DENOM || "stake";
export const GAS_PRICE = process.env.REACT_APP_GAS_PRICE || "0.025stake";
export const CHAIN_NAME = process.env.REACT_APP_CHAIN_NAME || "Local Wasmd Testnet (wasm-chain-1)";

export const WASMD_CHAIN_INFO: ChainInfo = {
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME,
    rpc: RPC_ENDPOINT,
    rest: REST_ENDPOINT,
    bip44: { coinType: 118 },
    bech32Config: {
        bech32PrefixAccAddr: 'wasm',
        bech32PrefixAccPub: 'wasmpub',
        bech32PrefixValAddr: 'wasmvaloper',
        bech32PrefixValPub: 'wasmvaloperpub',
        bech32PrefixConsAddr: 'wasmvalcons',
        bech32PrefixConsPub: 'wasmvalconspub',
    },
    currencies: [{ coinDenom: DENOM, coinMinimalDenom: DENOM, coinDecimals: 0 }],
    feeCurrencies: [{
        coinDenom: DENOM,
        coinMinimalDenom: DENOM,
        coinDecimals: 0,
        gasPriceStep: { low: 0.01, average: 0.025, high: 0.04 }
    }],
    stakeCurrency: { coinDenom: DENOM, coinMinimalDenom: DENOM, coinDecimals: 0 },
};
