import "./App.css";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";

import Table from "./components/Table";
import { sortData } from "./util";
import LineGraph from "./components/LineGraph";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("mundo");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then((response) =>
        response.json().then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        })
      );
    };
    getCountriesData();
  }, []);

  //console.log(countryInfo);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "mundo"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        {/*Header*/}
        <div className="app__header">
          {/*Title + input dropdown*/}
          <h1>Covid Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="filled" value={country} onChange={onCountryChange}>
              <MenuItem value="mundo">Mundo</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.name} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          {/*InfoBoxes*/}
          <InfoBox
            title="Casos Hoy"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Muertes"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
          <InfoBox
            title="Recuperados"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox title="Activos" cases={countryInfo.active} total="-" />
        </div>

        <div className="app__lineGraph">
          <h3>Casos por día desde el inicio de la Pandemia</h3>
          <LineGraph />
        </div>

        {/*Map*/}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Casos Diarios por Países</h3>
          <Table countries={tableData} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
