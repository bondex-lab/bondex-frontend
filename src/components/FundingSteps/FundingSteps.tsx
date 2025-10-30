import React, { useEffect, useState } from 'react';
import { Steps, theme } from 'antd';
import { useKeplrContext } from "../../context/KeplrContext";
import First from "./First";
import Second from "./Second";
import Third from "./Third";

const FundingSteps = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [escrowAccount, setEscrowAccount] = useState(''); //todo get from node
    const { address } = useKeplrContext();

    useEffect(() => {
        if (!address) setCurrent(0);
        else if (!escrowAccount) setCurrent(1);
        else setCurrent(2);
    }, [address, escrowAccount]);

    const items = [
        { key: "Connect Wallet", title: "Connect Wallet" },
        { key: "Create Escrow Account", title: "Create Escrow Account" },
        { key: "Submit Proposal", title: "Submit Proposal" },
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
                {current === 1 && <Second onCreateEscrow={() => setEscrowAccount("wasmExample1231245gvbertherh")} />}
                {current === 2 && <Third escrowAccount={escrowAccount}/>}
            </div>
        </>
    );
};

export default FundingSteps;
