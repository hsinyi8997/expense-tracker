const express = require('express')
const moment = require('moment')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

// 新增
router.get('/new', (req, res) => {
  Category.find()
    .select('name')
    .sort({ _id: 1 })
    .lean()
    .then(categoryData => res.render('new', {categoryData}))
    .catch(err => console.log(err))
})

router.post('/new', (req, res) => {
  const userId = '61dbe5d96efa1a4d450ae7b3'
  const { name, date, category, amount } = req.body
  Record.create({
    name,
    date,
    amount,
    categoryId: category,
    userId
  })
  .then(() => res.redirect('/'))
  .catch((err) => console.log(err))
})

// 修改
router.get('/edit/:id', (req, res) => {
  const _id = req.params.id
  Category.find().select('name').sort({ _id: 1 }).lean().then( async (categoryData) => {
    const record = await Record.findById(_id).lean()
    record.date = moment(record.date).format('YYYY-MM-DD')
    for (let item of categoryData) {
      if (item._id.toString() === record.categoryId.toString()) {
        item.selected = 'selected'
        return res.render('edit', { record, categoryData })
      }
    }
  })
  .catch(err => console.log(err))
})

router.put('/edit/:id', (req, res) => {
  const _id = req.params.id
  const userId = '61dbe5d96efa1a4d450ae7b3'
  const { name, date, category, amount } = req.body
  req.body.categoryId = category
  delete req.body.category
  Record.findByIdAndUpdate(_id, {$set: req.body})
  .then(() => res.redirect('/'))
  .catch((err) => console.log(err))
})

// 刪除
router.delete('/:id', (req, res) => {
  const userId = '61dbe5d96efa1a4d450ae7b3'
  const _id = req.params.id
  Record.findOneAndDelete({userId, _id})
    .then(() => res.redirect('/'))
})

module.exports = router