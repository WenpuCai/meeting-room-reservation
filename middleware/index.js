//==============================
// ALL THE MIDDLEWARE GOES HERE  
//==============================

var middlewareObj = {};

var Room = require("../models/room");

middlewareObj.checkOwnership = function(req, res, next) {
    //  is user logged in ?
    if (req.isAuthenticated()) {
        Room.findById(req.params.id, function(err, foundRoom){
            if (err) {
                req.flash("error", "Room not found!");
                res.redirect("back");
            } else {
                // does the user reserved the room ?
                // foundRoom.author.id is a mongoose object vs. req.user._id is a String
                // console.log(foundRoom.author.id);
                // console.log(req.user._id);
                if (foundRoom.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You do not have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
       req.flash("error", "You need to login to do that!");
       res.redirect("back"); 
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("error", "You need to login to do that!"); // will not display right now but gives the ability to display on the next reqest while actually get in the next page
        res.redirect("/login");
    }
}

module.exports = middlewareObj;