const mongoose = require('mongoose');
const { Schema } = mongoose;

const listingsSchema = new Schema({
    title: String,
    description: String,
    ownerName: String,
    ownerPhone: Number,
    pictureURL: String
});

module.exports = mongoose.model('listings',listingsSchema);

