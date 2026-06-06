const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

function validateSession(req, res, next) {
    const reqAuth = req.headers.authorization;

    try {
        console.log("JWT Token:", reqAuth);

        if (req.method === "OPTIONS") {
            return next();
        }

        if (!reqAuth) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const authToken = reqAuth.includes("Bearer") ? reqAuth.split(" ")[1] : reqAuth;
        const payload = jwt.verify(authToken, JWT_KEY);

        req.user = payload;
        next();
    } catch (err) {
        console.log("JWT ERROR:", err.message);
        res.status(401).json({
            message: err.message || "Unauthorized",
        });
    }
}

module.exports = validateSession;
