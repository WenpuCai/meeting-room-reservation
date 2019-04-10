//====================================================================
// Room Info Modification(Admin Only) and Rescheduling(Reg Users) Here 
//====================================================================

var express  = require("express"),
    router   = express.Router(); // Add all the routes into router rather than app
    
var Room  = require("../models/room"),
    middleware  = require("../middleware");

/* INDEX - Show all the rooms */
//  All Rooms Show up here
router.get("/", function(req, res){
    // Get all rooms from DB
    Room.find({}, function(err, allRooms){
       if(err){
           console.log(err);
       } else {
          res.render("rooms/index",{rooms: allRooms, page: 'rooms'});
       }
    });
});

/* CREATE - Add new rooms to DB */
//  Making New Rooms
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };

    var newRoom = {name: name, image: image, description: description, price: price, author: author};
    
        // Create a new room and save to DB
        Room.create(newRoom, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else {
                //redirect back to rooms page
                console.log("newlyCreated:");
                console.log(newlyCreated);
                res.redirect("/rooms");
            }
        });
});

/* NEW - Display form to create new rooms */
//  Here shows the form which submits a post request to "/rooms" to add and redirect
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("rooms/new");
});

/* SHOW - Show more info about the room */
//  this should goes last
router.get("/:id", function(req, res) {
    //  find the picture with provided ID
    Room.findById(req.params.id).exec(function(err, foundRoom){
        console.log("foundRoom: ");
        console.log(foundRoom);
        if (err) {
            console.log(err);
        } else {
            // render show template with that room
           res.render("rooms/show", {room: foundRoom}) ;
        }
    })
});

//  EDIT room ROUTE
router.get("/:id/edit", middleware.checkOwnership, function(req, res) {
    Room.findById(req.params.id, function(err, foundRoom){
        res.render("rooms/edit", {room: foundRoom});
    });
});

//  UPDATE room ROUTE
router.put("/:id", middleware.checkOwnership, function(req, res){
  	var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price};    //  find and update the correct room
    
        //  findByIdAndUpdate(id, data, recall); var data = {name: req.body.name, image: req.body.image} -> Just wrap this data in form to a groundcamp[ ] array
        Room.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedRoom){
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                req.flash("success","Successfully Updated!");
                res.redirect("/rooms/" + updatedRoom._id);
            }
        });
});

//  DESTROY ROUTE
router.delete("/:id", middleware.checkOwnership, function(req, res){
    Room.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/rooms");
        } else {
            res.redirect("/rooms");
        }
    })
});

module.exports = router;