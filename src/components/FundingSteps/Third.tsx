import React from 'react';
import { Space, Typography } from "antd";

const { Text } = Typography;

interface ThirdProps {
    escrowAccount: string;
}

const Third: React.FC<ThirdProps> = ({ escrowAccount }) => {
    return (
        <Space direction="vertical">
            <Space>
                <Text strong>Escrow account address: </Text>
                <Text copyable>{escrowAccount}</Text>
            </Space>

            <Text>
                Now you need to send using CLI a proposal so that the funds can start flowing into the escrow account.
            </Text>
            <Text>
                Once the Continuous Fund is created, you will be able to work with your assets.
            </Text>
        </Space>
    );
};

export default Third;
