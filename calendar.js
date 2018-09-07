var fs = require('fs');
const ics = require('ics')
var path = require('path');


module.exports = {
    createEvent: createEvent,
}

function createEvent(req, res, next) {
    
    var icsfolder = path.join(__dirname, 'uploads/companyimages/')
    var icsname = req.body.title + '_event.ics';
    var icsPath = icsfolder + icsname;

    //create the event
    const startdate = new Date(req.body.startdate);
    ics.createEvent({
        title: req.body.title,
        description: req.body.title,
        start: [startdate.getFullYear(), startdate.getMonth() + 1, startdate.getDate(), req.body.hours, req.body.minutes],
        duration: { hours: 2 }
    }, (error, value) => {
        if (error) {
            return next(error);
        }
        fs.writeFileSync(icsPath, value)
    })
    res.json(icsname);
}
