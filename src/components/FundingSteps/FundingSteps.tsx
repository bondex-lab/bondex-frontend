import React, { useEffect, useState } from 'react';
import { Steps, theme, message } from 'antd';
import { useKeplrContext } from "../../context/KeplrContext";
import First from "./First";
import Second from "./Second";
import Third from "./Third";
import Fourth from "./Fourth";

const FundingSteps = () => {
    const { address } = useKeplrContext();
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [escrowAccount, setEscrowAccount] = useState(''); // временный адрес
    const [continuousFund, setContinuousFund] = useState<any>(null);

    useEffect(() => {
        if (address) setEscrowAccount(address);
    }, [address]);

    useEffect(() => {
        if (!address) setCurrent(0);
        else if (!escrowAccount) setCurrent(1);
        else if (escrowAccount && !continuousFund) setCurrent(2);
        else if (escrowAccount && continuousFund) setCurrent(3);
        else setCurrent(3);
    }, [address, escrowAccount, continuousFund]);

    useEffect(() => {
        const fetchContinuousFund = async () => {
            if (!escrowAccount) return;
            try {
                const response = await fetch(
                    `http://localhost:1317/cosmos/protocolpool/v1/continuous_funds/${escrowAccount}`
                );

                if (!response.ok) {
                    setContinuousFund(null);
                    return;
                }

                const data = await response.json();
                setContinuousFund(data.continuous_fund ?? null);
            } catch (err) {
                console.error("Error fetching continuous fund:", err);
                message.error("Failed to fetch continuous fund. Check node.");
                setContinuousFund(null);
            }
        };

        fetchContinuousFund();
    }, [escrowAccount]);

    const items = [
        { key: "Connect Wallet", title: "Connect Wallet" },
        { key: "Create Escrow Account", title: "Create Escrow Account" },
        { key: "Submit Proposal", title: "Submit Proposal" },
        { key: "Continuous Fund", title: "Continuous Fund" },
    ];

    const contentStyle: React.CSSProperties = {
        textAlign: 'center',
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        margin: "20px auto",
        marginTop: 16,
        maxWidth: "70vw",
        minHeight: "50vh",
        padding: 20,
    };

    return (
        <>
            <Steps current={current} items={items} />
            <div style={contentStyle}>
                {current === 0 && <First />}
                {current === 1 && (
                    <Second escrowAddress={escrowAccount} onCreateEscrow={() => setEscrowAccount("wasm1chn84qjd0qph4x5x7lk76mkygfyqs745342j8r")} />
                )}
                {current === 2 && <Third escrowAccount={escrowAccount} />}
                {current === 3 && <Fourth continuousFund={continuousFund} escrowAddress={escrowAccount}/>}
            </div>
        </>
    );
};

export default FundingSteps;
