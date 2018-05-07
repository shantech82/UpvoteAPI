var db = require('./dbconfig');


module.exports = {
    getAllCompany:getAllCompany,
    getCompanybyID:getCompanybyID,
    getCompanybyName:getCompanybyName,
    createCompany:createCompany,
    getCompanyIDByUser:getCompanyIDByUser,
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
    db.one('select co.id,co.companyname,co.email, co.phonenumber,co.aboutcomapny,co.whitepapaer,co.website,co.address1,co.address2,co.userid,co.imagename, c.name as cityname, s.name as statename, cn.name as countryname,co.zip_code from company co inner join cities c on co.city_id = c.id    inner join states s on s.id = co.state_id inner join countries cn on cn.id = co.country_id where co.id =  $1',companyid)
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

function getCompanyIDByUser(req,res,next){
    var userid = parseInt(req.params.id);
    db.any('select id from company where userid =  $1',userid)
    .then(function(data){
        res.status(200)
        .json({
            status:'success',
            data : data[0],
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
    req.body.userid = parseInt(req.body.userid);

    let query = 'insert into company(companyname,email,phonenumber,aboutcomapny,whitepapaer,website,address1,address2,city_id,state_id,country_id,zip_code,userid,imagename) values(${companyname},${email},${phonenumber},${aboutcomapny},${whitepapaer},${website},${address1},${address2},${city_id},${state_id},${country_id},${zip_code},${userid},${imagename})'
    
    db.none(query,req.body)
      .then(function () {
        db.one("select id from company where companyname ilike ${companyname} or email ilike ${email}",req.body)
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


