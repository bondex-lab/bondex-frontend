import React, { createContext, useContext } from "react";
import { useKeplr, KeplrState } from "../hoooks/useKeplr";

const KeplrContext = createContext<KeplrState | undefined>(undefined);

export const KeplrProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const keplr = useKeplr();
    return <KeplrContext.Provider value={keplr}>{children}</KeplrContext.Provider>;
};

export const useKeplrContext = (): KeplrState => {
    const context = useContext(KeplrContext);
    if (!context) {
        throw new Error("useKeplrContext must be used within a KeplrProvider");
    }
    return context;
};
