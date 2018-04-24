var secpass = require('password-hash');


module.exports = {
    getEncryptPassword:getEncryptPassword,
    getVerifyPassword:getVerifyPassword,

    EncryptPassword: function(password){
        return secpass.generate(password);
    },

    PasswordCheck: function(password,encryptpassword){
        return secpass.verify(password,encryptpassword);
    }
}

function getEncryptPassword(req,res,next){
    res.send(secpass.generate(req.query.password))
}



function getVerifyPassword(req,res,next){
    res.send(secpass.verify(req.query.password,req.query.encryptPassword))
}
