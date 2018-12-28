module.exports.type = function(requiredType){
    return function(req, res, next){
        if(req.user.accountType.indexOf(requiredType) > -1 ||req.user.accountType === 'admin'){
            return next();
        }
        res.json({error: 'require higher permission'});
        return next('Unauthorized');
    }
};
module.exports.level = function(level){
    return function(req, res, next){
        if(req.user.accountLevel >= level){
            return next();
        }
        res.json({error: 'require higher permission'});
        return next('Unauthorized');
    }
};