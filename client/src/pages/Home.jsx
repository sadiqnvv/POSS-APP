import { useState, useEffect } from 'react';
import { Spin } from "antd";
import Header from '../components/header/Header'
import Categories from '../components/categories/Categories';
import Products from '../components/products/Products';
import CardTotals from '../components/cardTotals/CardTotals ';
import fetchWithToken from '../services/token-service.js'

const Home = () => {

    const [categories, setCategories] = useState()
    const [products, setProducts] = useState();
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchWithToken(process.env.REACT_APP_SERVER_URL + '/api/categories')
            data &&
                setCategories(
                    data.map((item) => {
                        return { ...item, value: item.title };
                    })
                );
        }
        getCategories()
    }, [])

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

    return (
        <>
            <Header setSearch={setSearch} />
            {products && categories ? (
                <div className="home px-6 flex flex-col md:flex-row justify-between gap-10">
                    <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
                        <Categories
                            categories={categories}
                            setCategories={setCategories}
                            setFiltered={setFiltered}
                            products={products}
                        />
                    </div>
                    <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10 min-h-[500px]">
                        <Products
                            categories={categories}
                            filtered={filtered}
                            products={products}
                            setProducts={setProducts}
                            search={search}
                        />
                    </div>
                    <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
                        <CardTotals />
                    </div>
                </div>) : (
                <Spin
                    size="large"
                    className="absolute top-1/2 h-screen w-screen flex justify-center"
                />)}
        </>
    )
}

export default Home