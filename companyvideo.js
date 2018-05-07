var db = require('./dbconfig');


module.exports = {
    getAllVidoes:getAllVidoes,
    getVideobyID:getVideobyID,
    getVidoesByCompany:getVidoesByCompany,
    createCompanyvideo:createCompanyvideo,
    getVideoByUrl:getVideoByUrl,
    deleteVideobyID:deleteVideobyID,
}

function getAllVidoes(req,res,next){
    db.any('select * from companyvideo')
    .then(function(data){
        res.status(200)
        .json({
            status : 'success',
            vdata : data,
            message:"all companyvideo details received"
        });
    })
    .catch(function(err){
        return next(err);
    });
}

function getVideobyID(req,res,next){
    var videoid = parseInt(req.params.id);
    db.one('select * from companyvideo where id =  $1',videoid)
    .then(function(data){
        res.status(200)
        .json({
            status:'success',
            vdata : data,
            message : 'single companyvideo success'
        });
    })
    .catch(function(err){
        return next(err);
    });
}

function deleteVideobyID(req,res,next){
    var videoid = parseInt(req.params.id);
    db.none('delete from companyvideo where id = $1',videoid)
    .then(function(data){
        res.status(200)
        .json({
            status:'success',
            message : 'delete companyvideo success'
        });
    })
    .catch(function(err){
        return next(err);
    });
}

function getVideoByUrl(req,res,next){
    db.any("select * from companyvideo where vidoeurl =  ${vidoeurl}",req.query)
    .then(function(data){
        if(data.length > 0)
        {
            res.status(200)
            .json({
                status:'1',
                vdata : data,
                message : 'getting video based on videourl'
            });
        }
        else
        {
            res.status(200)
            .json({
                status:'0',
                message : 'No records based on vidoeurl'
            });
        }
    })
    .catch(function(err){
        return next(err);
    });
}


function getVidoesByCompany(req,res,next){
    var company_id = parseInt(req.params.id);
    db.any("select id,name,vidoeurl,CASE WHEN live='1' THEN 'Yes' ELSE 'No' END as live from companyvideo where company_id =  $1",company_id)
    .then(function(data){
        res.status(200)
        .json({
            status:'success',
            vdata : data,
            message : 'single companyvideo success'
        });
    })
    .catch(function(err){
        return next(err);
    });
}

function createCompanyvideo(req, res, next) {

    req.body.company_id = parseInt(req.body.company_id);

    let query = 'insert into companyvideo(name,company_id,live,vidoeurl) values(${name},${company_id},${live},${vidoeurl})'

    
    if(req.body.live == '1'){
        db.none("update companyvideo set live = '0' where company_id = $1",req.body.company_id)
        .then(function () {
            db.none(query,req.body)
            .then(function () {
              res.status(200)
              .json({
                  status: 'success',
                  message: 'Inserted one record'
              });
            })
            .catch(function (err) {
              return next(err);
            });
        });
    }
    else{
        db.none(query,req.body)
        .then(function () {
            res.status(200)
            .json({
                status: 'success',
                message: 'Inserted one record'
            });
        })
        .catch(function (err) {
            return next(err);
        });
    }
}


