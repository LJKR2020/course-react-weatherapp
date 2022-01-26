import React, {useEffect, useState} from 'react';
import './ForecastTab.css';
import axios from 'axios';
import kelvinToCelsius from "../../helpers/kelvinToCelsius";
import createDateString from "../../helpers/createDateString";

function ForecastTab({coordinates}) {
    const [forecasts, setForecasts] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            toggleError(false);
            toggleLoading(true);

            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,hourly&appid=${apiKey}&lang=nl`);
                setForecasts(result.data.daily.slice(1, 6));
            } catch (e) {
                toggleError(true);
                console.error(e);
            }
            toggleLoading(false);
        }

        if (coordinates) {
            fetchData()
        }
    }, [coordinates]);

    return (
        <div className="tab-wrapper">
            {loading && <span>Loading...</span>}
            {forecasts.length === 0 && !error && <span className="no-forecast">
                    Zoek eerst een locatie om het weer voor deze week te bekijken.
                </span>}
            {error && <span className="wrong-location-error">
                Er is iets misgegaan bij het ophalen van de data
            </span>}
            {forecasts && forecasts.map((day) => {
                return (
                    <article className="forecast-day">
                        <p className="day-description">
                            {createDateString(day.dt)}
                        </p>
                        <section className="forecast-weather">
                        <span>
                            {kelvinToCelsius(day.temp.day)}
                        </span>
                            <span className="weather-description">
                            {day.weather[0].description}
                        </span>
                        </section>
                    </article>
                )
            })}
        </div>
    )
}

export default ForecastTab;
