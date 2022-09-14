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

const item1 = new Item({
    name: 'Item 1'
})

const item2 = new Item({
    name: 'Item 2'
})

const defaultItems = [item1, item2]

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
})

const List = mongoose.model('List', listSchema)

app.get('/', (req, res) => {
    Item.find({}, async (err, foundItems) => {
        res.render('list', { listTitle: 'Today', newItemList: foundItems })
    })
})

app.post('/', (req, res) => {

    const itemName = req.body.newItem
    const listName = req.body.list

    const item = new Item({
        name: itemName
    })

    if (listName === 'Today') {
        item.save()
        res.redirect('/')   
    } else {
        List.findOne({ name: listName }, (err, foundList) => {
            foundList.items.push(item)
            foundList.save()
            res.redirect(`/${listName}`)
        })
    }

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

    List.findOne({ name: customListName}, (err, foundList) => {
        if(!foundList) {
            // Creates new list
            const list = new List({
                name: customListName,
                items: defaultItems
            })
        
            list.save()
            res.redirect(`/${customListName}`)
        } else {
            // Shows an existing list
            res.render('list', {listTitle: foundList.name, newItemList: foundList.items})
        }
    })

})

app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(3000, (req, res) => {
    console.log('App is listening on port 3000');
})