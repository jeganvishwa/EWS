import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Warning_subdivision.css';
import Rainfall_district from './Rainfall_district';

export const Sidebar = () => {
  const [item, setItem] = useState("ocean");
  const selectedtype = "";

  const displayicon = (temp) => {
    setItem(temp);
  };

  switch (item) {
    case 'Rainfall_district':
      return <Rainfall_district />;
    // case 'Home':
    //   return <Home />;
  }

  return (
    <div className="mt-3">

<Link to="/Home" className="no-link-style">
        <p 
          className={`text-light pointer menu-side ${selectedtype === 'storm' ? 'sele' : ''}`} 
          onClick={() => displayicon('Home')}
        >
          <img 
            src="https://img.icons8.com/?size=100&id=vQ1V1tQKynEK&format=png&color=000000" 
            alt="Storm Surge Icon" 
            style={{ width: '2em', height: '2em' }} 
          /> 
          Home
        </p>
      </Link>

      <Link to="/Rainfall_state" className="no-link-style">
        <p 
          className={`text-light pointer menu-side ${selectedtype === 'storm' ? 'sele' : ''}`} 
          onClick={() => displayicon('Rainfall_state')}
        >
          <img 
            src="https://img.icons8.com/?size=100&id=vQ1V1tQKynEK&format=png&color=000000" 
            alt="Storm Surge Icon" 
            style={{ width: '2em', height: '2em' }} 
          /> 
          Rainfall State
        </p>
      </Link>

      {/* <Link to="/Rainfall_district" className="no-link-style"> */}
        <p 
          className={`text-light pointer menu-side ${selectedtype === 'storm' ? 'sele' : ''}`} 
          onClick={() => displayicon('Rainfall_district')}
        >
          <img 
            src="https://img.icons8.com/?size=100&id=vQ1V1tQKynEK&format=png&color=000000" 
            alt="Storm Surge Icon" 
            style={{ width: '2em', height: '2em' }} 
          /> 
          Rainfall_district
        </p>
      {/* </Link> */}

      <Link to="/Warning_subdivision" className="no-link-style">
        <p 
          className={`text-light pointer menu-side ${selectedtype === 'storm' ? 'sele' : ''}`} 
          onClick={() => displayicon('Warning_subdivision')}
        >
          <img 
            src="https://img.icons8.com/?size=100&id=vQ1V1tQKynEK&format=png&color=000000" 
            alt="Storm Surge Icon" 
            style={{ width: '2em', height: '2em' }} 
          /> 
          Warning Subdivision
        </p>
      </Link>

      <Link to="/Warning_district" className="no-link-style">
        <p 
          className={`text-light pointer menu-side ${selectedtype === 'tsunami' ? 'sele' : ''}`} 
          onClick={() => displayicon('Warning_district')}
        >
          <img 
            src="https://img.icons8.com/?size=100&id=rKhhjCBChZFC&format=png&color=000000" 
            alt="Tsunami Icon" 
            style={{ width: '2em', height: '2em' }} 
          /> 
          Warning District
        </p>
      </Link>

      <Link to="/Nowcast_district" className="no-link-style">
        <p 
          className={`text-light pointer menu-side ${selectedtype === 'astronomical' ? 'sele' : ''}`} 
          onClick={() => displayicon('Nowcast_district')}
        >
          <img 
            src="https://img.icons8.com/?size=100&id=l_AX_kXOr_Ta&format=png&color=000000" 
            alt="Astronomical Tides Icon" 
            style={{ width: '2em', height: '2em' }} 
          /> 
          Nowcast District 
        </p>
      </Link>

      <Link to="/Nowcast_station" className="no-link-style">
        <p 
          className={`text-light pointer menu-side ${selectedtype === 'storm' ? 'sele' : ''}`} 
          onClick={() => displayicon('Nowcast_station')}
        >
          <img 
            src="https://img.icons8.com/?size=100&id=vQ1V1tQKynEK&format=png&color=000000" 
            alt="Storm Surge Icon" 
            style={{ width: '2em', height: '2em' }} 
          /> 
          Nowcast Station
        </p>
      </Link>

      <Link to="/Rainfall_forecast_dis" className="no-link-style">
        <p 
          className={`text-light pointer menu-side ${selectedtype === 'storm' ? 'sele' : ''}`} 
          onClick={() => displayicon('Rainfall_forecast_dis')}
        >
          <img 
            src="https://img.icons8.com/?size=100&id=vQ1V1tQKynEK&format=png&color=000000" 
            alt="Storm Surge Icon" 
            style={{ width: '2em', height: '2em' }} 
          /> 
          Rainfall Forecast District
        </p>
      </Link>
      
    </div>
  );
};
