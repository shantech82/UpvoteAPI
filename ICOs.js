var db = require('./dbconfig');


module.exports = {
    getAllICOs: getAllICOs,
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

function getCompanybyName(req,res,next){
    db.any("select * from company where companyname ilike ${companyname} or email ilike ${email}",req.query)
    .then(function(data){
        if(data.length > 0)
        {
            res.status(200)
            .json({
                companydata : data,
            });
        }
        else
        {
            res.status(200)
            .json({
                status:'0',
                message : 'No records based on name'
            });
        }
    })
    .catch(function(err){
        return next(err);
    });
}

function createCompany(req, res, next) {

    req.body.city_id = parseInt(req.body.city_id);
    req.body.state_id = parseInt(req.body.state_id);
    req.body.country_id = parseInt(req.body.country_id);
    req.body.userid = parseInt(req.body.userid);

    let query = 'insert into company(companyname,email,phonenumber,aboutcomapny,whitepapaer,website,address1,address2,city_id,state_id,country_id,zip_code,userid,imagename) values(${companyname},${email},${phonenumber},${aboutcomapny},${whitepapaer},${website},${address1},${address2},${city_id},${state_id},${country_id},${zip_code},${userid},${imagename})'
    
    db.none(query,req.body)
      .then(function () {
        db.one("select id from company where companyname ilike ${companyname} or email ilike ${email}",req.body)
            .then(function(data){
                res.status(200)
                .json({
                  companydata : data,
                });
            });
      })
      .catch(function (err) {
        return next(err);
      });
}


