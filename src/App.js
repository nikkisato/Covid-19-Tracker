import './App.css';
import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@material-ui/core';
import InfoBox from './Components/InfoBox/InfoBox';
import Map from './Components/Map/Map';
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
      <div className='app__left'>
        {' '}
        <div className='app__header'>
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='app__stats'>
          <InfoBox title='Coronavirus Cases' total={2000} cases={123} />
          <InfoBox title='Recovered' total={2000} cases={123} />
          <InfoBox title='Deaths' total={2000} cases={123} />
        </div>
        <Map />
      </div>

      <Card className='app__right'>
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/*Table*/}
          <h3>Worldwide new cases</h3>
          {/*Graph*/}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
