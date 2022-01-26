import React, {useEffect, useState} from 'react';
import './TodayTab.css';
import axios from "axios";
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";

const apiKey = 'e83828f7bbfffd7654ad4c1b8cf1b978';

function TodayTab({coordinates}) {
    const [forecast, setForecast] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect( () => {
        async function fetchData() {
            setError(false);
            setLoading(true);
            try {
                const result = await axios.get(` https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,daily&appid=${apiKey}`);
                setForecast([
                    result.data.hourly[3],
                    result.data.hourly[5],
                    result.data.hourly[7],
                ]);
            } catch (e) {
                setError(true);
                console.error(e);
            }
            setLoading(false);

            if (coordinates) {
                fetchData();
            }}}, [coordinates]);

    return (
        <div className="tab-wrapper">
            {error && <span>Het is niet gelukt het weer op te halen</span>}
            <div className="chart">
                {forecast.map( (forecast) => {
                    return <WeatherDetail
                        key={forecast.dt}
                        temp={forecast.temp}
                        type={forecast.weather[0].main}
                        description={forecast.weather[0].description}
                    />
                })}
                Hier komt de chart!
            </div>
            <div className="legend">
                <span>08:00 uur</span>
                <span>12:00 uur</span>
                <span>16:00 uur</span>
            </div>
        </div>
    );
}

export default TodayTab;
