/* Global Variables */

const apiKey = "9c80ef8fe1cebc53e31f3964cf48a6e6";
const apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);

/* Function called by event listener */
function performAction(event){
    const cityName = document.getElementById("city").value;
    const userInput = document.getElementById("feelings").value;

    getWxData(apiUrl, cityName, apiKey)
    .then(function(data) {
        postData("/add", {temperature: data.main.temp, date: newDate, userInput})
        .then(function() {
            updateUI("/all")
        })
    })
    
};

/* Function to GET Web API Data*/
const getWxData = async (apiUrl, cityName, apiKey) => {
    const res = await fetch(apiUrl + cityName + "&appid=" + apiKey + "&units=metric");
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error", error);
    };
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    };
};


/* Function to GET Project Data */
const updateUI = async ()=> {
    const request = await fetch("/all")
    try {
        const allData = await request.json();
        document.getElementById("date").innerHTML = allData[0].date;
        document.getElementById("temp").innerHTML = allData[0].temperature;
        document.getElementById("content").innerHTML = allData[0].userInput;
    } catch(error) {
        console.log("error", error)
    };
};