import React, { useState, useEffect } from "react";
import './index.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";


import InfoBox from "./infoBox";
import Map from "./Map";

function App() {

  const [country, setCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});

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
  setCountry(countryCode);

  const url = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

await fetch(url).then(response => response.json()).then(data => {
setCountry(countryCode);
  setCountryInfo(data);

})


};
console.log("TEST!!!!",  countryInfo);  
  return (
    <div className="app">
    <div className="app__left">
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


<div className="app__stats">
<InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
<InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
<InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>

</div>

<Map />
</div>
<Card className="app__right">
<CardContent>
<h3>Live Cases by Country</h3>
<h3>Worldwide new cases</h3>
</CardContent>
</Card>
</div>
  );
}

export default App;