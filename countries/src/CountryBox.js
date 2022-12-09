import { useState  } from 'react'
import axios from 'axios'

export const CountryBox = (props) => {
    const [weather, setWeather] = useState(null);
    
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${props.country.name.common},${props.country.region}&appid=${process.env.REACT_APP_API_KEY}`)
    .then(response => {
      setWeather(response.data);
    });


    return (
        <div>
            <h2>{props.country.name.common}</h2>
            <p>capital {props.country.capital.join(',')}</p>
            <p>area {props.country.area}</p>
            <h4>languages</h4>
            <ul>
                {Object.keys(props.country.languages).map(language_key => (
                    <li key={language_key}>{props.country.languages[language_key]}</li>
                ))}
            </ul>
            <div>
                <img alt="flag" src={props.country.flags.png} />
            </div>
            {weather !== null ? (
                <div>
                <h2>Weather in {props.country.name.common}</h2>
                <p>temperature {weather.main.temp - 273} Celcius</p>
                <img alt="icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                <p>wind {weather.wind.speed} m/s</p>
            </div>
            ) : null}
        </div>
    )
}