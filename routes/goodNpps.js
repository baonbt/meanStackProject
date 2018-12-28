const express = require('express');
const router = express.Router();
const passport = require('passport');
var AUTH = passport.authenticate('jwt', {session:false});
const guards = require('../guards/userGuards');

const Log = require('../models/log');
const GoodNpp = require('../models/goodNpp');


router.get('/getgoodnpps/:searchText', AUTH, guards.type('admin'), guards.level(6), (req, res, next)=>{
    const query = decodeURIComponent(req.params.searchText).replace(/\+/g, ' ');
    if(query === null || query === undefined || query.length === 0){
        const resData = {data: []};
        return res.json(resData);
    }
    GoodNpp.getGoodNppByText(query, (err, callbackGood)=>{
        if(err){
            Log.addLog(req.user, 'getGoodNppByText', 'error', err.stack);
            return res.json({success: false, msg: 'Đã Xảy Ra Lỗi'});
        }
        const resData = {data: callbackGood};
        return res.json(resData);
    })
});

router.get('/addedgoodnpps/:needToAdd', AUTH, guards.type('admin'), guards.level(6), (req, res, next)=>{
    if(req.params.needToAdd !== undefined && req.params.needToAdd !== null && req.params.needToAdd.length > 0){
        GoodNpp.updateAddGoodNpp(req.params.needToAdd, (err)=>{
            return res.json({success: true});
        });
    }
});

router.post('/creategoodnpp', AUTH, guards.type('admin'), guards.level(1), (req, res, next)=>{
    GoodNpp.getGoodBySupplyCode(req.body.supplyCode, (err, callbackGood)=>{
        if(err){
            Log.addLog(req.user, 'creategood-getGoodByCode', 'error', err.stack);
            return res.json({success: false, msg: 'Đã Xảy Ra Lỗi'});
        }
        if(callbackGood && req.body.supplyCode === "trống"){
            return res.json({success: false, msg: 'mã hàng hóa đã có: ' + callbackGood.name});
        } else {
            GoodNpp.addGoodNpp(
                req.body.supplyCode,
                req.body.name,
                req.body.DVT,
                req.body.importPrice,
                req.body.warranty,
                req.body.description,
                req.body.supplier,
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

router.post('/updategoodnpp', AUTH, guards.type('admin'), guards.level(1), (req, res, next)=>{
    GoodNpp.getGoodBySupplyCode(req.body.supplyCode, (err, callbackGood)=>{
        if(err){
            Log.addLog(req.user, 'updategood-getGoodById', 'error', err.stack);
            return res.json({success: false, msg: 'Đã Xảy Ra Lỗi'});
        }
        if(callbackGood){
            GoodNpp.updateGoodNpp(
                callbackGood._id,
                req.body.supplyCode,
                req.body.name,
                req.body.DVT,
                req.body.importPrice,
                req.body.warranty,
                req.body.description,
                req.body.supplier,
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
            GoodNpp.addGoodNpp(
                req.body.supplyCode,
                req.body.name,
                req.body.DVT,
                req.body.importPrice,
                req.body.warranty,
                req.body.description,
                req.body.supplier,
                (err, _callbackGood) =>{
                    if(err){
                        Log.addLog(req.user, 'updategood-addGood',  'error', err.stack);
                        return res.json({success: false, msg: 'Đã Xảy Ra Lỗi'});
                    } else {
                        Log.addLog(req.user, 'updategood-addGood', 'success', req.body);
                        return res.json({success: true, msg: 'thêm hàng hóa mới thành công'});
                    }
                }
            );
        }
    });
});

module.exports = router;