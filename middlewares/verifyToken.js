const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = (req, res, next) => {
    const token = req.cookies?.jwtToken;
    if (!token) {
        return res.redirect("/auth/login");
    }
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.redirect("/auth/login");
        }
        req.userId = user.userId;
        next();
    });
};
