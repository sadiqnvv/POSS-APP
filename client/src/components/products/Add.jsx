import React from "react";
import fetchWithToken from '../../services/token-service';
import { Button, Form, Input, message, Modal, Select } from "antd";

const Add = ({
    isAddModalOpen,
    setIsAddModalOpen,
    categories,
    products,
    setProducts,
}) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const data = await fetchWithToken(process.env.REACT_APP_SERVER_URL + "/api/products", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });

            if (data.status !== 200) {
                throw new Error(data.message);
            }

            message.success(data.message);
            form.resetFields();

            setProducts([
                ...products,
                {
                    ...data.newProduct,
                    _id: data.newProduct._id,
                    price: Number(data.newProduct.price),
                },
            ]);
            setIsAddModalOpen(false)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            title="Add new product"
            open={isAddModalOpen}
            onCancel={() => setIsAddModalOpen(false)}
            footer={false}
        >
            <Form layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item
                    name="title"
                    label="Product Name"
                    rules={[{ required: true, message: "Product Name Field Cannot Be Empty!" }]}
                >
                    <Input placeholder="Please enter the product name." />
                </Form.Item>
                <Form.Item
                    name="img"
                    label="Product Image"
                    rules={[
                        { required: true, message: "Product Image Field Cannot Be Empty!" },
                    ]}
                >
                    <Input placeholder="Please upload the product image." />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Product Price"
                    rules={[
                        { required: true, message: "Product Price Field Cannot Be Empty!" },
                    ]}
                >
                    <Input placeholder="Please enter the product price." />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Select Category"
                    rules={[{ required: true, message: "Category Field Cannot Be Empty!" }]}
                >
                    <Select
                        showSearch
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.title ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                            (optionA?.title ?? "")
                                .toLowerCase()
                                .localeCompare((optionB?.title ?? "").toLowerCase())
                        }
                        options={categories}
                    />
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