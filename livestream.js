var db = require('./dbconfig');


module.exports = {
    ScheduleLiveStream: ScheduleLiveStream,
    UpdateLiveStream: UpdateLiveStream,
    UpdateStatusLiveStream: UpdateStatusLiveStream,
    getLiveStream: getLiveStream,
    deleteLiveStream: deleteLiveStream
}

function getLiveStream(req, res, next) {
    var icosid = parseInt(req.query.icosid);
    var today = new Date();
    let selectquery = "select * from icoslivestream where livestreamstatus <> 'completed' and icosid = $1 " +
    "and livestreamdate >= '"+ today.toLocaleDateString() +"' order by livestreamdate asc";
    db.any(selectquery, icosid)
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

function ScheduleLiveStream(req, res, next) {
    let query = 'insert into icoslivestream (icosid,livestreamdate,time,livestreamcode,livestreamstatus) ' +
        'values(${icosid},${livestreamdate},${time},${livestreamcode},${livestreamstatus})'
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

function UpdateLiveStream(req, res, next) {
    let query = 'update icoslivestream set livestreamdate = ${livestreamdate},time = ${time}, ' +
        'livestreamstatus = ${livestreamstatus} where id =  ${id} '
    db.none(query, req.body)
        .then(function () {
            res.status(200)
                .json({
                    message: "Updated",
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function UpdateStatusLiveStream(req, res, next) {
    let query = 'update icoslivestream set livestreamstatus = ${livestreamstatus} where id =  ${id} '
    db.none(query, req.body)
        .then(function () {
            res.status(200)
                .json({
                    message: "Updated",
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


function deleteLiveStream(req, res, next) {
    var userid = parseInt(req.params.id);
    db.none('delete from icoslivestream where id = $1', userid)
        .then(function (data) {
            res.status(200)
                .json({
                    data: "deleted",
                });
        })
        .catch(function (err) {
            return next(err);
        });
}