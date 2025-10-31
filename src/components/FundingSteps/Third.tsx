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
                <b>Note:</b>
            </Text>
            <Text>
                This implementation was built for the Hackathon as an example use case.
            </Text>
            <Text>
                While the mechanism can work for salaries and business financing in general,
            </Text>
            <Text>
                our demo version uses on-chain verification of stable cash flows sourced from a community pool.
            </Text>
            <Text>
                These flows are activated through the creation of a <b>Continuous Fund</b> in the <b>Protocol Pool</b> module,
            </Text>
            <Text>
                where the <b>Community Pool</b>’s <b>Spend</b> has been allocated.
            </Text>
            <br/>
            <Text>
                Now you need to send using <b>CLI</b> a proposal so that the funds can start flowing into the escrow account.
            </Text>
            <Text>
                Once the <b>Continuous Fund</b> is created, you will be able to work with your assets.
            </Text>
        </Space>
    );
};

export default Third;
