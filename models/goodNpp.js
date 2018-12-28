const mongoose = require('mongoose');

const GoodNppSchema = mongoose.Schema({
    supplyCode:{
        type: String,
        default: "unknown",
    },
    name:{
        type: String,
        require: true,
        default: "unknown",
    },
    DVT:{
        type: String,
        default: "Chiếc",
    },
    importPrice:{
        type: Number,
        require: true,
        default: 0,
    },
    warranty:{
        type: Number,
        require: true,
        default: 0,
    },
    description:{
        type: String,
        default: "...",
    },
    supplier:{
        type: String,
        default: "...",
    },
    lastUpdate:{
        type: Number,
        default: 0,
    },
    isAdded:{
        type: Boolean,
        default: false,
    }
});

const GoodNpp = module.exports = mongoose.model('GoodNpp', GoodNppSchema);

module.exports.getGoodNppById = function (id, callback) {
    GoodNpp.findById(id, callback);
};

module.exports.getAllGoodNpp = function (callback) {
    const query = {};
    GoodNpp.find(query, callback);
};

module.exports.addGoodNpp = function (supplyCode, name, DVT, importPrice, warranty, description, supplier, callback) {
    let newGoodNpp = new GoodNpp({
        supplyCode: supplyCode,
        name: name,
        DVT: DVT,
        importPrice: importPrice,
        warranty: warranty,
        description: description,
        supplier: supplier,
        lastUpdate: Date.now()
    });
    newGoodNpp.save(callback);
};

module.exports.updateAddGoodNpp = function (_id, callback) {
    let newGood = {
        isAdded: true
    };
    GoodNpp.findByIdAndUpdate(_id, newGood, {new: true}, callback);
};

module.exports.updateGoodNpp = function (_id, supplyCode, name, DVT, importPrice, warranty, description, supplier, callback) {
    //TODO THAY ĐỔI CÁCH SỬA SỐ LƯỢNG HIỆN CÓ KHI ĐÃ HOẠT ĐỘNG ỔN ĐỊNH
    let newGood = {
        supplyCode: supplyCode,
        name: name,
        DVT: DVT,
        importPrice: importPrice,
        warranty: warranty,
        description: description,
        supplier: supplier,
        lastUpdate: Date.now()
    };
    GoodNpp.findByIdAndUpdate(id, newGood, {new: true}, callback);
};

module.exports.getGoodBySupplyCode = function (supplyCode, callback) {
    const query = {supplyCode: supplyCode};
    GoodNpp.findOne(query, callback);
};

module.exports.getGoodNppByText = function (text, callback) {
    const query = { $text: { $search: text } };
    const score = { score: { $meta: "textScore" } };
    GoodNpp.find(query, score).sort( { score: { $meta: "textScore" } } ).limit(50).exec(callback);
};