const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const auth_secret = require('../config/secret');
var AUTH = passport.authenticate('jwt', {session:false});
const guards = require('../guards/userGuards');

const log = require('../models/log')

router.post('/permission', AUTH, (req, res, next)=>{
        if(req.user.accountType.indexOf(req.body.type) > -1 ||req.user.accountType === 'admin'){
            if(req.user.accountLevel >= req.body.level){
                return res.json({success: true});
            }
        }
        return res.json({success: false});
});

// router.get('/gendefaultadmin', (req, res, next)=>{
//     let newUser = new User({
//         name:'defaultName',
//         phone:'defaultPhone',
//         username:'admin',
//         password:'1',
//         accountLevel:99,
//         accountType:'admin',
//         baseSalary:1000000,
//         birthday:10000
//     });
//     User.addUser(newUser, (err, data) => {
//         if(err){
//             log.addLog({username: 'initial'}, 'gendefaultadmin', 'error', {});
//             return res.json({success: false, msg: 'Đăng Ký Không Thành Công, Vui Lòng Thử Lại'});
//         } else {
//             log.addLog({username: 'initial'}, 'gendefaultadmin', 'success', {});
//             return res.json({success: true, msg: 'Đăng Ký Thành Công'});
//         }
//     });
// });

router.post('/authenticate', (req, res, next)=>{
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, callbackUser)=>{
        if(err){
            log.addLog({username: username}, '/authenticate', 'error', err.stack);
            return res.json({success: false, msg: 'Đã Xảy Ra Lỗi'});
        }
        if(!callbackUser){
            //todo chống brute force
            return res.json({success: false, msg: 'không tìm thấy người dùng'});
        }
        User.comparePassword(password, callbackUser.password, (err, isMatch)=>{
            if(err){
                log.addLog({username: username}, '/authenticate-comparePassword', 'error', err.stack);
                return res.json({success: false, msg: 'Đã Xảy Ra Lỗi'});
            }
            if(isMatch){
                const token = jwt.sign(callbackUser.toJSON(), auth_secret.secret, {
                    expiresIn: '20h'
                });
                log.addLog({username: username}, '/authenticate', 'success', {});
                return res.json({
                    success: true,
                    msg: 'Xin Chào '+callbackUser.name,
                    token: 'JWT ' + token,
                    user: {
                        id: callbackUser._id
                    }
                });
            }else {
                //todo chống brute force
                return res.json({success: false, msg: 'Mật Khẩu Không Chính Xác'});
            }
        });
    })
});

router.post('/changepassword', AUTH, (req, res, next)=>{
    if(req.body.oldPassword === undefined || req.body.newPassword === undefined){
        return res.json({success: false});
    }
    User.comparePassword(req.body.oldPassword, req.user.password, (err, isMatch)=>{
        if(err){
            log.addLog(req.user, '/changepassword-comparePassword', 'error', err.stack);
            return res.json({success: false, msg: 'Đã Xảy Ra Lỗi'});
        }
        if(isMatch){
            User.updateUserPassword(req.user.username, req.body.newPassword, (err)=>{
                if(err){
                    log.addLog(req.user, '/changepassword-updateUserPassword', 'error', err.stack);
                    return res.json({success: false, msg: 'Thay Đổi Mật Khẩu Không Thành Công, Vui Lòng Thử Lại'});
                } else {
                    log.addLog(req.user, '/changepassword-updateUserPassword', 'success', {});
                    return res.json({success: true, msg: 'Thay Đổi Mật Khẩu Thành Công'});
                }
            });
        } else {
            log.addLog(req.user, '/changepassword-updateUserPassword', 'warning', req.body);
            return res.json({success: false, msg: 'Mật Khẩu Cũ Không Chính Xác'});
        }
    });
});

router.post('/addnew', AUTH, guards.type('admin'), guards.level(9), (req, res, next)=>{
    User.getUserByUsername(req.body.username, (err, getUserByUsernameCb)=>{
        if(err){
            log.addLog({username: 'initial'}, 'addnewUser', 'success', {});
            return res.json({success: false, msg: 'Đã xảy ra lỗi'});
        }
        if(getUserByUsernameCb){
            log.addLog({username: 'initial'}, 'addnewUser', 'success', {content: 'username đã tồn tại'});
            return res.json({success: false, msg: 'tài khoản đã tồn tại'});
        } else {
            let newUser = new User({
                name: req.body.name,
                phone: req.body.phone,
                username: req.body.username,
                password: req.body.password,
                accountLevel: req.body.accountLevel,
                accountType: req.body.accountType,
                baseSalary: req.body.baseSalary,
                birthday: req.body.birthday
            });
            User.addUser(newUser, (err, addUser) => {
                if(err){
                    log.addLog({username: 'initial'}, 'addnewUser', 'error', {});
                    return res.json({success: false, msg: 'Đăng Ký Không Thành Công, Vui Lòng Thử Lại'});
                } else {
                    log.addLog({username: 'initial'}, 'addnewUser', 'success', {});
                    return res.json({success: true, msg: 'Đăng Ký Thành Công'});
                }
            });
        }
    });
});

router.get('/typeandlevel', AUTH, (req, res, next)=>{
    return res.json({accountType: req.user.accountType, accountLevel: req.user.accountLevel});
});

module.exports = router;