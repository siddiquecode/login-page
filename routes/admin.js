const express= require('express')
const admrouter =express.Router()
const admincontroller = require("../controller/admincontroller")
const session = require("express-session");


admrouter.get("/login",admincontroller.login)
admrouter.post("/login",admincontroller.loginpost)
admrouter.get("/dashboard",admincontroller.dashboard)
admrouter.get("/edit/:id",admincontroller.edit)
admrouter.get("/delete/:id",admincontroller.del)
admrouter.get("/createuser",admincontroller.create)
admrouter.post("/createuser",admincontroller.register)
admrouter.post("/update/:id",admincontroller.update)
admrouter.get("/signout",admincontroller.logout)


module.exports = admrouter;
