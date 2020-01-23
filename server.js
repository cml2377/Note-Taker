//======================================================================
// Welcome to my Note-Taker, based on Express.js.
//======================================================================
// My dependencies; I'm unhealthily co-dependent.
//======================================================================

const mySQL = require("mysql");
const express = require("express");

//======================================================================
// This sets up the Express App
//======================================================================

var app = express();
var PORT = 5000;

//==============================================================================
//This sets up data parsing-- Express will interpret it/format data as JSON.
//==============================================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());