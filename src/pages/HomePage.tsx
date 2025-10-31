import React from "react";
import {Typography, Image, Space, Flex} from "antd";
import { useKeplrContext } from "../context/KeplrContext";
import logoBig from "../assets/logoBig.svg";
import TestButton from "../components/TestButton";

const { Title, Text } = Typography;

const HomePage = () => {
    const { address } = useKeplrContext();

    return (
        <div
            style={{
                height: "calc(100vh - 128px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "#fff",
                padding: "0 20px",
            }}
        >
            <Flex vertical align="center" gap={60} >
                <Title
                    level={1}
                    style={{
                        color: "#ffffff",
                        fontWeight: 700,
                        margin: 0,
                        textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    Welcome to Bondex
                </Title>

                <Text
                    style={{
                        color: "#e6f7ff",
                        fontSize: 18,
                        maxWidth: 600,
                        lineHeight: 1.6,
                    }}
                >
                    Bondex is a decentralized platform for issuing, investing, and trading
                    tokenized bonds.
                </Text>
                <Image
                    src={logoBig}
                    preview={false}
                    width={600}
                    style={{ marginBottom: 10 }}
                />
            </Flex>
        </div>
    );
};

export default HomePage;
