const apiKey = 'NWoka6DbqLOhinx74/Nwhg==dNFCAWbiGdqqdZ3n'; // Store the API key

        function getLatLong(cityName) {
            const geocodingApiUrl = `https://api.api-ninjas.com/v1/geocoding?city=${encodeURIComponent(cityName)}`;
            return $.ajax({
                method: 'GET',
                url: geocodingApiUrl,
                headers: { 'X-Api-Key': apiKey },
                contentType: 'application/json',
            });
        }

        function getWeatherData(latitude, longitude) {
            const weatherApiUrl = `https://api.api-ninjas.com/v1/weather?lat=${latitude}&lon=${longitude}`;
            return $.ajax({
                method: 'GET',
                url: weatherApiUrl,
                headers: { 'X-Api-Key': apiKey },
                contentType: 'application/json',
            });
        }

        $(document).ready(function() {
            $('#getWeatherButton').click(function() {
                fetchWeather();
            });

            // Add event listener for Enter key
            $('#cityInput').keypress(function(event) {
                if (event.which === 13) { // Enter key
                    fetchWeather();
                }
            });
        });

        function fetchWeather() {
            const cityInput = $('#cityInput').val().trim();
            const resultsDiv = $('#results');
            const errorMessageDiv = $('#error-message');
            const weatherIconDiv = $('#weatherIcon');
            resultsDiv.empty(); // Clear previous results
            errorMessageDiv.text(''); // Clear any previous error message
            weatherIconDiv.empty(); // Clear previous icon

            if (cityInput === "") {
                errorMessageDiv.text("Please enter a city name.");
                return;
            }

            // 1. Get Latitude and Longitude
            getLatLong(cityInput)
                .then(function(geocodingResult) {
                    if (geocodingResult && geocodingResult.length > 0) {
                        const latitude = geocodingResult[0].latitude;
                        const longitude = geocodingResult[0].longitude;

                        // 2. Get Weather Data
                        return getWeatherData(latitude, longitude); // Chain the weather call
                    } else {
                        throw new Error("City not found."); // Handle city not found
                    }
                })
                .then(function(weatherResult) {
                    // 3. Display the Weather Data
                    displayWeatherData(weatherResult, resultsDiv, weatherIconDiv);
                })
                .catch(function(error) {
                    // 4. Handle any errors in the process
                    console.error("Error:", error);
                    errorMessageDiv.text("An error occurred: " + error.message);
                    resultsDiv.html("<p>Failed to retrieve weather data.</p>");
                });
        }

        function displayWeatherData(weatherData, resultsDiv, weatherIconDiv) {
            // Function to display weather information
            let weatherHtml = `
                <p>Temperature: ${weatherData.temp}°C</p>
                <p>Feels Like: ${weatherData.feels_like}°C</p>
                <p>Humidity: ${weatherData.humidity}%</p>
                <p>Wind Speed: ${weatherData.wind_speed * 18 / 5} K/H</p>
            `;
            resultsDiv.html(weatherHtml);

            // Change background and icon based on temperature
            const temperature = weatherData.temp;
            if (temperature > 30) {
                $('body').removeClass().addClass('bright');
                weatherIconDiv.html('☀️'); // Sun icon
            } else if (temperature <= 30 && temperature > 15) {
                $('body').removeClass().addClass('moderate');
                weatherIconDiv.html('🌧️'); // Monsoon icon
            } else if (temperature <= 15) {
                $('body').removeClass().addClass('cold');
                weatherIconDiv.html('❄️'); // Cold weather icon
            }
        }
