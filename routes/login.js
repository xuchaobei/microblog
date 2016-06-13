var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/',checkNotLogin);
router.get("/",function(req,res){
    res.render('login',{
        title:'用户登入'
    });
});

router.post('/',checkNotLogin);
router.post("/",function(req,res){
    //生成口令的散列值
    var password = req.body.password;

    User.get(req.body.username,function(err,user){
        if(!user){
            req.flash('error','用户不存在');
            return res.redirect('/login');
        }
        if(user.password!=password){
            req.flash('error','用户口令错误');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success','登入成功');
        res.redirect('/');
    });
});

function checkNotLogin(req,res,next){
    if(req.session.user){
        req.flash("error","已登入");
        return res.redirect('/');
    }
    next();
}

module.exports = router;
