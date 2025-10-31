import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Card, Divider, Space, Typography, message, Spin } from 'antd';
import { useKeplrContext } from '../context/KeplrContext';
import { buyBonds } from "../helpers/BuyBond";

const { Title, Text } = Typography;
const nodeUrl = process.env.REACT_APP_LOCALHOST_NODE_URL || "http://localhost:1317";

const BondPage: React.FC = () => {
    const { bondId } = useParams<{ bondId: string }>();
    const { address } = useKeplrContext();
    const [bond, setBond] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    const buyBond = async () => {
        if (!bond) return;
        setLoading(true);
        message.loading({ content: 'Processing bond purchase...', key: 'tx' });

        try {
            const contractAddress = await buyBonds(bondId || '', bond.unit_price);
            message.success({
                content: `Bond successfully purchased! Transaction: ${contractAddress}`,
                key: 'tx',
                duration: 4,
            });
            console.log("Bond has been bought:", contractAddress);
        } catch (err: any) {
            console.error("Error buying bond:", err);
            message.error({
                content: `Failed to purchase bond: ${err.message || err}`,
                key: 'tx',
                duration: 5,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!bondId) return;

        const fetchBondData = async () => {
            try {
                const getConfig = btoa(JSON.stringify({ get_config: {} }));
                const resp = await fetch(`${nodeUrl}/cosmwasm/wasm/v1/contract/${bondId}/smart/${getConfig}`);
                if (!resp.ok) throw new Error("Failed to fetch bond data");
                const data = await resp.json();
                setBond(data.data);
            } catch (err) {
                console.error(err);
                message.error("Failed to load bond data");
            }
        };

        fetchBondData();
    }, [bondId]);

    if (!bond) return <p>Loading bond data...</p>;

    return (
        <Spin spinning={loading} tip="Processing transaction..." size="large">
            <Space direction="vertical" style={{ width: '100%', alignItems: 'center' }}>
                <Card
                    title={<Title level={3}>{bond.name || bond.symbol || 'Unnamed Bond'}</Title>}
                    style={{
                        maxWidth: 600,
                        width: '100%',
                        borderRadius: 12,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        padding: 24,
                    }}
                >
                    <Text strong>Token Symbol:</Text> <Text>{bond.symbol}</Text>
                    <br />
                    <Text strong>Unit Price:</Text> <Text>{bond.unit_price}</Text>
                    <br />
                    <Text strong>Remaining Tokens:</Text> <Text>{bond.max_tokens - bond.unused_token_id}</Text>
                    <br />
                    <Text strong>CW20 Address:</Text> <Text>{bond.cw20_address}</Text>
                    <br />
                    <Text strong>CW721 Address:</Text> <Text>{bond.cw721_address}</Text>
                    <Divider />
                    <Text>{bond.description || "No description provided."}</Text>
                </Card>

                {address && (
                    <Button
                        type="primary"
                        size="large"
                        style={{
                            borderRadius: 8,
                            width: '100%',
                            maxWidth: 600,
                        }}
                        onClick={buyBond}
                    >
                        Buy 1
                    </Button>
                )}
            </Space>
        </Spin>
    );
};

export default BondPage;
