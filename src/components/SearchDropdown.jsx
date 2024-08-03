import {useEffect} from 'react'

import PropTypes from 'prop-types';

export default function SearchDropdown({results, handleSetLocation}) {

    function handleClick(result) {
        handleSetLocation(result)
    }

    function renderResults() {


        return results.map((result, index) => 
            <p key={index} onClick={() => handleClick(result)}>{result.name}</p>
        )
    }

    useEffect(() => {
        // const searchInput = document.getElementById('search-input')
        // if(results.length > 0) {
        //     searchInput.classList.add('input-nobottom-border')
        // } else {
        //     console.log("nothing")
        //     searchInput.classList.remove('input-nobottom-border')
        // }
    }, [results])

    return(
        <div className="dropdown">
            {renderResults()}
        </div>
    )
}

SearchDropdown.propTypes = {
    results: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        local_names: PropTypes.objectOf(PropTypes.string), 
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
        country: PropTypes.string.isRequired,
        state: PropTypes.string, 
      })
    ).isRequired,
    handleSetLocation: PropTypes.func.isRequired
  };