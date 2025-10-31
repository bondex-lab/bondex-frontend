import React, { useState } from "react";
import { Button, message, Typography } from "antd";
import { connectKeplr } from "../helpers/Keplr";
import { coins } from "@cosmjs/stargate";

const { Text } = Typography;

const TestButton: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [txHash, setTxHash] = useState<string | null>(null);

    const handleTransfer = async () => {
        setLoading(true);
        try {
            const result = await connectKeplr();
            if (!result) return;

            const { client, address } = result;

            const amount = coins(1000, "stake");
            const fee = {
                amount: coins(200, "stake"),
                gas: "200000",
            };

            const tx = await client.sendTokens(address, address, amount, fee, "Test self-transfer");
            console.log("Transaction result:", tx);

            setTxHash(tx.transactionHash);
            message.success("Transaction sent! Check below for TX hash.");
        } catch (e) {
            console.error("Transaction failed:", e);
            message.error("Transaction failed. See console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column"}}>
            <Button type="primary" loading={loading} onClick={handleTransfer}>
                Send My Tokens to Myself (Test)
            </Button>
            {txHash && (
                <Text copyable>
                    Transaction Hash: {txHash}
                </Text>
            )}
        </div>
    );
};

export default TestButton;
