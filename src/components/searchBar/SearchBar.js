import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar( {setLocation} ) {
    const [query, setQuery] = useState("");

    function onFormSubmit(e) {
        e.preventDefault();
        setLocation(query);
    }

    return (
        <form className="searchbar" onSubmit={onFormSubmit}>
            <input
                type="text"
                name="search"
                value={query}
                placeholder="Zoek een stad in Nederland"
                onChange={(e) => setQuery(e.target.value)}
            />

            <button type="submit">
                Zoek
            </button>
        </form>
    );
}

export default SearchBar;
