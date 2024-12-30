const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const temperature = document.getElementById('temperature');
const weather = document.getElementById('weather');

searchBtn.addEventListener('click', () => {
  const cityName = cityInput.value;
  if (cityName) {
    fetchWeather(cityName);
  } else {
    alert('Please enter a city name!');
  }
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
      temperature.textContent = data.main.temp;
      weather.textContent = data.weather[0].description;
    } else {
      alert('City not found!');
    }
  } catch (error) {
    alert('Failed to fetch weather data. Please try again later.');
  }
}
