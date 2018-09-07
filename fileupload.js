var fs = require('fs');
var multer = require('multer');
var path = require('path');

module.exports = {
  uploadCompanyLogo: uploadCompanyLogo,
  getCompanyLogo: getCompanyLogo,
  deleteFile: deleteFile,
  getAllFiles: getAllFiles
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage }).single('file');

function uploadCompanyLogo(req, res, next) {
  var uploadfolderpath = path.join(__dirname, 'uploads/')
  if (!fs.existsSync(uploadfolderpath)){
    fs.mkdirSync(uploadfolderpath);
}

  upload(req, res, function (err) {
    if (err) {
      res.json({ error_code: 1, nperr_desc: err });
    } else {
      res.json(req.file.originalname)
    }
  });
}

function getCompanyLogo(req, res, next) {
  var logoPath = path.join(__dirname, 'uploads/')
  res.sendFile(logoPath + req.query.filename);
}


function getAllFiles(req, res, next) {
  var filedirpath = path.join(__dirname, 'uploads/')
  var images = fs.readdirSync(filedirpath);
  res.json(images);
}

function deleteFile(req, res, next) {
  var imageDirPath = path.join(__dirname, 'uploads/')
  imagePath = imageDirPath + req.query.filename
  if(fs.existsSync(imagePath)) {
    fs.unlink(imagePath, (err) => {
      next(err);
    });
    res.status(200)
      .json({
        message: 'file deleted',
      })
  } else {
    res.status(200)
      .json({
        message: 'file not found',
      })
  }
}

