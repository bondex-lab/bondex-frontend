import React from 'react';
import {useKeplrContext} from "../context/KeplrContext";
import KeplrButton from "../components/KeplrButton";
import BondsMarketplace from "../components/BondsMarketplace";
import {Space, Typography} from 'antd';

const { Title, Text } = Typography;

const InvestPage = () => {
    const { address } = useKeplrContext();

    return (
        <>
            {address ? (
                <BondsMarketplace/>
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