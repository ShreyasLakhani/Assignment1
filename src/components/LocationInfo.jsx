import React from 'react';

function LocationInfo({ data }) {
  return (
    <div className='text-white h-[40vh]'>
      <p className='text-3xl font-semibold '>Location Information</p><br />
      <p className='w-56 flex justify-between items-center'> <b className='text-lg'>Country :</b> {data.country}</p>
      <p className='w-56 flex justify-between items-center'><b className='text-lg'>State :</b> {data.places[0].state}</p>
      <p className='w-56 flex justify-between items-center'><b className='text-lg'>Place Name :</b> {data.places[0]["place name"]}</p>
    </div>
  );
}

export default LocationInfo;
