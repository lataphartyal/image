const express = require("express");
const router =  require('express').Router()

const authorController = require('../controllers/authorController.js');
router.post('/register', authorController.createAuthor);
router.post('/login', authorController.login);
module.exports = router; 