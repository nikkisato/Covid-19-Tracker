import './App.css';
import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  //Card,
  //CardContext,
} from '@material-ui/core';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  const onCountryChange = async event => {
    event.preventDefault();
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country, //United States
            value: country.countryInfo.iso2, //UK, USA,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  return (
    <div className='app'>
      <div className='app__header'>
        <h1>COVID-19 TRACKER</h1>
        <FormControl className='app__dropdown'>
          <Select variant='outlined' value={country} onChange={onCountryChange}>
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            {countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/*InfoBox*/}
      {/*InfoBox*/}
      {/*InfoBox*/}

      {/*Map*/}

      {/*Table*/}
    </div>
  );
}

export default App;
