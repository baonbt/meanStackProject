const express = require('express');
const router = express.Router();
const passport = require('passport');
var AUTH = passport.authenticate('jwt', {session:false});
const guards = require('../guards/userGuards');

const Customer = require('../models/customer');
const Log = require('../models/log');

router.get('/all', AUTH, guards.type('staff'), guards.level(1), (req, res, callback)=>{
    Customer.getAllCustomer((err, callbackCustomer)=>{
        if(err){
            Log.addLog(req.user, 'getAllCustomer', 'error', err.stack);
            return res.json({success: false, msg: 'Đã Xảy Ra Lỗi'});
        }
        const resData = {data: callbackCustomer};
        return res.json(resData);
    })
});

router.post('/addnew', AUTH, guards.type('admin'), guards.level(1), (req, res, callback)=>{
    Customer.getCustomerByPhone(req.body.phone, (err, callbackCustomer)=>{
        if(err){
            Log.addLog(req.user, 'addnew-getCustomerByPhone', 'error', err.stack);
            return res.json({success: false, msg:'Đã Xảy Ra Lỗi'});
        }
        if(callbackCustomer){
            return res.json({success: false, msg:'khách hàng đã có trên hệ thống'});
        } else {
            Customer.addCustomer(
                req.body.name,
                req.body.address,
                req.body.phone,
                req.body.type,
                0,
                0,
                req.body.owe,
                0,
                (err, addCb)=>{
                    if(err){
                        Log.addLog(req.user, 'addnew-addCustomer', 'error', err.stack);
                        return res.json({success: false, msg:'Đã Xảy Ra Lỗi'});
                    }
                    Log.addLog(req.user, 'addnew-addCustomer', 'success', {});
                    return res.json({success: true, msg:'thêm khách hàng thành công'});
                }
            )
        }
    });
});

router.post('/updatenameandphone', AUTH, guards.type('staff'), guards.level(1), (req, res, callback)=>{
    Customer.getCustomerById(req.body._id, (err, getCustomerByIdCb)=>{
        if(err){
            Log.addLog(req.user, 'updatenameandphone-getCustomerById', 'error', err.stack);
            return res.json({success: false, msg:'Đã Xảy Ra Lỗi'});
        }
        if(getCustomerByIdCb){
            Customer.updateCustomerNameAndPhone(req.body._id, req.body.name, req.body.phone, (err, updateCustomerNameAndPhoneCb)=>{
                if(err){
                    Log.addLog(req.user, 'updatenameandphone-updateCustomerNameAndPhone', 'error', err.stack);
                    return res.json({success: false, msg:'Đã Xảy Ra Lỗi'});
                }
                Log.addLog(req.user, 'updatenameandphone-updateCustomerNameAndPhone', 'success', {});
                return res.json({success: true, msg:'cập nhật thông tin khách hàng thành công'});

            });
        } else {
            return res.json({success: false, msg:'khách hàng không tồn tại'});
        }
    });
});

router.post('/updateowe', AUTH, guards.type('sale'), guards.level(1), (req, res, callback)=>{
    Customer.getCustomerById(req.body._id, (err, getCustomerByIdCb)=>{
        if(err){
            Log.addLog(req.user, 'updateowe-getCustomerById', 'error', {content: req.body, errorStack: err.stack});
            return res.json({success: false, msg:'Đã Xảy Ra Lỗi'});
        }
        if(getCustomerByIdCb){
            Customer.updateCustomerOWE(req.body._id, req.body.bought, req.body.paid, req.body.owe, (err, updateCustomerNameAndPhoneCb)=>{
                if(err){
                    Log.addLog(req.user, 'updateowe-updateCustomerOWE', 'error', {content: req.body, errorStack: err.stack});
                    return res.json({success: false, msg:'Đã Xảy Ra Lỗi'});
                }
                Log.addLog(req.user, 'updateowe-updateCustomerOWE', 'success', req.body);
                return res.json({success: true, msg:'cập nhật nợ cho khách hàng thành công'});
            });
        } else {
            return res.json({success: false, msg:'khách hàng không tồn tại'});
        }
    });
});

router.post('/updateinfo', AUTH, guards.type('admin'), guards.level(1), (req, res, callback)=>{
    Customer.getCustomerById(req.body._id, (err, getCustomerByIdCb)=>{
        if(err){
            Log.addLog(req.user, 'updateinfo-getCustomerById',  'error', {content: req.body, errorStack: err.stack});
            return res.json({success: false, msg:'Đã Xảy Ra Lỗi'});
        }
        if(getCustomerByIdCb){
            Customer.updateCustomer(
                req.body._id,
                req.body.name,
                req.body.address,
                req.body.phone,
                req.body.type,
                req.body.reduction,
                (err, updateCustomerNameAndPhoneCb)=>{
                if(err){
                    Log.addLog(req.user, 'updateinfo-updateCustomer',  'error', {content: req.body, errorStack: err.stack});
                    return res.json({success: false, msg:'Đã Xảy Ra Lỗi'});
                }
                //todo waring reduction to high
                Log.addLog(req.user, 'updateinfo-updateCustomer', 'success', req.body);
                return res.json({success: true, msg:'cập nhật thông tin khách hàng thành công'});
            });
        } else {
            return res.json({success: false, msg:'khách hàng không tồn tại'});
        }
    });
});

module.exports = router;