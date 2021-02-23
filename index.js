const express = require('express')
const mongoose = require('mongoose')
const exphbrs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const bodyParese = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 3000;
const app = express()
app.use(bodyParese.urlencoded({extended:true}))
app.use(bodyParese.json())

app.use(express.static(path.join(__dirname, 'public')))
// template for html
const hbs = exphbrs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(todoRoutes)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

async function start() {
    try {
        await mongoose.connect(
        'mongodb+srv://aleksey:alex12345@cluster0.xfpmm.mongodb.net/todos',
        { useNewUrlParser: true, 
          useUnifiedTopology: true 
        })
        app.listen(PORT, () => {
            console.log('server is running on port' + PORT)
        })
    } catch (error) {
        console.log(error)
    }
}
start()