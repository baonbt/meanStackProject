const express = require('express');
const router = express.Router();
const passport = require('passport');
var AUTH = passport.authenticate('jwt', {session:false});
const guards = require('../guards/userGuards');

const Log = require('../models/log');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/xemay/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

// router.get('/testgood/:textFind', (req, res, next)=>{
//
//     const param = decodeURIComponent(req.params.textFind).replace(/\+/g, ' ');
//     if(param === null){
//         const resData = {data: []};
//         return res.json(resData);
//     }
//     console.log(param);
//     Good.getGoodByText(param, (err, callbackGood)=>{
//
//         if(err){
//             // Log.addLog(req.user, 'getAllGood', 'error', err.stack);
//             return res.json({success: false, msg: 'Đã Xảy Ra Lỗi'});
//         }
//         const resData = {data: callbackGood};
//         return res.json(resData);
//     })
// });

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

const Good = require('../models/good');

router.get('/getallgoods', AUTH, guards.type('staff'), guards.level(1), (req, res, next)=>{
    Good.getAllGood((err, callbackGood)=>{
        if(err){
            Log.addLog(req.user, 'getAllGood', 'error', err.stack);
            return res.json({success: false, msg: 'Đã Xảy Ra Lỗi'});
        }
        const resData = {data: callbackGood};
            return res.json(resData);
    })
});

router.post('/creategood', AUTH, guards.type('admin'), guards.level(1), upload.single('goodImage'), (req, res, next)=>{
    Good.getGoodByCode(req.body.code, (err, callbackGood)=>{
        if(err){
            Log.addLog(req.user, 'creategood-getGoodByCode', 'error', err.stack);
            return res.json({success: false, msg: 'Đã Xảy Ra Lỗi'});
        }
        if(callbackGood){
            return res.json({success: false, msg: 'mã hàng hóa đã có: ' + callbackGood.name});
        } else {
            let path = null;
            if(req.file !== null && req.file !== undefined){
                path = req.file.path.replace(/\\/g, '/');
            }
            Good.addGood(
                req.body.code,
                req.body.supplyCode,
                req.body.name,
                req.body.tags,
                req.body.retailPrice,
                req.body.salePriceLevelOne,
                req.body.salePriceLevelTwo,
                req.body.replacementFee,
                req.body.warranty,
                path,
                req.body.remaining,
                req.body.location,
                req.body.supplier,
                req.body.description,
                req.body.DVT,
                (err, _callbackGood) =>{
                    if(err){
                        Log.addLog(req.user, 'creategood-addGood',  'error', err.stack);
                        return res.json({success: false, msg: 'Đã Xảy Ra Lỗi'});
                    } else {
                        Log.addLog(req.user, 'creategood-addGood', 'success', req.body);
                        return res.json({success: true, msg: 'thêm hàng hóa mới thành công'});
                    }
                }
            );
        }
    });
});

router.post('/updategood', AUTH, guards.type('admin'), guards.level(1), upload.single('goodImage'), (req, res, next)=>{
    Good.getGoodById(req.body._id, (err, callbackGood)=>{
        if(err){
            Log.addLog(req.user, 'updategood-getGoodById', 'error', err.stack);
            return res.json({success: false, msg: 'Đã Xảy Ra Lỗi'});
        }
        if(callbackGood){
            let path = null;
            if(req.file !== null && req.file !== undefined){
                path = req.file.path.replace(/\\/g, '/');
            }
            if(path === null){
                path = callbackGood.imageLocation;
            }
            let reqSuppliser = req.body.supplier.split("|||");
            reqSuppliser.pop();
            Good.updateGood(
                req.body._id,
                req.body.code,
                req.body.supplyCode,
                req.body.name,
                req.body.tags,
                req.body.retailPrice,
                req.body.salePriceLevelOne,
                req.body.salePriceLevelTwo,
                req.body.replacementFee,
                req.body.warranty,
                path,
                req.body.remaining,
                req.body.location,
                req.body.supplier,
                req.body.description,
                req.body.DVT,
                (err)=>{
                    if(err){
                        Log.addLog(req.user, 'updategood-updategood',  'error', {content: req.body, error: err.stack});
                        return res.json({success: false, msg: 'Đã Xảy Ra Lỗi'});
                    } else {
                        Log.addLog(req.user, 'updategood', 'success', req.body);
                        return res.json({success: true, msg: 'cập nhật hàng hóa mới thành công'});
                    }
                }
            );
        } else {
            return res.json({success: true, msg: 'hàng hóa không tồn tại'});
        }
    });
});

module.exports = router;