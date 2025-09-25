const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    password: { type: String, required: true },
    last_login: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('User', Schema);