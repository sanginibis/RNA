const bioinfos = require('../services/bioinfo.services');

exports.bioinfo = (req, res, next) => {
    bioinfos.bioinfo(req.body, (error, result) => {
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

exports.nussinov = (req, res, next) => {
    bioinfos.nussinov(req.body, (error, result) => {
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

exports.zuker = (req, res, next) => {
    bioinfos.zuker(req.body, (error, result) => {
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