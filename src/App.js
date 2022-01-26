import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import TodayTab from "./pages/todayTab/TodayTab";
import MetricSlider from './components/metricSlider/MetricSlider';
import './App.css';
import axios from 'axios';
import ForecastTab from "./pages/forecastTab/ForecastTab";
import kelvinToCelsius from "./helpers/kelvinToCelsius";

const apiKey = 'e83828f7bbfffd7654ad4c1b8cf1b978';

function App() {
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState('');
    const [error, toggleError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            toggleError(false);

            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${apiKey}&lang=nl`);
                setWeatherData(result.data);
            } catch (e) {
                toggleError(true);
                console.error(e);
            }
        }

        if (location) {
            fetchData();
        }

    }, [location]);


    return (
        <>
            <div className="weather-container">

                {/*HEADER -------------------- */}
                <div className="weather-header">
                    <SearchBar
                        setLocation={setLocation}
                    />
                    {error && <span className="wrong-location-error">
                        Oeps! Deze locatie bestaat niet
                    </span>}

                    <span className="location-details">

                        {Object.keys(weatherData).length > 0 &&
                        <>
                            <h2>{weatherData.weather[0].description}</h2>
                            <h3>{weatherData.name}</h3>
                            <h1>{kelvinToCelsius(weatherData.main.temp)}</h1>
                        </>
                        }
                    </span>
                </div>

                {/*CONTENT ------------------ */}
                <div className="weather-content">
                    <Router>
                        <TabBarMenu/>

                        <div className="tab-wrapper">
                            <Switch>
                                <Route exact path="/">
                                    <TodayTab />
                                </Route>
                                <Route path="/komende-week">
                                    <ForecastTab coordinates={weatherData.coord}/>
                                </Route>
                            </Switch>
                        </div>
                    </Router>

                </div>

                <MetricSlider/>
            </div>
        </>
    );
}

export default App;
