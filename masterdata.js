
var db = require('./dbconfig');

module.exports = {
    getCities:getCities,
    getStates:getStates,
    getCountries:getCountries,
    getAllCountries:getAllCountries,
    getStateCountry:getStateCountry
}

function getCities(req,res,next){
    db.any('select c.id,  c.name as cityname, s.name as statename, c.state_id from cities c inner join states s on c.state_id = s.id where c.name ilike $1',req.query.city)
    .then(function(data){
        res.status(200)
        .json({
            status:'success',
            data : data,
            message : 'getting the city'
        });
    })
    .catch(function(err){
        return next(err);
    });
}

function getStateCountry(req,res,next){
    var cityid = parseInt(req.query.cityid);
    db.any('select s.id as stateid,s.name as statename,c.id as countryid,c.name as countryname from states s inner join countries c on c.id = s.country_id inner join cities ci on ci.state_id = s.id  where ci.id = $1',req.query.cityid)
    .then(function(data){
        res.status(200)
        .json({
            status:'success',
            data : data,
            message : 'getting the city'
        });
    })
    .catch(function(err){
        return next(err);
    });
}

function getStates(req,res,next){
    var stateid = parseInt(req.query.stateid);
    
    db.one('select * from states where id = $1',stateid)
    .then(function(data){
        res.status(200)
        .json({
            status:'success',
            data : data,
            message : 'getting the state'
        });
    })
    .catch(function(err){
        return next(err);
    });
}

function getCountries(req,res,next){
    var countryid = parseInt(req.query.countryid);
    db.one('select * from countries where id = $1',countryid)
    .then(function(data){
        res.status(200)
        .json({
            status:'success',
            data : data,
            message : 'getting the country'
        });
    })
    .catch(function(err){
        return next(err);
    });
}

function getAllCountries(req,res,next){
    db.any('select * from countries')
    .then(function(data){
        res.status(200)
        .json({
            status:'success',
            data : data,
            message : 'getting the country'
        });
    })
    .catch(function(err){
        return next(err);
    });
}