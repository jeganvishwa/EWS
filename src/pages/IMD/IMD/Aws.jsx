import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
import './Home.css';
import drop from '../template/drop.JPG'
import meter from '../template/meter.JPG'
import ship from '../template/ship.JPG'
import temp from '../template/temp.JPG'
import air from '../template/air.JPG'
import zone_boundaries from '../../mapdata/Zone_Boundary.json';
import { base_url, gtoken } from '../../service_token';

const AWS = () => {

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
            fontSize: "12px",
            fontWeight: "bold",
            color: "black",
          },
          title: location.name,
            icon: {
              url: 'https://img.icons8.com/?size=100&id=13800&format=png&color=000000',
              scaledSize: new window.google.maps.Size(40, 30),
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
       case 'anna': id = '55CA7E6E'; setSelectedOptionn('Anna University');
       break;
       case 'Chennai': id = 'B4898E9C'; setSelectedOptionn('Chennai');
       break;
       case 'menambakkam': id = 'A0B3A08C'; setSelectedOptionn('Menambakkam');
       break;
       case 'tharamani': id = '55CA70BC'; setSelectedOptionn('Tharamani');
       break;
       case 'ymca': id = 'TNNAM000'; setSelectedOptionn('YMCA Nandanam');
       break;
    }
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch(`${base_url}aws_data?id=${id}`, requestOptions)
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


 
  return (
    <div>
                <div className="card bg-dark" style={{ height: '100%' }}>
                <div className="card-body">
                  <div className="row">

                        <div className="col-12 mb-2">

                          <div className="row">

                          <div className="col-3 text-center">
                               <div className={`pointer text-light p-2 ${selectedOption === 'anna' ? 'btn-warning text-dark' : 'btn-info'} rounded`}  onClick={() => setcolor('anna')}>Anna Univercity</div>
                          </div>

                          <div className="col-2 text-center">
                               <div className={`pointer text-light p-2 border-1 ${selectedOption === 'Chennai' ? 'btn-warning text-dark' : 'btn-info'} rounded`}  onClick={() => setcolor('Chennai')}>Chennai</div>
                          </div>

                          <div className="col-2 text-center">
                          <div className={`pointer text-light p-2 border-1 ${selectedOption === 'menambakkam' ? 'btn-warning text-dark' : 'btn-info'} rounded`} onClick={() => setcolor('menambakkam')}>Meenambakkam</div>
                          </div>

                          <div className="col-2 text-center">
                          <div className={`pointer text-light p-2 border-1 ${selectedOption === 'tharamani' ? 'btn-warning text-dark' : 'btn-info'} rounded`} onClick={() => setcolor('tharamani')}>Tharamani</div>
                          </div>

                          <div className="col-3 text-center">
                          <div className={`pointer text-light p-2 border-1 ${selectedOption === 'ymca' ? 'btn-warning text-dark' : 'btn-info'} rounded`} onClick={() => setcolor('ymca')}>YMCA Nandanam</div>
                          </div>

                          </div>

                        </div>


                        <div className='col-5'>
                            <div className="row">
 
                             <div className="col-6 text-center">
                             <h3 style={{color:'#EB895F'}}>{selectedOptionn}</h3>
                             </div>
                             <div className="col-6 text-center">
                             <h5 className='text-light'>{datas['DATE']+' '+datas['TIME']}</h5>
                             </div>

                             <div className="col-3 text-center">
                              <img src={temp} alt="" className="shadow-sm p-1 mb-3 bg-dark rounded" /> 
                              </div>
                             <div className="col-3">
                              <p className='text-left text-light'>Temperature</p>
                               <h2 className='text-left text-light'>{datas['CURR_TEMP']}</h2>
                              </div>

                              <div className="col-3 text-center">
                              <img src={temp} alt="" className="shadow-sm p-1 mb-3 bg-dark rounded" /> 
                              </div>
                             <div className="col-3">
                              <p className='text-left text-light'>Dew Point Temperature</p>
                               <h2 className='text-left text-light'>{datas['DEW_POINT_TEMP']}</h2>
                              </div>


                              <div className="col-3 text-center">
                              <img src={drop} alt="" className="shadow-lg p-1 mb-3 bg-dark rounded" /> 
                              </div>

                              <div className="col-3">
                              <h5 className='text-left text-light'>Humidity</h5> 
                               <h2 className='text-left text-light'>{datas['RH']}</h2>
                              </div>

                              <div className="col-3 text-center">
                              <img src={meter} alt="" className="shadow-lg p-1 mb-3 bg-dark rounded" /> 
                              </div>

                              <div className="col-3">
                              <h5 className='text-left text-light'>sea level pressure</h5> 
                              <h2 className='text-left text-light'>{datas['MSLP']}</h2>
                              </div>


                              <div className="col-3 text-center">
                              <img src={air} alt="" className="shadow-lg p-1 mb-3 bg-dark rounded" /> 
                              </div>

                              <div className="col-3">
                              <h5 className='text-left text-light'>Wind speed</h5> 
                               <h2 className='text-left text-light'>{datas['WIND_SPEED']}</h2>
                              </div>

                              <div className="col-3 text-center">
                              <img src={ship} alt="" className="shadow-lg p-1 mb-3 bg-dark rounded" /> 
                              </div>

                              <div className="col-3">
                              <h5 className='text-left text-light'>Wind Direction</h5> 
                               <h2 className='text-left text-light'>{getWindDirection(datas['WIND_DIRECTION'])}</h2>
                              </div>

                              <div className="col-3 text-center">
                              <img src={temp} alt="" className="shadow-sm p-1 mb-3 bg-dark rounded" /> 
                              </div>
                             <div className="col-3">
                              <p className='text-left text-light'>Max Temperature</p>
                               <h2 className='text-left text-light'>{datas['MAX_TEMP']}</h2>
                              </div>

                              <div className="col-3 text-center">
                              <img src={temp} alt="" className="shadow-sm p-1 mb-3 bg-dark rounded" /> 
                              </div>
                             <div className="col-3">
                              <p className='text-left text-light'>Min Temperature</p>
                               <h2 className='text-left text-light'>{datas['MIN_TEMP']}</h2>
                              </div>

                            </div> 
                        </div>
                     

                    <div className="col-7">
                        <div className="row">
                          <div className="col-6">
                            <div className='rain text-right'>
                            <img className='rainy' width={300} height={550} src={datas['BACKGROUND_URL']} alt="" />
                                
                              </div>
                            </div>


                            <div className="col-6 mt-4">
                            {isLoaded ? (
                              <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={center}
                                zoom={mapzoom}
                                options={mapOptions}
                                onLoad={onLoad}
                                onUnmount={onUnmount}
                              >
                              </GoogleMap>
                            ) : (
                              <p>Loading...</p>
                            )}
                            </div>


                        </div>

                      
                    </div>

                  
                  </div>
                </div>
                </div>
              
    </div>
  );
}

export default AWS;
