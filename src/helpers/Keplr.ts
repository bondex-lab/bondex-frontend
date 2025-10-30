import { GasPrice, SigningStargateClient } from "@cosmjs/stargate";
import { WASMD_CHAIN_INFO, CHAIN_ID, RPC_ENDPOINT, GAS_PRICE, DENOM } from "../NetworkConfig";
import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
    interface Window extends KeplrWindow {}
}

async function suggestChain() {
    if (window.keplr) {
        await window.keplr.experimentalSuggestChain(WASMD_CHAIN_INFO);
    }
}

export async function connectKeplr() {
    if (!window.keplr) {
        alert("Keplr not found! Install Keplr Wallet.");
        return;
    }

    await suggestChain();

    await window.keplr.enable(CHAIN_ID);

    const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
    const accounts = await offlineSigner.getAccounts();
    const address = accounts[0].address;

    console.log("Connected account:", address);

    const client = await SigningStargateClient.connectWithSigner(
        RPC_ENDPOINT,
        offlineSigner,
        { gasPrice: GasPrice.fromString(GAS_PRICE) }
    );

    const balance = await client.getBalance(address, DENOM);
    console.log(`Balance for ${address}:`, balance.amount, balance.denom);

    return { client, address };
}
