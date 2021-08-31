const router= require('express').Router();
const authCheck= (req,res,next)=>{
//if user is not logged in
if(!req.user)
{
    res.redirect('/auth/login');
 
}
else{
    next();
}
 
}
router.get('/',authCheck, (req,res)=>{
    res.render('profile',{user:req.user})
});
module.exports=router;