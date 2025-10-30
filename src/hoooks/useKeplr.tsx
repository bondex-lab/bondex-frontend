import { useEffect, useState, useCallback } from "react";
import { SigningStargateClient } from "@cosmjs/stargate";
import {connectKeplr} from "../helpers/Keplr";

export interface KeplrState {
    address: string | null;
    client: SigningStargateClient | null;
    balance: string | null;
    loading: boolean;
    connect: () => Promise<void>;
    disconnect: () => void;
}

export function useKeplr(): KeplrState {
    const [address, setAddress] = useState<string | null>(null);
    const [client, setClient] = useState<SigningStargateClient | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const connect = useCallback(async () => {
        try {
            setLoading(true);
            const result = await connectKeplr()
            if (result) {
                setAddress(result.address);
                setClient(result.client);
                localStorage.setItem("keplr_address", result.address);

                const balanceRes = await result.client.getBalance(result.address, "stake");
                setBalance(balanceRes.amount);
            }
        } catch (e) {
            console.error("Failed to connect Keplr:", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("keplr_address");
        if (saved) {
            connect();
        }
    }, [connect]);

    const disconnect = useCallback(() => {
        localStorage.removeItem("keplr_address");
        setAddress(null);
        setClient(null);
        setBalance(null);
    }, []);

    return { address, client, balance, loading, connect, disconnect };
}
