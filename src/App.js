import React, { useState, useEffect } from "react";
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";


import InfoBox from "./infoBox";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import {sortData, prettyPrintStat} from "./util.js"
import "leaflet/dist/leaflet.css";


function App() {

  const [country, setInputCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
const[mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
const [mapZoom, setMapZoom] = useState(3);
const [mapCountries, setMapCountries] = useState([]);


console.log("map centre",mapCenter);
  // fix for issue when page first loads and none of the cards are populated with the stats for worldwide
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
          
         
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
  const countryCode = e.target.value;
  //setCountry(countryCode);

  const url = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

await fetch(url).then(response => response.json()).then(data => {
setInputCountry(countryCode);
  setCountryInfo(data);
  setMapCenter({lat:data.countryInfo.lat, lng:data.countryInfo.long});
setMapZoom(4);
});
};

  return (
    <div className="app">
    <div className="app__left">
      <h1>covid 19 tracker</h1>



      <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
              key={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
         
          </FormControl>


<div className="app__stats">
<InfoBox title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}/>
<InfoBox title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/>
<InfoBox title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}/>
</div>

<Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom}/>
</div>
<Card className="app__right">
<CardContent>
<div className="app__information">
<h3>Live Cases by Country</h3>
<Table countries={tableData}/>
<h3>Worldwide new {casesType}</h3>
<LineGraph casesType={casesType}/>
</div>
</CardContent>
</Card>
</div>
  );
}

export default App;
