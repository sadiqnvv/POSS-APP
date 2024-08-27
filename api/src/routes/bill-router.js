const { getBills, createBill } = require('../controllers/bill-controller');

const router = require('express').Router();

router.get('/', getBills);
router.post('/', createBill);

module.exports = router