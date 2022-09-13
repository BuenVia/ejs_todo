const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const app = express()

mongoose.connect('mongodb+srv://buenvia:buenvia_11@cluster0.w90ez.mongodb.net/todolistDB?retryWrites=true&w=majority', { useNewUrlParser: true })

const itemsSchema = new mongoose.Schema({
    name: String
})

const Item = mongoose.model("Item", itemsSchema)

const item1 = new Item({
    name: 'This is a new item'
})

const item2 = new Item({
    name: 'This is a second item'
})

const item3 = new Item({
    name: 'This is a third item'
})

const defaultItems = [item1, item2, item3]

async function updateItems(arr) {
    try {
        await Item.insertMany(arr)
        console.log('Success');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close()
    }
}

updateItems(defaultItems)

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
    res.render('list', { listTitle: 'Today', newItemList: [] })
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