var db = require('./dbconfig');


module.exports = {
    getAllCompany:getAllCompany,
    getCompanybyID:getCompanybyID,
    getCompanybyName:getCompanybyName,
    createCompany:createCompany,
}

function getAllCompany(req,res,next){
    db.any('select * from company')
    .then(function(data){
        res.status(200)
        .json({
            status : 'success',
            data : data,
            message:"all company details received"
        });
    })
    .catch(function(err){
        return next(err);
    });
}

function getCompanybyID(req,res,next){
    var companyid = parseInt(req.params.id);
    db.one('select * from company where id = $1',companyid)
    .then(function(data){
        res.status(200)
        .json({
            status:'success',
            data : data,
            message : 'single company success'
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
                status:'1',
                companydata : data,
                message : 'getting company based on name'
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

    let query = 'insert into company(companyname,email,phonenumber,aboutcomapny,whitepapaer,website,address1,address2,city_id,state_id,country_id,zip_code) values(${companyname},${email},${phonenumber},${aboutcomapny},${whitepapaer},${website},${address1},${address2},${city_id},${state_id},${country_id},${zip_code})'
    
    db.none(query,req.body)
      .then(function () {
        db.any("SELECT * FROM company WHERE companyname = $1",req.body.companyname)
            .then(function(data){
                res.status(200)
                .json({
                  status: 'success',
                  companydata : data,
                  message: 'Inserted one record'
                });
            });
      })
      .catch(function (err) {
        return next(err);
      });
}


