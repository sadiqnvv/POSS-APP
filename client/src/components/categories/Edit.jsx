import { Button, Form, Input, message, Modal, Table } from "antd";
import React, { useState, useEffect } from "react";
import fetchWithToken from '../../services/token-service';

const Edit = ({
    isEditModalOpen,
    setIsEditModalOpen,
    categories,
    setCategories,
}) => {
    const [editingRow, setEditingRow] = useState({});
    const [form] = Form.useForm();
    const onFinish = (values) => {
        try {
            fetchWithToken(process.env.REACT_APP_SERVER_URL + `/api/categories/${editingRow._id}`, {
                method: "PUT",
                body: JSON.stringify({ title: values.title }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            }).then((response) => {
                if (response.status === 200) {
                    message.success(response.message);
                    const updatedCategories = categories.map((item) => {
                        if (item._id === editingRow._id) {
                            return { ...item, title: values.title };
                        }
                        return item;
                    });

                    setCategories(updatedCategories);

                    form.resetFields();
                    setEditingRow({});

                } else {
                    throw new Error(response.message);
                }
            });
        } catch (error) {
            message.error("Something went wrong.");
        }
    };

    useEffect(() => {
        if (editingRow._id) {
            form.setFieldsValue({ title: editingRow.title });
        }
    }, [editingRow, form]);


    const deleteCategory = async (categoryId) => {
        try {
            const response = await fetchWithToken(process.env.REACT_APP_SERVER_URL + `/api/categories/${categoryId}`, {
                method: "DELETE",
            });

            if (response.status !== 200) {
                throw new Error('Failed to delete category');
            }

            setCategories(categories.filter(category => category._id !== categoryId));
            message.success(response.message);
        } catch (error) {
            console.log(error);
            message.error("Something went wrong.");
        }
    };

    const handleEditClick = (record) => {
        setEditingRow(record);
        form.setFieldsValue({ title: record.title });
    };

    const columns = [
        {
            title: "Category Title",
            dataIndex: "title",
            render: (_, record) => {
                if (record._id === editingRow._id) {
                    return (
                        <Form.Item className="mb-0" name="title">
                            <Input />
                        </Form.Item>
                    );
                } else {
                    return <p>{record.title}</p>;
                }
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return (
                    <div>
                        <Button
                            type="link"
                            onClick={() => handleEditClick(record)}
                            className="pl-0"
                        >
                            Edit
                        </Button>
                        <Button type="link" htmlType="submit" className="text-gray-500">
                            Save
                        </Button>
                        <Button
                            type="link"
                            danger
                            onClick={() => deleteCategory(record._id)}
                        >
                            Delete
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <Modal
            open={isEditModalOpen}
            title="Category process"
            footer={false}
            onCancel={() => {
                setIsEditModalOpen(false);
                setEditingRow({});
                form.resetFields();
            }}
        >
            <Form form={form} onFinish={onFinish}>
                <Table
                    bordered
                    dataSource={categories}
                    columns={columns}
                    rowKey={"_id"}
                />
            </Form>
        </Modal>
    );
};

export default Edit;
