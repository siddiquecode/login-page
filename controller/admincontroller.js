const collection = require("../models/mongodb")


const loginpost = (req,res)=>{
    const name = 'admin'
    const password = '123'
    if(name ===  req.body.username && password === req.body.password){
        //adding session 
        req.session.admin = req.body.username;
        adminsession = req.session.admin;
        res.redirect("/admin/dashboard")
    }else {
        res.send("wrong data....")
    }
}

    // admin login...
const login = (req,res)=>{
    if(!req.session.admin){
        res.render("admin/login")
    }else{
        res.redirect('/admin/dashboard')
    }  
}

    // dashboard...
const dashboard = async(req,res)=>{
    if(req.session.admin){
        try{
            const searchQuery =req.query.search  || '' ;
            const users = await collection.find({
                name:{ $regex:searchQuery, $options: 'i'}
            })
            console.log(searchQuery)
            res.render('admin/dashboard',{users,searchQuery})
        }catch(error){
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    else{
        res.redirect('/admin/login')
    }
}

    // create document...
const create = (req,res)=>{
    if(req.session.admin){
        res.render('admin/create')
    }
     else{
        res.render('admin/login')
     }
}
const register = async (req, res) => {
    try {
      if (req.session.admin) {
        const data = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        };
        console.log(data)
  
        const newval = await collection.findOne({ email: req.body.email });
  
        if (!newval) {
          await collection.create(data);
          console.log("User registered successfully!");
      
            res.status(201).json({mes:"success the user create"})
        } else {
 
        console.log("error")
        res.status(404).json({mes:"User already exists"})
        }
      } else {
        res.status(404).send("Invalid session. Access denied.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).send("Internal Server Error");
    }
  };

    // edit document...
const update =async(req,res)=>{
    try{
        const userid =req.params.id;
        function isStringWhiteSpace(str){
            return /^\s*$/.test(str)
        }
        const user =await collection.findById(userid)
        if(!isStringWhiteSpace(req.body.name)){
            user.name =req.body.name
        }
        user.email = req.body.email
        user.save();
        res.redirect("/admin/dashboard")
    }catch(error){
        console.log(error)
    }
} 

const edit = async(req,res)=>{
    try{
        const editId =req.params.id;
        const user = await collection.findById(editId)
        res.render('admin/edit',{user})
    }catch(error){
        console.log(error);
    }
}

    // delete document...
const del =async(req,res)=>{
    try{

        const del = req.params.id;
        await collection.findByIdAndDelete(del);
        res.redirect('/admin/dashboard');
    }catch(error){
        console.log(error);
    }
}
   
  // admin logout...
const logout =(req,res)=>{
req.session.admin = false;
res.redirect("/admin/login");
}

module.exports ={
    dashboard,login,loginpost,del,update,edit,logout,create,register
}