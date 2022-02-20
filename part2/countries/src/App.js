import './App.css';
import countriesService from "./services/countries"
import SearchBar from './components/SearchBar'
import { useState, useEffect } from 'react';
import CountryList from './components/CountryList';

function App() {

  const [query, setQuery] = useState("")
  const [countries, setCountries] = useState([])
  
  useEffect(() => {
    countriesService.getAll().then(response =>  {
      console.log(response)
      setCountries(response.data)
      console.log("here are your countries!")
      console.log(countries)

    })
  }, [])

  const searchOnChange = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }

  const showCountryInfo = (country_name) => {
    console.log(country_name)
    setQuery(country_name)
    document.getElementsByTagName("input")[0].value = country_name
  }


  return (
    <div>
      Hi!
      <SearchBar onChange={searchOnChange} />
      <CountryList countries={countries} query={query} onClick={showCountryInfo}/>

    </div>
  )
}

export default App;
