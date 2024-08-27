const categoryService = require('../services/category-service');

const getCategories = async (req, res) => {
    const categories = await categoryService.getCategories();
    res.send(categories);
};

const createCategory = async (req, res) => {
    const newCategory = await categoryService.postCategory(req.body.title);
    res.status(201).json(newCategory)
};

const updateCategory = async (req, res) => {
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body.title);
    res.status(200).json(updatedCategory)
};

const deleteCategory = async (req, res) => {
    const deletedCategory = await categoryService.deleteCategory(req.params.id);
    res.status(200).json(deletedCategory)
};

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}