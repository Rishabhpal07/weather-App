const apikey = "cb11863a781a05dbe4c722536e0c6d57";
const apiUrl = "http://api.weatherstack.com/current";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weather_img=document.querySelector("weather_image");
async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?access_key=${apikey}&query=${city}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.error) {
            console.error("Error from API:", data.error.info);
            document.querySelector(".city").innerHTML = "City not found";
            document.querySelector(".temp").innerHTML = "-";
            document.querySelector(".humidity").innerHTML = "-";
            document.querySelector(".wind").innerHTML = "-";
        } else {
            document.querySelector(".city").innerHTML = data.location.name;
            document.querySelector(".temp").innerHTML = `${data.current.temperature}°C`;
            document.querySelector(".humidity").innerHTML = `${data.current.humidity}%`;
            document.querySelector(".wind").innerHTML = `${data.current.wind_speed} km/h`;
        }
    } catch (error) {
        console.error("Fetch error:", error.message);
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

checkWeather("Bangalore");
