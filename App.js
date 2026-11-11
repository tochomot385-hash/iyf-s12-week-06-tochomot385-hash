// Week 6 - Weather Dashboard - async/await + try/catch
const form = document.querySelector("#search-form");
const input = document.querySelector("#city-input");
const statusEl = document.querySelector("#status");
const card = document.querySelector("#weather-card");
const historyEl = document.querySelector("#history");

let history = JSON.parse(localStorage.getItem("weatherHistory") || "[]");

function renderHistory() {
  historyEl.innerHTML = "";
  history.forEach((city) => {
    const btn = document.createElement("button");
    btn.classList.add("history-btn");
    btn.textContent = city;
    btn.addEventListener("click", () => getWeather(city));
    historyEl.appendChild(btn);
  });
}

function saveToHistory(city) {
  const name = city.trim();
  if (!name) return;
  history = [name, ...history.filter((c) => c.toLowerCase() !== name.toLowerCase())].slice(0, 5);
  localStorage.setItem("weatherHistory", JSON.stringify(history));
  renderHistory();
}

async function getWeather(city) {
  const query = city.trim();
  if (!query) {
    statusEl.textContent = "Please enter a city.";
    return;
  }

  statusEl.textContent = "Loading...";
  card.classList.add("hidden");

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    // fetch does NOT throw on 404, we must check response.ok
    if (!response.ok) {
      if (response.status === 404) throw new Error(`City "${query}" not found. Try another city.`);
      if (response.status === 401) throw new Error("API key not active yet. Wait up to 2 hours and try again.");
      throw new Error("Could not fetch weather. Please try again.");
    }

    const data = await response.json();

    // Fill UI with textContent only
    document.querySelector("#city-name").textContent = `${data.name}, ${data.sys.country}`;
    document.querySelector("#weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.querySelector("#temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector("#description").textContent = data.weather[0].description;
    document.querySelector("#feels-like").textContent = `${Math.round(data.main.feels_like)}°C`;
    document.querySelector("#humidity").textContent = `${data.main.humidity}%`;
    document.querySelector("#wind").textContent = `${data.wind.speed} m/s`;
    document.querySelector("#pressure").textContent = `${data.main.pressure} hPa`;

    statusEl.textContent = "";
    card.classList.remove("hidden");
    saveToHistory(data.name);

  } catch (error) {
    // No internet = TypeError: Failed to fetch
    if (error.message.includes("Failed to fetch")) {
      statusEl.textContent = "No internet connection. Check your connection and try again.";
    } else {
      statusEl.textContent = error.message;
    }
    card.classList.add("hidden");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(input.value);
  input.value = "";
});

renderHistory();
// Load last city on start if exists
if (history.length > 0) getWeather(history[0]);