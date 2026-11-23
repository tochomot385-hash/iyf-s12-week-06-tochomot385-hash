const API_KEY = "364d9cd9de65781a4ea48d36fe83d8dd";

const searchBtn = document.querySelector("button");
const cityInput = document.querySelector("input");

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      alert(data.message);
      return;
    }

    // This updates your page
    document.body.innerHTML += `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Temp: ${data.main.temp}°C</p>
      <p>Feels Like: ${data.main.feels_like}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed} m/s</p>
      <p>Pressure: ${data.main.pressure} hPa</p>
    `;
  } catch (error) {
    console.log(error);
    alert("Error fetching weather");
  }
}

// Find the FORM, not the button
const form = document.getElementById("search-form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // <- STOPS the page reload
  const city = document.getElementById("city-input").value;
  if (city) getWeather(city);
});
