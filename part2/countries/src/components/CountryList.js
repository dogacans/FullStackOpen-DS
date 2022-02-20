import CountryInfo from "./CountryInfo"

const CountryList = (props) => {
    const countries = props.countries
    const countriesToShow = countries.filter(country => {
        return country.name.common.toLowerCase().includes(props.query.toLowerCase())
    })

    // Show "too many" message if more than 10 countries
    if (countriesToShow.length > 10) {
        return (
            <div>Too many countries to show ({countriesToShow.length}). Please search for a spesific country.</div>
        )
    }


    else if (countriesToShow.length > 1) {
        return (
            <div>
                {countriesToShow.map(country =>

                <div key={country.name.common}>
                    {country.name.common}

                    <button onClick={() => props.onClick(country.name.common)}>
                        Show
                    </button>

                </div>
                )}
            </div>
        )
    }
    

    else if (countriesToShow.length === 1){

        const country = countriesToShow[0]

        return (
            <div>
                <div>Only one country found! ({country.name.common})</div>
                <CountryInfo country={country} />
            </div>
        )
    }


    else {
        return (
            <div>No countries found.</div>
        )
    }
}

export default CountryList

