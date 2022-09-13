const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const app = express()

mongoose.connect('mongodb+srv://buenvia:buenvia_11@cluster0.w90ez.mongodb.net/todolistDB?retryWrites=true&w=majority', { useNewUrlParser: true })

const itemsSchema = new mongoose.Schema({
    name: String
})

const Item = mongoose.model("Item", itemsSchema)

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {

    Item.find({}, async (err, foundItems) => {
        res.render('list', { listTitle: 'Today', newItemList: foundItems })
    })
})

app.post('/', (req, res) => {

    const itemName = req.body.newItem
    const item = new Item({
        name: itemName
    })
    item.save()

    res.redirect('/')

})

app.post('/delete', (req, res) => {
    const checkedId = req.body.checkbox
    Item.findByIdAndRemove(checkedId, (err) => {
        console.log(`${checkedId} Successfully removed`);
    })
    res.redirect('/')
})

app.get('/:customListName', (req, res) => {
    const customListName = req.params.customListName
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(3000, (req, res) => {
    console.log('App is listening on port 3000');
})