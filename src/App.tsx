import React from "react";
import {Layout, Menu, theme} from "antd";
import { Link, Outlet, useLocation } from "react-router";
import styled from "styled-components";
import KeplrButton from "./components/KeplrButton";

const { Header, Footer, Content } = Layout;

const AppLayout: React.FC = () => {
    const location = useLocation();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuItems = [
        { key: "/home", label: <Link to="/home">Home</Link> },
        { key: "/raise", label: <Link to="/raise">Raise Funding</Link> },
        { key: "/invest", label: <Link to="/invest">Invest</Link> },
        { key: "/marketplace", label: <Link to="/marketplace">Secondary Market</Link> },
    ];

    return (
        <Layout style={{ minHeight: "100vh"}}>
            <StyledHeader>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    style={{ flex: 1, minWidth: 0 }}
                />
                <KeplrButton/>
            </StyledHeader>

            <Content style={{ padding: "24px 48px" }}>
                <div
                    style={{
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        padding: 24,
                        minHeight: "70vh",
                        textAlign: "center",
                    }}
                >
                    <Outlet />
                </div>
            </Content>

            <Footer style={{background: "lightgray", textAlign: "center" }}>
                Developer during Hackmos 2025
            </Footer>
        </Layout>
    );
};

export default AppLayout;

export const StyledHeader = styled(Header)`
    display: flex;
    align-items: center;
`;
