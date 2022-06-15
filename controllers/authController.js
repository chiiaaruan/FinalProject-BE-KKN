const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { models } = require("../config/dbConfig");

async function login(req, res) {
    const admin = await models.admin.findOne({
        where: {
            username: req.body.username
        }
    });
    if (!admin) res.status(401).json({ error: "unauthorized" });

    const match = await bcrypt.compare(req.body.password, admin.password);
    if (!match) return res.status(401).json({ error: "unauthorized" });

    const adminId = admin.id;
    const adminName = admin.username;
    const accessToken = jwt.sign({ adminId, adminName }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXIPRY || 900
    });
    const refreshToken = jwt.sign({ adminId, adminName }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXIPRY || 604800
    });

    await models.auth.upsert({ admin_id: adminId, refresh_token: refreshToken }, {
        where: {
            admin_id: adminId
        }
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: process.env.REFRESH_TOKEN_EXIPRY || 604800
    });
    res.json({ accessToken });
    
}


async function refreshAccessToken(req, res) {
    const { id, refreshToken } = req.body;
    if (!refreshToken || !id) return res.status(401).json({ error: "unauthorized" });
    var adminAuth = await models.admin.findOne({
        where: {
            admin_id: id,
            refresh_token: refreshToken
        }
    });
    if (!adminAuth) return res.status(403).json({ error: "not allowed" });

    const admin = await models.admin.findOne({
        where: {
            id: id,
        }
    });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "not allowed" });

        const adminId = admin.id;
        const adminName = admin.username;
        const accessToken = jwt.sign({ adminId, adminName }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });
        res.json({ accessToken });
    });
}

async function logout(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const auth = await models.auth.findAll({ admin_id: adminId, refresh_token: refreshToken },{
        where:{
            refresh_token: refreshToken
        }
    });
    if(!auth) return res.sendStatus(204);
    await models.auth.upsert({ admin_id: adminId, refresh_token: null }, {
        where: {
            admin_id: adminId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

module.exports = {
    login,
    refreshAccessToken,
    logout,
};