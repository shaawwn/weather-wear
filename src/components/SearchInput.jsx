import PropTypes from 'prop-types';

export default function SearchInput({handleChange, handleKeyPress, handleSetLocation, searchResults}) {


    function handleClick(result) {
        handleSetLocation(result)
    }

    function renderResults() {
        return searchResults.map((result, index) => 
            <p key={index} onClick={() => handleClick(result)}>{result.name}</p>
        )
    }


    return(
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
            <div className="dropdown">
                {renderResults()}
            </div>
        :null
        }        
        </div>
    )
}

SearchInput.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    handleSetLocation: PropTypes.func.isRequired,
    searchResults: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
      })
    ).isRequired,
  };
  