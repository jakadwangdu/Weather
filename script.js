const apiKey = 'NWoka6DbqLOhinx74/Nwhg==dNFCAWbiGdqqdZ3n'; // Store the API key

        function getLatLong(cityName) {
            // Geocoding API URL to convert city name to coordinates
            const geocodingApiUrl = `https://api.api-ninjas.com/v1/geocoding?city=${encodeURIComponent(cityName)}`;

            return $.ajax({
                method: 'GET',
                url: geocodingApiUrl,
                headers: { 'X-Api-Key': apiKey },
                contentType: 'application/json',
            });
        }

        function getWeatherData(latitude, longitude) {
            // Weather API URL to get forecast using coordinates
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
                const cityInput = $('#cityInput').val().trim();
                const resultsDiv = $('#results');
                const errorMessageDiv = $('#error-message');''
                resultsDiv.empty(); // Clear previous results
                errorMessageDiv.text(''); // Clear any previous error message

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
                        displayWeatherData(weatherResult, resultsDiv);
                    })
                    .catch(function(error) {
                        // 4. Handle any errors in the process
                        console.error("Error:", error);
                        errorMessageDiv.text("An error occurred: " + error.message);
                        resultsDiv.html("<p>Failed to retrieve weather data.</p>");
                    });
            });
        });
        let cname= document.getElementsByClassName("inp");
        document.getElementsByClassName("cityname")[0].innerHTML="Weather in "+cname;
        function displayWeatherData(weatherData, resultsDiv) {
            // Function to display weather information
            
            let weatherHtml = `
                <p>Temperature: ${weatherData.temp}°C</p>
                <p>Feels Like: ${weatherData.feels_like}°C</p>
                <p>Humidity: ${weatherData.humidity}%</p>
                <p>Wind Speed: ${weatherData.wind_speed*18/5} K/H</p>
            `;
            resultsDiv.html(weatherHtml);
                    }
