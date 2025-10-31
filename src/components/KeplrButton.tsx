import React from "react";
import { Button } from "antd";
import { useKeplrContext } from "../context/KeplrContext";

const KeplrButton = () => {
    const { address, connect, disconnect, loading } = useKeplrContext();

    const shortenAddress = (addr: string) =>
        addr.length > 12 ? `${addr.slice(0, 8)}...${addr.slice(-4)}` : addr;

    return (
        <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={address ? disconnect : connect}
            style={{
                borderRadius: 8,
                // backgroundColor: address ? "#1677ff" : undefined,
                // color: "white",
                minWidth: 150,
            }}
        >
            {address ? shortenAddress(address) : "Connect Keplr"}
        </Button>
    );
};

export default KeplrButton;
