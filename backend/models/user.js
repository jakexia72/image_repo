'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    uid: {
        type: String,
        unique: true,
    },
    firstName: { 
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    bio: String,
    externalLinks:{
        type: Map,
        of: String,
        default: {},
    },
});

module.exports = mongoose.model('User', userSchema)
