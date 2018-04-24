var express = require('express');
var router = express.Router();

var db = require('../dbconfig');
var us = require('../users');
var sp = require('../securepassword')
var email = require('../email')
var md = require('../masterdata')
var cy = require('../company')
var fu = require('../fileupload');

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
router.post('/api/createCompany',cy.createCompany);

router.post('/api/uploadCompanyLogo',fu.uploadCompanyLogo);
router.get('/api/getCompanyLogo',fu.getCompanyLogo);

module.exports = router;