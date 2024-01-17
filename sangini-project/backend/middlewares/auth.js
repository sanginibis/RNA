const jwt = require('jsonwebtoken');
const urlConfig = require('../config/url.config');

function authenticateToken(req, res, next) {

    if (req.url == urlConfig.users.base + urlConfig.users.login) {
        return next()
    }

    if (req.url == urlConfig.users.base + urlConfig.users.register) {
        return next()
    }
    
    const authHeader = req.headers["authorization"];
    const token = authHeader;// && authHeader.split(' ')[1];
    console.log(authHeader);
    if (token == null) return res.status(401).send();

    jwt.verify(token, "secret-key", (err, user) => {
        if (err) return res.status(401).send(err);
        req.user = user;
        next();
    });
}

function generateAccessToken(params) {
    return jwt.sign(
        { params },
        "secret-key",
        { expiresIn: "1h" }
    );
}

module.exports = {
    authenticateToken,
    generateAccessToken
}


// const jwt = require('express-jwt');
// const urlConfig = require("./config/url.config");

// const verifyJwt = jwt({ secret: 'blabla2006@', algorithms: ['HS256'] })
//     .unless({
//         path: [
//             urlConfig.users.base + urlConfig.users.login,
//             urlConfig.users.base + urlConfig.users.register
//         ]
//     });

// const generateAccessToken(params){
//     return jwt()
// }
// module.exports.authenticateWithExpressJWT = verifyJwt;