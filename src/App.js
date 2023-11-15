import React, { useState } from 'react';
import LocationInfo from './components/LocationInfo';
import toast, { Toaster } from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios';

function App() {
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('in');
  const [locationInfo, setLocationInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLocationInfo = async () => {
    setIsLoading(true);
    setLocationInfo(null)
    
    try {
      const response = await axios.get(`https://api.zippopotam.us/${country}/${postalCode}`);
      setLocationInfo(response.data);
    } catch (err) {
      toast.error('404 not found');
      setLocationInfo(null)
      setPostalCode('')
    }
    setIsLoading(false);

  };

  const clearData = () => {
    setPostalCode('');
    setLocationInfo(null);
  };

  return (
    <div className='flex justify-center items-center h-screen w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
      <div className='w-1/3 h-[50vh] bg-[rgb(241_245_249/20%)] rounded-2xl'>
        <div className='flex justify-center gap-5 mt-5'>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className='cursor-pointer rounded-lg outline-none'
          >
            <option value="us">us</option>
            <option value="in">in</option>
            <option value="ca">ca</option>
          </select>
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className='border-[1px] text-xs border-gray-500 rounded-md outline-none w-[45%] h-8 ps-2'
          />
          <button className='bg-cyan-400 text-white font-semibold w-[80px] ms-3 rounded-md cursor-pointer text-sm h-8' onClick={fetchLocationInfo}>Search</button>
          <Trash2
            size={30}
            className='cursor-pointer bg-red-500 p-1 rounded-md text-red-900'
            onClick={clearData}
          />
          <Toaster />
        </div>
        <div className='flex justify-center mt-10'>
          {locationInfo && <LocationInfo data={locationInfo} />}
          <div className='mt-16'> {isLoading ? <ThreeDots
            height="80"
            width="80"
            radius="7"
            color="white"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          /> : null}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
