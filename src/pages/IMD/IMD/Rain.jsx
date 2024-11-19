import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './Warning_subdivision.css';
import Rainfall_district from './Rainfall_district';
import Rainfall_state from './Rainfall_state';
import Home from './Home';
import Warning_district from './Warning_district';
import Nowcast from './Nowcast';
import Nowcast_district from './Nowcast_district';
import AWS from './Aws';
import Others from './Others';
import IMD from '../template/IMD.JPG';


const Rain = () => {
  const [menu, setMenu] = useState("Home");
  const [currentIcon, setCurrentIcon] = useState('https://img.icons8.com/?size=100&id=aXgIQg8m0A4o&format=png&color=000000');
  const [rainIcon, setrainIcon] = useState('https://img.icons8.com/?size=100&id=ti8I98saaREE&format=png&color=000000');
  
  const selectedtype = "";

  const displayicon = (temp) => {
    setMenu(temp);
  };

  const renderComponent = () => {
    switch (menu) {
      case 'Rainfall_district':
        return <Rainfall_district />;
      case 'Rainfall_state':
        return <Rainfall_state />;
        case 'Warning_district':
        return <Warning_district />;
        case 'Warning_subdivision':
        return <Nowcast />;
        case 'Nowcast_district':
        return <Nowcast_district />;
        case 'AWS':
        return <AWS />;
        case 'Others':
        return <Others />;
        case 'Home':
          return <Home />;
      default:
        return <Home/>;
    }
  };


  const icons = ['https://img.icons8.com/?size=100&id=c0Otgmp74zQX&format=png&color=000000','https://img.icons8.com/?size=100&id=VT8HlhlnhUwL&format=png&color=000000','https://img.icons8.com/?size=100&id=3RZmbgKAmbsY&format=png&color=000000'];

  const rain_icons = ['https://img.icons8.com/?size=100&id=Ffhrqu7XqOF3&format=png&color=000000','https://img.icons8.com/?size=100&id=apACRpf65iU0&format=png&color=000000','https://img.icons8.com/?size=100&id=Wo3cn9xpwhNC&format=png&color=000000'];

  useEffect(() => {
    if (icons.length === 0) return; 
    const iconToggleInterval = setInterval(() => {
      setCurrentIcon((prevIcon) => {
        const currentIndex = icons.indexOf(prevIcon);
        const nextIndex = (currentIndex + 1) % icons.length;
        return icons[nextIndex];
      });
    }, 1000);
  
    return () => clearInterval(iconToggleInterval);
  }, []);


  
  useEffect(() => {
    if (rain_icons.length === 0) return; 
    const iconToggleInterval = setInterval(() => {
      setrainIcon((prevIcon) => {
        const currentIndex = rain_icons.indexOf(prevIcon);
        const nextIndex = (currentIndex + 1) % rain_icons.length;
        return rain_icons[nextIndex];
      });
    }, 1000);
  
    return () => clearInterval(iconToggleInterval);
  }, []);


  return (
    <div>
      <section className="pcoded-main-container" style={{ background: '#262626' }}>
        <div className="pcoded-content">
          <div className="row">   
                <div className="col-md-12 col-sm-12">
                           <div className="row">
                                    <div className='col-md-3 col-sm-2 text-right'>
                                        <img className='gcc-logo' src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Chennai_Corporation_Emblem.png" style={{height:'10vh',width:'8vh'}} alt="GCC_logo" />
                                        </div>
                                            <div className='col-md-6 col-sm-8 text-center'>
                                                <h3 className='gcc'><u>Greater Chennai Corporation</u></h3>
                                                {menu === "Home" && <h4 className='ofcc'>IMD Weather</h4>}
                                                {menu === "Rainfall_state" && <h4 className='ofcc'>Rainfall Forecast</h4>}
                                                {menu === "Warning_district" && <h4 className='ofcc'>Warnings</h4>}
                                                {menu === "Warning_subdivision" && <h4 className='ofcc'>Nowcast</h4>}
                                                {menu === "AWS" && <h4 className='ofcc'>AWS & ARG</h4>}
                                                {menu === "Nowcast_district" && <h4 className='ofcc'>Weather Forecast</h4>}
                                                {menu === "Rainfall_district" && <h4 className='ofcc'>Rainfall Information</h4>}
                                                {menu === "Others" && <h4 className='ofcc'>Port Warnings</h4>}
                                            </div>

                                        <div className='col-md-3 col-sm-22 text-left'>
                                        <img className='gcc-logo mt-3' src={IMD} style={{height:'8vh',width:'7vh'}} alt="Imd_logo" />
                                      </div>
                                 </div>
                            </div>


           <div className="col-md-12 col-sm-12" style={{ background: '#262626' }}>
             {/* <div className="card" style={{ background: '#262626' }}> */}
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-md-2 col-sm-12 border border-light rounded" style={{ background: '#ff9900', height: '100vh', overflowY: 'auto' }}>
                          <div className="mt-3">
                                <p className={`text-light pointer menu-side ${menu === 'Home' ? 'sele' : ''}`} 
                                  onClick={() => displayicon('Home')}>
                                  <img 
                                    src={currentIcon}
                                    alt="" 
                                    style={{ width: '2em', height: '2em' }} 
                                  /> 
                                   IMD Weather
                                </p>

                              <p className={`text-light pointer menu-side ${menu === 'Rainfall_state' ? 'sele' : ''}`} 
                                onClick={() => displayicon('Rainfall_state')} >
                                <img 
                                  src={rainIcon}
                                  alt="Storm Surge Icon" 
                                  style={{ width: '2em', height: '2em' }} 
                                /> 
                                Rainfall Forecast
                              </p>

                                <p className={`text-light pointer menu-side ${menu === 'Warning_district' ? 'sele' : ''}`} 
                                  onClick={() => displayicon('Warning_district')}>
                                  <img 
                                    src="https://img.icons8.com/?size=100&id=gxOm4myVx4vJ&format=png&color=000000" 
                                    alt="Storm Surge Icon" 
                                    style={{ width: '2em', height: '2em' }} 
                                  /> 
                                  Warning
                                </p>

                                <p className={`text-light pointer menu-side ${menu === 'Warning_subdivision' ? 'sele' : ''}`} 
                                  onClick={() => displayicon('Warning_subdivision')} >
                                  <img 
                                    src="https://img.icons8.com/?size=100&id=3R3nXi3f3Ioc&format=png&color=000000" 
                                    alt="Storm Surge Icon" 
                                    style={{ width: '2em', height: '2em' }} 
                                  /> 
                                  Nowcast
                                </p>
                                <p  className={`text-light pointer menu-side ${menu === 'AWS' ? 'sele' : ''}`} 
                                  onClick={() => displayicon('AWS')} >
                                  <img 
                                    src="https://img.icons8.com/?size=100&id=85POYJRwNG7b&format=png&color=000000" 
                                    alt="Tsunami Icon" 
                                    style={{ width: '2em', height: '2em' }} 
                                  /> 
                                  AWS ARG
                                </p>

                                <p  className={`text-light pointer menu-side ${menu === 'Nowcast_district' ? 'sele' : ''}`} 
                                  onClick={() => displayicon('Nowcast_district')}>
                                  <img 
                                    src="https://img.icons8.com/?size=100&id=MEoiE2VbIGH0&format=png&color=000000" 
                                    alt="Astronomical Tides Icon" 
                                    style={{ width: '2em', height: '2em' }} 
                                  /> 
                                  Weather Forecast 
                                </p>

                                <p  className={`text-light pointer menu-side ${menu === 'Rainfall_district' ? 'sele' : ''}`} 
                                  onClick={() => displayicon('Rainfall_district')} >
                                  <img 
                                    src="https://img.icons8.com/?size=100&id=QQyqR3UWaMfl&format=png&color=000000" 
                                    alt="Storm Surge Icon" 
                                    style={{ width: '2em', height: '2em' }} 
                                  /> 
                                  Rainfall Information
                                </p>

                                <p className={`text-light pointer menu-side ${menu === 'Others' ? 'sele' : ''}`} 
                                  onClick={() => displayicon('Others')} >
                                  <img 
                                    src="https://img.icons8.com/?size=100&id=xfE5l4OXJWrc&format=png&color=000000" 
                                    alt="Storm Surge Icon" 
                                    style={{ width: '2em', height: '2em' }} 
                                  /> 
                                  Port Warnings
                                </p>
                            </div>
                    </div>
                    <div className="col-10" style={{ height: '100%' }}>
                      {renderComponent()}
                    </div>
                      </div>
                    </div>
                  </div>
              
              {/* </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Rain;
