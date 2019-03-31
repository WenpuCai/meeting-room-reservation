var express = require('express');
var app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose'),
	User = require('./models/user');

mongoose.connect("mongodb://admin:admin@ds127825.mlab.com:27825/meeting-room-reservation");
app.set("view engine", "ejs");

// need body-parser to post data from a form  to request
app.use(bodyParser.urlencoded({extended: true}));

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


app.get('/', function (req, res) {
  res.render("main");
});

// This page is for logined user
app.get('/secret', function (req, res) {
  res.render("secret");
});

/*
	Auth routes : register & login need 2 routes
*/ 

// render register forms
app.get('/register', function(req, res){
	res.render("register");
})

// handle user sign up
app.post('/register', function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
  		if (err) {
  			console.log(err);
  			return res.render('register');
  		} 
  		// log in the user
  		passport.authenticate("local")(req, res, function(){
  			res.redirect('/');
  		})
	})
})

// render login forms
app.get('/login', function(req, res){
	res.render("login");
})

// login logic
app.post('/login', passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), function(req, res){
	
})

// logout logic
app.get('/logout', function(req, res){
	req.logout(); // passport will distroy all user data in the session and on longer keep track this user's data
	res.render("main");
})


app.listen(3000, function(){
    console.log("The Server has started !"); //Listening on port 3000
});