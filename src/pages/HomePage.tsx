import React from "react";
import Testb from "../components/TestButton";
import { Typography } from 'antd';
import {useKeplrContext} from "../context/KeplrContext";

const { Title, Text } = Typography;


const HomePage = () => {
    const { address } = useKeplrContext();

    return (
        <>
            <Title>Welcome to Bondex</Title>
            <Text>
                Bondex is a decentralized platform for issuing, investing, and trading tokenized bonds.
            </Text>
            {address && <Testb/>}
        </>
    )
}

export default HomePage;
