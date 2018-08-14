var express = require('express');
var router = express.Router();

var db = require('../dbconfig');
var us = require('../icouserprofile');
var sp = require('../securepassword')
var email = require('../email')
var md = require('../masterdata')
var ico = require('../ICOs')
var fu = require('../fileupload');
var cv = require('../companyvideo');
var ls = require('../livestream');

router.get('/api/Registrations',us.getAllIcoUserProfiles);
router.get('/api/Registration/:id',us.getSingleIcoUserProfile);
router.post('/api/SaveRegistration',us.postIcoUserProfile);
router.get('/api/getRegistrationemail',us.getIcoUserProfileemail);
router.get('/api/getEncryptPassword',sp.getEncryptPassword);
router.get('/api/getVerifyPassword',sp.getVerifyPassword);
router.get('/api/getUserSignIn',us.getUserSignIn);
router.post('/api/sendActivateMail',email.sendActivateMail);
router.put('/api/putUserActivate',us.putUserActivate);
router.put('/api/createICOProfile',us.putIcoUserProfile);
router.delete('/api/Registration/:id',us.deleteUserProfile);
router.get('/api/InvestorICOs/:id',us.getUserProfileWithICOs);

//master data APIs
router.get('/api/getCities',md.getCities);
router.get('/api/getStates',md.getStates);
router.get('/api/getCountries',md.getCountries);
router.get('/api/getAllCountries',md.getAllCountries);
router.get('/api/getStateCountry',md.getStateCountry);
router.get('/api/getNoOfInvestment',md.getAverageNoOfInvestment);
router.get('/api/getICOCategory',md.getICOCategory);

//company APIs
router.get('/api/getAllICOs',ico.getAllICOs);
router.get('/api/getICO/:id',ico.getICO);
router.post('/api/createICO',ico.postIco);
router.put('/api/updateICO',ico.putIco);
router.delete('/api/deleteICO/:id',ico.deleteICO);
router.get('/api/getInsertedICO',ico.getInsertedICO);

//image log
router.post('/api/uploadCompanyLogo',fu.uploadCompanyLogo);
router.get('/api/getCompanyLogo',fu.getCompanyLogo);
router.delete('/api/deleteFile',fu.deleteFile);

//company videos APIs
router.get('/api/getAllVidoes',cv.getAllVidoes);
router.get('/api/getVideobyID/:id',cv.getVideobyID);
router.get('/api/getVidoesByCompany/:id',cv.getVidoesByCompany);
router.post('/api/createCompanyvideo',cv.createCompanyvideo);
router.get('/api/getVideoByUrl/',cv.getVideoByUrl);
router.delete('/api/deleteVideobyID/:id',cv.deleteVideobyID);

//livestream
router.post('/api/ScheduleLiveStream',ls.ScheduleLiveStream);
router.put('/api/UpdateLiveStream',ls.UpdateLiveStream);
router.put('/api/UpdateStatusLiveStream',ls.UpdateStatusLiveStream);
router.get('/api/getLiveStream',ls.getLiveStream);
router.delete('/api/deleteLiveStream/:id',ls.deleteLiveStream);
module.exports = router;