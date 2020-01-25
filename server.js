//======================================================================
// Welcome to my Note-Taker, based on Express.js.

// Below are my dependencies; I'm unhealthily co-dependent.
//======================================================================

const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db")

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
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
// From readme requirements
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
// Notes html and it's "url"
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

// We also need an array for notes.
var notesArray = [];

//===============================================================================
// GET, POST, DELETE API Endpoints.
//===============================================================================

// Since the GET and POST functions grab from the same route, we can set it once up here.
app.route("/api/notes")
    // Grab the notes list (this should be updated for every new note and deleted note.)
    .get("/api/notes", function (req, res) {
        res.json(database);
    })

    // Add a new note to the json db file.
    .post("/api/notes", function (req, res) {
        json = path.join(__dirname, "/db/db.json");
        let newNote = req.body;

        // We get the db.json file here, and then any response is added with writedbjson
        function getdbJSON() {
            fs.readFile(json, "utf8", function (err, res) {
                if (err) {
                    console.log(err);
                }
                notesArray = JSON.parse(res)
                writedbJSON();
            });
        } getdbJSON()

        function writedbJSON() {
            notesArray.push(newNote)
            for (let i = 0; i < notesArray.length; i++) {
                noteLocation = notesArray[i]
                noteLocation.id = i + 1
            }
            fs.writeFile(json, JSON.stringify(notes), function (err) {

                if (err) {
                    return console.log(err);
                }
                console.log("Your note was saved!");
            });
        }
        res.sendFile(path.join(__dirname, "/db/db.json"));
    });

//=================================================================
// Delete a note based on an ID (location in the array)
// This route is dependent on ID of note.
//      1. Find note by id via a loop
//      2. Splice? note out of array of notes.
//      3. Re-write db.json, just without that newly deleted note.
//=================================================================

app.delete("/api/notes/:id", function (req, res) {
    let id = req.params.id;
    fs.readFile(__dirname + "db/db.json", "utf8", (err, data) => {
        let noteObject = JSON.parse(data);
        console.log(noteObject)
        for (i = 0; i < noteObject.length - 1; i++) {
            if (noteObject[i].id === id) {
                return i
            }
            noteObject.splice(i, 1);
        }
        fs.writeFile("/db/db.json", "utf8", noteObject, (err) => {
            if (err) {
                throw err
            }
        })
        return res.json(JSON.parse(data))
    })
});

//===========================================================================
// Listening is the last thing Express should do. This sets up the server.
//===========================================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
