import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { CHAIN_ID, RPC_ENDPOINT, GAS_PRICE } from "../NetworkConfig";
import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
    interface Window extends KeplrWindow {}
}

export async function payoutBonds(escrowAccount: string) {
    if (!window.keplr) {
        throw new Error("Keplr not found. Please install or unlock it.");
    }

    await window.keplr.enable(CHAIN_ID);
    const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
    const accounts = await offlineSigner.getAccounts();
    const senderAddress = accounts[0].address;

    console.log("withdraw_funds", senderAddress);

    const client = await SigningCosmWasmClient.connectWithSigner(
        RPC_ENDPOINT,
        offlineSigner,
        { gasPrice: GasPrice.fromString(GAS_PRICE) }
    );

    const initMsg = {
        payout_bonds: {},
    };

    const result = await client.execute(
        senderAddress,
        escrowAccount,
        initMsg,
        "auto", // or set gas limit
        "payout_bonds",
        [{ denom: "stake", amount: "200000" }] // Fee
    );

    console.log("✅ TX hash", result.transactionHash);
    return result.transactionHash;
}
