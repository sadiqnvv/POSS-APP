import React from "react";
import fetchWithToken from '../../services/token-service';
import { Button, Form, Input, message, Modal } from "antd";

const Add = ({
    isAddModalOpen,
    setIsAddModalOpen,
    categories,
    setCategories,
}) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const data = await fetchWithToken(process.env.REACT_APP_SERVER_URL + "/api/categories", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            if (data.status !== 200) {
                throw new Error(data.message);
            }

            message.success(data.message);
            form.resetFields();

            setCategories([...categories, data.newCategory]); 

            setIsAddModalOpen(false);
        } catch (error) {
            console.log(error);
            message.error("Something went wrong.");
        }
    };

    return (
        <Modal
            title="Add new Category"
            open={isAddModalOpen}
            onCancel={() => setIsAddModalOpen(false)}
            footer={false}
        >
            <Form layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item
                    name="title"
                    label="Add category"
                    rules={[{ required: true, message: "Category Field Cannot Be Empty!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item className="flex justify-end mb-0">
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Add;