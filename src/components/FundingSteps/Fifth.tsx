import React, {useEffect, useState} from 'react';
import {Button, Divider, message, Space, Typography} from "antd";
import {withdrawFunds} from "../../helpers/withdrawFunds";
import {payoutBonds} from "../../helpers/payoutBonds";

interface FifthProps {
    continuousFund: any;
    escrowAddress: string;
}

const { Text } = Typography;

const nodeUrl = process.env.REACT_APP_LOCALHOST_NODE_URL || "http://localhost:1317";


const Fifth:React.FC<FifthProps> = ({ continuousFund, escrowAddress }) => {
    const [config, setConfig] = useState<any | null>(null);
    const [balance, setBalance] = useState<any | null>(null);

    useEffect(() => {
        if (!escrowAddress) return;

        const fetchBondData = async () => {
            try {
                const getConfig = btoa(JSON.stringify({ get_config: {} }));
                const getBalances = btoa(JSON.stringify({ get_balances: {} }));
                const resp1 = await fetch(`${nodeUrl}/cosmwasm/wasm/v1/contract/${escrowAddress}/smart/${getConfig}`);
                const resp2 = await fetch(`${nodeUrl}/cosmwasm/wasm/v1/contract/${escrowAddress}/smart/${getBalances}`);
                if (!resp1.ok || !resp2.ok) throw new Error("Failed to fetch bond data");
                const data1 = await resp1.json();
                const data2 = await resp2.json();
                setConfig(data1.data,);
                setBalance(data2.data,);
            } catch (err) {
                console.error(err);
                message.error("Failed to load bond data");
            }
        };
        fetchBondData();
    }, [escrowAddress]);

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Space>
                <Text strong>Escrow account address: </Text>
                <Text copyable>{escrowAddress}</Text>
            </Space>

            <Divider />

            <Space direction="vertical">
                <Text><Text strong>Balance CW20: </Text>{balance?.cw20_token_balance}</Text>
                <Text><Text strong>Balance Native tokens: </Text>{balance?.native_token_balance.amount} {balance?.native_token_balance.denom}</Text>
                <Text><Text strong>Debt Native Tokens: </Text>{config?.outstanding_debt.amount} {config?.outstanding_debt.denom}</Text>
            </Space>
            <Divider />
            <Button onClick={() => withdrawFunds(escrowAddress)} style={{width: 160}} type={"primary"}>Withdraw Funds</Button>
            <Button onClick={() => payoutBonds(escrowAddress)} style={{width: 160}} type={"primary"}>Payout Bonds</Button>
        </Space>
    );
};

export default Fifth;