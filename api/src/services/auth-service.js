const User = require('../models/User');
const bcrypt = require('bcrypt');
const RefreshToken = require('../models/RefreshToken')
const jwt = require('jsonwebtoken')

const getAllUser = async () => {
    const users = await User.find();
    return users
}

const getUserById = async (id) => {
    const user = await User.findById(id);
    return user
}

const getUserByUsername = async (username) => {
    const user = await User.findOne({ username });
    return user;
};

const register = async (data) => {
    const { username, email, password } = data;
    const isExistingUser = await getUserByUsername(username);

    if (isExistingUser) {
        return { message: 'Username alredy exists' }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    await newUser.save();
    return { message: 'User created successfully' }
}

const refreshAccessToken = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);

        const savedToken = await RefreshToken.findOne({ token: refreshToken });

        if (!savedToken) {
            return { status: 403, message: "Invalid refresh token!" };
        }

        const newAccessToken = jwt.sign({ email: decoded.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return { status: 200, accessToken: newAccessToken };

    } catch (error) {
        return { status: 403, message: "Refresh token expired or invalid!" };
    }
};

const login = async (data) => {
    const { email, password } = data;
    const user = await User.findOne({ email });

    if (!user) {
        return { status: 404, message: "User not found!" };
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return { status: 403, message: "Invalid password!" };
    }

    const accessToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ email: user.email }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '30d' });

    await new RefreshToken({ token: refreshToken }).save();

    return {
        status: 200,
        message: "Login successful",
        user,
        accessToken,
        refreshToken
    };
};

module.exports = {
    getAllUser,
    getUserById,
    register,
    refreshAccessToken,
    login
}