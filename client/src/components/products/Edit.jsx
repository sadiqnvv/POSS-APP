import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import fetchWithToken from '../../services/token-service';
const Edit = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState({});
    const [form] = Form.useForm();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchWithToken(process.env.REACT_APP_SERVER_URL + "/api/products");
                setProducts(data);
            } catch (error) {
            }
        };

        getProducts();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await fetchWithToken(process.env.REACT_APP_SERVER_URL + "/api/categories");
                data &&
                    setCategories(
                        data.map((item) => {
                            return { ...item, value: item.title };
                        })
                    );
            } catch (error) {
            }
        };
        getCategories();
    }, []);

    useEffect(() => {
        if (editingItem && isEditModalOpen) {
            form.setFieldsValue(editingItem);
        }
    }, [editingItem, isEditModalOpen, form]);

    const onFinish = async (values) => {
        try {
            const data = await fetchWithToken(process.env.REACT_APP_SERVER_URL + `/api/products/${editingItem._id}`, {
                method: "PUT",
                body: JSON.stringify({ ...values }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            message.success(data.message);
            setProducts(
                products.map((item) => {
                    if (item._id === editingItem._id) {
                        return { ...values, _id: editingItem._id };
                    }
                    return item;
                })
            );
            setIsEditModalOpen(false)
            form.resetFields();
        } catch (error) {
            message.error("Something went wrong.");
        }
    };

    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {

                const data = await fetchWithToken(process.env.REACT_APP_SERVER_URL + `/api/products/${id}`, {
                    method: "DELETE",
                });

                if (data.status !== 200) {
                    throw new Error(data.message);
                }

                setProducts(products.filter((item) => item._id !== id));
                message.success(data.message);

            } catch (error) {
                message.error("Something went wrong.");
            }
        }
    };

    const columns = [
        {
            title: "Product Name",
            dataIndex: "title",
            width: "8%",
            render: (_, record) => {
                return <p>{record.title}</p>;
            },
        },
        {
            title: "Product Image",
            dataIndex: "img",
            width: "4%",
            render: (_, record) => {
                return (
                    <img src={record.img} alt="" className="w-full h-20 object-cover" />
                );
            },
        },
        {
            title: "Product Price",
            dataIndex: "price",
            width: "8%",
        },
        {
            title: "Category",
            dataIndex: "category",
            width: "8%",
        },
        {
            title: "Action",
            dataIndex: "action",
            width: "8%",
            render: (_, record) => {
                return (
                    <div>
                        <Button
                            type="link"
                            className="pl-0"
                            onClick={() => {
                                setIsEditModalOpen(true);
                                setEditingItem(record);
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            type="link"
                            danger
                            onClick={() => deleteProduct(record._id)}
                        >
                            Delete
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <Table
                bordered
                dataSource={products}
                columns={columns}
                rowKey={"_id"}
                scroll={{
                    x: 1000,
                    y: 400,
                }}
            />

            <Modal
                title="Edit Product"
                open={isEditModalOpen}
                onCancel={() => {
                    setIsEditModalOpen(false)
                    form.resetFields()
                }}
                footer={false}
            >
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    form={form}
                    initialValues={editingItem}
                >
                    <Form.Item
                        name="title"
                        label="Product Name"
                        rules={[
                            { required: true, message: "Product Name Field Cannot Be Empty!" },
                        ]}
                    >
                        <Input placeholder="Ürün adı giriniz." />
                    </Form.Item>
                    <Form.Item
                        name="img"
                        label="Product Image"
                        rules={[
                            { required: true, message: "Product Image Field Cannot Be Empty!" },
                        ]}
                    >
                        <Input placeholder="Ürün görseli giriniz." />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Product Price"
                        rules={[
                            { required: true, message: "Product Price Field Cannot Be Empty!" },
                        ]}
                    >
                        <Input placeholder="Product Price." />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Select Category"
                        rules={[
                            { required: true, message: "Category Field Cannot Be Empty!" },
                        ]}
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
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Edit;