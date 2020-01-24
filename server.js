//======================================================================
// Welcome to my Note-Taker, based on Express.js.

// Below are my dependencies; I'm unhealthily co-dependent.
//======================================================================

const mySQL = require("mysql"); // Do we really need this?
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./Develop/db/db")

//======================================================================
// This sets up the Express App
//======================================================================

var app = express();
var PORT = process.env.PORT || 3000;

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
// Notes html and it's "url"
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
})

// We also need an array for notes.
var notesArray = [];

//===============================================================================
// GET, POST, DELETE API Endpoints.
//===============================================================================

// Since the GET and POST functions grab from the same route, we can set it once up here.
// app.route("/api/notes")
//     // Grab the notes list (this should be updated for every new note and deleted note.)
//     .get("/api/notes", function (req, res) {
//         res.json(database);
//     })

//     // Add a new note to the json db file.
//     .post("/api/notes", function (req, res) {
//         let newNote = req.body;
//         database.push(newNote);
//         // Gotta give newNote an id based on location to delete it later.
//         for (var i = 0; i < database.length; i++) {
//             noteLocation = database[i];
//             noteId = noteLocation + 1;
//         }
//         res.json(database);
//     });


//=================================================================
// Delete a note based on an ID (location in the array?)
// This route is dependent on ID of note.
//      1. Find note by id via a loop
//      2. Splice? note out of array of notes.
//      3. Re-write db.json, just without that newly deleted note.
//=================================================================


// app.delete("/api/notes/:id", function (req, res) {
//     fs.readFile("./Develop/db/db.json", 'utf8', (err, data) => {
//         data = JSON.parse(data);
//         console.log(JSON.stringify(data));


//         for (var i = 0; i < database.length; i++) {
//             if (noteLocation === database[i]) {
//                 //splice it out
//                 database.splice(i, 1);
//             }
//         }
//         // Rewrite database
//         fs.writeFileSync('/Develop/db/db.json', JSON.stringify(database));
//         return res.send("Removed");
//     });
//     return res.json(false);
// })

//===========================================================================
// Listening is the last thing Express should do. This sets up the server.
//===========================================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
