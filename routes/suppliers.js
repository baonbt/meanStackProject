const express = require('express');
const router = express.Router();
const passport = require('passport');
var AUTH = passport.authenticate('jwt', {session:false});
const guards = require('../guards/userGuards');

const Supplier = require('../models/supplier');
const Log = require('../models/log');

router.get('/all', AUTH, guards.type('staff'), guards.level(1), (req, res, callback)=>{
    Supplier.getAllSupplier((err, callbackSupplier)=>{
        if(err){
            Log.addLog(req.user, 'getAllSupplier', 'error', err.stack);
            return res.json({success: false, msg: 'Đã Xảy Ra Lỗi'});
        }
        const resData = {data: callbackSupplier};
        return res.json(resData);
    })
});

router.get('/list', AUTH, guards.type('staff'), guards.level(1), (req, res, callback)=>{
    Supplier.getAllSupplier((err, callbackSupplier)=>{
        if(err){
            Log.addLog(req.user, 'getAllSupplier', 'error', err.stack);
            return res.json({success: false, msg: 'Đã Xảy Ra Lỗi'});
        }
        let resData = [];
        for(let supplier of callbackSupplier){
            resData.push(supplier.nickName);
        }
        return res.json({suppliers:resData});
    })
});

router.post('/addnew', AUTH, guards.type('admin'), guards.level(1), (req, res, callback)=>{
    Supplier.getSupplierByPhone(req.body.phone, (err, callbackSupplier)=>{
        if(err){
            Log.addLog(req.user, 'addnew-getSupplierByPhone', 'error', err.stack);
            return res.json({success: false, msg:'Đã Xảy Ra Lỗi'});
        }
        if(callbackSupplier){
            return res.json({success: false, msg:'nhà phân phối đã có trên hệ thống'});
        } else {
            Supplier.addSupplier(
                req.body.name,
                req.body.address,
                req.body.phone,
                0,
                0,
                req.body.owe,
                (err, addCb)=>{
                    if(err){
                        Log.addLog(req.user, 'addnew-addSupplier', 'error', err.stack);
                        return res.json({success: false, msg:'Đã Xảy Ra Lỗi'});
                    }
                    Log.addLog(req.user, 'addnew-addSupplier', 'success', {});
                    return res.json({success: true, msg:'thêm phân phối thành công'});
                }
            )
        }
    });
});

router.post('/update', AUTH, guards.type('staff'), guards.level(1), (req, res, callback)=>{
    Supplier.getSupplierById(req.body._id, (err, getCustomerByIdCb)=>{
        if(err){
            Log.addLog(req.user, 'updateSupplier-getSupplierById', 'error', err.stack);
            return res.json({success: false, msg:'Đã Xảy Ra Lỗi'});
        }
        if(getCustomerByIdCb){
            Supplier.updateSupplier(req.body._id, req.body.name, req.body.address, req.body.phone, (err, updateCustomerNameAndPhoneCb)=>{
                if(err){
                    Log.addLog(req.user, 'updateSupplier-updateSupplier', 'error', err.stack);
                    return res.json({success: false, msg:'Đã Xảy Ra Lỗi'});
                }
                Log.addLog(req.user, 'updateSupplier-updateSupplier', 'success', {});
                return res.json({success: true, msg:'cập nhật thông tin nhà phân phối thành công'});

            });
        } else {
            return res.json({success: false, msg:'nhà phân phối không tồn tại'});
        }
    });
});


module.exports = router;