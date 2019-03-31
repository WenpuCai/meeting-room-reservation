var mongoose = require("mongoose");

var roomSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    location: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Room", roomSchema);