const express = require('express')
const moment = require('moment')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')
const { splitToObject } = require('../../utils/utils')

router.get('/', async (req, res) => {
  const sorts = []
  const userId = '61dbe5d96efa1a4d450ae7b3'
  const { category, month, sort } = req.query
  let sortRule = sort ? splitToObject(sort) : { date: 1 }
  const condition = {userId}

  //處理category資料
  Category.find()
    .sort({ _id: 1 })
    .lean()
    .then(categoryData => {
      //確認是否使用搜尋
      const categoryDoc = categoryData.find(item => item.name === category)
      if (categoryDoc && (category !== 'all')) {
        condition.categoryId = categoryDoc._id
      }
      //保留select value
      categoryData.forEach(item => {
        if (item.name === category) item.selected = 'selected'
      })
      //保留排序篩選value
      if (sort) {
        switch (sort) {
          case 'date-asc':
            sorts.dateasc = sort;
            break;
          case 'date-desc':
            sorts.datedesc = sort;
            break;
          case 'amount-asc':
            sorts.amountasc = sort;
            break;
          case 'amount-desc':
            sorts.amountdesc = sort;
            break;
        }
      }
      //處理時間訊息
      if (month) {
        const toChange = new Date(moment(month).format('YYYY-MM-[01]'))
        const toBeStart = moment(toChange).subtract(1, 'days').format('YYYY-MM-DD')
        const start = new Date(toBeStart)
        start.setHours(23, 59, 59, 999)
        const toBeEnd = moment(month).add(1, 'month').format('YYYY-MM-DD')
        const end = new Date(toBeEnd)
        end.setHours(0, 0, 0, 0)
        condition.date = {
          $gte: start,
          $lte: end
        }
      }
      //取得render資料
      return Record.find(condition)
        .populate('categoryId')
        .sort(sortRule)
        .lean()
        .then(async (record) => {
          if (record.length === 0) return res.render('index', { categoryData })
          const totalAmount = await record.map(expense => expense.amount).reduce((a, b) => a + b)
          for (let item of record) {
            item.date = moment(item.date).format('YYYY-MM-DD')
          }
          res.render('index', { record, categoryData, month, sorts, totalAmount })
        })
        .catch(err => console.log(err))
    })


})

module.exports = router