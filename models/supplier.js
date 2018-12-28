const mongoose = require('mongoose');

const SupplierSchema = mongoose.Schema({
    nickName:{
        type: String,
        default: "Tên NPP",
    },
    name:{
        type: String,
        default: "Tên Đầy Đủ NPP",
    },
    address:{
        type: String,
        default: "Địa Chỉ NPP",
    },
    phone:{
        type: String,
        default: "SĐT NPP",
    },
    bought:{
        type: Number,
        require: true,
        default: 0,
    },
    paid:{
        type: Number,
        require: true,
        default: 0,
    },
    owe:{
        type: Number,
        require: true,
        default: 0,
    }
});

const Supplier = module.exports = mongoose.model('Supplier', SupplierSchema);

module.exports.getSupplierById = function (id, callback) {
    Supplier.findById(id, callback);
};

module.exports.getAllSupplier = function (callback) {
    const query = {};
    Supplier.find(query, callback);
};

module.exports.getSupplierByPhone = function (phone, callback) {
    const query = {phone : {$regex : ".*"+phone+".*"}};
    Supplier.findOne(query, callback);
};

module.exports.addSupplier = function (name, address, phone, bought, paid, owe, callback) {
    let newSupplier = new Supplier({
        name: name,
        address: address,
        phone: phone,
        bought: bought,
        paid: paid,
        owe: owe
    });
    newSupplier.save(callback);
};

module.exports.updateSupplier = function (id, name, address, phone, callback) {
    let newSupplierInfo = {
        name: name,
        address: address,
        phone: phone
    };
    Supplier.findByIdAndUpdate(id, newSupplierInfo, {new: true}, callback);
};

module.exports.updateSupplierOWE = function (id, bought, paid, owe, callback) {
    let newCustomerInfo = {
        bought: bought,
        paid: paid,
        owe: owe
    };
    Supplier.findByIdAndUpdate(id, newCustomerInfo, {new: true}, callback);
};