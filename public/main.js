
const main = () => { 
  const apiKey = "e00f7f463026548c9d9efc2e41f955f6" 
  document.querySelector(".button").addEventListener("click", () => {
    const location = document.querySelector(".input").value
    getWeather(location, (weather) => {
      const target = document.querySelector("section")
      target.innerHTML = ""
      const weatherEl = document.createElement("p")
      weatherEl.textContent = `cloud cover: ${weather.clouds.all}% temperature: ${kelvinToFahrenheit(weather.main.temp)} pressure: ${weather.main.pressure}mbar humidity: ${weather.main.humidity}`
      target.appendChild(weatherEl)
      const cityEl = document.createElement("p")
      cityEl.textContent = `in ${weather.name}`
      target.appendChild(cityEl)
    })
  })
const kelvinToFahrenheit = (tempk) => {
  return Math.round((tempk - 273.15)*9/5+32)
}
const getWeather = (location, done) => {
  let query
  if(location.match(/\d{5}/)) {
    query = `zip=${location}`
  } else {
    query = `q=${location}`
  } 
  const url = `https://api.openweathermap.org/data/2.5/weather?${query}&APPID=${apiKey}`
  fetch(url)
    .then(resp => resp.json())
    .catch(error => console.error(error))
    .then(done)
}   
}

document.addEventListener('DOMContentLoaded', main)
