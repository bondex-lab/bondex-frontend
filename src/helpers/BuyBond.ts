import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { CHAIN_ID, RPC_ENDPOINT, GAS_PRICE } from "../NetworkConfig";
import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
    interface Window extends KeplrWindow {}
}

const cw20Address = process.env.REACT_APP_CW20_BASE_CONTRACT_ADDRESS || "1";
const bondNftCodeId = Number(process.env.REACT_APP_CW721_BASE_CODE_ID) || 1;
const bondNftFixedPreceCodeId = Number(process.env.REACT_APP_NFT_BOND_CODE_ID) || 1;


export async function buyBonds(bondId: string, unitPrice: string) {
    if (!window.keplr) {
        throw new Error("Keplr not found. Please install or unlock it.");
    }

    await window.keplr.enable(CHAIN_ID);
    const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
    const accounts = await offlineSigner.getAccounts();
    const senderAddress = accounts[0].address;

    console.log("Instantiating contract from:", senderAddress);

    const client = await SigningCosmWasmClient.connectWithSigner(
        RPC_ENDPOINT,
        offlineSigner,
        { gasPrice: GasPrice.fromString(GAS_PRICE) }
    );

    const initMsg = {
        send: {
            contract: bondId,
            amount: unitPrice,
            msg: '' // empty JSON -> base64 encoded
        }
    };
    console.log(initMsg);

    const result = await client.execute(
        senderAddress,
        cw20Address,
        initMsg,
        "auto", // or specify gas manually
        undefined,
        [{ denom: "stake", amount: "200000" }] // fees
    );

    console.log("✅ TX hash", result.transactionHash);
    return result.transactionHash;
}
