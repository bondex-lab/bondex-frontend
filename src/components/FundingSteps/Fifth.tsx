import React from 'react';
import {Button, Divider, Space, Typography} from "antd";

interface FifthProps {
    continuousFund: any;
    escrowAddress: string;
}

const { Text } = Typography;

const Fifth:React.FC<FifthProps> = ({ continuousFund, escrowAddress }) => {
    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Space>
                <Text strong>Escrow account address: </Text>
                <Text copyable>{escrowAddress}</Text>
            </Space>

            <Divider />

            <Space direction="vertical">
                <Text><Text strong>Balance: </Text> todo add from contract</Text>
                <Text><Text strong>Debt: </Text> todo add</Text>
                <Text><Text strong>Assets (credit): </Text> todo add</Text>
            </Space>
            <Divider />
            <Button type={"primary"}>Withdraw assets</Button>
            <Button type={"primary"}>Withdraw balance</Button>
        </Space>
    );
};

export default Fifth;