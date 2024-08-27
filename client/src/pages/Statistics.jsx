import { useState, useEffect } from "react";
import { Spin } from "antd";
import Header from "../components/header/Header.jsx";
import StatisticsCard from '../components/statistics/StatisticsCard.jsx'
import userImg from '../assets/images/user.png';
import money from '../assets/images/money.png';
import sale from '../assets/images/sale.png';
import product from '../assets/images/product.png'
import fetchWithToken from '../services/token-service.js'
const StatisticPage = () => {
    const [data, setData] = useState();
    const [products, setProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem("posUser"))

    useEffect(() => {
        asyncFetch();
    }, []);

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

    const asyncFetch = async () => {
        try {
            const data = await fetchWithToken(process.env.REACT_APP_SERVER_URL + "/api/bills")
            setData(data)
        }
        catch (error) {
            console.log("fetch data failed", error);
        }
    };

    const totalAmount = () => {
        const amount = data.reduce((total, item) => item.totalAmount + total, 0);
        return `${amount.toFixed(2)}₺`;
    };
    return (
        <>
            <Header />
            <h1 className="text-4xl font-bold text-center mb-4">Statistics</h1>
            {data ? (
                <div className="px-6 md:pb-0 pb-20">
                    <div className="statistic-section">
                        <h2 className="text-lg">
                            Welcome{" "}
                            <span className="text-green-700 font-bold text-xl">{user.username}</span>.
                        </h2>
                        <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
                            <StatisticsCard
                                title={"Total Customers"}
                                amount={data?.length}
                                img={userImg}
                            />
                            <StatisticsCard
                                title={"Total earnings"}
                                amount={totalAmount()}
                                img={money}
                            />
                            <StatisticsCard
                                title={"Total Sales"}
                                amount={data?.length}
                                img={sale}
                            />
                            <StatisticsCard
                                title={"Total Products"}
                                amount={products?.length}
                                img={product}
                            />
                        </div>
                    </div>
                </div>) : (
                <Spin
                    size="large"
                    className="absolute top-1/2 h-screen w-screen flex justify-center"
                />)}
        </>
    );
};

export default StatisticPage;