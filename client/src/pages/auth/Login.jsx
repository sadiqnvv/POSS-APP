import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Carousel, Checkbox, Form, Input, message } from "antd";
import RegisterCarousel from '../../components/Auth/RegisterCarousel'
import responsive from '../../assets/images/responsive.svg';
import admin from '../../assets/images/admin.svg';
import customer from '../../assets/images/customer.svg';
import statistic from '../../assets/images/statistic.svg';


const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json; charset=UTF-8" },
            });

            const user = await res.json();

            if (user.status === 200) {
                localStorage.setItem(
                    "posUser",
                    JSON.stringify({
                        username: user.user.username,
                        accessToken: user.accessToken,
                        refreshToken: user.refreshToken
                    })
                );
                message.success(user.message);
                navigate("/");
            } else if (user.status === 404) {
                message.error(user.message);
            } else if (user.status === 403) {
                message.error(user.message);
            }
            setLoading(false);
        } catch (error) {
            message.error("Something went wrong.");
            setLoading(false);
        }
    };

    return (
        <div className="h-screen">
            <div className="flex justify-between h-full">
                <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
                    <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            remember: false,
                        }}
                    >
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
                        <Form.Item name={"remember"} valuePropName="checked">
                            <div className="flex justify-between items-center">
                                <Checkbox>Remember me</Checkbox>
                                <Link>Forgot Password?</Link>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                                size="large"
                                loading={loading}
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="flex justify-center absolute left-0 bottom-10 w-full">
                        Don't have an account?&nbsp;
                        <Link to="/register" className="text-blue-600">
                            Sign up now
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

export default Login;