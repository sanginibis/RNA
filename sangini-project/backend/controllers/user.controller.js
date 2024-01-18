const bcrypt = require("bcryptjs");
const req = require("express/lib/request");
const userService = require("../services/users.services");


// This is the controller that is responsible to handle the control by sending the executions to the service
exports.register = (req, res, next) => {

    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);

    req.body.password = bcrypt.hashSync(password, salt); // hash the password into the req body as soon as it arrives

    userService.register(req.body, (error, result) => {
        if (error) {
            res.status(201).send(error)
            return next();
        }

        return res.status(200).send({
            message: "success",
            data: result,
            err_no: 0
        });
    });
}

exports.login = (req, res, next) => {
    userService.login(req.body, (error, result) => {
        if (error) {
            res.status(201).send(error)
            return next();
        }
        return res.status(200).send({
            message: "success",
            data: result
        });

    });
}

exports.userProfile = (req, res, next) => {
    return res.status(200).json({ message: "authorized user" });
}
