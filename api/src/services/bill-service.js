const Bill = require('../models/Bill');

const getBills = async () => {
    const bill = await Bill.find();
    return bill;
}

const postBill = async (data) => {
    const { customerName, customerPhoneNumber, paymentMode, cartItems, subTotal, tax, totalAmount } = data;
    const newBill = new Bill({
        customerName,
        customerPhoneNumber,
        paymentMode,
        cartItems,
        subTotal,
        tax,
        totalAmount
    });
    await newBill.save();
    return { message: "Invoice created successfully!", status: 200, newBill }
}

module.exports = {
    getBills,
    postBill
}