const {Router} = require('express');
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async (req, res) => {
    const todos = await Todo.find({}).lean()
    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos
    })
})

router.get('/create', (req,res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})

router.post('/create', async (req, res) => {
    console.log(req.body)
    const todo = new Todo({ 
        title: req.body.title,
        description: req.body.description
    })
    //save to database
    await todo.save()
    res.redirect('/')
})

router.post('/complete', async(req,res) => {
    const todo = await Todo.findById(req.body.id)
    todo.completed = !!req.body.completed;
    todo.description = req.body.description;
    await todo.save()
    res.redirect('/')
})
module.exports = router;