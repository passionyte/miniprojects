const prompt = require('prompt-sync')()

const { OpenWeatherAPI } = require("openweather-api-node")

const measurements = {
    metric: {
        Temperature: "C",
        Snow: "cm",
        Wind: "kmh"
    },
    imperial: {
        Temperature: "F",
        Snow: "in",
        Wind: "mph"
    }
}

let weather = new OpenWeatherAPI({
    key: "2288ce5505740e9e88cd2343e6580e5e",
})

let promptagain = false
let again = ""

console.log("Welcome to Passion Weather. This utilizes OpenWeatherAPI.")

async function loop() {
    while (true) {
        let location = prompt("Enter a city: ")
        let unit = prompt("Enter a unit (Imperial or Metric): ").toLowerCase()
    
        if (unit == "metric" || unit == "imperial") {
            weather.setUnits(unit)
            weather.setLocationByName(location)
    
            console.log(`Fetching Today's Forecast for ${location}...`)
    
            await weather.getCurrent().then(data => {
                console.log(`Fetched Today's Forecast for ${location} (${data.lon}, ${data.lat}) in ${unit.toUpperCase()} units.`)
                console.log(`Temperature: ${data.weather.temp.cur}\u00B0${measurements[unit].Temperature}`)
                console.log(`Feels Like: ${data.weather.feelsLike.cur}\u00B0${measurements[unit].Temperature}`)
                console.log(`Description: ${data.weather.description}`)
                console.log(`Rain: ${data.weather.rain}mm`)
                console.log(`Snow: ${data.weather.snow}${measurements[unit].Snow}`)
                console.log(`Wind: [Speed] ${data.weather.wind.speed}${measurements[unit].Wind} [Gust] ${data.weather.wind.gust}${measurements[unit].Wind} [Degree] ${data.weather.wind.deg}°`)
                console.log(`Humidity: ${data.weather.humidity}%`)
                console.log(`Timezone: ${data.timezone}${data.timezoneOffset}`)
            })
    
            promptagain = true
        }
        else {
            console.log("Please enter valid units and try again.")
        }
    
        if (promptagain) {
            promptagain = false
    
            again = prompt("View more weather? [y]/n ").toLowerCase()
            if (again == "n") {
                console.log("Terminating program.")
                break
            }
       }
    }
}
if (again != "n") {
    loop()
}