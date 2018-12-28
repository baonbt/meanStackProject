const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//user schema
const UserSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    accountLevel:{
        type: Number,
        require: true
    },
    accountType:{
        type: String,
        require: true
    },
    baseSalary:{
        type: Number,
        require: true
    },
    birthday:{
        type: Number,
        require: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};

module.exports.updateUser = function (username, phone, accountLevel, accountType, callback) {
    const userName = {username: username};
    const accType = {
        phone: phone,
        accountLevel: accountLevel,
        accountType: accountType
    };
    User.findOneAndUpdate(userName, accType, {new: true}, callback);
};

module.exports.updateUserPassword = function (username, newPassword, callback) {
    const userPhone = {username: username};
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err;
            const userPassword = {password: hash};
            User.findOneAndUpdate(userPhone, userPassword, {new: true}, callback);
        });
    });
};

module.exports.updateUserBaseSalary = function (username, baseSalary, callback) {
    const userName = {username: username};
    const accType = {
        baseSalary: baseSalary
    };
    User.findOneAndUpdate(userName, accType, {new: true}, callback);
};
