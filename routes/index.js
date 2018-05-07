var express = require('express');
var router = express.Router();

var db = require('../dbconfig');
var us = require('../users');
var sp = require('../securepassword')
var email = require('../email')
var md = require('../masterdata')
var cy = require('../company')
var fu = require('../fileupload');
var cv = require('../companyvideo');

router.get('/api/Registrations',us.getAllRegistrations);
router.get('/api/Registration/:id',us.getSingleRegistration);
router.post('/api/SaveRegistration',us.createRegistration);
router.get('/api/getRegistrationemail',us.getRegistrationemail);
router.get('/api/getEncryptPassword',sp.getEncryptPassword);
router.get('/api/getVerifyPassword',sp.getVerifyPassword);
router.get('/api/getUserSignIn',us.getUserSignIn);
router.post('/api/sendActivateMail',email.sendActivateMail);
router.put('/api/putUserActivate',us.putUserActivate);

//master data APIs
router.get('/api/getCities',md.getCities);
router.get('/api/getStates',md.getStates);
router.get('/api/getCountries',md.getCountries);
router.get('/api/getAllCountries',md.getAllCountries);
router.get('/api/getStateCountry',md.getStateCountry);
//company APIs
router.get('/api/getAllCompany',cy.getAllCompany);
router.get('/api/getCompanybyID/:id',cy.getCompanybyID);
router.get('/api/getCompanybyName',cy.getCompanybyName);
router.get('/api/getCompanyIDByUser/:id',cy.getCompanyIDByUser);
router.post('/api/createCompany',cy.createCompany);
//image log
router.post('/api/uploadCompanyLogo',fu.uploadCompanyLogo);
router.get('/api/getCompanyLogo',fu.getCompanyLogo);

//company videos APIs
router.get('/api/getAllVidoes',cv.getAllVidoes);
router.get('/api/getVideobyID/:id',cv.getVideobyID);
router.get('/api/getVidoesByCompany/:id',cv.getVidoesByCompany);
router.post('/api/createCompanyvideo',cv.createCompanyvideo);
router.get('/api/getVideoByUrl/',cv.getVideoByUrl);
router.delete('/api/deleteVideobyID/:id',cv.deleteVideobyID);

module.exports = router;