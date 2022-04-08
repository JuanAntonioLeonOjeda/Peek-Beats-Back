const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model")

// Authenticate Middleware
function authUser(req, res, next) {
    if (!req.headers.authorization) {
        // checks the header for a token
        res.status(403).json({ error: "No Token found" });
    } else {
        jwt.verify(req.headers.authorization, process.env.SECRET, (err, token) => {
            // takes token + secret phrase
            if (err) {
                res.status(403).json({ error: "Token not valid" });
            }
            UserModel.findOne(
                { email: token.email },
                {  __v: 0 }
            )
                // finds user with the email inside the token that is in header
                .then((user) => {
                    res.locals.user = user;
                    // response with the user
                    next();
                });
        });
    }
}

function authAdmin(req, res, next) {
    if (res.locals.user.role === "admin") {
        return next();
    }
    return res.send("Unauthorized access");
}

module.exports = {
    authUser,
    authAdmin
};