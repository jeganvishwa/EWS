import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './Home.css';
import drop from '../template/drop.JPG'
import meter from '../template/meter.JPG'
import moon from '../template/moon.JPG'
import rainimg from '../template/rain.JPG'
import ship from '../template/ship.JPG'
import star from '../template/star.JPG'
import sunrise from '../template/sunrise.JPG'
import temp from '../template/temp.JPG'
import air from '../template/air.JPG'
import sun from '../template/sun.JPG'
import { base_url } from '../../service_token';




const Home = () => {
  const [selectedOption, setSelectedOption] = useState('Chennai');
  const [datas, setdatas] = useState([]);
  const setcolor = (temp) => {
    setSelectedOption(temp);
  };


  useEffect(() => {
    let id = selectedOption === 'Chennai' ? 43279 : 43278;
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${base_url}get_current_imd?id=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setdatas(result[0]);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [selectedOption]);


  const getWindDirection = (windDirection) => {
    if (windDirection >= 348.75 || windDirection < 11.25) {
      return "N";
    } else if (windDirection >= 326.25 && windDirection < 348.75) {
      return "NNW";
    } else if (windDirection >= 303.75 && windDirection < 326.25) {
      return "NW";
    } else if (windDirection >= 281.25 && windDirection < 303.75) {
      return "WNW";
    } else if (windDirection >= 258.75 && windDirection < 281.25) {
      return "W";
    } else if (windDirection >= 236.25 && windDirection < 258.75) {
      return "WSW";
    } else if (windDirection >= 213.75 && windDirection < 236.25) {
      return "SW";
    } else if (windDirection >= 191.25 && windDirection < 213.75) {
      return "SSW";
    } else if (windDirection >= 168.75 && windDirection < 191.25) {
      return "S";
    } else if (windDirection >= 146.25 && windDirection < 168.75) {
      return "SSE";
    } else if (windDirection >= 123.75 && windDirection < 146.25) {
      return "SE";
    } else if (windDirection >= 101.25 && windDirection < 123.75) {
      return "ESE";
    } else if (windDirection >= 78.75 && windDirection < 101.25) {
      return "E";
    } else if (windDirection >= 56.25 && windDirection < 78.75) {
      return "ENE";
    } else if (windDirection >= 33.75 && windDirection < 56.25) {
      return "NE";
    } else if (windDirection >= 11.25 && windDirection < 33.75) {
      return "NNE";
    } else {
      return "Unknown Direction";
    }
  };


  function formatTimeString(timeStr) {
    // Check if the input is valid
    if (typeof timeStr !== 'string') {
        console.error("Invalid input: expected a string.");
        return '';
    }

    // Split the input string into hours and minutes
    let [hours, minutes] = timeStr.split(':');
    
    // Check if both hours and minutes are available
    if (!hours || !minutes) {
        console.error("Invalid time format.");
        return '';
    }

    // Pad the minutes with a leading zero if necessary
    minutes = minutes.padStart(2, '0');
    
    return `${hours}:${minutes}`;
}



useEffect(() => {
  let autoPlayInterval = setInterval(() => {
    if (selectedOption === 'Chennai') {
      setSelectedOption('Nungambakkam');
    } else {
      setSelectedOption('Chennai');
    }
  }, 300000); 
  return () => clearInterval(autoPlayInterval);
}, [selectedOption]);

const convertToIST = (dateStr, timeStr) => {
  // Ensure both dateStr and timeStr are defined
  if (!dateStr || !timeStr) {
    return 'Invalid Date or Time';
  }

  // Ensure the time string has minutes, defaulting to ':00' if only hours are provided
  const formattedTimeStr = timeStr.length === 2 ? `${timeStr}:00` : `0${timeStr}:00`;
  

  // Combine date and formatted time strings
  const dateTimeStr = `${dateStr}T${formattedTimeStr}Z`; // Assuming input is in UTC
  const date = new Date(dateTimeStr);

  // Convert to IST timezone offset (+5:30)
  const istOffset = 5 * 60 + 30; // offset in minutes
  const utcOffset = date.getTimezoneOffset(); // offset in minutes for UTC

  // Adjust to IST
  const istDate = new Date(date.getTime() + (istOffset + utcOffset) * 60000);

  // Format IST date to a readable string
  return istDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
};

 
  return (
    <div>
               {/* <div className="card bg-dark"> */}

                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 p-5" style={{ height: '100%', width:'100%', backgroundImage: `url(${datas['BACKGROUND_URL']})`,  backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center', borderRadius:'10px', border:'1px,solid'}}>

                      <div className="row">

                <div className="col-sm-12 col-md-4">
                    <h3 style={{color:'#000000'}}>{selectedOption === 'Chennai'? 'Meenambakkam' : selectedOption}</h3>
                    <h5 style={{color:'#000000'}}>{datas['WEATHER_MESSAGE']} Feel like {datas['Feel Like']}</h5>
                </div>

                
                <div className="col-sm-12 col-md-3">
                <h4 style={{color:'#000000'}}>Date of Observation</h4>
                <h4 style={{color:'#000000'}}>{convertToIST(datas['Date of Observation'], datas['Time'])}</h4>
                </div>

                   <div className="col-sm-12 col-md-5">
                      <div className="row">
                       <div className="col-md-10 col-sm-12">
                        <div className="row">
                          <div className="col-12 text-center">
                          <h5 style={{color:'#000000'}}>Stations</h5>
                          </div>
                          <div className={`btn col-md-5 col-sm-12 mr-1 border-1 ${selectedOption === 'Chennai' ? 'border-info btn-warning text-dark' : 'btn-info'} rounded`}  onClick={() => setcolor('Chennai')}>
                            Meenambakkam
                          </div>
                          <div className={`btn col-md-6 col-sm-12 border-1 ${selectedOption === 'Nungambakkam' ? 'border-info btn-warning text-dark' : 'btn-info'} rounded`} onClick={() => setcolor('Nungambakkam')}>Nungambakkam</div>
                        </div>
                          </div>
                        </div>
                    </div>
                    </div>
                    </div>


                    <hr className='bg-light'/>

                        <div className='col-md-12 col-sm-12 p-3'>
                            <div className="row">
                             <div className="col-md-3 col-sm-12 text-center">
                              <img src={rainimg} alt="" className="shadow-lg p-1 mb-3 bg-dark rounded" /> 
                              </div>

                              <div className="col-md-3 col-sm-12">
                                <h5 className='text-left text-light'>24 hour rainfall</h5>
                               <h2 className='text-left text-light'>{datas['Last 24 hrs Rainfall']}</h2>
                              </div>

                               <div className="col-md-6 col-sm-12">
                                      <div className="row">
                                        <div className="col-md-6 col-sm-12 text-center">
                                        <img src={meter} alt="" className="shadow-lg p-1 mb-3 bg-dark rounded" /> 
                                        </div>

                                        <div className="col-md-6 col-sm-12">
                                        <h5 className='text-left text-light'>sea level pressure</h5> 
                                        <h2 className='text-left text-light'>{datas['Mean Sea Level Pressure']}</h2>
                                        </div>
                                      </div>
                               </div>

                              <div className="col-md-3 col-sm-12 text-center">
                              <img src={temp} alt="" className="shadow-lg p-1 mb-3 bg-dark rounded" /> 
                              </div>

                              <div className="col-md-3 col-sm-12">
                              <h5 className='text-left text-light'>Temperature</h5>
                               <h2 className='text-left text-light'>{datas['Temperature']}</h2>
                              </div>

                               <div className="col-md-6 col-sm-12">
                                     <div className="row">
                                        <div className="col-md-6 col-sm-12 text-center">
                                        <img src={sun} alt="" className="shadow-lg p-1 mb-3 bg-dark rounded" /> 
                                        </div>

                                        <div className="col-md-6 col-sm-12">
                                        <h5 className='text-left text-light'>Sunrise</h5>
                                        <h2 className='text-left text-light'>{formatTimeString(datas['Sunrise'])}</h2>
                                        </div>
                                      </div>
                               </div>


                              <div className="col-md-3 col-sm-12 text-center">
                              <img src={drop} alt="" className="shadow-lg p-1 mb-3 bg-dark rounded" /> 
                              </div>

                              <div className="col-md-3 col-sm-12">
                              <h5 className='text-left text-light'>Humidity</h5> 
                               <h2 className='text-left text-light'>{datas['Humidity']}</h2>
                              </div>

                               <div className="col-md-6 col-sm-12">
                                      <div className="row">
                                        <div className="col-md-6 col-sm-12 text-center">
                                        <img src={sunrise} alt="" className="shadow-lg p-1 mb-3 bg-dark rounded" /> 
                                        </div>

                                        <div className="col-md-6 col-sm-12">
                                        <h5 className='text-left text-light'>Sunset</h5> 
                                        <h2 className='text-left text-light'>{formatTimeString(datas['Sunset'])}</h2>
                                        </div>
                                      </div>
                               </div>






                               <div className="col-md-3 col-sm-12 text-center">
                              <img src={air} alt="" className="shadow-lg p-1 mb-3 bg-dark rounded" /> 
                              </div>

                              <div className="col-md-3 col-sm-12">
                              <h5 className='text-left text-light'>Wind speed</h5> 
                               <h2 className='text-left text-light'>{datas['Wind Speed KMPH']}</h2>
                              </div>

                               <div className="col-md-6 col-sm-12">
                                      <div className="row">
                                        <div className="col-md-6 col-sm-12 text-center">
                                        <img src={star} alt="" className="shadow-lg p-1 mb-3 bg-dark rounded" /> 
                                        </div>

                                        <div className="col-md-6 col-sm-12">
                                        <h5 className='text-left text-light'>Moonrise</h5> 
                                        <h2 className='text-left text-light'>{formatTimeString(datas['Moonrise'])}</h2>
                                        </div>
                                      </div>
                               </div>


                               
                              <div className="col-md-3 col-sm-12 text-center">
                              <img src={ship} alt="" className="shadow-lg p-1 mb-3 bg-dark rounded" /> 
                              </div>

                              <div className="col-md-3 col-sm-12">
                              <h5 className='text-left text-light'>Wind Direction</h5> 
                               <h2 className='text-left text-light'>{getWindDirection(datas['Wind Direction'])}</h2>
                              </div>

                               <div className="col-md-6 col-sm-12">
                                      <div className="row">
                                        <div className="col-md-6 col-sm-12 text-center">
                                        <img src={moon} alt="" className="shadow-lg p-1 mb-3 bg-dark rounded" /> 
                                        </div>

                                        <div className="col-md-6 col-sm-12">
                                        <h5 className='text-left text-light'>Moonset</h5> 
                                        <h2 className='text-left text-light'>{formatTimeString(datas['Moonset'])}</h2>
                                        </div>
                                      </div>
                               </div>





                            </div> 
                        </div>
                     

                   

                  
                  </div>
                </div>
                {/* </div> */}
                </div>
              
    // </div>
  );
}

export default Home;
