const userController = require("../controllers/user.controller");
const bioController = require("../controllers/bioinfo.controller")


const express = require("express");
const router = express.Router();
const urlConfig = require("../config/url.config");

router.post(urlConfig.users.register, userController.register);
router.post(urlConfig.users.login, userController.login);
router.get(urlConfig.users.profile, userController.userProfile);

router.post(urlConfig.dashboard.bioinfo, bioController.bioinfo);
router.post(urlConfig.dashboard.nussinov, bioController.nussinov);
router.post(urlConfig.dashboard.zuker, bioController.zuker);

router.post(urlConfig.dashboard.saveBioInfoData, bioController.saveBioInfo);
router.post(urlConfig.dashboard.getRNASequences, bioController.getRNASequences);

module.exports = router;