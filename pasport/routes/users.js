var mongoose = require("mongoose");
const passport = require("passport");
mongoose.set('strictQuery', false);
var plm = require("passport-local-mongoose");


mongoose.connect('mongodb+srv://khileshmaskare:khilesh123@cluster0.yyzoscs.mongodb.net/?retryWrites=true&w=majority');

var userSchema = mongoose.Schema({
    name : String,
    username : String,
    password : String

})

userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);