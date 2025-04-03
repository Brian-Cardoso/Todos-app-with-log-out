const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: String,
    checked: Boolean,
    passwordHash: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

todoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;