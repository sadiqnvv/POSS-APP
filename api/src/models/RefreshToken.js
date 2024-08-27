const mongoose = require("mongoose");

const TokenSchema = mongoose.Schema(
    {
        token: { type: String, require: true },
        expiresAt: { type: Date, require: true }  // Добавляем поле для даты истечения токена
    },
    { timestamps: true }
);

const RefreshToken = mongoose.model("token", TokenSchema);
module.exports = RefreshToken;