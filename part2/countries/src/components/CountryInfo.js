import { useEffect, useState } from "react"
import countriesService from "../services/countries"
const CountryInfo = ( {country} ) => {

    const [weatherInfo, setWeatherInfo] = useState("Loading weather info...")

    useEffect(() => {
        console.log("country", country)

        const cityCoordsPromise = countriesService.getCityCoords(country.capital, country.cca2)

        cityCoordsPromise.then(data => { 

            const coords = {lat: data[0].lat, lon: data[0].lon}

            const weatherPromise = countriesService.getWeatherInfo(coords.lat, coords.lon)

            weatherPromise.then(data => {
                const windData = data.wind
                const weatherData = data.weather[0]
                console.log("weatherData", weatherData)

                let weatherObject = {status: weatherData.main, icon: weatherData.icon, 
                                     windDeg: windData.deg, windSpeed: windData.speed }

                setWeatherInfo(weatherObject)
            })

        })

        
    }, [country])



    return (

        <div>
            <h2>{country.name.common}</h2>

            <img src={country.flags.png}></img>

            <p>Capital: {country.capital}</p>
            <p>Area: {country.area} km&sup2;</p>


            <h4>Languages</h4>

            {Object.values(country.languages).map(language => 
                <div key={language}>{language}</div>
            )}

            <h3>Weather in {country.capital}</h3>


            <div>Sttatus: {weatherInfo.status}</div>
            <div> Gonna get icon here{weatherInfo.icon}</div>
            <div>Wind Direction: {weatherInfo.windDeg}</div>
            <div>Wind Speed: {weatherInfo.windSpeed} km/h</div>
                

        </div>
    )
}


export default CountryInfo