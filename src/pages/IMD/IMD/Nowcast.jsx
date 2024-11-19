import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
import './Home.css';
import zone_boundaries from '../../mapdata/Zone_Boundary.json';
import tamilnadu_data from '../../mapdata/tamilnadu.json';
import { gtoken, base_url } from '../../service_token';

const Nowcast = () => {

  const [selectedOption, setSelectedOption] = useState('district');
  const [datas, setdatas] = useState([]);
  const [map, setMap] = useState(null);
  const [zoneMarkers, setZoneMarkers] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [chdatas, setChdatas] = useState([]);
  const [selectedOptionn, setSelectedOptionn] = useState('Chennai');
  const [lat, setlat]   = useState('10.87234350177348');
  const [lng, setlng]   = useState('78.40492493567073');
  const [mapzoom, setmapzoom] = useState(7);
  const [d_selectedoption, setd_selectedoption] = useState([]);
  const [countlist, setcountlist] = useState([]);
  const [c_Isolated, setc_Isolated]                 = useState(0);
  const [c_Scattered, setc_Scattered]               = useState(0);
  const [c_FairlyWidespread, setc_FairlyWidespread] = useState(0);
  const [c_Widespread, setc_Widespread]             = useState(0);
  const [chennai, setchennai]   = useState('#FFFFFF');
  const [chennaitime, setchennaitime]   = useState('');
  const [chennaietime, setchennaietime]   = useState('');
  const [divisionMarkers, setDivisionMarkers] = useState([]);
  const [chdata, setchdata]   = useState('');

  const [Ennore, setEnnore]  = useState('');
  const [Madhavaram, setMadhavaram]  = useState('');
  const [Meenambakkam, setMeenambakkam]  = useState('');
  const [Nungambakkam, setNungambakkam]  = useState('');
  const [cntEnnore, setcntEnnore]  = useState('');
  const [cntMadhavaram, setcntMadhavaram]  = useState('');
  const [cntMeenambakkam, setcntMeenambakkam]  = useState('');
  const [cntNungambakkam, setcntNungambakkam]  = useState('');



  const setcolor = (temp) => {
    setSelectedOption(temp);
  };


  const center = {
    lat: lat,
    lng: lng,
  };

  useEffect(() => {
    setlat(10.87234350177348);
    setlng(78.40492493567073);
  },[selectedOption]);

  const mapContainerStyle = {
    height: "100%",
    width: "100%",
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
  });

  const onUnmount = useCallback(() => {
    setMap(null);
  });


  const get_color = (color) => {
    switch (color) {
      case '1': return '#008000';
      case '2': return '#FFFF00';
      case '3': return '#FFA500';
      case '4': return '#ff0000';
      default: return '#FFFFFF';  
    }
  };


  function getWeatherDescription(code) {
    switch (code) {
        case "1":
            return "No Weather";
        case "2":
            return "Light rain: < 5 mm/hr";
        case "3":
            return "Light snow: < 5 cm/hr";
        case "4":
            return "Light Thunderstorms with max surface wind speed < 40 kmph (In gusts)";
        case "5":
            return "Slight dust storm: Wind speed up to 41 kmph, visibility 500-1000 meters";
        case "6":
            return "Low cloud to ground Lightning probability (< 30%)";
        case "7":
            return "Moderate rain: 5-15 mm/hr";
        case "8":
            return "Moderate snow: 5-15 cm/hr";
        case "9":
            return "Moderate Thunderstorms with surface wind speed 41-61 kmph (In gusts)";
        case "10":
            return "Moderate dust storm: Wind speed 41-61 kmph, visibility 200-500 meters";
        case "11":
            return "Moderate cloud to ground Lightning probability (30-60%)";
        case "12":
            return "Heavy rain: > 15 mm/hr";
        case "13":
            return "Heavy snow: > 15 cm/hr";
        case "14":
            return "Severe Thunderstorms with surface wind speed 62-87 kmph (In gusts)";
        case "15":
            return "Very Severe Thunderstorms with surface wind speed > 87 kmph (In gusts)";
        case "16":
            return "High cloud to ground Lightning probability (> 60%)";
        case "31":
            return "Other Warnings (Text warnings can be entered)";
        case "32":
            return "Thunderstorms with Hail";
        case "33":
            return "Severe dust storm: Wind speed > 61 kmph, visibility < 200 meters";
        default:
            return "";
    }
}


useEffect(() => {
  if (isLoaded && map && tamilnadu_data && datas) {

    map.data.forEach((feature) => {
      map.data.remove(feature);
    });

        if (zoneMarkers.length > 0) {
          zoneMarkers.forEach((marker) => marker.setMap(null));
        }
        setZoneMarkers([]);

        if (selectedOption === 'district') {
          setlat('');
          setlng('');
        }

    const addGeoJsonAndMarkers = () => {
      map.data.addGeoJson(tamilnadu_data);
      map.data.setStyle({
        strokeColor: 'black',
        strokeWeight: 2,
        fillColor: '#ffffff',
        fillOpacity: 0.1,
      });

      setd_selectedoption([]);

      const markers = [];
      let newCountList = [];

      map.data.forEach((feature) => {
        const name = feature.getProperty("name");
        const imd_id = feature.getProperty("imd_id");

        setd_selectedoption((prevOptions) => [
          ...prevOptions,
          { district: name, id: imd_id },
        ]);

        datas.forEach((dataItem) => {
          if (dataItem.Obj_id === imd_id) {
            const fillColor = get_color(dataItem.color);

            if (dataItem.Obj_id === '78') {
              setchennai(fillColor);
              setchennaitime(convertToTime(dataItem.toi));
              setchennaietime(convertToTime(dataItem.vupto));

              const message = {}; 
              for (const key in dataItem) {
                if (key.startsWith('cat') && dataItem[key] > "0") {
                  message[key] = getWeatherDescription(dataItem[key]);
                }
              }
              const infoMessage = Object.keys(message).map(key => `${message[key]}`).join(' / ');
              setchdata(infoMessage);
            }


            newCountList.push(fillColor);
            map.data.overrideStyle(feature, {
              strokeColor: 'black',
              strokeWeight: 1,
              fillColor: fillColor,
              fillOpacity: 0.5,
            });
          }
        });

        // Add district markers
        if (name) {
          const bounds = new window.google.maps.LatLngBounds();
          feature.getGeometry().forEachLatLng((latLng) => {
            bounds.extend(latLng);
          });
          if (selectedOption === 'district') {
          const marker = new window.google.maps.Marker({
            position: bounds.getCenter(),
            label: {
              text: name || 'No Name',
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
        }
        else 
        {
            newCountList = [];
            datas.forEach((dataItem) => {
              const fillColor = get_color(dataItem.color);
              newCountList.push(fillColor);
            })

        }

       
        }
      });
      setcountlist(newCountList);
      setc_Isolated(newCountList.filter(item => item === '#008000').length);
      setc_Scattered(newCountList.filter(item => item === '#FFFF00').length);
      setc_FairlyWidespread(newCountList.filter(item => item === '#FFA500').length);
      setc_Widespread(newCountList.filter(item => item === '#ff0000').length);

      setZoneMarkers(markers);
    };


    if (selectedOption === 'district') {
      divisionMarkers.forEach(marker => marker.setMap(null));
      setDivisionMarkers([]);
      addGeoJsonAndMarkers();
      map.data.addListener('click', (event) => {
        const feature = event.feature;
        const zoneName = feature.getProperty("imd_id");
        setSelectedZone(String(zoneName));

        const clickedBounds = new window.google.maps.LatLngBounds();
        feature.getGeometry().forEachLatLng((latLng) => {
          clickedBounds.extend(latLng);
        });
        map.fitBounds(clickedBounds);
      });
    } else if (selectedOption === 'division') {
      addGeoJsonAndMarkers();
      const infoWindow = new window.google.maps.InfoWindow();
      const markers = datas.map((rain) => {
        const position = {
          lat: parseFloat(rain.latitude),
          lng: parseFloat(rain.longitude),
        };
  
        const marker = new window.google.maps.Marker({
          position,
          label: {
            text: '', 
            fontSize: "0px",
            fontWeight: "bold",
            color: "black", 
          },
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE, 
          scale: 6, 
          fillColor: get_color(rain.color), 
          fillOpacity: 1, 
          strokeWeight: 1, 
          strokeColor: 'black' 
        },
          title: '',
          map: map,
        });

       
//  const [Ennore, setEnnore]  = useState('');
//   const [Madhavaram, setMadhavaram]  = useState('');
//   const [Meenambakkam, setMeenambakkam]  = useState('');
//   const [Nungambakkam, setNungambakkam]  = useState('');
//   const [cntEnnore, setcntEnnore]  = useState('');
//   const [cntMadhavaram, setcntMadhavaram]  = useState('');
//   const [cntMeenambakkam, setcntMeenambakkam]  = useState('');
//   const [cntNungambakkam, setcntNungambakkam]  = useState('');
          

        const message = {}; 
        const emessage = {};
        const mmessage = {};
        const memessage = {};
        const numessage = {};
        for (const key in rain) {
             if(rain.Station === 'Ennore')
             {
               setcntEnnore(get_color(rain.color));
               if (key.startsWith('cat') && rain[key] > "0") {
                emessage[key] = getWeatherDescription(rain[key]);
              }
              setEnnore(Object.keys(emessage).map(key => `${emessage[key]}`).join(' <br/>'));
             }
             if(rain.Station === 'Madhavaram')
              {
                setcntMadhavaram(get_color(rain.color));
                if (key.startsWith('cat') && rain[key] > "0") {
                  mmessage[key] = getWeatherDescription(rain[key]);
                }
                setMadhavaram(Object.keys(mmessage).map(key => `${mmessage[key]}`).join(' <br/>'));
              }
             if(rain.Station === 'Meenambakkam AP')
              {
                setcntMeenambakkam(get_color(rain.color));
                if (key.startsWith('cat') && rain[key] > "0") {
                  memessage[key] = getWeatherDescription(rain[key]);
                }
                setMeenambakkam(Object.keys(memessage).map(key => `${memessage[key]}`).join(' <br/>'));
              }
              if(rain.Station === 'Nungambakkam')
              {
                setcntNungambakkam(get_color(rain.color));
                if (key.startsWith('cat') && rain[key] > "0") {
                  numessage[key] = getWeatherDescription(rain[key]);
                }
                setNungambakkam(Object.keys(numessage).map(key => `${numessage[key]}`).join(' <br/>'));
              }

          if (key.startsWith('cat') && rain[key] > "0") {
            message[key] = getWeatherDescription(rain[key]);
          }
        }

        const infoMessage = Object.keys(message).map(key => `${message[key]}`).join(' /');
        
        marker.addListener('mouseover', () => {
          infoWindow.setContent(`Location: ${rain.Station}<br>${infoMessage}`);
          infoWindow.setPosition(position);
          infoWindow.open(map);
        });


   
        marker.addListener('mouseout', () => {
          infoWindow.close();
        });
  
        return marker;
      });

      setDivisionMarkers(markers);

    }
  }
}, [map, tamilnadu_data, datas, selectedOption]);




  useEffect(() => {
    let url = '';
    if(selectedOption === 'district') 
    {
       url = `${base_url}nowcast_district`;
    }
    else if(selectedOption === 'division')
    {
      url = `${base_url}nowcast_stations`;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setdatas(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedOption]);



  function convertToTime(num) {
    let str = num.toString().padStart(4, '0');
    let hours = str.slice(0, 2);
    let minutes = str.slice(2);
    
    return `${hours}:${minutes}`;
}

const zoommez = (imd_id) => {
  if(imd_id!='')
  {
    map.data.forEach((feature) => {
      if (feature.getProperty("imd_id") === imd_id || feature.getProperty("subdivisio") === imd_id) {
        const clickedBounds = new window.google.maps.LatLngBounds();
        feature.getGeometry().forEachLatLng((latLng) => {
          clickedBounds.extend(latLng);
        });
        map.fitBounds(clickedBounds);
      }
    });
  }
  else
  {
    if(selectedOption === 'district') 
    {
      let lat = 10.87234350177348;
      let lng = 78.40492493567073;
      const bounds = new window.google.maps.LatLngBounds();
      const latLng = new window.google.maps.LatLng(lat, lng);
      bounds.extend(latLng);
    
      setTimeout(() => {
        map.setMapTypeId(window.google.maps.MapTypeId.ROADMAP); 
        map.fitBounds(bounds); 
    
        let currentZoom = 20;
        const targetZoom = 7;
        const zoomStep = 1;
    
        const smoothZoomOut = setInterval(() => {
          if (currentZoom > targetZoom) {
            map.setZoom(--currentZoom); 
          } else {
            clearInterval(smoothZoomOut); 
          }
        }, 150); 
    
      }, 100);
    }
    else
    {
      setlat('23.86577357580456');
      setlng('78.95136128426273');
      const bounds = new window.google.maps.LatLngBounds();
      const latLng = new window.google.maps.LatLng(lat, lng);
      bounds.extend(latLng);
    
      setTimeout(() => {
        map.setMapTypeId(window.google.maps.MapTypeId.ROADMAP); 
        map.fitBounds(bounds); 
    
        let currentZoom = 7;
        const targetZoom = 4;
        const zoomStep = 1;
    
        const smoothZoomOut = setInterval(() => {
          if (currentZoom > targetZoom) {
            map.setZoom(--currentZoom); 
          } else {
            clearInterval(smoothZoomOut); 
          }
        }, 150); 
    
      }, 100);
    }
      
   
  }
};

 
  return (
    <div>
                <div className="card bg-dark" style={{ height: '100%' }}>
                <div className="card-body">
                  <div className="row">

                        <div className="col-12 mb-2">

                          <div className="row">

                          <div className="col-2 text-center">
                               <div className={`pointer p-2 bg-dark rounded text-center shadow-lg p-1 mb-3 bg-dark rounded border border-1 border-info`}  onClick={() => setcolor('anna')}>
                                <h5 className='text-light'>{selectedOption === 'district'? 'No of Districts' : 'No of stations'}</h5>
                                <h5 className='text-warning'>{selectedOption === 'district'? '38' : '54'}</h5>
                               </div>
                          </div>

                          <div className="col-2 text-center">
                               <div className={`pointer p-2 bg-dark rounded text-center shadow-lg p-1 mb-3 bg-dark rounded border border-1 border-warning`}  onClick={() => setcolor('Chennai')}>
                               <h5 className='text-light'>Warning</h5>
                               <h5 className='text-warning'>{c_Widespread}</h5>
                               </div>
                          </div>

                          <div className="col-2 text-center">
                          <div className={`pointer p-2 bg-dark rounded text-center shadow-lg p-1 mb-3 bg-dark rounded border border-1 border-danger`} onClick={() => setcolor('menambakkam')}>
                          <h5 className='text-light'>Alert</h5>
                          <h5 className='text-warning'>{c_FairlyWidespread}</h5>
                          </div>
                          </div>

                          <div className="col-2 text-center">
                          <div className={`pointer p-2 bg-dark rounded text-center shadow-lg p-1 mb-3 bg-dark rounded border border-1 border-warning`} onClick={() => setcolor('tharamani')}>
                          <h5 className='text-light'>Watch</h5>
                          <h5 className='text-warning'>{c_Scattered}</h5>
                          </div>
                          </div>

                          <div className="col-2 text-center">
                          <div className={`pointer p-2 bg-dark rounded text-center shadow-lg p-1 mb-3 bg-dark rounded border border-1 border-success`} onClick={() => setcolor('ymca')}>
                          <h5 className='text-light'>No Warnings</h5>
                          <h5 className='text-warning'>{c_Isolated}</h5>
                          </div>
                          </div>

                          <div className="col-2">
                            <div className="row">
                                <div className="col-12 mb-1 text-right">
                                    <div className={`btn border-1 ${selectedOption === 'district' ? 'border-info btn-warning' : 'text-light btn-primary'} rounded`} onClick={() => setSelectedOption('district')} style={{width:'120px'}}>District</div>
                                    </div>
                                
                                    <div className="col-12">
                                      <div className={`btn border-1 ${selectedOption === 'division' ? 'border-info btn-warning' : 'text-light btn-primary'} rounded`} onClick={() => setSelectedOption('division')} style={{width:'120px'}}>Station</div>
                                    </div>

                            </div>
                          </div>

                          </div>

                        </div>


                        <div className="col-5 mt-4">
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


                        <div className='col-7' style={{height:'80vh'}}>
                        {selectedOption === 'district' && (<div className="row">
                              <div className="col-12">
                              <select className="custom-select custom-select-sm"  
                              onChange={(e) => {zoommez(e.target.value)}}
                              defaultValue="">
                                <option value="">ALL</option>
                                {d_selectedoption.map((e, index) => (
                                  <option key={index} value={e.id}>{e.district}</option>
                                ))}
                             </select>
                              </div>

                              <div className="col-4"></div>
                              <div className="col-4 mt-4">
                                <h2 style={{ color:chennai }} className='text-center'>CHENNAI</h2>
                              </div>
                              <div className="col-4"></div>

                              <div className="col-3"></div>
                              <div className="col-6 mt-4">
                                <h4 className='text-light text-center'>Time of Issue: {chennaitime}
                                </h4>
                                {/* chennaietime */}
                              </div>
                              <div className="col-3"></div>

                              <div className="col-3"></div>
                              <div className="col-6 mt-4">
                                <h4 className='text-light text-center'>Valid Upto: {chennaietime}
                                </h4>
                              </div>
                              <div className="col-3"></div>

                              <div className="col-3"></div>
                              <div className="col-6 pointer p-2 bg-dark rounded text-center shadow-lg p-1 mb-3 bg-dark rounded border border-1 border-info">
                                  <h5 className='text-warning'>{chdata}</h5>
                              </div>
                              <div className="col-3"></div>
                           

                            </div> )}

                            {selectedOption === 'division' && (
                              <div className="row">
                               <div className="col-12 mt-4">
                                 <div className="table-responsive">
                                 <table className="table table-sm tablebordered" style={{fontSize:'12px'}}>
                                  <thead>
                                    <tr>
                                      <th>Station</th>
                                      <th>Description</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td style={{backgroundColor:cntEnnore}}>Ennore</td>
                                      <td dangerouslySetInnerHTML={{ __html: Ennore }}></td>
                                    </tr>
                                    <tr>
                                      <td style={{backgroundColor:cntMadhavaram}}>Madhavaram</td>
                                      <td dangerouslySetInnerHTML={{ __html: Madhavaram }}>{}</td>
                                    </tr>
                                    <tr>
                                      <td style={{backgroundColor:cntMeenambakkam}}>Meenabakkam</td>
                                      <td dangerouslySetInnerHTML={{ __html: Meenambakkam }}>{}</td>
                                    </tr>
                                    <tr>
                                      <td style={{backgroundColor:cntNungambakkam}}>Nungambakkam</td>
                                      <td dangerouslySetInnerHTML={{ __html: Nungambakkam }}>{}</td>
                                    </tr>
                                  </tbody>
                                 </table>
                                 </div>
                              </div>


                                </div>



                            )}


                        </div>
                  </div>
                </div>
                </div>
              
    </div>
  );
}

export default Nowcast;
