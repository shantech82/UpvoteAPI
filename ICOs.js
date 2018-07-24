var db = require('./dbconfig');


module.exports = {
    getAllICOs: getAllICOs,
    getICO: getICO,
    postIco: postIco,
    putIco: putIco,
    deleteICO: deleteICO
}

function getAllICOs(req,res,next){
    db.any('select ico.id, ico.iconame, ico.icologoimage,ico.shortdescription icoshortdescription, ico.iswhitelistjoined, '+
    'ico.createdon, il.livestreamdate icolivestreamData from icos ico left join ICOsLiveStream il on il.icosid = ico.id')
    .then(function(data){
        res.status(200)
        .json({
            companydata : data,
        });
    })
    .catch(function(err){
        return next(err);
    });
}

function getICO(req, res, next) {
    var icoid = parseInt(req.params.id);
    db.any('select ico.id,ico.iconame,ico.icologoimage,ico.smn_twitter,ico.smn_facebook,ico.smn_google,ico.smn_reddit, '+ 
    'ico.smn_bitcointalk, ico.smn_github,ico.smn_others, ico.email, ico.address, ico.city,ico.country,ico.amountraising,ico.website, '+ 
    'ico.whitepaper,ico.shortdescription,ico.productlink,ico.videouploadurl, ico.icostartdate,ico.icoenddate,ico.icocategoryid, '+ 
    'ico.linktoboundry,ico.tokcenname,ico.tokeytype,ico.pricepertoken,ico.iswhitelistjoined,ico.createdon,ico.smn_youtube,smn_linkedin, '+ 
    'ico.phone_number,ico.long_description,il.livestreamdate icolivestreamDate from icos ico '+ 
    'left join ICOsLiveStream il on il.icosid = ico.id where ico.id = $1', icoid)
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

function postIco (req, res, next) {
    let query = 'insert into icos (iconame,icologoimage,smn_twitter,smn_facebook,smn_google,smn_reddit,smn_bitcointalk,smn_github, '+
        'smn_others,email,city,country,amountraising,website,whitepaper,shortdescription, address,'+
        'productlink,videouploadurl,icostartdate,icoenddate,icocategoryid,linktoboundry,tokcenname,tokeytype, '+
        'pricepertoken,iswhitelistjoined,createdon,smn_youtube,phone_number,long_description,smn_linkedin)  '+
        'values (${iconame}, ${icologoimage}, ${smn_twitter},${smn_facebook}, ${smn_google}, ${smn_reddit}, ${smn_bitcointalk}, ${smn_github}, '+
        '${smn_others}, ${email}, ${city},${country}, ${amountraising}, ${website}, ${whitepaper}, ${shortdescription}, ${address},'+
        '${productlink}, ${videouploadurl}, ${icostartdate},${icoenddate}, ${icocategoryid}, ${linktoboundry}, ${tokcenname}, ${tokeytype}, '+
        '${pricepertoken}, ${iswhitelistjoined}, ${createdon},${smn_youtube}, ${phone_number}, ${long_description},${smn_linkedin})';
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

function putIco(req, res, next) {
    var userData = db.any("SELECT * FROM icos WHERE id = $1", req.body.id)
        .then(function (data) {
            if (data.length > 0) {
                let query = 'update icos set iconame = ${iconame},icologoimage = ${icologoimage},smn_twitter = ${smn_twitter}, '+
                 'smn_facebook = ${smn_facebook},smn_google = ${smn_google},smn_reddit = ${smn_reddit},smn_bitcointalk = ${smn_bitcointalk}, '+
                 'smn_github = ${smn_github},smn_others = ${smn_others},email = ${email}, address = ${address}, city = ${city},country = ${country}, '+
                 'amountraising = ${amountraising},website = ${website},whitepaper = ${whitepaper},shortdescription = ${shortdescription}, '+
                 'productlink = ${productlink},videouploadurl = ${videouploadurl},icostartdate = ${icostartdate},icoenddate = ${icoenddate}, '+
                 'icocategoryid = ${icocategoryid},linktoboundry = ${linktoboundry},tokcenname = ${tokcenname},tokeytype = ${tokeytype}, '+
                 'pricepertoken = ${pricepertoken},iswhitelistjoined = ${iswhitelistjoined},createdon = ${createdon},smn_youtube = ${smn_youtube}, '+
                'phone_number = ${phone_number},long_description = ${long_description}, smn_linkedin = ${smn_linkedin} where id =  ${id}'
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


