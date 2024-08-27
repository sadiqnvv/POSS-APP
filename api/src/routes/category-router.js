const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/category-controller');

const router = require('express').Router();

router.get('/', getCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router