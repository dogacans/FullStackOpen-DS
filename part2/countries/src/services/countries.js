import axios from "axios"

const countriesBaseURL = "https://restcountries.com/v3.1/"

const api_key = process.env.REACT_APP_API_KEY
const openWeatherBaseURL = "http://api.openweathermap.org"
const getAll = () => {
    return axios.get(`${countriesBaseURL}/all`)
}

const getCityCoords = (city_name, country_code) => {

    const promise = axios.get(`${openWeatherBaseURL}/geo/1.0/direct?q=${city_name},${country_code}&appid=${api_key}`)
    const dataPromise = promise.then((response) => response.data)

    console.log("datapromise", dataPromise)
    return dataPromise
}

const getWeatherInfo = (city_lat, city_long) => {
    const promise = axios.get(`${openWeatherBaseURL}/data/2.5/weather?lat=${city_lat}&lon=${city_long}&appid=${api_key}`)
    const dataPromise = promise.then((response) => response.data)
    return dataPromise
}


// `${openWeatherBaseURL}/geo/1.0/direct?q=${city_name},${country_code}&appid=${api_key}`
// `${openWeatherBaseURL}/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${api_key}`

export default { getAll, getCityCoords, getWeatherInfo }


// const getCityCoords = (city_name, country_code) => {

//     const promise = axios.get(`${openWeatherBaseURL}/geo/1.0/direct?q=${city_name},${country_code}&appid=${api_key}`)
//     const dataPromise = promise.then((response) => response.data)

//     console.log("datapromise", dataPromise)
//     return dataPromise
// }

// const cityCoordsPromise = countriesService.getCityCoords(country.capital, country.cca2)

// const cityCoords = cityCoordsPromise.then(data => { 
//     return {lat: data[0].lat, lon: data[0].lon}
// })

// console.log("citycoords", cityCoords)