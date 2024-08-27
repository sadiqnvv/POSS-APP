const { getAllUser, getUserById, register, login, refreshToken } = require('../controllers/auth-controller');
const authenticateToken = require('../middlewares/auth-middleware')
const router = require('express').Router();

router.get('/users/:id', getUserById);
router.get('/users', getAllUser);
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

module.exports = router