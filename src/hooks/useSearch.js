import {useState, useRef, useEffect} from 'react'

const API_KEY=import.meta.env.VITE_API_KEY

export default function useSearch() {

    const [location, setLocation] = useState(null) // location with city data
    const [currentWeather, setCurrentWeather] = useState(null) // current weather for location
    const [hourlyWeather, setHourlyWeather] = useState(null) // 3 hour intervals
    const [dailyWeather, setDailyWeather] = useState(null) // 3 hour intervals

    // const searchResults = useRef([])
    const [searchResults, setSearchResults] = useState([])

    function handleSetLocation(location) {
        // this should set all the weather data for that location and make calls to API for weather data
        // console.log("Setting location in hook to: ", location)
        setLocation(location)
    }

    function searchByLocationName(query) {
        if(query === '') {
            setSearchResults([])
            return
        }
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
        //   console.log("City data", data) 
        //   getCurrentWeather(data[0].lat, data[0].lon)
        //   dailyForecast(data[0].lat, data[0].lon)
            setSearchResults(data)
            // console.log("search results in fetch", data)
  
        }).catch((err) => {
          console.log("err", err)
        })
    }   
    
    function getCurrentWeather(lat, lon) {
        // returns current weather and city data (including population, sunrise/sunset, timezone)
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&units=imperial&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
        //   console.log("Current Weather", data)
          setCurrentWeather(data)
        }).catch((err) => {
          console.log("Err", err)
        })
    }


    function dailyForecast(lat, lon) {
        // 5 day forecast at 3 hour intervals
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
        //   console.log("Weather forecast", data)
          setDailyWeather(data)
        }).catch((err) => {
          console.log("Err", err)
        })
    }

    useEffect(() => {
        if(location) {
            getCurrentWeather(location.lat, location.lon)
            dailyForecast(location.lat, location.lon)

        }
    }, [location])

    return {
        location,
        dailyWeather,
        hourlyWeather,
        searchByLocationName,
        currentWeather,
        dailyForecast,
        searchResults,
        handleSetLocation
    }
}

