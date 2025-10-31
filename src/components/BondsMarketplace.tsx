import React from 'react';
import { Card, Col, Row, Space, Typography } from "antd";
import styled from "styled-components";
import { Link } from 'react-router';

const { Title, Text } = Typography;

type BondsMarketplaceType = {
    contractData: any;
};

const BondsMarketplace: React.FC<BondsMarketplaceType> = ({ contractData }) => {
    const bondsArray = contractData ? [contractData] : [];

    return (
        <>
            <Title level={2}>Available bonds</Title>
            <Row gutter={[16, 16]} wrap>
                {bondsArray.length > 0 ? (
                    bondsArray.map((bond, index) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={8}>
                            <Link to={`/invest/${bond.cw721_fixed_price_addr || index}`} state={{ bond }}>
                                <StyledCard title={bond.title || "Unnamed Bond"}>
                                    <Space direction="vertical">
                                        <Text>
                                            <Text strong>Token: </Text>
                                            {bond.outstanding_debt?.denom || "—"}
                                        </Text>
                                        <Text>
                                            <Text strong>Price rate: </Text>
                                            {bond.price_rate || "—"}
                                        </Text>
                                        <Text>
                                            <Text strong>Amount: </Text>
                                            {bond.outstanding_debt?.amount || "—"}
                                        </Text>
                                        {/*<Text><Text strong>CW20: </Text>{bond.cw20_funding_token_addr}</Text>*/}
                                        {/*<Text><Text strong>CW721: </Text>{bond.cw721_fixed_price_addr}</Text>*/}
                                    </Space>
                                </StyledCard>
                            </Link>
                        </Col>
                    ))
                ) : (
                    <Col span={24}>
                        <EmptyText>No bonds available</EmptyText>
                    </Col>
                )}
            </Row>
        </>
    );
};

export default BondsMarketplace;

const StyledCard = styled(Card)`
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    }
    cursor: pointer;
`;

const EmptyText = styled(Text)`
  display: block;
  text-align: center;
  padding: 2rem;
  color: #999;
`;
