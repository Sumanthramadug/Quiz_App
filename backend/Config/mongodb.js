var mongoose = require('mongoose');
var dbUrl = process.env.MONGODB_URI;
mongoose.connect(dbUrl);
mongoose.connection.on("connected",()=>{
    console.log("MongoDb Connected Successful");
});
module.exports = mongoose;