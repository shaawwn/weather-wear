import {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import weatherTypes from '../outfits.json/'


export default function Outfits({weather}) {

    const [temp, setTemp] = useState(null)
    const [outfit, setOutfit] = useState(null)
    // weather.main, weather.weather
    // console.log("Weather", weather.main, weather.weather[0])


    function getTempCategory() {
        // 5 temp categories, Very Cold Cold Normal Hot Very Hot
        // weather.main.temp is the current temp
        if(weather.main.temp <= 32) {
            // Very cold
            setTemp('veryCold')
        } else if(weather.main.temp <= 60) {
            // cold
            setTemp('cold')
        } else if(weather.main.temp <= 80) {
            // normal
            setTemp('normal')
        } else if(weather.main.temp <= 100) {
            // hot
            setTemp('hot')

        } else if(weather.main.temp > 100){
            // very hot
            setTemp('veryHot')
        } else {
            // null value for temp category
            console.log("Cannot set temp", weather.main.temp)
        }
    }

    function setClearCloudyWeather(weatherMain, weatherDesc) {
        if(temp === 'hot' || temp === 'veryHot') {
            setOutfit(weatherTypes.outfits['Clear']['other'])
        } else if(temp === 'cold') {
            setOutfit(weatherTypes.outfits['Snow']['snow'])
        } else if(temp === 'veryCold') {
            setOutfit(weatherTypes.outfits['Snow']['heavySnow'])
        } else {
            setOutfit(weatherTypes.outfits[weatherMain][weatherDesc])
        }
    }
    function getOutfit() {
        const weatherMain = weather.weather[0].main
        const weatherDesc = weather.weather[0].description

        if(weatherMain === 'Clear') {
            console.log("Check temp for clear weather")
            setClearCloudyWeather(weatherMain, weatherDesc)
        } else if(weatherMain === 'Clouds') {
            console.log("Check temp for cloudy weather")
            setClearCloudyWeather(weatherMain, weatherDesc)

        } else {
            setOutfit(weatherTypes.outfits[weatherMain][weatherDesc])
        }
        // setOutfit(weatherTypes.outfits[weatherMain][weatherDesc])

    }

    useEffect(() => {
        getTempCategory()
    }, [])

    useEffect(() => {
        console.log("Current Temp Cat.", temp)
        getOutfit(temp)
    }, [temp])

    return(
        <section className="panel">
            <h1>Outfits here. Temp is: {temp}</h1>
            {outfit ? <p>{outfit}</p> :null}
        </section>
    )
}

Outfits.propTypes = {
    weather: PropTypes.object.isRequired
}