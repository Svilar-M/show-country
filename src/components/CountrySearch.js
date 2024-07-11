import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryInfo from './CountryInfo';
import './CountrySearch.css';

const CountrySearch = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      if (query) {
        try {
          const response = await axios.get(`https://restcountries.com/v3.1/name/${query}`);
          setCountries(response.data);
        } catch (error) {
          console.error("Error fetching countries:", error);
        }
      } else {
        setCountries([]);
      }
    };

    fetchCountries();
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setCountries([]);
    setQuery('');
  };

  return (
    <div className="country-search-container">
      <input 
        type="text" 
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a country"
        className="country-search-input"
      />
      {countries.length > 0 && (
        <ul className="country-search-dropdown">
          {countries.map((country) => (
            <li key={country.cca3} onClick={() => handleSelectCountry(country)}>
              {country.name.common}
            </li>
          ))}
        </ul>
      )}
      {selectedCountry && <CountryInfo country={selectedCountry} />}
    </div>
  );
};

export default CountrySearch;
