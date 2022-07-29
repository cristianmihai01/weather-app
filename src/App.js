import React, { useState, useEffect } from 'react';

// import axios
import axios from 'axios';

// your api key
const APIkey = 'bcf2048bc3be154bded8f277f580ba2e';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Bucharest');

  // get the data for the selected location
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios.get(url).then((response) => {
      setTimeout(() => {
        setData(response.data);
      }, 500);
    });
  }, []);

  if (!data) {
    return <h1>Loading</h1>;
  }

  const { main, weather, sys, wind } = data;
  console.log(data);
  return (
    <div className='bg-black/20'>
      <div className='max-w-[1440px] mx-auto'>
        <h2 className='text-7xl'>{data.name}</h2>
        <div className='text-2xl'>{main.temp} &#8451;</div>
      </div>
    </div>
  );
};

export default App;
