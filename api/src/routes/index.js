const categoryRouter = require('./category-router');
const productRouter = require('./product-router');
const billRouter = require('./bill-router');
const authRouter = require('./auth-router');
const authenticateToken = require('../middlewares/auth-middleware')


const router = require('express').Router();

router.use('/categories', authenticateToken, categoryRouter)
router.use('/products', authenticateToken, productRouter)
router.use('/bills', authenticateToken, billRouter)
router.use('/', authRouter)


module.exports = router