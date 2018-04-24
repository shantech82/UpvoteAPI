var db = require('./dbconfig');
const fileUpload = require('express-fileupload');

var multer = require('multer');
var path = require('path');

module.exports = {
    uploadCompanyLogo: uploadCompanyLogo,
    getCompanyLogo: getCompanyLogo
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/companyimages/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage }).single('file');

  function uploadCompanyLogo(req,res,next){
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,nperr_desc:err});
            }
            res.send(file.originalname)
    });
  }

  function getCompanyLogo(req,res,next){
   var logoPath = path.join(__dirname, 'uploads/companyimages/')
    res.sendFile(logoPath + req.query.filename);
  }

 