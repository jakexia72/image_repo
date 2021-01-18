var mongoose = require('mongoose');
require('mongoose').Promise = global.Promise

// const connectionURI = `mongodb+srv://${process.env.DB_CREDENTIALS_USERNAME}:${process.env.DB_CREDENTIALS_PASSWORD}@cluster0.uwmqw.mongodb.net/${process.env.DB_CREDENTIALS_NAME}?retryWrites=true&w=majority`;
const connectionURI = `mongodb+srv://${process.env.DB_CREDENTIALS_USERNAME}:${process.env.DB_CREDENTIALS_PASSWORD}@cluster0.sfmiq.mongodb.net/${process.env.DB_CREDENTIALS_NAME}?retryWrites=true&w=majority`;

const initDB = () => {
    try{
        mongoose.connect(connectionURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }catch(er){
        console.log(er)
    }

    mongoose.connection.once('open', () => {
        mongoose.connection.db.listCollections().toArray(function(err, names) {
            console.log('Mongoose default connection open to cluster0');
            console.log(names);
            module.exports.Collection = names;
        });
    });
    // Register Schemas
    User = require('../models/user');
}

module.exports = initDB;
//YyaOfSwrJ7YSv9Mc