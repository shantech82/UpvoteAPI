var db = require('./dbconfig');
const fileUpload = require('express-fileupload');
var fs = require('fs');

var multer = require('multer');
var path = require('path');

module.exports = {
    uploadCompanyLogo: uploadCompanyLogo,
    getCompanyLogo: getCompanyLogo,
    deleteFile: deleteFile
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
            res.json(req.file.originalname)
    });
  }

  function getCompanyLogo(req,res,next){
   var logoPath = path.join(__dirname, 'uploads/companyimages/')
    res.sendFile(logoPath + req.query.filename);
  }

  function deleteFile(req,res,next){
    var imageDirPath = path.join(__dirname, 'uploads/companyimages/')
    imagePath = imageDirPath + req.query.filename
    fs.exists(imagePath, function(exists) {
      if(exists) {
        fs.unlink(imagePath);
        res.status(200)
                .json({
                    message: 'file deleted',
                });
      } else {
        res.status(200)
                .json({
                    message: 'file not found',
                });
      }
    });
  }

 