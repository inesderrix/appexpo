const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    checked: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Item', Schema);