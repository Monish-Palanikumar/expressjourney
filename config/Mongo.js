const mongoose = require('mongoose');
const config = require('./Config');

const { mongo: mongoconfig } = config;
const { host, port, db } = mongoconfig;

const mongourl = `mongodb://${host}:${port}/${db}`

let connection = mongoose.connect(mongourl, {
     useUnifiedTopology: true,
     useNewUrlParser: true, }, err =>{
          if(!err)
               console.log("MongoDB connected")
          else
               console.log(err)
     })
var con = mongoose.connection;

module.exports = con;