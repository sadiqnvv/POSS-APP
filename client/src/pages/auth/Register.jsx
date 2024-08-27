import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Carousel, message, Input } from "antd";
import RegisterCarousel from '../../components/Auth/RegisterCarousel'
import responsive from '../../assets/images/responsive.svg';
import admin from '../../assets/images/admin.svg';
import customer from '../../assets/images/customer.svg';
import statistic from '../../assets/images/statistic.svg';

const Register = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/register", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });
            console.log(res);
            if (res.status === 200) {
                message.success("Registration successful!");
                navigate("/login");
                setLoading(false);
            }
        } catch (error) {
            message.error("Something went wrong.");
        }
    };
    return (
        <div className="h-screen">
            <div className="flex justify-between h-full">
                <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
                    <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Username"
                            name={"username"}
                            rules={[
                                {
                                    required: true,
                                    message: "Username field cannot be left empty!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="E-mail"
                            name={"email"}
                            rules={[
                                {
                                    required: true,
                                    message: "E-mail field cannot be left empty!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name={"password"}
                            rules={[
                                {
                                    required: true,
                                    message: "Password field cannot be left empty!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Confirm password"
                            name={"passwordAgain"}
                            dependencies={["password"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Confirm password field cannot be left empty!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                "Passwords must match!"
                                            )
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                                size="large"
                                loading={loading}
                            >
                                Sign up
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="flex justify-center absolute left-0 bottom-10 w-full">
                        Do you have an account?&nbsp;
                        <Link to="/login" className="text-blue-600">
                            Log in now
                        </Link>
                    </div>
                </div>
                <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
                    <div className="w-full h-full flex items-center">
                        <div className="w-full">
                            <Carousel className="!h-full px-6" autoplay>
                                <RegisterCarousel
                                    img={responsive}
                                    title="Responsive"
                                    desc="Compatibility with all device sizes"
                                />
                                <RegisterCarousel
                                    img={statistic}
                                    title="Statistics"
                                    desc="Extensive Statistics"
                                />
                                <RegisterCarousel
                                    img={customer}
                                    title="Customer Satisfaction"
                                    desc="Customers Satisfied with the Product After Experience"
                                />
                                <RegisterCarousel
                                    img={admin}
                                    title="Admin Panel"
                                    desc="Centralized Management"
                                />
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;