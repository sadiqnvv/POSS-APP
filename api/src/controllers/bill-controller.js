const billService = require('../services/bill-service');

const getBills = async (req, res) => {
    const bills = await billService.getBills();
    res.send(bills);
};

const createBill = async (req, res) => {
    const newBill = await billService.postBill(req.body);
    res.status(201).json(newBill)
};


module.exports = {
    getBills,
    createBill
}