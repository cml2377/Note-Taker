//======================================================================
// Welcome to my Note-Taker, based on Express.js.

// Below are my dependencies; I'm unhealthily co-dependent.
//======================================================================

const mySQL = require("mysql");
const express = require("express");
const fs = require("fs");
const path = require("path");

//======================================================================
// This sets up the Express App
//======================================================================

var app = express();
var PORT = process.env.PORT || 5001;

//==============================================================================
// Gotta link to my assets!
app.use(express.static('public'));

//==============================================================================
// This sets up data parsing-- Express will interpret it/format data as JSON.
// This is required for API calls!
//==============================================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//==============================================================================
// On page load, it should start with index.html. First get it and then listen.
//==============================================================================
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});
// Notes html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
})

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});