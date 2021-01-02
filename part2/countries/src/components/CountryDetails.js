import { useEffect } from 'react';
import axios from 'axios';

const CountryList = ({ countries, setCountries }) => {
  const toggleVisibility = (country) => {
    return () => {
      const updatedCountries = [...countries];
      const currentCountry =
        updatedCountries[updatedCountries.indexOf(country)];
      currentCountry.isVisible = !currentCountry.isVisible;
      setCountries(updatedCountries);
    };
  };
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name}>
          {country.name}{' '}
          <button onClick={toggleVisibility(country)}>
            {country.isVisible ? 'hide' : 'show'}
          </button>
          {country.isVisible ? (
            <CountryDetail
              country={country}
              countries={countries}
              setCountries={setCountries}
            />
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
};

const CountryDetail = ({ country, countries, setCountries }) => {
  useEffect(() => {
    if (!country.weatherData) {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_KEY}&query=${country.capital}`
        )
        .then((res) => {
          const weather = res.data.current;
          const updatedCountries = [...countries];
          const currentCountry =
            updatedCountries[updatedCountries.indexOf(country)];
          currentCountry.weatherData = {
            temperature: weather.temperature,
            weather_icons: weather.weather_icons,
            weather_descriptions: weather.weather_descriptions,
            wind_speed: weather.wind_speed,
            wind_dir: weather.wind_dir,
          };
          setCountries(updatedCountries);
        });
    }
  }, [country, countries, setCountries]);

  return (
    <article>
      <h2>{country.name}</h2>
      <p>
        capital {country.capital}
        <br />
        population {country.population}
      </p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="180" alt={'flag of ' + country.name} />
      <h3>Weather in {country.capital}</h3>
      {country.weatherData && (
        <>
          <p>
            <strong>temperature:</strong> {country.weatherData.temperature}°
            Celsius
          </p>
          <p>
            {country.weatherData.weather_icons.map((icon, index) => (
              <img
                key={icon}
                src={icon}
                title={country.weatherData.weather_descriptions[index]}
                alt={country.weatherData.weather_descriptions[index]}
              />
            ))}
          </p>
          <p>
            <strong>wind:</strong> {country.weatherData.wind_speed} mph
            direction {country.weatherData.wind_dir}
          </p>
        </>
      )}
    </article>
  );
};

const CountryDetails = ({ countries, setCountries }) => {
  if (countries.length)
    return (
      <div>
        {countries.length > 10 ? (
          'Too many matches, please refine your query'
        ) : countries.length > 1 ? (
          <CountryList countries={countries} setCountries={setCountries} />
        ) : (
          <CountryDetail
            country={countries[0]}
            countries={countries}
            setCountries={setCountries}
          />
        )}
      </div>
    );
  return <>start typing</>;
};

export default CountryDetails;
