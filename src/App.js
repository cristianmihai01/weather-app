import React, { useState, useEffect } from 'react';
// import axios
import axios from 'axios';

// import icons
import { IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow } from 'react-icons/io';
import { BsFillCloudHaze2Fill, BsCloudDrizzleFill } from 'react-icons/bs';
import { RiThunderstormsFill } from 'react-icons/ri';

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
      icon = <RiThunderstormsFill />;
      break;
  }

  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center pt-24'>
      {/* form */}
      <form className='mb-48'>form</form>
      {/* card */}
      <div className='w-full max-w-[450px] bg-black/20 backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
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
            <div className='flex gap-x-1'>
              <div>icon</div>
              <div>text</div>
            </div>
            <div className='flex gap-x-1'>
              <div>icon</div>
              <div>text</div>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-x-1'>
              <div>icon</div>
              <div>text</div>
            </div>
            <div className='flex gap-x-1'>
              <div>icon</div>
              <div>text</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

// <div className='flex h-screen justify-center items-center px-8 xl:px-0'>
// <div className='w-[90vw] max-w-[1440px] h-[90vh] p-16 mx-auto bg-gradient-to-tl from-[#4D58DB] via-[#564ACD] to-[#6466DB] rounded-[40px]'>
//   {/* form */}
//   <form className='bg-white h-16 max-w-[400px] mx-auto rounded-full mb-12'>
//     <div className='flex h-full justify-between p-1'>
//       <input
//         className='flex-1 bg-transparent border-none outline-none pl-6'
//         onChange={(e) => setInputValue(e.target.value)}
//         type='text'
//         placeholder='Enter city name'
//       />
//       <button
//         className='bg-[#45afff] hover:bg-[#38a7fc] w-20 rounded-full flex justify-center items-center transition'
//         onClick={(e) => handleSubmit(e)}
//         type='submit'
//       >
//         <BiSearchAlt className='text-2xl text-white' />
//       </button>
//     </div>
//   </form>
//   <div className='max-w-[400px] mx-auto text-white'>
//     <div className='text-center'>
//       <h2 className='text-6xl font-extrabold drop-shadow-lg'>
//         {data.name}
//       </h2>
//       <h3 className='text-[28px] font-light'>Wed, 13 Jun</h3>
//     </div>
//     <div className='flex flex-row -space-x-24 space-y-14 items-center relative h-80'>
//       <div className='relative'>
//         <h2 className='text-[180px] lg:text-[220px] font-extrabold leading-none tracking-[-6px] text-transparent bg-clip-text bg-gradient-to-t from-white/30 to-white drop-shadow-lg'>
//           {parseInt(data.main.temp)}
//         </h2>

//         {/* degree symbol */}
//         <div className='absolute -top-12 -right-4 text-[140px] font-black text-transparent bg-clip-text bg-gradient-to-t from-white/30 to-white drop-shadow-lg'>
//           &#176;
//         </div>

//         <div className='absolute top-0 text-4xl font-bold text-[#FDC002]'>
//           {data.weather[0].main}
//         </div>
//       </div>

//       {/* image */}
//       <div className='flex-1 z-10'>
//         <img src={imageSrc} />
//       </div>
//     </div>
//   </div>
// </div>
// </div>
