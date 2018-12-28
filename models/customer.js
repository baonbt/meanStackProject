const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    name:{
        type: String,
        default: "Tên KH",
    },
    address:{
        type: String,
        default: "Địa Chỉ KH",
    },
    phone:{
        type: String,
        default: "SĐT KH",
    },
    type:{
        type: String,
        require: true,
        default: "khachLe",
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
    },
    reduction:{
        type: Number,
        require: true,
        default: 0,
    }
});

const Customer = module.exports = mongoose.model('Customer', CustomerSchema);

module.exports.getCustomerById = function (id, callback) {
    Customer.findById(id, callback);
};

module.exports.getAllCustomer = function (callback) {
    const query = {};
    Customer.find(query, callback);
};

module.exports.getCustomerByPhone = function (phone, callback) {
    const query = {phone : {$regex : ".*"+phone+".*"}};
    Customer.findOne(query, callback);
};

module.exports.addCustomer = function (name, address, phone, type, bought, paid, owe, reduction, callback) {
    let newCustomer = new Customer({
        name: name,
        address: address,
        phone: phone,
        type: type,
        bought: bought,
        paid: paid,
        owe: owe,
        reduction: reduction
    });
    newCustomer.save(callback);
};

module.exports.updateCustomer = function (id, name, address, phone, type, reduction, callback) {
    let newCustomerInfo = {
        name: name,
        address: address,
        phone: phone,
        type: type,
        reduction: reduction
    };
    Customer.findByIdAndUpdate(id, newCustomerInfo, {new: true}, callback);
};

module.exports.updateCustomerNameAndPhone = function (id, name, phone, callback) {
    let newCustomerInfo = {
        name: name,
        phone: phone
    };
    Customer.findByIdAndUpdate(id, newCustomerInfo, {new: true}, callback);
};

module.exports.updateCustomerType = function (id, type, callback) {
    let newCustomerInfo = {
        type: type
    };
    Customer.findByIdAndUpdate(id, newCustomerInfo, {new: true}, callback);
};

module.exports.updateCustomerReduction = function (id, reduction, callback) {
    let newCustomerInfo = {
        reduction: reduction
    };
    Customer.findByIdAndUpdate(id, newCustomerInfo, {new: true}, callback);
};

module.exports.updateCustomerOWE = function (id, bought, paid, owe, callback) {
    let newCustomerInfo = {
        bought: bought,
        paid: paid,
        owe: owe
    };
    Customer.findByIdAndUpdate(id, newCustomerInfo, {new: true}, callback);
};