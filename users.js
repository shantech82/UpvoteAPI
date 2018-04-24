
var db = require('./dbconfig');
var sp = require('./securepassword');

module.exports = {
    getAllRegistrations:getAllRegistrations,
    getSingleRegistration:getSingleRegistration,
    createRegistration:createRegistration,
    getRegistrationemail:getRegistrationemail,
    getUserSignIn:getUserSignIn,
    putUserActivate:putUserActivate,
}

function assignData(data){
    let userData = {
        id: data.id,
        name: data.name,
        email: data.email,
        activatekey: data.activatekey
    }
    return userData;
}

function getAllRegistrations(req,res,next){
    db.any('select * from userregistration')
    .then(function(data){
        res.status(200)
        .json({
            status : 'success',
            data : data,
            message:"user registration received"
        });
    })
    .catch(function(err){
        return next(err);
    });
}

function getSingleRegistration(req,res,next){
    var userid = parseInt(req.params.id);
    db.one('select * from userregistration where id = $1',userid)
    .then(function(data){
        res.status(200)
        .json({
            status:'success',
            data : data,
            message : 'single user success'
        });
    })
    .catch(function(err){
        return next(err);
    });
}

function getRegistrationemail(req,res,next){
   var email = req.query.email;
    db.any("SELECT * FROM userregistration WHERE email = $1",req.query.email)
    .then(function(data){
        if(data.length > 0)
        {
            res.status(200)
            .json({
                status:'1',
                userData : assignData(data[0]),
                message : 'getting users based on email'
            });
        }
        else
        {
            res.status(200)
            .json({
                status:'0',
                message : 'No records based on email'
            });
        }
    })
    .catch(function(err){
        return next(err);
    });
}

function getUserSignIn(req,res,next){
    var userData = db.any("SELECT * FROM userregistration WHERE email = $1",req.query.email)
    .then(function(data){
        if(data.length > 0 && sp.PasswordCheck(req.query.password,data[0].password) && data[0].isactive === true)
        {
            res.status(200)
            .json({
                status:'success',
                message: 'User signin Success',
                userData : assignData(data[0]),
            });
        }
        else
        {
            res.status(200)
            .json({
                status:'fail',
                message : 'Please provide valie username & password or you are not active in this system',
                data: data
            });   
        }
    })
    .catch(function(err){
        return next(err);
    });
 }

 function putUserActivate(req,res,next){
    var userData = db.any("SELECT * FROM userregistration WHERE email = $1",req.query.email)
    .then(function(data){
        if(data.length > 0 && data[0].activatekey === req.query.activatekey)
        {
            db.none("update userregistration set isactive = true where id = $1",data[0].id)
                .then(function(data){
                    res.status(200)
                    .json({
                        status:'success',
                        message: true,
                    });
                });
        }
        else
        {
            res.status(200)
            .json({
                status:'fail',
                message : 'activate key is invalid',
            });   
        }
    })
    .catch(function(err){
        return next(err);
    });
 }

function createRegistration(req, res, next) {

    req.body.password = sp.EncryptPassword(req.body.password);

    let query = 'insert into userregistration(name,email,password,aboutyourself,activatekey,isactive,createdon) values (${name}, ${email}, ${password}, ${aboutyourself},${activatekey}, ${isactive}, ${createdon})';
    //let args = [req.body.name, req.body.email, encryptpass, req.body.aboutyourself,req.body.activatekey, req.body.isactive, req.body.createdon];
    db.none(query,req.body)
      .then(function () {
        db.any("SELECT * FROM userregistration WHERE email = $1",req.body.email)
            .then(function(data){
                res.status(200)
                .json({
                  status: 'success',
                  userData : assignData(data[0]),
                  message: 'Inserted one record'
                });
            });
      })
      .catch(function (err) {
        return next(err);
      });
     }

