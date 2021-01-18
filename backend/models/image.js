'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    s3Key: {
        type: String,
        unique: true,
    },
    userUid: String,
    caption: { 
        type: String,
    },
    public: {
        type: Boolean,
        default: true,
    },
    tags: {
        type: Map,
        of: String,
        default: {},
    },
});

module.exports = mongoose.model('Image', imageSchema)
