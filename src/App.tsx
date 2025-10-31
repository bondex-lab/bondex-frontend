import React from "react";
import { Layout, Menu, theme, Image } from "antd";
import { Link, Outlet, useLocation } from "react-router";
import styled from "styled-components";
import KeplrButton from "./components/KeplrButton";
import bgImage from "./assets/bg.png";
import logoSmall from "./assets/Bondex logo3.png";

const { Header, Footer, Content } = Layout;

const AppLayout: React.FC = () => {
    const location = useLocation();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const menuItems = [
        { key: "logo", label: <Link to="/home"><Image src={logoSmall} alt="logoSmall" width={30} height={30} preview={false}/></Link> },
        { key: "/home", label: <Link to="/home">Home</Link> },
        { key: "/raise", label: <Link to="/raise">Raise Funding</Link> },
        { key: "/invest", label: <Link to="/invest">Invest</Link> },
        { key: "/marketplace", label: <Link to="/marketplace">Secondary Market</Link> },
        // { key: "/test", label: <Link to="/test">Test</Link> },
    ];

    const isHome = location.pathname === "/home";

    return (
        <Layout
            style={{
                minHeight: "100vh",
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <StyledHeader>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    style={{ flex: 1, minWidth: 0 }}
                />
                <KeplrButton />
            </StyledHeader>

            <Content style={{ padding: isHome ? 0 : "24px 48px" }}>
                {isHome ? (
                    <Outlet />
                ) : (
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
                )}
            </Content>

            <Footer style={{ background: "lightgray", textAlign: "center", opacity: 0.6}}>
                Developed during Hackmos 2025
            </Footer>
        </Layout>
    );
};

export default AppLayout;

export const StyledHeader = styled(Header)`
    display: flex;
    align-items: center;
`;
