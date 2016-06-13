var express = require('express');
var router = express.Router();

router.get("/logout",checkLogin);
router.get("/logout",function(req,res){
    req.session.user = null;
    req.flash('success','登出成功');
    res.redirect('/');
});

function checkLogin(req,res,next){
    if(!req.session.user){
        req.flash('error',"未登入");
        return res.redirect('/login');
    }
    next();
}

module.exports = router;
