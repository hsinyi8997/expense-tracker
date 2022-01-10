const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = 3000

require('./config/mongoose')

app.engine('hbs', exphbs.engine({ defaultLayout:'main', extname:'.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})