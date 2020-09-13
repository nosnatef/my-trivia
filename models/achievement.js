const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const achievementSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        required: true
    },
    variable_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Achievement', achievementSchema);