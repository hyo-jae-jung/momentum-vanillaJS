const API_TOKEN = "09c2d111c28f7d23b016888f5b72634fdf8fca17"
const MORE_INFO = "https://aqicn.org/scale/"
const CITY = "seoul"
const url = `https://api.waqi.info/feed/${CITY}/?token=${API_TOKEN}`

fetch(url).then((response) => response.json()).then((data) => {
    const aqi = data.data.aqi;
    const air = document.querySelector("#air")
    let level = ""
    if (aqi > 300) {
        level = "Hazardous"
    } else if (aqi > 200) {
        level = "VeryUnhealthy"
    } else if (aqi > 150) {
        level = "Unhealthy"
    } else if (aqi > 100) {
        level = "UnhealthyForSensitiveGroups"
    } else if (aqi > 50) {
        level = "Moderate"
    } else {
        level = "Good"
    }
    air.classList.add(`${level}`)
    air.innerText = `Air Quality Index(AQI): ${aqi} / Condition: ${level}`
});
