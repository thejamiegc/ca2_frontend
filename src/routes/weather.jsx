import React, {useEffect, useState} from 'react';
import facade from "../apiFacade.js";
import {weatherURL} from "../settings.js";


function Weather({user}) {
    let weatherCity = {
        tempF: "",
        tempC: "",
        conditions: "",

    };

    const handleInputChange = (e) =>{
        setInputvalue(e.target.value);
    };

    const [dataFromServer, setDataFromServer] = useState("");
    const [weather,setWeather] = useState(weatherCity);
    const [inputValue,setInputvalue] = useState("");

    const getWeather = () =>{
        console.log(inputValue)
        if(inputValue !== ""){
            fetch(weatherURL +"/" + inputValue)
                .then(response => response.json())
                .then(data => {
                    setWeatherCity(data)
                    console.log(data)
                }).catch(err => {
                weatherCity.city= "could not find a city name: ";
                weatherCity.temp= "";
                weatherCity.conditions= "";
                setWeather(weatherCity)
                console.error(err);
            });
        }
        //setInputvalue ( "");
    }

    useEffect( () => {
        if(user.username === ''){ setDataFromServer('Please login to see date from server');

            return;
        }
        const url = user.roles.split(',').includes('user') ? '/info/user' : '/info/admin';
        facade.fetchData(url).then(res => {

            console.log(res);
            setDataFromServer("")});
    },[user]);

    const setWeatherCity = (data) =>{
        weatherCity.tempF=  data.tempInF + "°F";
        weatherCity.tempC=  data.tempInC + "°C";
        weatherCity.conditions = data.condition;
        setWeather(weatherCity)
    }



    return (
        <div>
            <input type="text" value={inputValue} onChange={handleInputChange} />
            <button onClick={getWeather}>Search</button>
            <br/>
            {weather.tempF} <br/>
            {weather.tempC} <br/>
            {weather.conditions} <br/>

        </div>
    );
}

export default Weather;