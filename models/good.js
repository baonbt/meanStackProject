const mongoose = require('mongoose');

const GoodSchema = mongoose.Schema({
    code:{
        type: String,
        default: "unknown",
    },
    supplyCode:{
        type: String,
        default: "unknown",
    },
    name:{
        type: String,
        require: true,
        default: "unknown",
    },
    tags:{
        type: String,
        require: true,
        default: "unknown",
    },
    DVT:{
        type: String,
        default: "Chiếc",
    },
    retailPrice:{
        type: Number,
        require: true,
        default: 0,
    },
    salePriceLevelOne:{
        type: Number,
        require: true,
        default: 0,
    },
    salePriceLevelTwo:{
        type: Number,
        require: true,
        default: 0,
    },
    replacementFee:{
        type: Number,
        require: true,
        default: 10000,
    },
    warranty:{
        type: Number,
        require: true,
        default: 0,
    },
    imageLocation:{
        type: String,
        default: "unknown",
    },
    remaining:{
        type: Number,
        require: true,
        default: 0,
    },
    location:{
        type: String,
        default: "unknown",
    },
    description:{
        type: String,
        default: "...",
    },
    supplier:{
        type: String,
        default: "...",
    }
});

const Good = module.exports = mongoose.model('Good', GoodSchema);

module.exports.getGoodById = function (id, callback) {
    Good.findById(id, callback);
};

module.exports.getAllGood = function (callback) {
    const query = {};
    Good.find(query, callback);
};

module.exports.addGood = function (code, supplyCode, name, tags, retailPrice, salePriceLevelOne, salePriceLevelTwo, replacementFee, warranty, imageLocation, remaining, location, supplier, description, DVT, callback) {
    let newGood = new Good({
        code: code,
        supplyCode: supplyCode,
        name: name,
        tags: tags,
        retailPrice: retailPrice,
        salePriceLevelOne: salePriceLevelOne,
        salePriceLevelTwo: salePriceLevelTwo,
        replacementFee: replacementFee,
        warranty: warranty,
        imageLocation: imageLocation,
        remaining: remaining,
        location: location,
        supplier: supplier,
        description: description,
        DVT: DVT
    });
    newGood.save(callback);
};

module.exports.updateGood = function (id, code, supplyCode, name, tags, retailPrice, salePriceLevelOne, salePriceLevelTwo, replacementFee, warranty, imageLocation, remaining, location, supplier, description, DVT, callback) {
    //TODO THAY ĐỔI CÁCH SỬA SỐ LƯỢNG HIỆN CÓ KHI ĐÃ HOẠT ĐỘNG ỔN ĐỊNH
    let newGood = {
        code: code,
        supplyCode: supplyCode,
        name: name,
        tags: tags,
        retailPrice: retailPrice,
        salePriceLevelOne: salePriceLevelOne,
        salePriceLevelTwo: salePriceLevelTwo,
        replacementFee: replacementFee,
        warranty: warranty,
        imageLocation: imageLocation,
        remaining: remaining,
        location: location,
        supplier: supplier,
        description: description,
        DVT: DVT
    };
    Good.findByIdAndUpdate(id, newGood, {new: true}, callback);
};

module.exports.getGoodByCode = function (code, callback) {
    const query = {code: code};
    Good.findOne(query, callback);
};

module.exports.getGoodByText = function (text, callback) {
    const query = { $text: { $search: text , $diacriticSensitive: false } };
    const score = { score: { $meta: "textScore" } };
    Good.find(query, score).sort( { score: { $meta: "textScore" } } ).limit(5).exec(callback);
};