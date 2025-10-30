import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { CHAIN_ID, RPC_ENDPOINT, GAS_PRICE } from "../NetworkConfig";
import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
    interface Window extends KeplrWindow {}
}

export async function instantiateContract(codeId: number) {
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
        owner_addr: senderAddress,
    };

    const label = "bondex_bond_account_instantiate_stub";

    const result = await client.instantiate(
        senderAddress,
        codeId,
        initMsg,
        label,
        "auto", // автогаз
        {
            admin: undefined,
        }
    );

    console.log("✅ Contract instantiated at:", result.contractAddress);
    return result.contractAddress;
}
