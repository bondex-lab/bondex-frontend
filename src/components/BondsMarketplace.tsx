import React from 'react';
import {Card, Col, Row} from "antd";
import styled from "styled-components";
import { Link } from 'react-router';
import {exampleBonds} from "../helpers/BondsExampleList";
import { Typography } from 'antd';

const { Title} = Typography;

const BondsMarketplace = () => {
    return (
        <>
            <Title level={2}>Avaliable bonds</Title>
            <Row gutter={[16, 16]} wrap>
                {exampleBonds.map(bond => (
                    <Col key={bond.id} xs={24} sm={12} md={8} lg={8}>
                        <Link to={`/invest/${bond.id}`}>
                            <StyledCard title={bond.name}>
                                <p>{bond.description}</p>
                                <p><strong>Yield:</strong> {bond.yield}</p>
                                <p><strong>Maturity:</strong> {bond.maturity}</p>
                            </StyledCard>
                        </Link>
                    </Col>
                ))}
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