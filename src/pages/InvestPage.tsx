import React, {useEffect, useState} from 'react';
import {useKeplrContext} from "../context/KeplrContext";
import KeplrButton from "../components/KeplrButton";
import BondsMarketplace from "../components/BondsMarketplace";
import {message, Space, Typography} from 'antd';

const { Title, Text } = Typography;

const codeId = Number(process.env.REACT_APP_ESCROW_INSTANTIATION_CODE_ID) || 1;
const nodeUrl = process.env.REACT_APP_LOCALHOST_NODE_URL || "http://localhost:1317";



const InvestPage = () => {
    const { address } = useKeplrContext();
    const [escrowAccount, setEscrowAccount] = useState<string | null>(null);
    const [contractData, setContractData] = useState<any>(null);

    useEffect(() => {
        if (!address) return;

        const fetchContracts = async () => {
            try {
                const resp = await fetch(`${nodeUrl}/cosmwasm/wasm/v1/code/${codeId}/contracts`);
                if (!resp.ok) throw new Error("Failed to fetch contracts");

                const data = await resp.json();

                const contractInfos = await Promise.all(
                    data.contracts.map(async (contractAddr: string) => {
                        const infoResp = await fetch(`${nodeUrl}/cosmwasm/wasm/v1/contract/${contractAddr}`);
                        const info = await infoResp.json();
                        return { address: contractAddr, creator: info.contract_info?.creator };
                    })
                );

                const myContracts = contractInfos
                    .filter(c => c.creator === address)
                    .map(c => c.address);

                if (myContracts.length === 0) {
                    message.warning("You have no contracts for this codeId");
                    return;
                }

                setEscrowAccount(myContracts[0]);
            } catch (err) {
                console.error(err);
                message.error("Failed to fetch your contracts");
            }
        };

        fetchContracts();
    }, [address]);

    useEffect(() => {
        if (!escrowAccount) return;

        const fetchContractData = async () => {
            try {
                const query = btoa(JSON.stringify({ get_config: {} }));
                const resp = await fetch(`${nodeUrl}/cosmwasm/wasm/v1/contract/${escrowAccount}/smart/${query}`);
                if (!resp.ok) throw new Error("Failed to fetch contract data");

                const data = await resp.json();
                setContractData(data.data);
            } catch (err) {
                console.error(err);
                message.error("Failed to fetch contract configuration");
            }
        };
        fetchContractData();
    }, [escrowAccount]);

    return (
        <>
            {address ? (
                <BondsMarketplace contractData={contractData} />
            ) : (
                <Space direction="vertical">
                    <Title level={2}>Here you can invest in bonds</Title>
                    <Text>First, you need to connect your wallet.</Text>
                    <KeplrButton />
                </Space>
            )}
        </>
    );
};

export default InvestPage;