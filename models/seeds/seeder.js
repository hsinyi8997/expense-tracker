if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
//mongo collection
const Record = require('../record')
const Category = require('../category')
const User = require('../user')
//data
const { categories } = require('../data/category.json')
const { users } = require('../data/user.json')
const { records } = require('../data/record.json')

db.once('open', () => {
  //清空資料庫資料
  Promise.all([
    Category.deleteMany(),
    Record.deleteMany(),
    User.deleteMany()
  ])
    .then(() => Promise.all([
      //新增類別資料
      Category.insertMany(categories),
      //新增用戶資料
      Promise.all(users.map(user =>
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(user.password, salt))
          .then(hash => {
            user.password = hash
            return User.create(user)
          })
      ))
    ]))
    .then(results => {
      //新增消費紀錄資料
      records.forEach(record => {
        record.categoryId = results[0].find(category => category.name === record.categoryId)._id
        record.userId = results[1].find(user => user.email === record.userId)._id
      })
      return Record.insertMany(records)
    })
    .then(() => {
      console.log('Seed data is created!')
      process.exit()
    })
    .catch(err => console.log(err))
})