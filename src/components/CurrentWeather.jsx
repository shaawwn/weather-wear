import {useEffect} from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import outfits from '../outfits.json/'


export default function CurrentWeather({location, weather, forecast}) {
    console.log('ccurent', location)
    // console.log(outfits)
    function recommendOutfit() {
        // given the 'main' weather from openweather API, recommend an outfit using the outfit.json file
    }

    return(
        <section className="panel current-weather">
            <div className="temp-container">
                <p className="text-2xl xl:text-3xl">{location.name}</p>
                <p className="current-weather__temp">{Math.round(weather.main.temp)}°F</p>
                <div className="flex gap-[10px] text-2xl">
                    <p>High {Math.round(weather.main.temp_max)}°F</p>
                    <p>Low {Math.round(weather.main.temp_min)}°F</p>
                </div>
            </div>

            <div className="text-overlay-wrapper">
                <p className="text-overlay-text">{weather.weather[0].main}</p>
                <img className="weather-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            </div>

        </section>
    )
}

CurrentWeather.propTypes = {
    location: PropTypes.object.isRequired,
    forecast: PropTypes.object.isRequired,
    weather: PropTypes.object.isRequired,
  };