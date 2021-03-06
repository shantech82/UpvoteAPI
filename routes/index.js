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
var cal = require('../calendar');

router.get('/api/Registrations',us.getAllIcoUserProfiles);
router.get('/api/Registration/:id',us.getSingleIcoUserProfile);
router.post('/api/SaveRegistration',us.postIcoUserProfile);
router.get('/api/getRegistrationemail',us.getIcoUserProfileemail);
router.get('/api/getUserSignIn',us.getUserSignIn);
router.put('/api/putUserActivate',us.putUserActivate);
router.put('/api/createICOProfile',us.putIcoUserProfile);
router.delete('/api/Registration/:id',us.deleteUserProfile);
router.get('/api/InvestorICOs/:id',us.getUserProfileWithICOs);
router.get('/api/getOwnICOs/:id',us.getOwnICOs);
router.put('/api/putChangePassword',us.putChangePassword);
router.put('/api/putActivateKey',us.putActivateKey);
router.put('/api/putUserProfileImage',us.putUserProfileImage);

//password change
router.get('/api/getEncryptPassword',sp.getEncryptPassword);
router.get('/api/getVerifyPassword',sp.getVerifyPassword);

//Send Mail
router.post('/api/sendActivateMail',email.sendActivateMail);
router.post('/api/sendPasswordResetMail',email.sendPasswordResetMail);

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
router.get('/api/getICO',ico.getICO);
router.post('/api/createICO',ico.postIco);
router.put('/api/updateICO',ico.putIco);
router.delete('/api/deleteICO/:id',ico.deleteICO);
router.get('/api/getInsertedICO',ico.getInsertedICO);
router.get('/api/getInsertedICOByName',ico.getInsertedICOByName);

//image log
router.post('/api/uploadCompanyLogo',fu.uploadCompanyLogo);
router.get('/api/getCompanyLogo',fu.getCompanyLogo);
router.delete('/api/deleteFile',fu.deleteFile);
router.get('/api/getAllFiles',fu.getAllFiles);
router.post('/api/uploadFiles',fu.uploadFiles);
router.get('/api/generateFiles',fu.generateFiles);
router.post('/api/test',fu.test);
router.get('/api/checkFileisAvailable', fu.checkFileisAvailable);
router.get('/api/getAllFileName', fu.getAllFileName);

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
router.post('/api/ScheduleLiveStreamforICO',ls.ScheduleLiveStreamforICO);
router.delete('/api/deleteLiveStreamSystemCreated/:id',ls.deleteLiveStreamSystemCreated);

//calendar
router.post('/api/getCalendar',cal.createEvent);
module.exports = router;