var db = require('./dbconfig');


module.exports = {
    getAllICOs: getAllICOs,
    getICO: getICO,
    postIco: postIco,
    putIco: putIco,
    deleteICO: deleteICO,
    getInsertedICO: getInsertedICO,
    getInsertedICOByName: getInsertedICOByName
}

function getAllICOs(req, res, next) {
    db.any('select ico.id, ico.iconame, ico.icologoimage,ico.shortdescription icoshortdescription, ico.iswhitelistjoined, ' +
        'ico.createdon, ico.userid, ico.videouploadurl, ico.youtubevideolink, il.livestreamdate icolivestreamData, il.livestreamcode, ' +
        'il.time, il.livestreamstatus from icos ico left join ICOsLiveStream il on il.icosid = ico.id')
        .then(function (data) {
            res.status(200)
                .json({
                    companydata: data,
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getICO(req, res, next) {
    db.any('select ico.id,ico.iconame,ico.icologoimage,ico.smn_twitter,ico.smn_facebook,ico.smn_google,ico.smn_reddit, ' +
        'ico.smn_bitcointalk, ico.smn_github,ico.smn_others, ico.email, ico.address, ico.city,ico.country,ico.amountraising,ico.website, ' +
        'ico.whitepaper,ico.shortdescription,ico.productlink,ico.videouploadurl, ico.icostartdate,ico.icoenddate,ico.icocategoryid, ' +
        'ico.linktoboundry,ico.tokcenname,ico.tokeytype,ico.pricepertoken,ico.iswhitelistjoined,ico.createdon,ico.smn_youtube,smn_linkedin, ' +
        'ico.phone_number,ico.long_description,ico.userid,ico.youtubevideolink,il.livestreamdate icolivestreamDate,il.livestreamcode livestreamcode, ' +
        'il.time, il.livestreamstatus from icos ico left join ICOsLiveStream il on il.icosid = ico.id where ico.iconame = ${iconame}', req.query)
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

function getInsertedICO(req, res, next) {
    db.any('select id from icos where iconame = ${iconame} and icostartdate = ${icostartdate}' +
        'and icoenddate = ${icoenddate} and tokcenname = ${tokcenname}', req.query)
        .then(function (data) {
            res.status(200)
                .json({
                    data: data[0],
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getInsertedICOByName(req, res, next) {
    db.any('select id from icos where iconame = ${iconame}', req.query)
        .then(function (data) {
            res.status(200)
                .json({
                    data: data[0],
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function postIco(req, res, next) {
    db.any("SELECT * FROM icos WHERE iconame = $1", req.body.iconame).
        then(function (data) {
            if (data.length > 0) {
                res.status(200)
                    .json({
                        message: "dublicate",
                    });
            } else {
                let query = 'insert into icos (iconame,icologoimage,smn_twitter,smn_facebook,smn_google,smn_reddit,smn_bitcointalk,smn_github, ' +
                    'smn_others,email,city,country,amountraising,website,whitepaper,shortdescription, address,' +
                    'productlink,videouploadurl,icostartdate,icoenddate,icocategoryid,linktoboundry,tokcenname,tokeytype, ' +
                    'pricepertoken,iswhitelistjoined,createdon,smn_youtube,phone_number,long_description,smn_linkedin,userid,youtubevideolink)  ' +
                    'values (${iconame}, ${icologoimage}, ${smn_twitter},${smn_facebook}, ${smn_google}, ${smn_reddit}, ${smn_bitcointalk}, ${smn_github}, ' +
                    '${smn_others}, ${email}, ${city},${country}, ${amountraising}, ${website}, ${whitepaper}, ${shortdescription}, ${address},' +
                    '${productlink}, ${videouploadurl}, ${icostartdate},${icoenddate}, ${icocategoryid}, ${linktoboundry}, ${tokcenname}, ${tokeytype}, ' +
                    '${pricepertoken}, ${iswhitelistjoined}, ${createdon},${smn_youtube}, ${phone_number}, ${long_description},${smn_linkedin},${userid},${youtubevideolink})';
                db.none(query, req.body)
                    .then(function () {
                        res.status(200)
                            .json({
                                message: "Inserted",
                            });
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }
        });
}

function putIco(req, res, next) {
    db.any("SELECT * FROM icos WHERE iconame = $1", req.body.iconame).
        then(function (data) {
            if (data.length > 1 || (data.length === 1 && data[0].id !== parseInt(req.body.id))) {
                res.status(200)
                    .json({
                        message: "dublicate",
                    });
            }
            else {
                let query = 'update icos set iconame = ${iconame},icologoimage = ${icologoimage},smn_twitter = ${smn_twitter}, ' +
                    'smn_facebook = ${smn_facebook},smn_google = ${smn_google},smn_reddit = ${smn_reddit},smn_bitcointalk = ${smn_bitcointalk}, ' +
                    'smn_github = ${smn_github},smn_others = ${smn_others},email = ${email}, address = ${address}, city = ${city},country = ${country}, ' +
                    'amountraising = ${amountraising},website = ${website},whitepaper = ${whitepaper},shortdescription = ${shortdescription}, ' +
                    'productlink = ${productlink},videouploadurl = ${videouploadurl},icostartdate = ${icostartdate},icoenddate = ${icoenddate}, ' +
                    'icocategoryid = ${icocategoryid},linktoboundry = ${linktoboundry},tokcenname = ${tokcenname},tokeytype = ${tokeytype}, ' +
                    'pricepertoken = ${pricepertoken},iswhitelistjoined = ${iswhitelistjoined},createdon = ${createdon},smn_youtube = ${smn_youtube}, ' +
                    'phone_number = ${phone_number},long_description = ${long_description},smn_linkedin = ${smn_linkedin},userid = ${userid}, youtubevideolink = ${youtubevideolink} ' +
                    'where id =  ${id}'
                db.none(query, req.body)
                    .then(function () {
                        db.any("SELECT * FROM icos WHERE id = $1", req.body.id)
                            .then(function (data) {
                                res.status(200)
                                    .json({
                                        message: "udpated",
                                    });
                            });
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }
        });
}

function deleteICO(req, res, next) {
    var icoid = parseInt(req.params.id);
    db.none('delete from icos where id = $1', icoid)
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



