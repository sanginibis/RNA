const jwt = require('jsonwebtoken');
const urlConfig = require('../config/url.config');
const JWT_SECRECT = "Obelix2024@";

async function authenticateToken(req, res, next) {

    if (req.url == urlConfig.users.base + urlConfig.users.login) {
        return next()
    }

    if (req.url == urlConfig.users.base + urlConfig.users.register) {
        return next()
    }
    
    const authHeader = await req.headers["authorization"];
    //console.log('auth', authHeader);
    const token = authHeader;
    
    if (token == null) return res.status(401).send();


    jwt.verify(token, JWT_SECRECT, (err, user) => {
        if (err) return res.status(401).send(err);
        req.user = user;
        next();
    });
}


const generateAccessToken = async(user_id, username) => {

    let obj;

    obj = {
        id: user_id,
        username: username
    }

    const token = jwt.sign(obj, JWT_SECRECT, {expiresIn: '24h'});

    return token;

}

const getDataFromToken = async(token) => {
    let obj;
    
    if (token!==undefined){
        obj = jwt.verify(token, JWT_SECRECT);
    }

    return obj;
}

module.exports = {
    authenticateToken,
    generateAccessToken,
    getDataFromToken
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