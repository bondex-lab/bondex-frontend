import "@ant-design/v5-patch-for-react-19";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "antd/dist/reset.css";

import AppLayout from "./App";
import HomePage from "./pages/HomePage";
import RaisePage from "./pages/RaisePage";
import InvestPage from "./pages/InvestPage";
import SecondaryMarketPage from "./pages/SecondaryMarketPage";
import {KeplrProvider} from "./context/KeplrContext";
import BondPage from "./pages/BondPage";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <KeplrProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Navigate to="/home" replace />} />
                    <Route element={<AppLayout />}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/raise" element={<RaisePage />} />
                        <Route path="/invest" element={<InvestPage />} />
                        <Route path="/invest/:bondId" element={<BondPage />} />
                        <Route path="/marketplace" element={<SecondaryMarketPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </KeplrProvider>
    </React.StrictMode>
);

reportWebVitals();
