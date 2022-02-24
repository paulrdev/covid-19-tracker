import React, { useState, useEffect } from "react";
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

function App() {

  const [country, setInputCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);

        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
  const countryCode = e.target.value;
  setInputCountry(countryCode);
}

  return (
    <div className="app">
      <h1>covid 19 tracker</h1>
      <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
            >
                        <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
         
          </FormControl>
    </div>
  );
}

export default App;
