
var db = require('./dbconfig');
var sp = require('./securepassword');
var fs = require('fs');

module.exports = {
    getAllIcoUserProfiles: getAllIcoUserProfiles,
    getSingleIcoUserProfile: getSingleIcoUserProfile,
    postIcoUserProfile: postIcoUserProfile,
    getIcoUserProfileemail: getIcoUserProfileemail,
    getUserSignIn: getUserSignIn,
    putUserActivate: putUserActivate,
    putIcoUserProfile: putIcoUserProfile,
    deleteUserProfile: deleteUserProfile,
    getUserProfileWithICOs: getUserProfileWithICOs,
    getOwnICOs: getOwnICOs,
    putChangePassword: putChangePassword,
    putActivateKey: putActivateKey,
    putUserProfileImage: putUserProfileImage
}

function assignData(data) {
    let userData = {
        name: data.name,
        email: data.email,
        activatekey: data.activatekey,
        isinvestor: data.isinvestor,
        profileimageurl: data.profileimageurl,
        location: data.location,
        bio: data.bio,
        investmentfocus: data.investmentfocus,
        averagenoofinvestment: data.averagenoofinvestment,
        averageinvestmentsizeperyear: data.averageinvestmentsizeperyear,
        id: data.id,
        isactive: data.isactive,
        title: data.title,
        ismoderator: data.ismoderator
    }

    return userData;
}

function getAllIcoUserProfiles(req, res, next) {
    db.any('select * from icouserprofile')
        .then(function (data) {
            res.status(200)
                .json({
                    data: data,
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSingleIcoUserProfile(req, res, next) {
    var userid = parseInt(req.params.id);
    db.one('select * from icouserprofile where id = $1', userid)
        .then(function (data) {
            res.status(200)
                .json({
                    data: data,
                });
        })
        .catch(function (err) {
            res.status(200)
                .json({
                    data: [],
                });
        });
}

function getUserProfileWithICOs(req, res, next) {
    var userid = parseInt(req.params.id);
    db.any('select ico.id, u.name, u.title, u.location,u.bio,u.isinvestor, u. profileimageurl, ave.value averageinvestmentsizeperyear, ' +
        'ico.iconame, ico.icologoimage,ico.shortdescription icoshortdescription,ii.createdon icocreatedon, ico.iswhitelistjoined, ' +
        'il.livestreamdate icolivestreamData from icouserprofile u ' +
        'left join averagenoofinvestment ave ' +
        'on ave.id = u.averageinvestmentsizeperyear ' +
        'left join investoricos ii ' +
        'on ii.investorid = u.id ' +
        'left join icos ico ' +
        'on ico.id = ii.icocompanyid ' +
        'left join ICOsLiveStream il ' +
        'on il.icosid = ico.id ' +
        'where u.id =  $1', userid)
        .then(function (data) {
            res.status(200)
                .json({
                    data: data,
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getOwnICOs(req, res, next) {
    var userid = parseInt(req.params.id);
    db.any('select ico.id, ico.iconame, ico.icologoimage,ico.shortdescription icoshortdescription, ico.iswhitelistjoined, ' +
        'ico.createdon, ico.userid, il.livestreamdate icolivestreamData, il.livestreamcode, ' +
        'il.time, il.livestreamstatus from icos ico left join ICOsLiveStream il on il.icosid = ico.id where ico.userid =  $1', userid)
        .then(function (data) {
            res.status(200)
                .json({
                    data: data,
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getIcoUserProfileemail(req, res, next) {
    var email = req.query.email;
    db.any("SELECT * FROM icouserprofile WHERE email = $1", req.query.email)
        .then(function (data) {
            if (data.length > 0) {
                res.status(200)
                    .json({
                        userData: assignData(data[0]),
                    });
            }
            else {
                res.status(200)
                    .json({
                        userData: undefined
                    });
            }

        })
        .catch(function (err) {
            return next(err);
        });
}

function getUserSignIn(req, res, next) {
    var userData = db.any("SELECT * FROM icouserprofile WHERE email = $1", req.query.email)
        .then(function (data) {
            if (data.length > 0 && sp.PasswordCheck(req.query.password, data[0].password) && data[0].isactive === true) {
                res.status(200)
                    .json({
                        userData: assignData(data[0]),
                        status: true,
                        message: '',
                    });
            }
            else {
                res.status(200)
                    .json({
                        userData: null,
                        status: false,
                        message: 'Please provide valid username & password or you are not active in this system',
                    });
            }
        })
        .catch(function (err) {
            return next(err);
        });
}

function putUserActivate(req, res, next) {
    var userData = db.any("SELECT * FROM icouserprofile WHERE email = $1", req.query.email)
        .then(function (data) {
            if (data.length > 0 && data[0].activatekey === req.query.activatekey) {
                db.none("update icouserprofile set isactive = true where id = $1", data[0].id)
                    .then(function (data) {
                        res.status(200)
                            .json({
                                status: 'success',
                                message: true,
                            });
                    });
            }
            else {
                res.status(200)
                    .json({
                        status: 'activate key is invalid',
                        message: false,
                    });
            }
        })
        .catch(function (err) {
            return next(err);
        });
}

function putChangePassword(req, res, next) {
    req.body.password = sp.EncryptPassword(req.body.password);
    db.any("SELECT * FROM icouserprofile WHERE email = $1", req.body.email)
        .then(function (data) {
            if (data.length > 0 && data[0].activatekey === req.body.activatekey) {
                let query = "update icouserprofile set isactive = true, password = ${password} where id = ${id}"
                db.none(query, req.body)
                    .then(function (data) {
                        res.status(200)
                            .json({
                                status: 'success',
                                message: true,
                            });
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }
            else {
                res.status(200)
                    .json({
                        status: 'activate key is invalid',
                        message: false,
                    });
            }
        })
        .catch(function (err) {
            return next(err);
        });
}

function putActivateKey(req, res, next) {
    let query = "update icouserprofile set isactive = false, activatekey = ${activatekey} where id = ${id}"
    db.none(query, req.body)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    message: true,
                })

                .catch(function (err) {
                    return next(err);
                });
        });
}


function putUserProfileImage(req, res, next) {
    let query = "update icouserprofile set profileimageurl = ${profileimageurl} where id = ${id}"
    db.none(query, req.body)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    message: true,
                })

                .catch(function (err) {
                    return next(err);
                });
        });
}

function postIcoUserProfile(req, res, next) {
    req.body.password = sp.EncryptPassword(req.body.password);

    let query = 'insert into icouserprofile(name,email,password,isinvestor,activatekey,isactive,createdon,profileimageurl,ismoderator) values (${name}, ${email}, ${password},${isinvestor}, ${activatekey}, ${isactive}, ${createdon}, ${profileimageurl}, ${ismoderator})';
    db.none(query, req.body)
        .then(function () {
            db.any("SELECT * FROM icouserprofile WHERE email = $1", req.body.email)
                .then(function (data) {
                    res.status(200)
                        .json({
                            userData: assignData(data[0]),
                        });
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function putIcoUserProfile(req, res, next) {
    var userData = db.any("SELECT * FROM icouserprofile WHERE email = $1", req.body.email)
        .then(function (data) {
            if (data.length > 0) {
                let query = 'update icouserprofile set isinvestor = ${isinvestor},profileimageurl = ${profileimageurl},location = ${location},bio = ${bio},investmentfocus = ${investmentfocus},averagenoofinvestment = ${averagenoofinvestment},averageinvestmentsizeperyear = ${averageinvestmentsizeperyear},title = ${title},ismoderator = ${ismoderator} where id =  ${id}'
                db.none(query, req.body)
                    .then(function () {
                        db.any("SELECT * FROM icouserprofile WHERE email = $1", req.body.email)
                            .then(function (data) {
                                res.status(200)
                                    .json({
                                        userData: assignData(data[0]),
                                    });
                            });
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }
            else {
                res.status(200)
                    .json({
                        status: 'fail',
                        message: 'no profile updated',
                        data: req.body
                    });
            }
        });
}

function deleteUserProfile(req, res, next) {
    var userid = parseInt(req.params.id);
    db.one('select * from icouserprofile where id = $1', userid)
        .then(function (userdata) {
            if (userdata.profileimageurl && userdata.profileimageurl.indexOf('http') === -1) {
                db.none('delete from uploadfiles where filename = $1', userdata.profileimageurl);
                var imageDirPath = path.join(__dirname, 'uploads/')
                imagePath = imageDirPath + userdata.profileimageurl
                if (fs.existsSync(imagePath)) {
                    fs.unlink(imagePath, (err) => {
                        next(err);
                    });
                }
            }
            db.none('delete from icouserprofile where id = $1', userid)
                .then(() => {
                    res.status(200)
                    .json({
                        data: 'deleted',
                    });
                })
        })
        .catch(function (err) {
            return next(err);
        });
}


