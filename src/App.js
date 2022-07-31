import React, { useState, useEffect } from 'react';
// import axios
import axios from 'axios';

// import icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
} from 'react-icons/io';
import {
  BsFillCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from 'react-icons/bs';

const App = () => {
  // api key
  const APIkey = 'bcf2048bc3be154bded8f277f580ba2e';
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Bucharest');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (e) => {
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
    return (
      <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
        <h1>Loading</h1>
      </div>
    );
  }

  let icon = '';

  console.log(data);

  // set image src accourding to the weather
  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy />;
      break;
    case 'Haze':
      icon = <BsFillCloudHaze2Fill />;
      break;
    case 'Rain':
      icon = <IoMdRainy />;
      break;
    case 'Clear':
      icon = <IoMdSunny />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill />;
      break;
    case 'Snow':
      icon = <IoMdSnow />;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />;
      break;
  }

  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center pt-24'>
      {/* form */}
      <form className='mb-48'>form</form>
      {/* card */}
      <div className='w-full max-w-[450px] bg-black/20 text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
        {/* card top */}
        <div className='flex items-center gap-x-5'>
          <div className='text-[87px] text-sky-500'>{icon}</div>
          <div>
            <div>Valle de Angeles, HN</div>
            <div>Monday 01/17/2022</div>
          </div>
        </div>
        {/* card inner */}
        <div>
          <div>
            <div>15</div>
            <div>degree</div>
          </div>
          <div className='capitalize'>{data.weather[0].main}</div>
        </div>
        {/* card bottom */}
        <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
          <div className='flex justify-between'>
            <div className='flex items-center gap-x-1'>
              <div className='text-[20px]'>
                <BsEye />
              </div>
              <div>Visibility</div>
            </div>
            <div className='flex items-center gap-x-1'>
              <div className='text-[20px]'>
                <BsThermometer />
              </div>
              <div>Feels like</div>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex items-center gap-x-1'>
              <div className='text-[20px]'>
                <BsWater />
              </div>
              <div>Feels like</div>
            </div>
            <div className='flex items-center gap-x-1'>
              <div className='text-[20px]'>
                <BsWind />
              </div>
              <div>Wind</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
