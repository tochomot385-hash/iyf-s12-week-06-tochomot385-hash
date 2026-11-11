# Toch Omot - Week 06 Project
## Async JavaScript - Weather Dashboard

## Live Demo
https://tochomot385-hash.github.io/iyf-s12-week-06-tochomot385-hash/

## Features
- Search city with button or Enter, shows Loading... while fetching
- Shows city, icon, temp (°C), description, feels like, humidity, wind, pressure
- Clear message for unknown city (404) and no internet (Failed to fetch)
- Last 5 searches saved in localStorage, click to search again
- Practice in async-practice.js

## Technologies
- HTML, CSS, JavaScript, fetch API, async/await, OpenWeatherMap API, GitHub Actions

## What I Learned
- fetch does not fail on 404 by itself. I first thought a wrong city would throw, but it returns response.ok = false. I must check response.ok myself or the app shows a blank card.
- I must use async/await with try/catch. Without try/catch, a no-internet error crashes the app. With it, I can show "No internet connection" instead.
- The API key must never be committed. I keep it in config.js (git-ignored) locally, and on GitHub Pages it comes from a Secret OPENWEATHER_API_KEY injected by the deploy.yml Action.

## Challenges Faced
- 401 error at first. Fixed by waiting - new OpenWeatherMap keys take up to 2 hours to activate.
- API_KEY is not defined on live site. Fixed by adding the Secret and setting Pages Source to GitHub Actions, not Deploy from branch.