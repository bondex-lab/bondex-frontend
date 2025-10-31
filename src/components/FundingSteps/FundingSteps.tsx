import React, { useEffect, useState } from 'react';
import { Steps, theme, message, Spin } from 'antd';
import { useKeplrContext } from "../../context/KeplrContext";
import First from "./First";
import Second from "./Second";
import Third from "./Third";
import Fourth from "./Fourth";
import Fifth from "./Fifth";
import { instantiateContract } from "../../helpers/Instantiate";
import { releaseBonds } from "../../helpers/ReleaseBonds";

const codeId = Number(process.env.REACT_APP_ESCROW_INSTANTIATION_CODE_ID) || 1;
const nodeUrl = process.env.REACT_APP_LOCALHOST_NODE_URL || "http://localhost:1317";

const FundingSteps = () => {
    const { address } = useKeplrContext();
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);
    const [escrowAccount, setEscrowAccount] = useState('');
    const [cw721, setCw721] = useState('');
    const [continuousFund, setContinuousFund] = useState<any>('');

    useEffect(() => {
        if (!address) setCurrent(0);
        else if (!escrowAccount) setCurrent(1);
        else if (escrowAccount && continuousFund && cw721) setCurrent(4);
        else if (escrowAccount && !continuousFund) setCurrent(2);
        else if (escrowAccount && continuousFund) setCurrent(3);
        else setCurrent(4);
    }, [address, escrowAccount, continuousFund, cw721]);

    const instantiateEscrow = async () => {
        setLoading(true);
        message.loading({ content: 'Sending transaction to create contract...', key: 'tx' });

        try {
            const contractAddress = await instantiateContract(codeId);
            setEscrowAccount(contractAddress);
            message.success({
                content: `Contract successfully created! Address: ${contractAddress}`,
                key: 'tx',
                duration: 4,
            });
        } catch (err: any) {
            console.error("Error instantiating contract:", err);
            message.error({
                content: `Failed to create contract: ${err.message || err}`,
                key: 'tx',
                duration: 5,
            });
        } finally {
            setLoading(false);
        }
    };

    const release = async () => {
        setLoading(true);
        message.loading({ content: 'Sending transaction to release funds...', key: 'tx' });

        try {
            const result = await releaseBonds(escrowAccount);
            message.success({
                content: 'Funds successfully released.',
                key: 'tx',
                duration: 4,
            });
            console.log("Contract released:", result);
        } catch (err: any) {
            console.error("Error releasing bonds:", err);
            message.error({
                content: `Failed to release funds: ${err.message || err}`,
                key: 'tx',
                duration: 5,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getEscrow = async () => {
            try {
                const response = await fetch(`${nodeUrl}/cosmwasm/wasm/v1/code/${codeId}/contracts`);
                if (!response.ok) throw new Error("Failed to fetch contracts");

                const data = await response.json();
                const contractInfos = await Promise.all(
                    data.contracts.map(async (contractAddr: string) => {
                        const resp = await fetch(`${nodeUrl}/cosmwasm/wasm/v1/contract/${contractAddr}`);
                        const info = await resp.json();
                        return { address: contractAddr, creator: info.contract_info?.creator };
                    })
                );

                const myContracts = contractInfos
                    .filter(c => c.creator === address)
                    .map(c => c.address);
                setEscrowAccount(myContracts[0]);
            } catch (err) {
                console.error(err);
            }
        };
        getEscrow();
    });

    useEffect(() => {
        if (!escrowAccount) return;
        const fetchCW721 = async () => {
            try {
                const getConfig = btoa(JSON.stringify({ get_config: {} }));
                const resp = await fetch(`${nodeUrl}/cosmwasm/wasm/v1/contract/${escrowAccount}/smart/${getConfig}`);
                if (!resp.ok) throw new Error("Failed to fetch bond data");
                const data = await resp.json();
                if (data.data.cw721_fixed_price_addr) setCw721(data.data.cw721_fixed_price_addr);
            } catch (err) {
                console.error(err);
                message.error("Failed to load bond data");
            }
        };
        fetchCW721();
    });

    useEffect(() => {
        const fetchContinuousFund = async () => {
            if (!escrowAccount) return;
            try {
                const response = await fetch(`${nodeUrl}/cosmos/protocolpool/v1/continuous_funds/${escrowAccount}`);
                if (!response.ok) {
                    setContinuousFund(null);
                    return;
                }
                const data = await response.json();
                setContinuousFund(data.continuous_fund ?? null);
            } catch (err) {
                console.error("Error fetching continuous fund:", err);
                message.error("Failed to fetch continuous fund.");
                setContinuousFund(null);
            }
        };

        fetchContinuousFund();
    }, [escrowAccount]);

    const items = [
        { key: "Connect Wallet", title: "Connect Wallet" },
        { key: "Create Escrow Account", title: "Create Escrow Account" },
        { key: "Submit Proposal", title: "Submit Proposal" },
        { key: "Funding", title: "Funding" },
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
            <Spin spinning={loading} tip="Processing transaction..." size="large">
                <div style={contentStyle}>
                    {current === 0 && <First />}
                    {current === 1 && <Second instantiateEscrow={instantiateEscrow} />}
                    {current === 2 && <Third escrowAccount={escrowAccount} />}
                    {current === 3 && (
                        <Fourth
                            continuousFund={continuousFund}
                            escrowAddress={escrowAccount}
                            release={release}
                        />
                    )}
                    {current === 4 && <Fifth continuousFund={continuousFund} escrowAddress={escrowAccount} />}
                </div>
            </Spin>
        </>
    );
};

export default FundingSteps;
