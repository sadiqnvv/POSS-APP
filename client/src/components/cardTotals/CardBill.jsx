import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Form, Input, message, Modal, Select } from "antd";
import { reset } from "../../redux/cartSlice";
import fetchWithToken from '../../services/token-service';

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const data = await fetchWithToken(process.env.REACT_APP_SERVER_URL + "/api/bills", {
                method: "POST",
                body: JSON.stringify({
                    ...values,
                    subTotal: cart.total,
                    tax: ((cart.total * cart.tax) / 100).toFixed(2),
                    totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
                    cartItems: cart.cartItems,
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });

            if (data.status === 200) {
                message.success(data.message);
                dispatch(reset());
                navigate("/invoices");
            }
        } catch (error) {
            message.danger("Something went wrong.");
        }
    };

    return (
        <Modal
            title="Create Invoice"
            open={isModalOpen}
            footer={false}
            onCancel={() => setIsModalOpen(false)}
        >
            <Form layout={"vertical"} onFinish={onFinish}>
                <Form.Item
                    label="Name"
                    name={"customerName"}
                    rules={[
                        {
                            required: true,
                            message: "Username is required",
                        },
                    ]}
                >
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    name={"customerPhoneNumber"}
                    label="Phone Number"
                >
                    <Input placeholder="Phone Number" maxLength={11} />
                </Form.Item>
                <Form.Item
                    label="Payment Method"
                    rules={[{ required: true }]}
                    name={"paymentMode"}
                >
                    <Select placeholder="Choose a Payment Method">
                        <Select.Option value="Cash">Cash</Select.Option>
                        <Select.Option value="Credit Card">Credit Card</Select.Option>
                    </Select>
                </Form.Item>
                <Card>
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}$</span>
                    </div>
                    <div className="flex justify-between my-2">
                        <span>TAX %{cart.tax}</span>
                        <span className="text-red-600">
                            {(cart.total * cart.tax) / 100 > 0
                                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                                : 0}
                            $
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <b>Total</b>
                        <b>
                            {cart.total + (cart.total * cart.tax) / 100 > 0
                                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                                : 0}
                            $
                        </b>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            className="mt-4"
                            type="primary"
                            onClick={() => setIsModalOpen(true)}
                            htmlType="submit"
                        >
                            Create Order
                        </Button>
                    </div>
                </Card>
            </Form>
        </Modal>
    );
};

export default CreateBill;