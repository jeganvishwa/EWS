import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, LoadScript, useLoadScript} from '@react-google-maps/api';
import tamilnadu_data from '../../mapdata/tamilnadu.json';
import india_sub from '../../mapdata/India_Subdivision.json';
import './Rainfall_state.css';
import { gtoken, base_url } from '../../service_token';

const RainfallState = () => {
  const [selectedOption, setSelectedOption] = useState('district');
  const [datas, setDatas] = useState([]);
  const [chdatas, setChdatas] = useState([]);
  const [nextDates, setNextDates] = useState([]);
  const [date, setDate] = useState('');
  const [datemap, setdatemap] = useState('5');
  const [map, setMap] = useState(null);
  const [zoneMarkers, setZoneMarkers] = useState([]);
  const [countlist, setcountlist] = useState([]);
  const [c_norain, setc_norain]                     = useState(0);
  const [c_Isolated, setc_Isolated]                 = useState(0);
  const [c_Scattered, setc_Scattered]               = useState(0);
  const [c_FairlyWidespread, setc_FairlyWidespread] = useState(0);
  const [c_Widespread, setc_Widespread]             = useState(0);
  const [selectedZone, setSelectedZone] = useState('');
  const [chennai, setchennai]   = useState('#FFFFFF')

  const [lat, setlat]   = useState('10.87234350177348');
  const [lng, setlng]   = useState('78.40492493567073');
  const [mapzoom, setmapzoom] = useState(6);


  
  
  const [d_selectedoption, setd_selectedoption] = useState([]);

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


    useEffect(() => {
      if (isLoaded && map && tamilnadu_data && datas && datemap && date) {
        
        map.data.forEach((feature) => {
          map.data.remove(feature);
        });

            if (zoneMarkers.length > 0) {
              zoneMarkers.forEach((marker) => marker.setMap(null));
            }
            setZoneMarkers([]);

        const infoWindow = new window.google.maps.InfoWindow();

        if (selectedOption === 'district') {
          map.data.addGeoJson(tamilnadu_data);
          setlat('');
          setlng('');
          setd_selectedoption([]);
    
          map.data.setStyle({
            strokeColor: 'black',
            strokeWeight: 2,
            fillColor: '#FFFFFF',
            fillOpacity: 1,
          });
    
          const markers = [];
          let newCountList = [];
          let chcolor = '#FFFFFF';
          map.data.forEach((feature) => {
            const st_id = feature.getProperty("id");
            const name = feature.getProperty("name");
            const imd_id = feature.getProperty("imd_id");
    
            setd_selectedoption((prevOptions) => [
              ...prevOptions,
              { district: name, id: imd_id }
            ]);
            let data_show = '';
            datas.forEach((dataItem) => {
              if (dataItem.Obj_id === imd_id) {
                let fillColor = '';
              
            
                switch (datemap) {
                  case 1:
                    fillColor = dataItem.day2_color;
                    data_show = dataItem.day2_distribution;
                    break;
                  case 2:
                    fillColor = dataItem.day3_color;
                    data_show = dataItem.day3_distribution;
                    break;
                  case 3:
                    fillColor = dataItem.day4_color;
                    data_show = dataItem.day4_distribution;
                    break;
                  case 4:
                    fillColor = dataItem.day5_color;
                    data_show = dataItem.day5_distribution;
                    break;
                  case 8:
                    fillColor = dataItem.day1_color;
                    data_show = dataItem.day1_distribution;
                    break;
                  default:
                    break;
                }
            
                if (dataItem.Obj_id === '78') {
                  setchennai(fillColor);
                }
            
                newCountList.push(data_show);
            
                map.data.overrideStyle(feature, {
                  strokeColor: 'black',
                  strokeWeight: 1,
                  fillColor: fillColor,
                  fillOpacity: 0.5,
                });
              
              }
            });
    
            if (name) {
              const bounds = new window.google.maps.LatLngBounds();
              feature.getGeometry().forEachLatLng((latLng) => {
                bounds.extend(latLng);
              });
              
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


              marker.addListener('mouseover', () => {
                infoWindow.setContent(`Details: ${data_show}`);
                infoWindow.setPosition(marker.getPosition());
                infoWindow.open(map);
              });
    
              marker.addListener('mouseout', () => {
                infoWindow.close();
              });

              markers.push(marker);
            }
          });
    
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

          setZoneMarkers(markers);
          
          setcountlist(newCountList);
          setc_Isolated(newCountList.filter(item => item === 'Isolated').length);
          setc_Scattered(newCountList.filter(item => item === 'Scattered').length);
          setc_FairlyWidespread(newCountList.filter(item => item === 'Fairly Widespread').length);
          setc_Widespread(newCountList.filter(item => item === 'Widespread').length);


        } else {
          const markers = [];
          let newCountList = [];
    
          map.data.addGeoJson(india_sub);
          setlat('23.86577357580456');
          setlng('78.95136128426273');
          setd_selectedoption([]);
    
          map.data.setStyle({
            strokeColor: 'black',
            strokeWeight: 2,
            fillColor: '#FFFFFF',
            fillOpacity: 0.5,
          });
    
          map.data.forEach((feature) => {
            const imd_id = feature.getProperty("subdivisio");
            let chcolor = '#FFFFFF';
    
            setd_selectedoption((prevOptions) => [
              ...prevOptions,
              { district: imd_id, id: imd_id }
            ]);
            let data_show = '';
            datas.forEach((dataItem) => {
              if (dataItem.SUBDIV === imd_id) {
                let fillColor = '';
                switch (datemap) {
                  case 1:
                    fillColor = dataItem.day2_color;
                    data_show = dataItem.day2_distribution;
                    break;
                  case 2:
                    fillColor = dataItem.day3_color;
                    data_show = dataItem.day3_distribution;
                    break;
                  case 3:
                    fillColor = dataItem.day4_color;
                    data_show = dataItem.day4_distribution;
                    break;
                  case 4:
                    fillColor = dataItem.day5_color;
                    data_show = dataItem.day5_distribution;
                    break;
                  case 5:
                    fillColor = dataItem.day6_color;
                    data_show = dataItem.day6_distribution;
                    break;
                  case 6:
                    fillColor = dataItem.day7_color;
                    data_show = dataItem.day7_distribution;
                    break;
                  case 8:
                    fillColor = dataItem.day1_color;
                    data_show = dataItem.day1_distribution;
                    break;
                  default:
                    break;
                }
    
                if (dataItem.SUBDIV === 'Tamilnadu & Puducherry') {
                  setchennai(fillColor);
                  setChdatas([dataItem]);
                }
                newCountList.push(dataItem[`day${datemap}_distribution`]);
    
                map.data.overrideStyle(feature, {
                  strokeColor: 'black',
                  strokeWeight: 1,
                  fillColor: fillColor,
                  fillOpacity: 0.5,
                });
              }
            });
    
            if (imd_id) {
              const bounds = new window.google.maps.LatLngBounds();
              feature.getGeometry().forEachLatLng((latLng) => {
                bounds.extend(latLng);
              });
    
              const marker = new window.google.maps.Marker({
                position: bounds.getCenter(),
                label: {
                  text: imd_id || 'No Name',
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
                            infoWindow.setContent(`Details: ${data_show}`);
                            infoWindow.setPosition(marker.getPosition());
                            infoWindow.open(map);
                          });
                
                          marker.addListener('mouseout', () => {
                            infoWindow.close();
                          });
    
              markers.push(marker);
            }
          });

            map.data.addListener('click', (event) => {
              const feature = event.feature;
              const zoneName = feature.getProperty("subdivisio");
              setSelectedZone(String(zoneName));
              
              const clickedBounds = new window.google.maps.LatLngBounds();
              feature.getGeometry().forEachLatLng((latLng) => {
                clickedBounds.extend(latLng);
              });
              map.fitBounds(clickedBounds);
            });
    
          setZoneMarkers(markers);
          setcountlist(newCountList);
          setc_Isolated(newCountList.filter(item => item === 'Isolated').length);
          setc_Scattered(newCountList.filter(item => item === 'Scattered').length);
          setc_FairlyWidespread(newCountList.filter(item => item === 'Fairly Widespread').length);
          setc_Widespread(newCountList.filter(item => item === 'Widespread').length);
        }
      }
    }, [isLoaded, map, tamilnadu_data, datas, datemap, date, selectedOption]);
  
  
  useEffect(() => {
    let url = '';
    if(selectedOption === 'district') 
    {
       url = `${base_url}get_district_imd`;
    }
    else
    {
      url = `${base_url}subdivisional`;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setDatas(result);
        calculateNextDates(result[0].date_obs);
        setDate(result[0].date_obs);
        setdatemap(8); 
        zoomme('');
        // console.log(result[0].date_obs);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedOption]);




  useEffect(() => {
    if(selectedOption === 'district') 
      {
    const fetchData = async () => {
      try {
        const response = await fetch(`${base_url}get_single_district_imd?id=78`);
        const result = await response.json();
        setChdatas(result[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    zoomme('78');
  }
  else
  {
    const fetchData = async () => {
      try {
        const response = await fetch(`${base_url}subdivisional`);
        const result = await response.json();
        const tamilnaduData = result.find(item => item.SUBDIV === 'Tamilnadu & Puducherry');
        setChdatas(tamilnaduData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    zoomme('');
  }
  }, [selectedOption,date]);

  function check_tndata(result)
  {
    let id = 'Tamilnadu & Puducherry';
  }

  const calculateNextDates = (dateString) => {
       let max = 0;
    if(selectedOption === 'district') 
      {
         max = 4;
      }
      else
      {
        max = 6;
      }
    const baseDate = new Date(dateString);
    const dates = [];
    for (let i = 1; i <= max; i++) {
      const newDate = new Date(baseDate);
      newDate.setDate(baseDate.getDate() + i);
      dates.push(newDate.toISOString().split('T')[0]);
    }
    setNextDates(dates);
  };


  function zoomme(imd_id) {
    if(imd_id != '' && isLoaded && map )
    {
      setlat(10.87234350177348);
      setlng(78.40492493567073);
      map.setZoom(7); 
      map.data.forEach((feature) => {
          const bounds = new window.google.maps.LatLngBounds();
          feature.getGeometry().forEachLatLng((latLng) => {
            bounds.extend(latLng);
          });
  
          setTimeout(() => {
            map.fitBounds(bounds);
            const listener = window.google.maps.event.addListener(map, "bounds_changed", () => {
              map.setZoom(7); 
              window.google.maps.event.removeListener(listener); 
            });
          }, 100);
      });
      setlat('');
      setlng('');
    }
    else if(isLoaded && map)
    {
      setlat(24.180334570612978);
      setlng(78.15624984061182);
      setmapzoom(4);
      map.data.forEach((feature) => {
          const bounds = new window.google.maps.LatLngBounds();
          feature.getGeometry().forEachLatLng((latLng) => {
            bounds.extend(latLng);
          });
  
          setTimeout(() => {
            map.fitBounds(bounds);
            const listener = window.google.maps.event.addListener(map, "bounds_changed", () => {
              map.setZoom(4); 
              window.google.maps.event.removeListener(listener); 
            });
          }, 100);
      });
    }
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
    <div className="card bg-dark" style={{ height: '100%' }}>
      <div className="card-body">
        <div className="row">
        <p className='text-light'>Date: <span className='text-light'>{datas[0]?.date_obs || '----'}</span></p>
        <div className="col-12">
                <div className="row">
                  <div className="col-10 shadow-lg p-1 bg-dark rounded border border-1 border-danger" style={{height:'50px'}}>
                    <div className="row">
                      <div style={{width:'110px'}}>
                        <div  style={{fontSize:'10px', width:'100px'}} className={`btn border-1 ${date === datas[0]?.date_obs ? 'border-info btn-warning' : 'text-light btn-primary'} rounded`} onClick={ () => { setDate(datas[0]?.date_obs || ''); setdatemap(8); zoomme('')}}>{datas[0]?.date_obs || '----'}</div>
                      </div>

                      {nextDates.map((nextDate, index) => (
                        <div key={index} style={{width:'120px'}}>
                          <div
                            className={`btn ${date === nextDate ? 'border-1 border-info btn-warning' : 'text-light btn-primary'} rounded`}
                            onClick={ () => {setDate(nextDate); setdatemap(++index); zoomme('')}}
                          style={{fontSize:'10px', width:'100px'}}>
                           {nextDate}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-2 text-light shadow-lg p-1 bg-dark rounded border border-1 border-danger"  style={{height:'50px'}}>
                    <div className="form-group pt-1">
                   
                    <select className="custom-select custom-select-sm" onChange={(e) => {
                        zoommez(e.target.value);
                      } 
                      }
                      defaultValue="">
                        <option value="">ALL</option>
                        {d_selectedoption.map((e, index) => (
                          <option key={index} value={e.id}>{e.district}</option>
                        ))}
                      </select>
                     
                    </div>
                  </div>
                </div>
              </div>
                     <div className="col-12">
                                <div className="row">
                                  <div className="col-2 text-light text-center shadow-lg p-1 mb-2 bg-dark rounded border border-1 border-light">
                                     <h1 className="text-light">{37-c_Isolated-c_Scattered-c_FairlyWidespread-c_Widespread}</h1>
                                     <h5 className="text-light">No rain</h5>
                                  </div>
                                  <div className="col-2 text-light  text-center shadow-lg p-1 mb-2 bg-dark rounded border border-1 border-success">
                                  <h1 className="text-light">{c_Isolated}</h1>
                                     <h5 className="text-light">Isolated</h5>
                                  </div>
                                  <div className="col-2 text-light  text-center shadow-lg p-1 mb-2 bg-dark rounded border border-1 border-danger">
                                  <h1 className="text-light">{c_Scattered}</h1>
                                     <h5 className="text-light">Scattered</h5>
                                  </div>
                                  <div className="col-2 text-light  text-center shadow-lg p-1 mb-2 bg-dark rounded border border-1 border-info">
                                  <h1 className="text-light">{c_FairlyWidespread}</h1>
                                     <h5 className="text-light">Fairly Widespread</h5>
                                  </div>
                                  <div className="col-2 text-light  text-center shadow-lg p-1 mb-2 bg-dark rounded border border-1 border-primary">
                                  <h1 className="text-light">{c_Widespread}</h1>
                                     <h5 className="text-light">Widespread</h5>
                                  </div>

                                  <div className="col-2 text-right">
                                  <div className="col-12 mb-1 text-right">
                                    <div className={`btn border-1 ${selectedOption === 'district' ? 'border-info btn-warning' : 'text-light btn-primary'} rounded`} onClick={() => setSelectedOption('district')} style={{width:'120px'}}>District</div>
                                    </div>
                                
                                    <div className="col-12">
                                      <div className={`btn border-1 ${selectedOption === 'division' ? 'border-info btn-warning' : 'text-light btn-primary'} rounded`} onClick={() => setSelectedOption('division')} style={{width:'120px'}}>Subdivision</div>
                                    </div>
                                    </div>
                                </div>
                          </div>


          <div className="col-12">
            <div className="row">
                <div className="col-6"  style={{height:'70vh'}}>
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

                           <div className="col-6 bg-dark">
                                <div className="row">
                                 <div className="col-12">

                                  {
                                    selectedOption === 'district' && (
                                        <h3 className='text-center text-info'>Forecasting Next 5days</h3>
                                    )  
                                  }
                                  {
                                    selectedOption === 'division' && (
                                      <h3 className='text-center text-info'>Forecasting Next 7days</h3>
                                  ) 
                                  }

                                <div className="row text-light">
                                  <div className="col-12 table-responsive">
                             <table className="table table-dark table-xs text-dark table-bordered table-active">
                                <thead>
                                  <tr>
                                    <th>
                                      {selectedOption === 'district' && 'Date'}
                                      {selectedOption === 'division' && 'Date'}
                                    </th>
                                    <th style={{ backgroundColor: chennai }}>
                                    {selectedOption === 'district' && 'CHENNAI'}
                                    {selectedOption === 'division' && 'TN & Pondichery'}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                {selectedOption === 'district' && (
                                <>
                                  <tr>
                                    <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day1_color || '#ffffff' }}>{datas[0]?.date_obs || '----'}</td>
                                    <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day1_color || '#ffffff' }}>
                                      {chdatas?.day1_distribution || '----'}
                                    </td>
                                  </tr>
                                  <tr>
                                  <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day2_color || '#ffffff' }}>{nextDates.length > 0 ? nextDates[0] : '----'}</td>
                                    <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day2_color || '#ffffff' }}>
                                      {chdatas?.day2_distribution || '----'}
                                    </td>
                                  </tr>
                                  <tr>
                                  <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day3_color || '#ffffff' }}>{nextDates.length > 0 ? nextDates[1] : '----'}</td>
                                    <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day3_color || '#ffffff' }}>
                                      {chdatas?.day3_distribution || '----'}
                                    </td>
                                  </tr>
                                  <tr>
                                  <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day4_color || '#ffffff' }}>{nextDates.length > 0 ? nextDates[2] : '----'}</td>
                                    <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day4_color || '#ffffff' }}>
                                      {chdatas?.day4_distribution || '----'}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day5_color || '#ffffff' }}>{nextDates.length > 0 ? nextDates[3] : '----'}</td>
                                    <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day5_color || '#ffffff' }}>
                                      {chdatas?.day5_distribution || '----'}
                                    </td>
                                  </tr>
                                </>
                              )}

                                  {selectedOption === 'division' && (
                                    <>
                                      <tr>
                                      <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day1_color || '#ffffff' }}>{datas[0]?.date_obs || '----'}</td>
                                        <td style={{ fontSize: '11px', width: '80vh', backgroundColor: chdatas?.day1_color || '#ffffff' }}>
                                          {chdatas?.day1_distribution || '----'}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day2_color || '#ffffff' }}>{nextDates.length > 0 ? nextDates[0] : '----'}</td>
                                        <td style={{ fontSize: '11px', width: '80vh', backgroundColor: chdatas?.day2_color || '#ffffff' }}>
                                          {chdatas?.day2_distribution || '----'}
                                        </td>
                                      </tr>
                                      <tr>
                                      <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day3_color || '#ffffff' }}>{nextDates.length > 0 ? nextDates[1] : '----'}</td>
                                        <td style={{ fontSize: '11px', width: '80vh', backgroundColor: chdatas?.day3_color || '#ffffff' }}>
                                          {chdatas?.day3_distribution || '----'}
                                        </td>
                                      </tr>
                                      <tr>
                                      <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day4_color || '#ffffff' }}>{nextDates.length > 0 ? nextDates[2] : '----'}</td>
                                        <td style={{ fontSize: '11px', width: '80vh', backgroundColor: chdatas?.day4_color || '#ffffff' }}>
                                          {chdatas?.day4_distribution || '----'}
                                        </td>
                                      </tr>
                                      <tr>
                                      <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day5_color || '#ffffff' }}>{nextDates.length > 0 ? nextDates[3] : '----'}</td>
                                        <td style={{ fontSize: '11px', width: '80vh', backgroundColor: chdatas?.day5_color || '#ffffff' }}>
                                          {chdatas?.day5_distribution || '----'}
                                        </td>
                                      </tr>
                                      <tr>
                                      <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day6_color || '#ffffff' }}>{nextDates.length > 0 ? nextDates[4] : '----'}</td>
                                        <td style={{ fontSize: '11px', width: '80vh', backgroundColor: chdatas?.day6_color || '#ffffff' }}>
                                          {chdatas?.day6_distribution || '----'}
                                        </td>
                                      </tr>
                                      <tr>
                                      <td style={{ fontSize: '11px', width: '100vh', backgroundColor: chdatas?.day7_color || '#ffffff' }}>{nextDates.length > 0 ? nextDates[5] : '----'}</td>
                                        <td style={{ fontSize: '11px', width: '80vh', backgroundColor: chdatas?.day7_color || '#ffffff' }}>
                                          {chdatas?.day7_distribution || '----'}
                                        </td>
                                      </tr>
                                    </>
                                  )}
                                </tbody>
                              </table>

                                  </div>
                                 </div>
                                  

                                  <div className="col-12 text-center mt-2">
                                         <h1 style={{color:chennai}}>
                                         {
                                          selectedOption === 'district' && (
                                            'CHENNAI'
                                          )  
                                            }
                                            {
                                              selectedOption === 'division' && (
                                                'TN & Pondichery'
                                            ) 
                                            }
                                         </h1>
                                  </div>

                                  <div className="col-12 mt-3" style={{fontSize:'11px',  width:'100vh'}}>
                                  <table className='table table-xs text-xs table-bordered'>
                                      <thead>
                                          <tr>
                                              <th>Distribution</th>
                                              <th>Distribution %</th>
                                              <th>Colour Code</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr>
                                              <td>Dry</td>
                                              <td>No Rain</td>
                                              <td className="dry"></td>
                                          </tr>
                                          <tr>
                                              <td>Isolated</td>
                                              <td>Stations [1-25]%</td>
                                              <td className="isolated"></td>
                                          </tr>
                                          <tr>
                                              <td>Scattered</td>
                                              <td>Stations [26-50]%</td>
                                              <td className="scattered"></td>
                                          </tr>
                                          <tr>
                                              <td>Fairly Widespread</td>
                                              <td>Stations [51-75]%</td>
                                              <td className="fairly-widespread"></td>
                                          </tr>
                                          <tr>
                                              <td>Widespread</td>
                                              <td>Stations [76-100]%</td>
                                              <td className="widespread"></td>
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
    </div>
  );
};

export default RainfallState;
