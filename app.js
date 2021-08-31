const express= require('express');
const app = express();
const passportSetup=require("./config/passport-setup"); 
const authRoutes=require("./auth/auth-routes");
const profileRoutes=require("./auth/profile-routes");
const mongoose = require('mongoose');
const keys=require('./config/keys');
const { mongoDB } = require('./config/keys');
const cookieSession=require('cookie-session');
const passport = require('passport');

mongoose.connect(keys.mongoDB.dbURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })   
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));
app.use(cookieSession({
    maxAge:24*60*60*100,
    keys:[keys.SECRET_KEY.PRIVATE_KEY]
}));
//initialize passport 
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine',"ejs");

app.get("/",(req,res)=>{
res.render('home');
});
app.use("/auth",authRoutes);
app.use("/profile",profileRoutes);
app.listen(3000,()=>{
    console.log(3000);
})