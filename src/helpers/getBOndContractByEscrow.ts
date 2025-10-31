
const nodeUrl = process.env.REACT_APP_LOCALHOST_NODE_URL|| "http://localhost:1317";
const bondNftFixedPreceCodeId = Number(process.env.REACT_APP_NFT_BOND_CODE_ID) || 1;


export async function getContractByEscrow(escrow: string) {
    try {
        const contractsResp = await fetch(`${nodeUrl}/cosmwasm/wasm/v1/code/${bondNftFixedPreceCodeId}/contracts`);
        if (!contractsResp.ok) throw new Error("Failed to fetch contracts");
        const { contracts } = await contractsResp.json();

        const queryBase64 = btoa(JSON.stringify({ get_config: {} }));

        for (const contractAddr of contracts) {
            try {
                const resp = await fetch(`${nodeUrl}/cosmwasm/wasm/v1/contract/${contractAddr}/smart/${queryBase64}`);
                if (!resp.ok) continue;

                const data = await resp.json();
                const owner = data?.data?.owner;

                if (owner === escrow) {
                    console.log(contractAddr)
                    return contractAddr;
                }
            } catch (err) {
                console.error(`Error fetching contract ${contractAddr}:`, err);
            }
        }

        return null;
    } catch (err) {
        console.error("Error in findContractByOwner:", err);
        return null;
    }
}


