import React, { useState } from 'react';
import './WeatherApp.css';
import 'leaflet/dist/leaflet.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';

const WeatherApp = () => {

    let apiKey = '2e06dc85affd66bd7948d8d171200443';

    const [searchInput, setSearchInput] = useState("");
    const [wicon, setWicon] = useState(clear_icon);
    const [mapUrl, setMapUrl] = useState('');

    const convertUnixTimestamp = (unixTimestamp, timezone) => {
        const utcDate = new Date(unixTimestamp * 1000);
        const timezoneOffsetInMilliseconds = timezone * 1000;
        const localDate = new Date(utcDate.getTime() + timezoneOffsetInMilliseconds);
        let hours = localDate.getUTCHours();
        let minutes = localDate.getUTCMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    function deg2rad(deg) {
        return (deg * Math.PI / 180);
    }

    function long2tile(lon, zoom) {
        return Math.floor((lon + 180) / 360 * Math.pow(2, zoom));
    }
    
    function lat2tile(lat, zoom) {
        return Math.floor((1 - Math.log(Math.tan(deg2rad(lat)) + 1 / Math.cos(deg2rad(lat))) / Math.PI) / 2 * Math.pow(2, zoom));
    }

    const search = async () => {
        if (searchInput === ""){
            return;
        }
        const element = document.getElementsByClassName("cityInput");
        const input = element[0].value;
        if (input === ""){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=Metric&appid=${apiKey}`;
        let response = await fetch(url);
        let data = await response.json();

        let zoom = 3;
        let layer = 'temp_new';
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let x = long2tile(lon, zoom);
        let y = lat2tile(lat, zoom);
        let urlMap = `https://tile.openweathermap.org/map/${layer}/${zoom}/${x}/${y}.png?appid=${apiKey}`;
        setMapUrl(urlMap);

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temprature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");
        const feels = document.getElementsByClassName('temp');
        const sunrise = document.getElementsByClassName('time-sunrise');
        const sunset = document.getElementsByClassName('time-sunset');

        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        temprature[0].innerHTML = Math.floor(data.main.temp) + " °C";
        location[0].innerHTML = data.name;
        feels[0].innerHTML = Math.floor(data.main.feels_like) + " °C";
        sunrise[0].innerHTML = convertUnixTimestamp(data.sys.sunrise, data.timezone);
        sunset[0].innerHTML = convertUnixTimestamp(data.sys.sunset, data.timezone);
        
        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
            setWicon(clear_icon);
        } else if(data.weather[0].icon==="02d" || data.weather[0].icon === "02n"){
            setWicon(cloud_icon);
        } else if(data.weather[0].icon==="03d" || data.weather[0].icon === "03n"){
            setWicon(drizzle_icon);
        } else if(data.weather[0].icon==="04d" || data.weather[0].icon === "04n"){
            setWicon(cloud_icon)
        } else if(data.weather[0].icon==="09d" || data.weather[0].icon === "09n"){
            setWicon(rain_icon);
        } else if(data.weather[0].icon==="10d" || data.weather[0].icon === "10n"){
            setWicon(rain_icon);
        } else if(data.weather[0].icon==="13d" || data.weather[0].icon === "13n"){
            setWicon(snow_icon);
        } else {
            setWicon(clear_icon)
        }

        setSearchInput("");
    }

    return (
        <div className='container'>
            <div className='search-bar'>
                <input type='text' className='cityInput' placeholder='Search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                <div className='search-icon' onClick={() => {search()}} >
                    <img src={search_icon} alt="" />
                </div>    
            </div>
            <div className='widgets'>
                <div className='main-widget'>
                     <div className='weather-image'>
                         <img src={wicon} alt='Weather Icon' />
                     </div>
                     <div className='weather-temp'>24 °C</div>
                     <div className='weather-location'>London</div>
                 </div>
                 <div className='humidity'>
                    <div className='data'>
                        <div className='text'>Humidity</div>
                        <div className='humidity-percent'>64 %</div>
                    </div>
                </div>
                <div className='wind-speed'>
                    <div className='data'>
                        <div className='text'>Wind Speed</div>
                        <div className='wind-rate'>18 m/h</div>
                    </div>
                </div>
                <div className='feels-like'>
                    <div className='data'>
                        <div className='text'>Feels like</div>
                        <div className='temp'>18 °C</div> 
                    </div>
                </div>
                <div className='map'>
                    <div className='data'>
                        {/* <div className='text'>Temperature map</div> */}
                        <div className='temp-map'>
                            <img src={mapUrl} alt="Temperature Map" className='temp-map'/>
                        </div>
                    </div>
                </div>
                <div className='sunrise'>
                    <div className='data'>
                        <div className='text'>Sunrise</div>
                        <div className='time-sunrise'>6:19 AM</div>
                    </div>
                </div>
                <div className='sunset'>
                    <div className='data'>
                        <div className='text'>Sunset</div>
                        <div className='time-sunset'>17:14 PM</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherApp;