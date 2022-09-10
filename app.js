const express = require('express')
const bodyParser = require('body-parser')
const date = require(`${__dirname}/date.js`)

const app = express()

const item = []
const workItems = []

console.log(date);

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
    let day = date.getDay()
    res.render('list', { listTitle: day, newItemList: item })
})

app.post('/', (req, res) => {

    if(req.body.list === "Work") {
        workItems.push(req.body.newItem)
        res.redirect('/work')
    } else {
        item.push(req.body.newItem)
        res.redirect('/')
    }
})

app.get('/work', (req, res) => {
    res.render('list', { listTitle: 'Work', newItemList: workItems})
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(3000, (req, res) => {
    console.log('App is listening on port 3000');
})