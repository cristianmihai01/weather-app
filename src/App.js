import React, { useState, useEffect } from 'react';
// import axios
import axios from 'axios';
// import images
import ClearImg from './assets/clear.png';
import CloudsImg from './assets/clouds.png';
import HazeImg from './assets/haze.png';
import DrizzleImg from './assets/drizzle.png';
import RainImg from './assets/rain.png';
import SnowImg from './assets/snow.png';
import ThunderstormImg from './assets/thunderstorm.png';
// import icons
import { BiSearchAlt } from 'react-icons/bi';

const App = () => {
  // api key
  const APIkey = 'bcf2048bc3be154bded8f277f580ba2e';
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
        }, 1000);
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

  let imageSrc = '';

  // set image src accourding to the weather
  switch (data.weather[0].main) {
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

  console.log(data);

  return (
    <div className='flex h-screen justify-center items-center px-8 xl:px-0'>
      <div className='w-[90vw] max-w-[1440px] h-[90vh] p-16 mx-auto bg-gradient-to-tl from-[#4D58DB] via-[#564ACD] to-[#6466DB] rounded-[40px]'>
        {/* form */}
        <form className='bg-white h-16 max-w-[400px] mx-auto rounded-full mb-12'>
          <div className='flex h-full justify-between p-1'>
            <input
              className='flex-1 bg-transparent border-none outline-none pl-6'
              onChange={(e) => setInputValue(e.target.value)}
              type='text'
              placeholder='Enter city name'
            />
            <button
              className='bg-[#45afff] hover:bg-[#38a7fc] w-20 rounded-full flex justify-center items-center transition'
              onClick={(e) => handleSubmit(e)}
              type='submit'
            >
              <BiSearchAlt className='text-2xl text-white' />
            </button>
          </div>
        </form>
        <div className='max-w-[400px] mx-auto text-white'>
          {/* city/country name */}
          <h2 className='text-6xl font-extrabold drop-shadow-lg'>
            {data.name}
          </h2>
          <div className='flex flex-row -space-x-28 space-y-14 items-center relative h-80'>
            <div className='relative'>
              <h2 className='text-[180px] lg:text-[220px] font-extrabold leading-none tracking-[-6px] text-transparent bg-clip-text bg-gradient-to-t from-white/30 to-white drop-shadow-lg'>
                {parseInt(data.main.temp)}
              </h2>
              {/* degree symbol */}
              <div className='absolute -top-12 -right-4 text-[140px] font-black text-transparent bg-clip-text bg-gradient-to-t from-white/30 to-white drop-shadow-lg'>
                &#176;
              </div>

              <div className='absolute top-0 text-4xl font-bold text-[#FDC002]'>
                {data.weather[0].main}
              </div>
            </div>

            {/* image */}
            <div className='flex-1 z-10'>
              <img src={imageSrc} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
