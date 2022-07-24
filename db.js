const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/mylogin";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Successfully connected to MongoDB");
    })
}

module.exports = connectToMongo;