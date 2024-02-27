import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';

const WeatherApp = () => {

    let apiKey = '2e06dc85affd66bd7948d8d171200443';

    const [wicon, setWicon] = useState(clear_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        const input = element[0].value;
        if (input === ""){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=Metric&appid=${apiKey}`;
        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temprature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");
        const feels = document.getElementsByClassName('temp')

        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        temprature[0].innerHTML = Math.floor(data.main.temp) + " °C";
        location[0].innerHTML = data.name;
        feels[0].innerHTML = Math.floor(data.main.feels_like) + " °C";
        
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
    }

    return (
        // <div className='container'>
        //     <div className='top-bar'>
        //         <input type='text' className='cityInput' placeholder='Search'/>
        //         <div className='search-icon' onClick={() => {search()}} >
        //             <img src={search_icon} alt="" />
        //         </div>
        //     </div>
        //     <div className='weather-widget'>
        //         <div className='weather-main'>
        //             <div className='weather-image'>
        //                 <img src={wicon} alt='Weather Icon' />
        //             </div>
        //             <div className='weather-temp'>24</div>
        //             <div className='weather-location'>London</div>
        //         </div>
                // <div className='weather-detail humidity'>
                //     <div className='data'>
                //         <div className='humidity-percent'>64</div>
                //         <div className='text'>Humidity</div>
                //     </div>
                // </div>
                // <div className='weather-detail wind-speed'>
                //     <div className='data'>
                //         <div className='wind-rate'>18 m/h</div>
                //         <div className='text'>Wind Speed</div>
                //     </div>
                // </div>
                // <div className='weather-detail feels-like'>
                //     <div className='data'>
                //         <div className='wind-rate'>18 m/h</div>
                //         <div className='text'>Feels like</div>
                //     </div>
                // </div>
                // <div className='weather-map'>
                //     <div className='data'>
                //         <div className='text'>map</div>
                //     </div>
                // </div>
        //     </div>
        // </div>
        <div className='container'>
            <div className='search-bar'>
                <input type='text' className='cityInput' placeholder='Search'/>
                <div className='search-icon' onClick={() => {search()}} >
                    <img src={search_icon} alt="" />
                </div>    
            </div>
            <div className='widgets'>
                <div className='main-widget'>
                     <div className='weather-image'>
                         <img src={wicon} alt='Weather Icon' />
                     </div>
                     <div className='weather-temp'>24</div>
                     <div className='weather-location'>London</div>
                 </div>
                 <div className='humidity'>
                    <div className='data'>
                        <div className='humidity-percent'>64</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='wind-speed'>
                    <div className='data'>
                        <div className='wind-rate'>18 m/h</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
                <div className='feels-like'>
                    <div className='data'>
                        <div className='temp'>18</div>
                        <div className='text'>Feels like</div>
                    </div>
                </div>
                <div className='map'>
                    <div className='data'>
                        <div className='text'>map</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherApp;