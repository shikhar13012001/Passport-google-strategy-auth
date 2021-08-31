const passport=require("passport");
const GoogleStrategy=require("passport-google-oauth20");
const keys=require('./keys');
const User=require('../models/user.models');
passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
})
passport.use(new GoogleStrategy({
    //options for the startegy
    callbackURL:"/auth/google/redirect",
clientID:keys.google.clientID,
clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
    //passport callback function
  try{  console.log(profile);
    //check if the user already exists
    User.findOne({googleId:profile.id}).then((current)=>{
 if(current)
 {
     //account exists
     console.log("user",current );
     done(null,current)
 }else{
     //new user
     new User({
        username:profile.displayName,
        googleId:profile.id
    }).save().then((newUser)=>{
        console.log(newUser);
        done(null,newUser)
    }) 

 }
    })

 }
    catch(e)
    {
        console.log(e);
    }

}))