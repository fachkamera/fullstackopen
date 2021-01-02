import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryDetails from './components/CountryDetails';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    if (query.length) {
      axios
        .get('https://restcountries.eu/rest/v2/name/' + query)
        .then((response) => {
          setCountries(response.data);
        });
    }
  }, [query]);
  const handleQueryChange = (e) => {
    setQuery(e.target.value.trim().toLowerCase());
  };
  return (
    <>
      <h1>Countries</h1>
      <div>
        <input value={query} onChange={handleQueryChange} />
      </div>
      <CountryDetails countries={countries} setCountries={setCountries} />
    </>
  );
};

export default App;
