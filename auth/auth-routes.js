const router=require('express').Router();
const passport=require('passport');
//auth login
router.get("/login",(req,res)=>{
res.render('login');
});
router.get("/google", passport.authenticate('google',{
    scope:["profile"]
}))
router.get("/google/redirect",passport.authenticate('google'),(req,res)=>{
    //res.send(req.user)
    res.redirect('/profile');
})
router.get("/logout",(req,res)=>{
    //handle with passport
    req.logout()
    res.redirect('/')
})


module.exports=router;