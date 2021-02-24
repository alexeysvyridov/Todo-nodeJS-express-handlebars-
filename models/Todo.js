const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        require: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = model('Todo', schema)