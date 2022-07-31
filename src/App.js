import React, { useState, useEffect } from 'react';
// import images
import ClearImg from './assets/clear.png';
import CloudsImg from './assets/clouds.png';
import HazeImg from './assets/haze.png';
import DrizzleImg from './assets/drizzle.png';
import RainImg from './assets/rain.png';
import SnowImg from './assets/snow.png';
import ThunderstormImg from './assets/thunderstorm.png';
// import axios
import axios from 'axios';
// api key
const APIkey = 'bcf2048bc3be154bded8f277f580ba2e';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Bucharest');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    if (inputValue !== '') {
      setLocation(inputValue);
    }
    document.querySelector('input').value = '';
    e.preventDefault();
  };

  // fetch data
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
        }, 500);
      })
      .catch((err) => {
        setError(err);
      });
  }, [location]);

  if (!data) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>{error.response.data.message}</h1>;
  }

  let weatherMain = data.weather[0].main;
  let imageSrc = '';

  // set image src accourding to the weather
  switch (weatherMain) {
    case 'Clouds':
      imageSrc = CloudsImg;
      break;
    case 'Clear':
      imageSrc = ClearImg;
      break;
    case 'Haze':
      imageSrc = HazeImg;
      break;
    case 'Snow':
      imageSrc = SnowImg;
      break;
    case 'Rain':
      imageSrc = RainImg;
      break;
    case 'Drizzle':
      imageSrc = DrizzleImg;
      break;
    case 'Thunderstorm':
      imageSrc = ThunderstormImg;
      break;
  }

  return (
    <div className='flex h-screen justify-center items-center px-8 xl:px-0'>
      <div className='w-full max-w-[1440px] h-[90vh] p-16 mx-auto bg-gradient-to-tl from-[#4D58DB] via-[#564ACD] to-[#6466DB] rounded-[40px]'>
        {/* form */}
        <form>
          <input
            onChange={(e) => setInputValue(e.target.value)}
            type='text'
            placeholder='Enter city name'
          />
          <button onClick={(e) => handleSubmit(e)} type='submit'>
            Search
          </button>
        </form>
        <div className='max-w-[420px] mx-auto text-white'>
          <h2 className='text-6xl font-extrabold drop-shadow-lg'>
            {data.name}
          </h2>
          <div className='text-2xl'>{parseInt(data.main.temp)} &#8451;</div>
          {/* image */}
          <div>
            <img src={imageSrc} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
