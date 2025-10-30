import React, { useEffect, useState } from 'react';
import { Steps, theme, message } from 'antd';
import { useKeplrContext } from "../../context/KeplrContext";
import First from "./First";
import Second from "./Second";
import Third from "./Third";
import Fourth from "./Fourth";
import {instantiateContract} from "../../helpers/Instantiate";
import Fifth from "./Fifth";

const codeId = Number(process.env.ESCROW_INSTANTIATION_CODE_ID) || 1;

const FundingSteps = () => {
    const { address } = useKeplrContext();
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [escrowAccount, setEscrowAccount] = useState('');
    const [continuousFund, setContinuousFund] = useState<any>('');

    useEffect(() => {
        if (!address) setCurrent(0);
        else if (!escrowAccount) setCurrent(1);
        else if (escrowAccount && !continuousFund) setCurrent(2);
        else if (escrowAccount && continuousFund) setCurrent(3);
        else setCurrent(3);
    }, [address, escrowAccount, continuousFund]);

    const instantiateEscrow = async () => {
        try {
            const contractAddress = await instantiateContract(codeId);
            console.log("Contract deployed at:", contractAddress);
        } catch (err) {
            console.error("Error instantiating contract:", err);
        }
    };

    const getEscrow = async () => {
        try {
            const response = await fetch(`http://localhost:1317/cosmwasm/wasm/v1/code/${codeId}/contracts`);
            if (!response.ok) throw new Error("Failed to fetch contracts");

            const data = await response.json();
            // console.log("Contracts for codeId:", data.contracts);

            const contractInfos = await Promise.all(
                data.contracts.map(async (contractAddr: string) => {
                    const resp = await fetch(`http://localhost:1317/cosmwasm/wasm/v1/contract/${contractAddr}`);
                    const info = await resp.json();
                    return { address: contractAddr, creator: info.contract_info?.creator };
                })
            );

            const myContracts = contractInfos
                .filter(c => c.creator === address)
                .map(c => c.address);
            setEscrowAccount(myContracts[0]);
            // console.log("Your contract address:", myContracts);
        } catch (err) {
            console.error(err);
        }
    };
    getEscrow();

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
        { key: "Withdraw Assets", title: "Withdraw Assets" },
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
                    <Second instantiateEscrow={instantiateEscrow} />
                )}
                {current === 2 && <Third escrowAccount={escrowAccount} />}
                {current === 3 && <Fourth continuousFund={continuousFund} escrowAddress={escrowAccount}/>}
                {current === 4 && <Fifth continuousFund={continuousFund} escrowAddress={escrowAccount}/>}
            </div>
        </>
    );
};

export default FundingSteps;
