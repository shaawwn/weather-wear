import {useState, useEffect} from 'react';


/*
    forecast.dt = utc time stamp of forecast
    foreacst.dt_text = string date timefinal is 24 hour time format: 24:00:00, so need 14:00:00
    forecast.main = temp data
    forecast.weather = 'Cloudy' -> 'few clouds'

    get 2pm forecast, so every 8th from 2pm
*/
export default function DailyForecast({forecast}) {

    // console.log("Forecast in comp", forecast)

    function filterNoon(text) {
        console.log(text.split(" "))


        return text.split(" ")[1] === '12:00:00' ? true : false
    }
    return(
        <section className="panel current-weather flex flex-col">
            {forecast.list.map((daily, index) => 
                filterNoon(daily.dt_txt) == true ? <ForecastCard forecast={daily}/>:null
            )}
        </section>
    )
}

function ForecastCard({forecast}) {
    //temp, date icon, simplified version of current weather card
    console.log("forecast", forecast)
    return(
        <div className="flex justify-between my-auto">
            <div className="flex flex-col justify-center">
                <p>{forecast.weather[0].main}</p>
                <p>{Math.round(forecast.main.temp)}°F</p>
                <div className="flex gap-[10px]">
                    <p>High {Math.round(forecast.main.temp_max)}</p>
                    <p>Low {Math.round(forecast.main.temp_min)}</p>
                </div>
            </div>

            <img className="" src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}></img>
        </div>
    )
}

// three hour intervals for 5 days, get the 2pm forecast? Every 8th item
