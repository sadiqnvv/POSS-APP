const Product = require('../models/Product');

const getProducts = async () => {
    const products = await Product.find();
    return products;
}

const postProduct = async (data) => {
    try {
        const { title, img, price, category } = data;
        const newProduct = new Product({
            title,
            img,
            price,
            category
        });
        await newProduct.save();
        return { message: 'Product added successfully', status: 200, newProduct };
    } catch (err) {
        return { message: "Failed to add product!" }
    }
}

const updateProduct = async (id, data) => {
    try {
        const { title, img, price, category } = data;
        const product = await Product.findOneAndUpdate({ _id: id }, { title, img, price, category }, { new: true });
        await product.save();
        return { message: 'Product edited successfully', status: 200, product };
    } catch (err) {
        return { message: "Failed to edit product!" }
    }
}

const deleteProduct = async (id) => {
    try {
        const product = await Product.findByIdAndDelete(id);
        return { message: 'Product deleted successfully', status: 200, product };
    } catch (err) {
        return { message: "Failed to delete product!" }
    }
}

module.exports = {
    getProducts,
    postProduct,
    updateProduct,
    deleteProduct
}