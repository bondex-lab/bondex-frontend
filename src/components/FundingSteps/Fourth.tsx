import React from 'react';
import { Divider, Space, Typography, Form, Input, Button } from "antd";
import type { FormProps } from 'antd';
import {releaseBonds} from "../../helpers/ReleaseBonds";

const { Text, Title } = Typography;

type FieldType = {
    totalNumbers?: string;
    pricePerBond?: string;
    attractingDeposits?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

interface FourthProps {
    continuousFund: any;
    escrowAddress: string;
    release: () => Promise<void>;}

const Fourth: React.FC<FourthProps> = ({ continuousFund, escrowAddress, release }) => {
    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Space>
                <Text strong>Escrow account address: </Text>
                <Text copyable>{escrowAddress}</Text>
            </Space>

            <Divider />

            <Space direction="vertical">
                <Title level={5} underline>Continuous Fund Details</Title>
                <Text><Text strong>Recipient:</Text> {continuousFund.recipient}</Text>
                <Text><Text strong>Percentage:</Text> {continuousFund.percentage}</Text>
                <Text><Text strong>Expiry:</Text> {continuousFund.expiry ?? "No expiry"}</Text>
            </Space>

            <Divider />

            <Text>
                <b>Description</b>
            </Text>
            <Text>
                Issue revenue-backed bonds based on your connected cash flow
            </Text>
            <Text>
                and unlock instant funding.
            </Text>

            <Title level={5} underline>Issue bonds</Title>

            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Form
                    name="release"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ width: "100%", maxWidth: 500 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Total Number of Bonds"
                        name="totalNumbers"
                        initialValue={100}
                        rules={[{ required: true, message: 'Please input total numbers!' }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Price per Bond"
                        name="pricePerBond"
                        initialValue={1000}
                        rules={[{ required: true, message: 'Please input price per bond!' }]}
                    >
                        <Input disabled/>
                    </Form.Item>

                    {/*<Form.Item<FieldType>*/}
                    {/*    label="Attracting deposits"*/}
                    {/*    name="attractingDeposits"*/}
                    {/*    initialValue={800}*/}
                    {/*    rules={[{ required: true, message: 'Please input attract deposits!' }]}*/}
                    {/*>*/}
                    {/*    <Input disabled />*/}
                    {/*</Form.Item>*/}

                    <Form.Item wrapperCol={{ offset: 1, span: 22 }}>
                        <Button type="primary" htmlType="submit" onClick={release}>
                            Issue
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Space>
    );
};

export default Fourth;
