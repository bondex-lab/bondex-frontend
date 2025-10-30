import React from 'react';
import KeplrButton from "../KeplrButton";
import {Space} from "antd";
import { Typography } from 'antd';
const { Text } = Typography;


const First = () => {
    return (
        <Space direction= "vertical">
            <Text>First, you need to connect your wallet.</Text>
            <KeplrButton/>
        </Space>
    );
};

export default First;