

const apiKey =
    'f00c38e0279b7bc85480c3fe775d518c';
function getWeather() {
    const city = document.getElementById('cityInput').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            const icon = data.weather[0].icon;
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const windSpeed = data.wind.speed;

            document.getElementById('cityName').innerText = data.name;
            document.getElementById('dateTime').innerText = new Date().toLocaleString();
            document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${icon}.png`;
            document.getElementById('temperature').innerText = `${temperature}°C`;
            document.getElementById('description').innerText = description;
            document.getElementById('windSpeed').innerText = `Wind Speed: ${windSpeed} m/s`;

            // Change background color based on temperature
            if (temperature < 10) {
                weatherInfo.style.backgroundColor = '#00f';
            } else if (temperature < 20) {
                weatherInfo.style.backgroundColor = '#0ff';
            } else if (temperature < 30) {
                weatherInfo.style.backgroundColor = '#ff0';
            } else {
                weatherInfo.style.backgroundColor = '#f00';
            }
        })
        .catch(error => {
            alert('City not found');
            console.error('Error fetching weather data:', error);
        });
}
