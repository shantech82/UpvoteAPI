var fs = require('fs');
var multer = require('multer');
var path = require('path');
var db = require('./dbconfig');

module.exports = {
  uploadCompanyLogo: uploadCompanyLogo,
  getCompanyLogo: getCompanyLogo,
  deleteFile: deleteFile,
  getAllFiles: getAllFiles,
  uploadFiles: uploadFiles,
  generateFiles: generateFiles,
  test: test
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
  if (!fs.existsSync(uploadfolderpath)) {
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

function test(req, res, next) {
  console.log(req.query);
  res.send(JSON.stringify(req.body));
}

function uploadFiles(req, res, next) {
  var uploadfolderpath = path.join(__dirname, 'uploads/')
  if (!fs.existsSync(uploadfolderpath)) {
    fs.mkdirSync(uploadfolderpath);
  }
  upload(req, res, function (err) {
    if (err) {
      res.json({ error_code: 1, nperr_desc: err });
    } else {
      var filepath = path.join(__dirname, 'uploads/' + req.file.originalname);
      fs.readFile(filepath, function (err, data) {
        var fileobject = {
          filename: req.file.originalname,
          file: data
        }
        if (req.query.existingfilename !== undefined) {
          db.none('delete from uploadfiles where filename = $1', req.query.existingfilename).then(function () {
            var filedirpath = path.join(__dirname, 'uploads/')
            filepath = filedirpath + req.query.existingfilename
            if (fs.existsSync(filepath)) {
              fs.unlinkSync(filepath);
            }
            db.none('INSERT INTO uploadfiles(filename, file) VALUES(${filename},${file})', fileobject)
              .then(function () {
                res.status(200)
                  .json({
                    filename: req.file.originalname
                  });
              })
              .catch(function (err) {
                return next(err);
              });
          });
        }
      });
    }
    // res.send(req.file.originalname);
  });
}

function getCompanyLogo(req, res, next) {
  var logoPath = path.join(__dirname, 'uploads/')
  res.sendFile(logoPath + req.query.filename);
}

function generateFiles(req, res, next) {
  var filedirpath = path.join(__dirname, 'uploads/')
  if (!fs.existsSync(filedirpath)) {
    fs.mkdirSync(filedirpath);
  }
  filepath = filedirpath + req.query.filename
  if (fs.existsSync(filepath)) {
    res.status(200)
      .json({
        status: true
      });
  } else {
    db.any('select * from uploadfiles where filename = $1', req.query.filename).
      then(function (data) {
        if (data.length > 0) {
          fs.writeFileSync(filepath, data[0].file);
          res.status(200)
            .json({
              status: true
            });
        } else {
          res.status(200)
            .json({
              status: false
            });
        }
      });
  }
}

function getAllFiles(req, res, next) {
  var filedirpath = path.join(__dirname, 'uploads/')
  var images = fs.readdirSync(filedirpath);
  res.json(images);
}

function deleteFile(req, res, next) {
  var imageDirPath = path.join(__dirname, 'uploads/')
  imagePath = imageDirPath + req.query.filename
  if (fs.existsSync(imagePath)) {
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

