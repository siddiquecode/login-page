const express = require("express");
const router = express.Router();
const usercontroller = require('../controller/usercontroller');

router.get("/",usercontroller.signup);
router.post("/",usercontroller.signuppost);
router.get("/login",usercontroller.login);
router.post("/login",usercontroller.loginpost);
router.get("/home",usercontroller.home);
router.get("/signout",usercontroller.logout);


module.exports = router;
