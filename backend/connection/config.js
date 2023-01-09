const { default: mongoose } = require("mongoose");
require("dotenv").config();

mongoose.connect("mongodb://localhost:27017")
    .then(() => {
        console.log("connection successfuly");
    })
    .catch(err => {
        console.log("error" + err);
    })