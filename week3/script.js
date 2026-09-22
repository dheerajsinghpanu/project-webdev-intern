// ==========================================
// OPENWEATHERMAP API KEY
// ==========================================

// Paste your API key inside the quotes
const API_KEY = "ceba349e6723c8afc47533fdb88fbc46";


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const cityInput = document.getElementById("cityInput");

const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");

const temperature = document.getElementById("temperature");

const humidity = document.getElementById("humidity");

const condition = document.getElementById("condition");

const feelsLike = document.getElementById("feelsLike");

const loading = document.getElementById("loading");

const error = document.getElementById("error");


// ==========================================
// SEARCH BUTTON EVENT
// ==========================================

searchBtn.addEventListener("click", getWeather);


// ==========================================
// ENTER KEY EVENT
// ==========================================

cityInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        getWeather();

    }

});


// ==========================================
// GET WEATHER FUNCTION
// ==========================================

function getWeather() {

    // Get city entered by user
    const city = cityInput.value.trim();


    // Check if city is empty
    if (city === "") {

        showError("Please enter a city name.");

        return;

    }


    // Hide previous results
    weatherCard.classList.add("hidden");

    error.classList.add("hidden");


    // Show loading message
    loading.classList.remove("hidden");


    // ==========================================
    // API URL
    // ==========================================

    const API_URL =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;


    // ==========================================
    // FETCH API
    // ==========================================

    fetch(API_URL)

        .then(function(response) {

            // Check if API request was successful
            if (!response.ok) {

                throw new Error(
                    "City not found. Please check the city name."
                );

            }


            // Convert response into JSON
            return response.json();

        })


        .then(function(data) {

            console.log("API Response:", data);


            // ==========================================
            // EXTRACT DATA FROM JSON
            // ==========================================

            const name = data.name;

            const temp = data.main.temp;

            const humidityValue = data.main.humidity;

            const weatherCondition =
                data.weather[0].description;

            const feelsLikeValue =
                data.main.feels_like;


            // ==========================================
            // DISPLAY DATA ON WEBPAGE
            // ==========================================

            cityName.textContent = name;

            temperature.textContent =
                Math.round(temp);

            humidity.textContent =
                humidityValue + "%";

            condition.textContent =
                weatherCondition;

            feelsLike.textContent =
                Math.round(feelsLikeValue) + "°C";


            // Hide loading
            loading.classList.add("hidden");


            // Show weather card
            weatherCard.classList.remove("hidden");

        })


        // ==========================================
        // ERROR HANDLING
        // ==========================================

        .catch(function(errorMessage) {

            console.error(errorMessage);

            loading.classList.add("hidden");

            weatherCard.classList.add("hidden");

            showError(errorMessage.message);

        });

}


// ==========================================
// SHOW ERROR FUNCTION
// ==========================================

function showError(message) {

    error.textContent = message;

    error.classList.remove("hidden");

}