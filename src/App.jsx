import {useState, useRef, useEffect} from 'react'
import useSearch from './hooks/useSearch'

import SearchResults from './components/SearchInput'
import SearchDropdown from './components/SearchDropdown'
import SearchInput from './components/SearchInput'

import DailyForecast from './components/ForecastTable'
import CurrentWeather from './components/CurrentWeather'
import Outfits from './components/Outfits'

const API_KEY = import.meta.env.VITE_API_KEY

function App() {


	const queryString = useRef('')
	const queryDelay = useRef()
	const {
		location,
		dailyWeather,
		hourlyWeather,
		searchByLocationName,
		currentWeather,
		dailyForecast,
		searchResults,
		handleSetLocation
	} = useSearch()

	function handleKeyPress(e) {
		if(e.key === 'Enter') {
			console.log("Setting to: ", e.target.value, searchResults[0])
			handleSetLocation(searchResults[0])
		}
	}

	function handleChange(value) {

        queryString.current = value
        if(queryString.current === '') {
			searchByLocationName('') // set results to []
            console.log("There is nothing to search.")
            if(queryDelay.current) {
                clearTimeout(queryDelay.current)
            }
            return false
        } else if(queryDelay.current) {
            clearTimeout(queryDelay.current)
        }

        queryDelay.current = setTimeout(() => {
			searchByLocationName(value)
		}, 500)
    }

	function renderLanding() {
		console.log("Location", location)
		return(
			<section className='vertical-center-container'>
			<h1 className='title'>Weather Wear</h1>
			<SearchInput 
				handleChange={handleChange}
				handleKeyPress={handleKeyPress}
				searchResults={searchResults}
				handleSetLocation={handleSetLocation}
			/>
		</section>
		)
	}

	function renderLocation() {
		// 
		// console.log("Location in render", location, currentWeather)

		const screenWidth = screen.width
		return(
			<section className="home-section">
				<div className="w-full flex p-1">
					{/* Actually need to be able to search here... */}
					<input 
						className="nav-input" placeholder="Search location"
						onChange={(e) => handleChange(e.target.value)}
						onKeyDown={(e) => handleKeyPress(e)}
						></input>
				</div>

				<div className="home">
					<div className="flex flex-col w-full gap-[40px]">
					<CurrentWeather 
						location={location}
						weather={currentWeather}
						forecast={dailyForecast}
					/>
					<Outfits weather={currentWeather}/>
					</div>

					{screenWidth > 763 ? 
						<DailyForecast forecast={dailyWeather}/>
					:null
					}
				</div>
				
				{screenWidth< 763 ? 
					<DailyForecast forecast={dailyWeather}/>
				:null
				} 
			</section>
		)
	}

	useEffect(() => {

	}, [location])
	return (
		<>
			<main>
				{location && currentWeather && dailyWeather ? renderLocation() : renderLanding()}
			</main>

		</>
	)
}

export default App
