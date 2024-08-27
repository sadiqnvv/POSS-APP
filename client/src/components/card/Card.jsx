import { message } from "antd";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const Card = ({ item }) => {
    const dispatch = useDispatch();
    const handleClick = (product) => {
        dispatch(addProduct({ ...product, quantity: 1 }));
        message.success("Item added to cart.")
    };
    return (
        <div
            className="product-item border hover:shadow-lg cursor-pointer transition-all select-none"
            onClick={() => handleClick(item)}
        >
            <div className="product-img">
                <img
                    src={item.img}
                    alt={item.title}
                    className="h-28 object-cover w-full border-b"
                />
            </div>
            <div className="product-info flex flex-col p-3">
                <span className="font-bold">{item.title}</span>
                <span>{item.price}$</span>
            </div>
        </div>
    )
}

export default Card