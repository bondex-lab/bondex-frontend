import React from 'react';
import { Button, Space, Typography } from "antd";
const { Text } = Typography;

interface SecondProps {
    onCreateEscrow: () => void;
}

const Second: React.FC<SecondProps> = ({ onCreateEscrow }) => {
    const handleClick = () => {
        console.log("Escrow account created");
        onCreateEscrow()
    };

    return (
        <Space direction="vertical" style={{ width: "100%", alignItems: "center" }}>
            <Text>
                Now, create an escrow account that will be needed to receive funds from the continuous fund gradually, over a period of time
            </Text>
            <Button
                type="primary"
                size="large"
                onClick={handleClick}
                style={{
                    borderRadius: 8,
                    backgroundColor: "#1677ff",
                    color: "white",
                    minWidth: 150,
                }}
            >
                Create Escrow Account
            </Button>
        </Space>
    );
};

export default Second;
