import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
import './Home.css';
import zone_boundaries from '../../mapdata/Zone_Boundary.json';
import { gtoken, base_url } from '../../service_token';

const Nowcast_district = () => {

  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  const [selectedOption, setSelectedOption] = useState('Chennai');
  const [datas, setdatas] = useState([]);
  const [map, setMap] = useState(null);
  const [zoneMarkers, setZoneMarkers] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [mapzoom, setmapzoom] = useState(10);
  const [selectedOptionn, setSelectedOptionn] = useState('Chennai');
  const [lat, setlat]   = useState('10.87234350177348');
  const [lng, setlng]   = useState('78.40492493567073');
  const [nextDates, setNextDates] = useState([]);

  const setcolor = (temp) => {
    setSelectedOption(temp);
  };

  const center = {
    lat: 13.0524,
    lng: 80.1612,
  };
  

  const mapOptions = {
    styles: [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "on" }],
      },
    ],
    mapTypeId: 'roadmap',
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${gtoken}`,
  });

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isLoaded && map && zone_boundaries) {
      map.data.addGeoJson(zone_boundaries);
  
      map.data.setStyle({
        strokeColor: 'black',
        strokeWeight: 2,
        fillColor: '#ffffff',
        fillOpacity: 0.1,
      });
  
      const markers = [];
      map.data.forEach((feature) => {
        const zoneName = feature.getProperty("Zone");
  
        if (zoneName) {
          const bounds = new window.google.maps.LatLngBounds();
          feature.getGeometry().forEachLatLng((latLng) => {
            bounds.extend(latLng);
          });
  
          const marker = new window.google.maps.Marker({
            position: bounds.getCenter(),
            label: {
              text: 'Zone-' + zoneName,
              fontSize: "0px",
              fontWeight: "bold",
              color: "black",
            },
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 0
            },
            map: map,
          });
  
          markers.push(marker);
        }
      });
  
      setZoneMarkers(markers);
  
      const customLocations = [
        { name: "anna", lat: 13.0112, lng: 80.2355 },
        { name: "chennai", lat: 13.075, lng: 80.2633 },
        { name: "meenapakam", lat: 12.99, lng: 80.1983 },
        { name: "tharamani", lat: 12.9833, lng: 80.2333 },
        { name: "nandanam", lat: 13.0262, lng: 80.2393 }
      ];
  
      customLocations.forEach(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          label: {
            text: location.name,
            fontSize: "9px",
            fontWeight: "bold",
            color: "black",
          },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 1,
            fillOpacity: 0,
          },
          map: map,
        });
        markers.push(marker);
      });
  
      map.data.addListener('click', (event) => {
        const feature = event.feature;
        const zoneName = feature.getProperty("Zone");
        setSelectedZone(String(zoneName)); 
      });
    }
  }, [map, zone_boundaries]);
  

  useEffect(() => {
    let id = '';
    switch(selectedOption)
    {
       case 'anna': id = '99948'; setSelectedOptionn('Ennore');
       break;
       case 'Chennai': id = '99947'; setSelectedOptionn('Madhavaram');
       break;
       case 'menambakkam': id = '43279'; setSelectedOptionn('Menambakkam');
       break;
       case 'tharamani': id = '43278'; setSelectedOptionn('Nungambakkam');
       break;
    }
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${base_url}weather_data?id=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setdatas(result[0]);
        calculateNextDates(result[0].Date);
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


  const calculateNextDates = (dateString) => {
            let max = 6;
        const baseDate = new Date(dateString);
        const dates = [];
        for (let i = 1; i <= max; i++) {
          const newDate = new Date(baseDate);
          newDate.setDate(baseDate.getDate() + i);
          dates.push(newDate.toISOString().split('T')[0]);
        }
        setNextDates(dates);
  };


 
  return (
    <div>
                <div className="card bg-dark" style={{ height: '100%' }}>
                <div className="card-body">
                  <div className="row">

                        <div className="col-12 mb-2">

                          <div className="row">


                          <div className="col-3 text-center">
                          <div className={`border-1 text-light p-3 pointer ${selectedOption === 'menambakkam' ? 'btn-warning text-dark' : 'btn-info'} rounded`} onClick={() => setcolor('menambakkam')}>Meenambakkam</div>
                          </div>

                          <div className="col-3 text-center">
                               <div className={`p-3 text-light pointer ${selectedOption === 'anna' ? 'btn-warning text-dark' : 'btn-info'} rounded`}  onClick={() => setcolor('anna')}>Ennore</div>
                          </div>

                          <div className="col-3 text-center">
                               <div className={`border-1 text-light p-3 pointer ${selectedOption === 'Chennai' ? 'btn-warning text-dark' : 'btn-info'} rounded`}  onClick={() => setcolor('Chennai')}>Madhavaram</div>
                          </div>

                        

                          <div className="col-3 text-center">
                          <div className={`border-1 text-light p-3 pointer ${selectedOption === 'tharamani' ? 'btn-warning text-dark' : 'btn-info'} rounded`} onClick={() => setcolor('tharamani')}>Nungambakam</div>
                          </div>

                         

                          </div>

                        </div>


                        <div className='col-12'>
                            <div className="row">
 
                             <div className="col-6 text-center">
                             <h3 style={{color:'#EB895F'}}>{selectedOptionn}</h3>
                             </div>
                             <div className="col-6 text-center">
                             <h5 className='text-light'>Date : {datas['Date']}</h5>
                             </div>

                             <div className="col-12">
                              <div className="row">

                                <div className="col-12 border border-1 border-info">
                                  <div className="row">

                                    <div className="col-3">
                                    <h4 className='text-light'> Date : {datas['Date']}</h4>
                                    </div>

                                    <div className="col-3">
                                      <h4 className='text-light'>Max Temp : {datas['Todays_Forecast_Max_Temp']}</h4>
                                    </div>

                                    <div className="col-3">
                                      <h4 className='text-light'>Min Temp : {datas['Todays_Forecast_Min_temp']}</h4>
                                    </div>

                                    <div className="col-3">
                                      <p className='text-warning'>{datas['Todays_Forecast']}</p>
                                    </div>

                                  </div>
                                </div>
                     
                              {nextDates.map((nextDate, index) => (
                                  <div className="col-2  border border-1 border-info " key={index}>
                                    <h5 className='text-warning text-center'>{nextDate}</h5>
                                      <p className='text-center text-light'>MAX Temp</p>
                                      <h2 className='text-center text-light'>{datas[`Day_${index+2}_Max_Temp`]}</h2>

                                      <p className='text-center text-light'>Min Temp</p>
                                      <h2 className='text-center text-light'>{datas[`Day_${index+2}_Min_temp`]}</h2>
                                      <p className='text-warning'>{datas[`Day_${index+2}_Forecast`]}</p>
                                  </div>
                                  
                              ))}

                              </div>
                             </div>

                           

                            </div> 
                        </div>

                  
                  </div>
                </div>
                </div>
              
    </div>
  );
}

export default Nowcast_district;
