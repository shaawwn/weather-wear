import {useState, useRef, useEffect} from 'react'
import useSearch from './hooks/useSearch'

import SearchResults from './components/SearchInput'
import SearchDropdown from './components/SearchDropdown'
import SearchInput from './components/SearchInput'

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
		console.log("LOcation", location)
		return(
			<section className='vertical-center-container'>
			<h1 className='title'>Weather Wear</h1>
			<SearchInput 
				handleChange={handleChange}
				handleKeyPress={handleKeyPress}
				searchResults={searchResults}
				handleSetLocation={handleSetLocation}
			/>
{/* 
			<div className="input-dropdown-container">
				<input 
					onChange={(e) => handleChange(e.target.value)}
					onKeyDown={(e) => handleKeyPress(e)}
					id="search-input" 
					className="input"
					type="text" 
					placeholder="Search location"
					
				></input>

				{searchResults.length > 0 ? 
					<SearchDropdown 
						results={searchResults}
						handleSetLocation={handleSetLocation}
						/>
					:null
				}
			</div> */}

		</section>
		)
	}

	function renderLocation() {
		// 
		return(
			<section>
				<h1>Weather data for {location.name}</h1>
			</section>
		)
	}
	return (
		<>
			<main>
				{/* {renderHome()} */}
				{location ? renderLocation() : renderLanding()}
			</main>

		</>
	)
}

export default App
