var express = require('express');
var router = express.Router();
const i18n = require('i18n');
const i18nConfig = require('../lib/i18nConfig');
var app = express();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nodepop' });
});

module.exports = router;
