const express = require("express");
const app = express();
const session = require("express-session");
const path = require('path')
const nocache = require("nocache");
const morgan =require("morgan");

// requireing  routes
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const collection = require("./models/mongodb");



const PORT = 8001;
app.use(express.json()); //conver to json
app.use(express.urlencoded({ extended: false }));

const oneday = 1000 * 60 * 60 * 24; //one day in seconds
app.use(nocache()); // use destroy cache 
app.use(
  session({
    secret: "your-Secret-Key",
    resave: false,
    cookie: { maxAge: oneday },
    saveUninitialized: true,
  })
); //creating session


app.use(express.static("public"));// use public folder as static 
app.set('views',path.join(__dirname,'views'))//setup path
app.set("view engine", "ejs"); //seting ejs to view engine

//setup router 
app.use("/", userRouter); //to user
app.use("/admin", adminRouter); //to admin

app.listen(PORT, () => {
  console.log(`http://localhost:8001`);
}); //seting port
