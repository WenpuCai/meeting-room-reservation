var express = require('express');
var app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	flash       = require("connect-flash"),
	LocalStrategy = require('passport-local'),
	methodOverride = require("method-override"),
	User = require('./models/user');

//  requiring routes
var indexRoutes = require("./routers/index")

mongoose.connect("mongodb://admin:admin777@ds127825.mlab.com:27825/meeting-room-reservation");
app.set("view engine", "ejs");

// need body-parser to post data from a form  to request
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); // for "?_method="
app.use(express.static(__dirname + "/public")); // __dirname is the dir that this script runs
app.use(flash());

// add in express-sesseion
app.use(require("express-session")({
    secret: "You gonna win, go for it",
    resave: false, 
    saveUninitialized: false
}));

// set up passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
/*
	deserializeUser : reading the session, taking the data from the session that's encoded and unencoding it
	serializeUser : Encoding it, serializing it then putting it back to the session
	
	These two methods comes from passportLocalMongoose that defines in User Model
*/ 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// to put currentUser: req.user to every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user; // pass req.user to every template
    res.locals.error = req.flash("error"); // res.locals.whateverName = value you wanna access 
    res.locals.success = req.flash("success");
    next(); // move on
});// app.use(middleware) whatever function we provide in it will be called on every route

/*		use routes here		*/ 
app.use(indexRoutes);

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("The Server has started !");
// });

app.listen(3000, function(){
    console.log("The Server has started !"); //Listening on port 3000
});