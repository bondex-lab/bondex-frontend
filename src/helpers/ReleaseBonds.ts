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


export async function releaseBonds(escrowAccount: string) {
    if (!window.keplr) {
        throw new Error("Keplr not found. Please install or unlock it.");
    }

    await window.keplr.enable(CHAIN_ID);
    const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
    const accounts = await offlineSigner.getAccounts();
    const senderAddress = accounts[0].address;

    console.log("Releasing for:", senderAddress);

    const client = await SigningCosmWasmClient.connectWithSigner(
        RPC_ENDPOINT,
        offlineSigner,
        { gasPrice: GasPrice.fromString(GAS_PRICE) }
    );

    const initMsg = {
        issue_bond_series: {
            name: "CarbonBond2025",
            cw20_funding_token_addr: cw20Address,
            price_rate: "0.5", // Decimal as string
            number_of_bonds: 10,
            price_per_bond: "2000", // Uint128 as string (e.g., 1.0 token if 6 decimals)
            bond_nft_code_id: bondNftCodeId,
            bond_nft_fixed_price_code_id: bondNftFixedPreceCodeId,
            symbol: "CARBON2025",
            token_uri: "https://yourcdn.com/metadata/bond.json",
            debt_payment_denom: "stake"
        }
    };

    const result = await client.execute(
        senderAddress,
        escrowAccount,
        initMsg,
        "auto", // or set gas limit
        "Issuing bond series",
        [{ denom: "stake", amount: "200000" }] // Fee
    );

    console.log("✅ TX hash", result.transactionHash);
    return result.transactionHash;
}
