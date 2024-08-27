const Category = require('../models/Category');

const getCategories = async () => {
    const categories = await Category.find();
    return categories;
}

const postCategory = async (title) => {
    try {
        const newCategory = new Category({
            title
        });
        await newCategory.save();
        return { message: 'Category added successfully', status: 200, newCategory };
    } catch (err) {
        return { message: "Failed to add category!" }
    }
}

const updateCategory = async (id, title) => {
    try {
        const category = await Category.findOneAndUpdate({ _id: id }, { title: title }, { new: true });
        await category.save();
        return { message: 'Category updated successfully', status: 200, category };
    } catch (err) {
        return { message: "Something went wrong!" }
    }
}

const deleteCategory = async (id) => {
    try {
        const category = await Category.findByIdAndDelete(id);
        return { message: 'Category deleted successfully', status: 200, category };
    } catch (err) {
        return { message: "Something went wrong!" }
    }
}

module.exports = {
    getCategories,
    postCategory,
    updateCategory,
    deleteCategory
}