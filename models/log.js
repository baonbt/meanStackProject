const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
    time:{
        type: Number,
        require: true
    },
    username:{
        type: String,
        require: true
    },
    logDescription:{
        type: String
    },
    logType:{
        type: String,
        require: true
    },
    content:{}
});

const Log = module.exports = mongoose.model('Log', LogSchema);

module.exports.getLogById = function (id, callback) {
    Log.findById(id, callback);
};

module.exports.getAllLog = function (callback) {
    const query = {};
    Log.find(query, callback);
};

module.exports.addLog = function (user, logDescription, logType, content, callback) {
    let newLog = new Log({
        time: new Date().getTime(),
        username: user.username,
        logDescription: logDescription,
        logType: logType,
        content: content
    });
    newLog.save(callback);
};