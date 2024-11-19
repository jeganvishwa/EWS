import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
import './Home.css';
import tamilnadu_data from '../../mapdata/tamilnadu.json';
import state_data from '../../mapdata/India_Subdivision.json';
import { gtoken, base_url } from '../../service_token';

const Rainfall_district = () => {

  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  const [selectedOption, setSelectedOption] = useState('district');
  const [datas, setdatas] = useState([]);
  const [map, setMap] = useState(null);
  const [zoneMarkers, setZoneMarkers] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [mapzoom, setmapzoom] = useState(7);
  const [datee, setdatee] = useState([]);
  const [selectedOptionn, setSelectedOptionn] = useState('daily');
  const [lat, setlat]   = useState('10.87234350177348');
  const [lng, setlng]   = useState('78.40492493567073');
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
    lat: 10.87234350177348,
    lng: 78.40492493567073,
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


  const get_color = (rainData) => {
    const percentageString = rainData;
    if (!percentageString || typeof percentageString !== 'string') {
        return "#FFFFFF";
    }
    const percentage = parseFloat(percentageString.replace('%', ''));
    let color;
    if (percentage === -100) {
        color = "#FFFFFF"; 
    } else if (percentage >= -99 && percentage <= -60) {
        color = "#FFFF00"; 
    } else if (percentage >= -59 && percentage <= -20) {
        color = "#FF0000"; 
    } else if (percentage >= -19 && percentage <= 19) {
        color = "#00FF00";
    } else if (percentage >= 20 && percentage <= 59) {
        color = "#70BBFF"; 
    } else if (percentage >= 60) {
        color = "#0D6ABF"; 
    } else {
        color = "#FFFFFF"; 
    }
    return color;
};






useEffect(() => {
  // Check if all required data is loaded before executing the effect
  if (isLoaded && map && tamilnadu_data && datas && state_data) {
    // Remove existing features and markers from the map
    map.data.forEach((feature) => {
      map.data.remove(feature);
    });

    if (zoneMarkers.length > 0) {
      zoneMarkers.forEach((marker) => marker.setMap(null));
    }
    setZoneMarkers([]);

    const addGeoJsonAndMarkers = () => {

      if (selectedOption === 'district') {
        map.data.addGeoJson(tamilnadu_data);
      } else {
        map.data.addGeoJson(state_data);
      }


      map.data.setStyle({
        strokeColor: 'black',
        strokeWeight: 2,
        fillColor: '#ffffff',
        fillOpacity: 0.1,
      });

      setd_selectedoption([]); 

      const markers = [];

      const setFeatureStyle = (feature, fillColor) => {
        map.data.overrideStyle(feature, {
          strokeColor: 'black',
          strokeWeight: 1,
          fillColor: fillColor,
          fillOpacity: 0.9,
        });
      };

 
      const setMarker = (name, dep, actual, normal, bounds) => {
        const infoWindow = new window.google.maps.InfoWindow();
        const position = bounds.getCenter();
        const marker = new window.google.maps.Marker({
          position: position,
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

        marker.addListener('mouseover', () => {
          infoWindow.setContent(`District: ${name}<br> Departure: ${dep || 'N/A'}<br> Actual: ${actual || 'N/A'}<br> Normal: ${normal || 'N/A'}`);
          infoWindow.setPosition(position);
          infoWindow.open(map);
        });

        marker.addListener('mouseout', () => {
          infoWindow.close();
        });

        markers.push(marker);
      };

      map.data.forEach((feature) => {
        const name = feature.getProperty("name");
        const imd_id = feature.getProperty("imd_id");

        setd_selectedoption((prevOptions) => [
          ...prevOptions,
          { district: name, id: imd_id },
        ]);

        datas.forEach((dataItem) => {
          if (dataItem.OBJ_ID === imd_id) {
            let dep = '';
            let actual = '';
            let normal = '';
            let fillColor = '';

            switch (selectedOptionn) {
              case 'daily':
                dep = dataItem['Daily Departure Per'];
                actual = dataItem['Daily Actual'];
                normal = dataItem['Daily Normal'];
                setdatee(dataItem['Date']);
                fillColor = get_color(dep);
                break;
              case 'weekly':
                dep = dataItem['Weekly Departure Per'];
                actual = dataItem['Weekly Actual'];
                normal = dataItem['Weekly Normal'];
                setdatee(dataItem['Week Date']);
                fillColor = get_color(dep);
                break;
              case 'monthly':
                dep = dataItem['Monthly Departure Per'];
                actual = dataItem['Monthly Actual'];
                normal = dataItem['Monthly Normal'];
                setdatee(dataItem['Monthly Date']);
                fillColor = get_color(dep);
                break;
              case 'cumulative':
                dep = dataItem['Cumulative Departue Per'];
                actual = dataItem['Cumulative Actual'];
                normal = dataItem['Cumulative Normal'];
                setdatee(dataItem['Cumulative Date']);
                fillColor = get_color(dep);
                break;
              default:
                break;
            }

            setFeatureStyle(feature, fillColor);

            if (name) {
              const bounds = new window.google.maps.LatLngBounds();
              feature.getGeometry().forEachLatLng((latLng) => {
                bounds.extend(latLng);
              });
              setMarker(name, dep, actual, normal, bounds);
            }
          }
        });
      });
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
    }
  }
}, [map, tamilnadu_data, datas, selectedOption, selectedOptionn]);





  useEffect(() => {
    let url = '';
    if(selectedOption === 'district') 
    {
       url = `${base_url}rainfall_state`;
    }
    else if(selectedOption === 'division')
    {
      url = `${base_url}rainfall_subdivisional`;
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

 
  return (
    <div>
                <div className="card bg-dark" style={{ height: '100%' }}>
                <div className="card-body">
                  <div className="row">

                        <div className="col-12 mb-2">

                          <div className="row">

                          <div className="col-2 text-center">
                               <div className={`pointer ${selectedOptionn === 'daily' ? 'border-info bg-warning text-dark' : 'text-dark btn-primary'} p-2 bg-dark rounded text-center shadow-lg p-1 mb-3 bg-dark rounded border border-1 border-info`}  onClick={() => setSelectedOptionn('daily')}>
                                <h5 className='text-light'>Daily</h5>
                               </div>
                          </div>

                          <div className="col-2 text-center">
                               <div className={`pointer ${selectedOptionn === 'weekly' ? 'border-info bg-warning' : 'text-dark btn-primary'} p-2 bg-dark rounded text-center shadow-lg p-1 mb-3 bg-dark rounded border border-1 border-info`}  onClick={() => setSelectedOptionn('weekly')}>
                               <h5 className='text-light'>Weekly</h5>
                               </div>
                          </div>

                          <div className="col-2 text-center">
                          <div className={`pointer ${selectedOptionn === 'monthly' ? 'border-info bg-warning' : 'text-dark btn-primary'} p-2 bg-dark rounded text-center shadow-lg p-1 mb-3 bg-dark rounded border border-1 border-info`} onClick={() => setSelectedOptionn('monthly')}>
                          <h5 className='text-light'>Monthly</h5>
                          </div>
                          </div>

                          <div className="col-2 text-center">
                          <div className={`pointer ${selectedOptionn === 'cumulative' ? 'border-info bg-warning' : 'text-dark btn-primary'} p-2 bg-dark rounded text-center shadow-lg p-1 mb-3 bg-dark rounded border border-1 border-info`} onClick={() => setSelectedOptionn('cumulative')}>
                          <h5 className='text-light'>Cumulative</h5>
                          </div>
                          </div>

                          <div className="col-4">
                            <div className="row">

                            <div className="col-6 text-right">
                            <button className={`btn border-1 ${selectedOption === 'district' ? 'border-info btn-warning' : 'text-dark btn-primary'} rounded`} onClick={() => setSelectedOption('district')}>District</button>
                          </div>
                          {/* <div className="col-6">
                            <button className={`btn border-1 ${selectedOption === 'division' ? 'border-info btn-warning' : 'text-dark btn-primary'} rounded`} onClick={() => setSelectedOption('division')}>State</button>
                          </div> */}

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
                           
                              <div className="row">
                              <div className="col-12 mt-4">
                                <h2 className='text-center text-light'>{datee}</h2>
                                </div>
                               <div className="col-12">
                                 <div className="table-responsive">
                                 <table className='table table-xs table-bordered table-card col-12'>
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Departure %</th>
                                            <th>Colour Code</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>No rain</td>
                                            <td>-100%</td>
                                            <td style={{backgroundColor: '#FFFFFF'}} />
                                        </tr>
                                        <tr>
                                            <td>Large Deficient</td>
                                            <td>-99% to -60%</td>
                                            <td  style={{backgroundColor: '#FFFF00'}} />
                                        </tr>
                                        <tr>
                                            <td>Deficient</td>
                                            <td>-59% to -20%</td>
                                            <td style={{backgroundColor: '#FF0000'}} />
                                        </tr>
                                        <tr>
                                            <td>Normal</td>
                                            <td>-19% to 19%</td>
                                            <td style={{backgroundColor: '#00FF00'}} />
                                        </tr>
                                        <tr>
                                            <td>Excess</td>
                                            <td>20% to 59%</td>
                                            <td  style={{backgroundColor: '#70BBFF'}} />
                                        </tr>
                                        <tr>
                                            <td>Large Excess</td>
                                            <td>60% or more</td>
                                            <td  style={{backgroundColor: '#0D6ABF'}} />
                                        </tr>
                                    </tbody>
                                </table>
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


export default Rainfall_district;
