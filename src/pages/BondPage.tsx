import React from 'react';
import { useParams } from 'react-router';
import {Button, Card, Divider, Space} from 'antd';
import {exampleBonds} from "../helpers/BondsExampleList";

const BondPage: React.FC = () => {
    const { bondId } = useParams<{ bondId: string }>();
    const bond = exampleBonds.find(b => b.id === Number(bondId));

    if (!bond) return <p>Bond not found</p>;

    return (
        <Space direction="vertical" style={{width:'100%'}}>
            <Card title={bond.name} style={{ maxWidth: 600, margin: '0 auto' }}>
                <p>{bond.description}</p>
                <p><strong>Yield:</strong> {bond.yield}</p>
                <p><strong>Maturity:</strong> {bond.maturity}</p>
                <Divider/>
                <p><strong>Total numbers:</strong> {bond.total}</p>
                <p><strong>Available:</strong> {bond.available}</p>
                <p><strong>I have:</strong> {bond.iHave}</p>
                <p><strong>Price per bond:</strong> {bond.pricePerBond}</p>
                <p><strong>Token per bond:</strong> {bond.tokenPerBond}</p>

            </Card>
                <Button type="primary" size="large" style={{
                    borderRadius: 8,
                    backgroundColor: "#1677ff",
                    color: "white",
                    width: '100%',
                    maxWidth: "600px"
                }}>
                    Buy 1
                </Button>
        </Space>

    );
};

export default BondPage;
