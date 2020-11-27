// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
//Start server
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get("/all", getData);

function getData(req,res){
    res.send(projectData)
};

//Post Route
app.post("/all", addData);

function addData(req,res){

    newEntry = {
        temperature: request.body.temperature,
        date: request.body.date,
        userInput: request.body.userInput,
    };

    projectData.push(newEntry)
    res.send(projectData)
    console.log(projectData)

}