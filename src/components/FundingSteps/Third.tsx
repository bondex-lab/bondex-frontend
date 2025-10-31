import React from 'react';
import { Space, Typography } from "antd";

const { Title, Text, Paragraph } = Typography;

interface ThirdProps {
    escrowAccount: string;
}

const Third: React.FC<ThirdProps> = ({ escrowAccount }) => {
    return (
        <Space
            direction="vertical"
            size="large"
            style={{
                width: "100%",
                maxWidth: 800,
                margin: "0 auto",
                textAlign: "left",
                lineHeight: 1.8,
            }}
        >
            <Space>
                <Text strong>Escrow account address: </Text>
                <Text copyable>{escrowAccount}</Text>
            </Space>

            <div>
                <Title level={2}>About This Implementation</Title>
                <Title level={5} style={{ marginTop: 0 }}>
                    Description
                </Title>

                <Paragraph>
                    This implementation was built for the Hackathon as an example use case.
                </Paragraph>
                <Paragraph>
                    While the mechanism can work for salaries and business financing in general, our demo version uses on-chain verification of stable cash flows sourced from a community pool.
                </Paragraph>
                <Paragraph>
                    These flows are activated through the creation of a <b>Continuous Fund</b> in the <b>Protocol Pool</b> module, where the <b>Community Pool</b>’s <b>Spend</b> has been allocated.
                </Paragraph>
            </div>

            <div>
                <Title level={5}>Instructions</Title>

                <Paragraph>
                    Now you need to send using <b>CLI</b> a proposal so that the funds can start flowing into the escrow account.
                </Paragraph>
                <Paragraph>
                    Once the <b>Continuous Fund</b> is created, you will be able to work with your assets.
                </Paragraph>
            </div>
        </Space>
    );
};

export default Third;
