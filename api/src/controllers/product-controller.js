const productService = require('../services/product-service');

const getProducts = async (req, res) => {
    const products = await productService.getProducts();
    res.send(products);
};

const createProduct = async (req, res) => {
    const newProduct = await productService.postProduct(req.body);
    res.status(201).json(newProduct)
};

const updateProduct = async (req, res) => {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    res.status(201).json(updatedProduct)
};

const deleteProduct = async (req, res) => {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    res.status(201).json(deletedProduct)
};

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}