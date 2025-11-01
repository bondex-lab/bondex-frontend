import React from 'react';
import trading_photo from "../assets/trading_photo.png";
import {Image} from "antd";

const SecondaryMarketPage = () => {
    return (
        <Image
            src={trading_photo}
            preview={false}
            width={1200}
            style={{ marginBottom: 10 }}
        />
    );
};

export default SecondaryMarketPage;