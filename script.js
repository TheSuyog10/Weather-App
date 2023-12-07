async function getWeather() {
  const apiKey = "ead22676d915a6512e96c28cad372b8f";
  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value.trim();

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      getWeather();
    }
  });

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found");
      return;
    }

    updateWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function updateWeather(data) {
  const weatherIcon = document.getElementById("weatherIcon");
  const temperature = document.getElementById("temperature");
  const cityName = document.getElementById("cityName");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("windSpeed");

  const iconCode = data.weather[0].main;
  //   const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  const iconUrl = `images/${iconCode}.png`;

  weatherIcon.src = iconUrl;
  temperature.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
  cityName.textContent = data.name;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
  cityInput.value = "";
}
