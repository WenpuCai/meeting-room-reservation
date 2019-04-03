var mongoose = require("mongoose"),
Room = require("./models/room"),
User = require("./models/user");

var data = [
    {   name: "Austin Room", 
        image: "https://libapps.s3.amazonaws.com/customers/2294/images/studyroom-austin.jpg",
        description: "This room has a computer, a podium, and a dry erase board."
    },
    {   name: "Bluebonnet Room", 
        image: "https://libapps.s3.amazonaws.com/customers/2294/images/studyroom-bluebonnet.jpg",
        description: "This room comes with a computer and dry erase board."
    },
    {   name: "Rio Grande", 
        image: "https://libapps.s3.amazonaws.com/customers/2294/images/studyroom-riogrande.jpg",
        description: "This room comes with a computer. The interior windows of this room can be used as a dry erase board and can be written on with dry erase markers."
    }
]
/*
1.  Remove all rooms
2.  Add a few rooms, CANNOT be written outside else, because what next wont be executed.
3.  Add Admin as owner
*/
function seedDB() {
    //  Remove all rooms
    Room.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Remove all rooms !");
    //  Add a few rooms, CANNOT be written outside else, because what next wont be executed.
            data.forEach(function(seed){
                Room.create(seed, function(err, room){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added a room !");
                    }
                })
            })
        }
    });
}

module.exports = seedDB;
