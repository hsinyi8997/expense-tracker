const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router