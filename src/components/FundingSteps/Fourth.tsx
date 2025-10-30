import React from 'react';
import { Divider, Space, Typography, Form, Input, Button } from "antd";
import type { FormProps } from 'antd';

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
}

const Fourth: React.FC<FourthProps> = ({ continuousFund, escrowAddress }) => {
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

            <Title level={5} underline>Release bonds</Title>

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
                        label="Total numbers"
                        name="totalNumbers"
                        rules={[{ required: true, message: 'Please input total numbers!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Price per bond"
                        name="pricePerBond"
                        rules={[{ required: true, message: 'Please input price per bond!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Attracting deposits"
                        name="attractingDeposits"
                        rules={[{ required: true, message: 'Please input attract deposits!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 1, span: 22 }}>
                        <Button type="primary" htmlType="submit">
                            Release
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Space>
    );
};

export default Fourth;
