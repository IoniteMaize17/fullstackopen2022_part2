import { useState, useEffect  } from 'react'
import axios from 'axios'
import { CountryBox } from './CountryBox'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter_countries, setFilterCountries] = useState([]);
  const [country_show, setCountryShow] = useState(null);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  const handleChangeSearch = (event) => {
    const value_change = event.target.value;
    setCountryShow(null);
    if (value_change.length > 0) {
      setFilterCountries(countries.filter(country => country.name.common.toLowerCase().includes(value_change.toLowerCase())));
    } else {
      setFilterCountries([]);
    }
  }

  const handleShowCountry = (country) => {
    setCountryShow(country);
  }

  return (
    <div>
      <div>find countries <input onChange={handleChangeSearch} /></div>
      { filter_countries.length === 0 ? null : filter_countries.length === 1 ? (
        <CountryBox country={filter_countries[0]} />
      ) : filter_countries.length <= 10 ? (
        <div>
          {filter_countries.map(country => (
            <div key={country.name.common}>
              <p>{country.name.common} <button onClick={() => { handleShowCountry(country) }}>show</button></p>
            </div>
          ))}
          {country_show !== null ? (
            <CountryBox country={country_show} />
          ) : null}
        </div>
      ) : (
        <div>Too many matches, specify another filter</div>
      ) }
      <div></div>
    </div>
  )
}

export default App