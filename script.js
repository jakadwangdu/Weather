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
          
