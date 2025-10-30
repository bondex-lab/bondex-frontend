import React from 'react';
import {Button,Space} from "antd";
import KeplrButton from "../components/KeplrButton";
import {useKeplrContext} from "../context/KeplrContext";
import { Typography } from 'antd';

const { Title, Text } = Typography;


const RaisePage = () => {
    const { address} = useKeplrContext();

    return (
        <>
            <Title level={2}>Here you can get financing</Title>
            {address ?
                <Space direction="vertical">
                    <Text>Now, create an escrow account that will receive funds from the continuous fund gradually, over a period of time.</Text>
                    <Button type="primary" size="large" style={{
                        borderRadius: 8,
                        backgroundColor: address ? "#1677ff" : undefined,
                        color: "white",
                        minWidth: 150,
                    }}>
                        Create Escrow Account
                    </Button>
            </Space> :
                <>
                    <p>First, you need to connect your wallet.</p>
                    <KeplrButton/>
                </>
                    }

        </>
    );
};

export default RaisePage;