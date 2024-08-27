const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./src/routes');
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 5000;

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// middleware
app.use(cors())

// DB connect
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected')
    } catch (err) {
        throw err
    }
}

// routes
app.use('/api', router)


app.listen(PORT, () => {
    connect()
    console.log(`Server running on port ${PORT}`);
})