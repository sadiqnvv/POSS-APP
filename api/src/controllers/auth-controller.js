const authService = require('../services/auth-service');

const getAllUser = async (req, res) => {
    const users = await authService.getAllUser()
    res.json(users)
};

const getUserById = async (req, res) => {
    const user = await authService.getUserById(req.params.id)
    res.json(user)
};

const register = async (req, res) => {
    const user = await authService.register(req.body)
    res.json(user)
};

const login = async (req, res) => {
    const result = await authService.login(req.body);

    if (result.status === 200) {
        // Отправляем токены в ответе
        res.status(200).json({
            status: result.status,
            message: result.message,
            user: result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        });
    } else {
        res.status(result.status).json({ message: result.message });
    }
};

const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(403).json({ message: "No refresh token provided!" });
    }

    const result = await authService.refreshAccessToken(refreshToken);

    if (result.status === 200) {
        res.status(200).json({
            message: "Access token refreshed successfully",
            accessToken: result.accessToken
        });
    } else {
        res.status(result.status).json({ message: result.message });
    }
};


module.exports = {
    getAllUser,
    getUserById,
    register,
    refreshToken,
    login
}