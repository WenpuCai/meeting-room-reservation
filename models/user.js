var mongoose = require('mongoose'),
 	passportLocalMongoose = require("passport-local-mongoose"); 
 	// a mongoose plugin that simplifies building username and password login with Passport

 var UserSchema = new mongoose.Schema({
 	username: String,
 	password: String
 });

// This will add methods that comes with this package to the schema
 UserSchema.plugin(passportLocalMongoose);

// conpile the schema into a model, name "User" value UserSchema
 module.exports = mongoose.model("User", UserSchema);