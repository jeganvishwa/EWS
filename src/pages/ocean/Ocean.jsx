import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import './Ocean.css';
import state_boundaries from '../mapdata/india.json';
import state_names from '../mapdata/state_list.json';
import zone_boundaries from '../../pages/mapdata/Zone_Boundary.json';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { gtoken,incois_url } from '../service_token';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Ocean = () => {
    const mapContainerStyle = {
        height: "100%",
        width: "100%",
      };



  const [states, setstates] = useState([]);
  const [selectedstates, setSelectedstates] = useState(null);
  const [district, setdistrict] = useState([]);
  const [selecteddistrict, setselecteddistrict] = useState('');
  const [map, setMap] = useState(null);
  const [zoneMarkers, setZoneMarkers] = useState([]);
  const [selecteddist, setselecteddist] = useState('');
  const [coastal_current, setcoastal_current] = useState([]);
  const [totalstate, settotalstate] = useState(0);
  const [totaldistrict, settotaldistrict] = useState(0);
  const [totalred, settotalred] = useState(0);
  const [totalorange, settotalorange] = useState(0);
  const [totalyellow, settotalyellow] = useState(0);

  const [tsunami, settsunami] = useState([]);

  const [mapzoom, setmapzoom] = useState(6);

  const [tideData, settideData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Tide Forecasting',
        data: [],  
        borderColor: '#0D6ABF',
        backgroundColor: 'rgba(13, 106, 191, 0.5)',
        fill: true,
        tension: 0.4,
      }
    ]
  });


  const [tideData2, settideData2] = useState({
    labels:[],
    datasets: [
      {
        label: 'Highest Points',
        data: [],
        borderColor: 'red',
        fill: false,
        tension: 0.4
      },
      {
        label: 'Lowest Points',
        data: [],
        borderColor: 'blue',
        fill: false,
        tension: 0.4
      }
    ]
  });

  const [chcolor, setchcolor] = useState('#008000');

   const [lat, setlat] = useState();
   const [lng, setlng] = useState();

  const center = {
    lat: lat, 
    lng: lng,
  };

const [menu, setMenu] = useState("tsunami");
const displayicon = (temp) => {
setMenu(temp);



if(temp === "astronomical")
  {
    setlat(13.104573398213107);
    setlng(80.30317769219579);
    setcoastal_current([]); 
    setmapzoom(13);
  }
  else if(temp === "tsunami")
  {
    setlat(0);
    setlng(0);
    setcoastal_current([]); 
    setmapzoom(1);
  }
  else
  {
    setSelectedstates('');
    setselecteddistrict('');
    setmapzoom(7);
    zoomme('');
  }

};

  useEffect(() => {
    settotalyellow(0);
    settotalorange(0);
    settotalred(0);
  if(menu === "astronomical")
  {
    setlat(13.104573398213107);
    setlng(80.30317769219579);
    setcoastal_current([]); 
    setmapzoom(13);
  }
  else if(menu === "tsunami")
  {
    setlat(0);
    setlng(0);
    setcoastal_current([]); 
    setmapzoom(1);
  }
  else
  {
    setlat(11.127123);
    setlng(78.656891);
    setmapzoom(6);
  }
  },[menu]);

  const count_list = (selectedstates) => {
    if(menu === "astronomical" || menu === "tsunami")
    {

    }
    else
    {
    if(selectedstates!='')
    { 
        let red       = 0;
        let orange    = 0;
        let yellow    = 0;
        let total_dis = 0;
        settotalyellow(yellow);
        settotalorange(orange);
        settotalred(red);
        setchcolor('#008000');
        if(coastal_current.length > 0)
        {
                coastal_current.forEach((item) => {
                   if(item.district == 'CHENNAI')
                   {
                       if (item.color === 'Yellow') {
                        setchcolor('#ffff00')
                        } else if (item.color === 'Orange') {
                            setchcolor('#ff8000')
                        } else if (item.color === 'Red') {
                            setchcolor('#ff0000')
                        } 
                   }

                    if(item.state == selectedstates)
                    {
                        if (item.color === 'Yellow') {
                        yellow += 1;
                        } else if (item.color === 'Orange') {
                        orange += 1;
                        } else if (item.color === 'Red') {
                        red += 1;
                        }
                    }
            });



            district.map((e)=>{
                if(e.state_name == selectedstates)
                {
                    total_dis += 1; 
                }
            }) 

            settotalyellow(yellow);
            settotalorange(orange);
            settotalred(red);
            settotalstate(1);
            settotaldistrict(total_dis);
        }
    }
    else
    {
        setchcolor('#008000');
        settotalstate(13);
        let red = 0;
        let orange = 0;
        let yellow = 0;
        let total_dis = 89;
        if(coastal_current.length > 0)
        {
                coastal_current.forEach((item) => {


                       if(item.district == 'CHENNAI')
                          {
                            if (item.color === 'Yellow') {
                             setchcolor('#ffff00')
                             } else if (item.color === 'Orange') {
                                 setchcolor('#ff8000')
                             } else if (item.color === 'Red') {
                                 setchcolor('#ff0000')
                             }
                          }
                        


                if (item.color === 'Yellow') {
                yellow += 1;
                } else if (item.color === 'Orange') {
                orange += 1;
                } else if (item.color === 'Red') {
                red += 1;
                }
            });
            settotalyellow(yellow);
            settotalorange(orange);
            settotalred(red);
            settotaldistrict(total_dis);
        }
    } 
   }
  };


  const count_state_list = (selecteddist) => {
    if(selecteddist!='')
        {
            
            let red       = 0;
            let orange    = 0;
            let yellow    = 0;
            let total_dis = 0;
            if(coastal_current.length > 0)
            {
                    coastal_current.forEach((item) => {
                        if(item.district == selecteddist)
                        {
                            if (item.color === 'Yellow') {
                            yellow += 1;
                            } else if (item.color === 'Orange') {
                            orange += 1;
                            } else if (item.color === 'Red') {
                            red += 1;
                            }
                        }
                }); 
    
                total_dis = 1;

                settotalyellow(yellow);
                settotalorange(orange);
                settotalred(red);
                settotalstate(1);
                settotaldistrict(total_dis);
            }
        }
        else
        {
            count_list('');
        } 
  }
  

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


  useEffect(() => {
    if (state_names) {
      const state_list = state_names.data;
      const unique_states = state_list
        .map((item) => item.state_name)
        .filter((value, index, self) => self.indexOf(value) === index);
      setstates(unique_states);
      setdistrict(state_list);
    }
  }, [state_names]);

  const getColorByMagnitude = (magnitude) => {
    if (magnitude >= 1.0 && magnitude <= 1.9) {
      return '#87cefa';  // Light Blue
    } else if (magnitude >= 2.0 && magnitude <= 2.9) {
      return '#afeeee';  // Cyan
    } else if (magnitude >= 3.0 && magnitude <= 3.9) {
      return '#98fb98';  // Light Green
    } else if (magnitude >= 4.0 && magnitude <= 4.9) {
      return '#adff2f';  // Lime Green
    } else if (magnitude >= 5.0 && magnitude <= 5.9) {
      return '#ffff00';  // Yellow
    } else if (magnitude >= 6.0 && magnitude <= 6.9) {
      return '#ffd700';  // Gold
    } else if (magnitude >= 7.0 && magnitude <= 7.9) {
      return '#ff8c00';  // Orange
    } else if (magnitude >= 8.0 && magnitude <= 8.9) {
      return '#ff0000';  // Red
    } else if (magnitude >= 9.0 && magnitude <= 9.9) {
      return '#800000';  // Dark Red
    }
  };

  const getMarkerSizeByMagnitude = (magnitude) => {
    if (magnitude >= 1.0 && magnitude <= 1.9) return 6;
    if (magnitude >= 2.0 && magnitude <= 2.9) return 8;
    if (magnitude >= 3.0 && magnitude <= 3.9) return 10;
    if (magnitude >= 4.0 && magnitude <= 4.9) return 12;
    if (magnitude >= 5.0 && magnitude <= 5.9) return 14;
    if (magnitude >= 6.0 && magnitude <= 6.9) return 16;
    if (magnitude >= 7.0 && magnitude <= 7.9) return 18;
    if (magnitude >= 8.0 && magnitude <= 8.9) return 20;
    if (magnitude >= 9.0 && magnitude <= 9.9) return 22;
  };



  useEffect(() => {
    let url = '';
    if (menu === "coastal") {
      setcoastal_current([]);  // Clear current data
      url = `${incois_url}currentslatestgeo`;
    } else if (menu === "wave") {
      setcoastal_current([]);  // Clear current data
      settotalred(0);
      settotalorange(0);
      settotalyellow(0);
      url = `${incois_url}hwalatestgeo`;
    } else if (menu === "swell") {
      setcoastal_current([]);  // Clear current data
      url = `${incois_url}ssalatestgeo`;
    } else if (menu === "astronomical") {
        setcoastal_current([]);  // Clear current data
        url = `${incois_url}tidal/Chennai`;
    }
    else if (menu === "tsunami") {
        setcoastal_current([]);  // Clear current data
        url = `${incois_url}tsunami`;
    }
    if (url) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "20c217e9dec743b5932694ff2ebd5618");
  
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
  
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if(menu === "astronomical") { 
                settideData(generateTideData(result.data));
                callhigh_low();
            }
            else if(menu === "tsunami") {
                let res = result.features;
                const highestBulnoMap = {};
                res.forEach((feature) => {
                    const { EVID, BULNO } = feature.properties;
                    if (!highestBulnoMap[EVID] || feature.properties.BULNO > highestBulnoMap[EVID].properties.BULNO) {
                        highestBulnoMap[EVID] = feature;
                    }
                });
                settsunami(Object.values(highestBulnoMap));
            }
            else{
             if (result && result.features) {
            const currentData = result.features.map((feature) => ({
              color: feature.properties.Color,
              state: feature.properties.STATE,
              district: feature.properties.District,
              Alert: feature.properties.Alert,
              Issue_Date: feature.properties['Issue Date'],
              Message: feature.properties.Message
            }));
            setcoastal_current(currentData); 
            count_list(''); 
          }
        }
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [menu]); 


function callhigh_low()
{
    const myHeaders = new Headers();
      myHeaders.append("Authorization", "20c217e9dec743b5932694ff2ebd5618");
  
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
  
      fetch(`${incois_url}high-low/Chennai`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            settideData2(transformTideData(result.predictions)); 
        })
        .catch((error) => console.error("Error:", error));
}
  
 useEffect(() => {
    if (map) {
      map.data.forEach((feature) => {
        map.data.remove(feature);
      });
  
      setZoneMarkers((prevMarkers) => {
        prevMarkers.forEach(marker => marker.setMap(null)); 
        return [];
      });
  
   
      window.google.maps.event.clearListeners(map.data, 'mouseover');
      window.google.maps.event.clearListeners(map.data, 'mouseout');
    }
  
    if (menu === "astronomical") {
      map.data.addGeoJson(zone_boundaries);
      const iconUrl = 'https://img.icons8.com/?size=100&id=Q_wpzSRVxkAB&format=png&color=000000';
      const positions = [
        {"lat": 13.084125249624177, "lng": 80.29882301607177},
        {"lat": 13.084225249624177, "lng": 80.29892301607177},
        {"lat": 13.084325249624177, "lng": 80.29902301607177},
        {"lat": 13.084425249624177, "lng": 80.29912301607177},
        {"lat": 13.084525249624177, "lng": 80.29922301607177},
        {"lat": 13.084625249624177, "lng": 80.29932301607177},
        {"lat": 13.084725249624177, "lng": 80.29942301607177},
        {"lat": 13.084825249624177, "lng": 80.29952301607177},
        {"lat": 13.084925249624177, "lng": 80.29962301607177},
        {"lat": 13.085025249624177, "lng": 80.29972301607177},
        {"lat": 13.085125249624177, "lng": 80.29982301607177},
        {"lat": 13.085225249624177, "lng": 80.29992301607177},
        {"lat": 13.085325249624177, "lng": 80.30002301607177},
        {"lat": 13.085425249624177, "lng": 80.30012301607177},
        {"lat": 13.085525249624177, "lng": 80.30022301607177},
        {"lat": 13.085625249624177, "lng": 80.30032301607177},
        {"lat": 13.085725249624177, "lng": 80.30042301607177},
        {"lat": 13.085825249624177, "lng": 80.30052301607177},
        {"lat": 13.085925249624177, "lng": 80.30062301607177},
        {"lat": 13.086025249624177, "lng": 80.30072301607177},
        {"lat": 13.086125249624177, "lng": 80.30082301607177},
        {"lat": 13.086225249624177, "lng": 80.30092301607177},
        {"lat": 13.086325249624177, "lng": 80.30102301607177},
        {"lat": 13.086425249624177, "lng": 80.30112301607177},
        {"lat": 13.086525249624177, "lng": 80.30122301607177},
        {"lat": 13.086625249624177, "lng": 80.30132301607177},
        {"lat": 13.086725249624177, "lng": 80.30142301607177},
        {"lat": 13.086825249624177, "lng": 80.30152301607177},
        {"lat": 13.086925249624177, "lng": 80.30162301607177},
        {"lat": 13.087025249624177, "lng": 80.30172301607177},
        {"lat": 13.087125249624177, "lng": 80.30182301607177},
        {"lat": 13.087225249624177, "lng": 80.30192301607177},
        {"lat": 13.087325249624177, "lng": 80.30202301607177},
        {"lat": 13.087425249624177, "lng": 80.30212301607177},
        {"lat": 13.087525249624177, "lng": 80.30222301607177},
        {"lat": 13.087625249624177, "lng": 80.30232301607177},
        {"lat": 13.087725249624177, "lng": 80.30242301607177},
        {"lat": 13.087825249624177, "lng": 80.30252301607177},
        {"lat": 13.087925249624177, "lng": 80.30262301607177},
        {"lat": 13.088025249624177, "lng": 80.30272301607177},
        {"lat": 13.088125249624177, "lng": 80.30282301607177},
        {"lat": 13.088225249624177, "lng": 80.30292301607177},
        {"lat": 13.088325249624177, "lng": 80.30302301607177},
        {"lat": 13.088425249624177, "lng": 80.30312301607177},
        {"lat": 13.088525249624177, "lng": 80.30322301607177},
        {"lat": 13.088625249624177, "lng": 80.30332301607177},
        {"lat": 13.088725249624177, "lng": 80.30342301607177},
        {"lat": 13.088825249624177, "lng": 80.30352301607177},
        {"lat": 13.088925249624177, "lng": 80.30362301607177},
        {"lat": 13.089025249624177, "lng": 80.30372301607177},
        {"lat": 13.089125249624177, "lng": 80.30382301607177}
       ];

const animationAmplitude = 0.0001; // Approximate shift in longitude for 2 cm movement
const animationSpeed = 50; // Speed of animation (lower is faster)

let animationDirection = 1; // 1 for right, -1 for left

// Create markers for each position
const markers = positions.map((position) => {
  return new window.google.maps.Marker({
    position,
    label: {
      fontSize: "8px",
      fontWeight: "bold",
      color: "red",
    },
    title: 'Chennai',
    icon: {
      url: iconUrl,
      scaledSize: new window.google.maps.Size(20, 15),
    },
    map: map,
  });
});

// Animate the markers left and right
// function animateMarkers() {
//   markers.forEach((marker) => {
//     const currentPos = marker.getPosition();
//     const newLng = currentPos.lng() + (animationDirection * animationAmplitude);
    
//     // Update marker position
//     marker.setPosition({
//       lat: currentPos.lat(),
//       lng: newLng,
//     });
    
//     // Reverse direction when reaching the limits
//     if (newLng > positions[0].lng + animationAmplitude || newLng < positions[0].lng - animationAmplitude) {
//       animationDirection *= -1; // Reverse direction
//     }
//   });
// }

// Run the animation at a regular interval
// setInterval(animateMarkers, animationSpeed);

// Set all the markers
setZoneMarkers(markers);

      
      zoomme('');
  
    }else if (menu === "tsunami" && map && tsunami.length > 0) {
      map.data.addGeoJson(zone_boundaries);
        const markers = [];
        const infowindow = new window.google.maps.InfoWindow();
  
        tsunami.forEach((feature) => {
          const [LONGITUDE, LATITUDE] = feature.geometry.coordinates;
          const { MAGNITUDE, ORIGINTIME, REGIONNAME } = feature.properties;
          const color = getColorByMagnitude(MAGNITUDE);
          const size = getMarkerSizeByMagnitude(MAGNITUDE);
          const mg   = MAGNITUDE;
  
          const marker = new window.google.maps.Marker({
            position: {
              lat: LATITUDE,
              lng: LONGITUDE,
            },
            label: {
                text: `${mg}`,
                fontSize: "12px",
                fontWeight: "bold",
                color: "red",
              },
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: color,
              fillOpacity: 0.4,
              scale: size,
              strokeColor: color,
              strokeWeight: 1.5,
            },
            map: map,
          });
  
          marker.addListener('mouseover', () => {
            infowindow.setContent(`
              <p>Date: ${ORIGINTIME}</p>
              <p>Magnitude: ${MAGNITUDE}</p>
              <p>Region Name: ${REGIONNAME}</p>
            `);
            infowindow.open(map, marker);
          });
  
          marker.addListener('mouseout', () => {
            infowindow.close();
          });
  
          markers.push(marker);
        });
  
        return () => {
          markers.forEach(marker => marker.setMap(null));
          infowindow.close();
        };
      }
      else if(menu === 'storm')
      {
        count_list('');
        const markers = [];
        const infowindow = new window.google.maps.InfoWindow();
      }
    
    else {
      if (map && state_boundaries) {
        if (coastal_current.length > 0) {
          map.data.addGeoJson(zone_boundaries);
          map.data.addGeoJson(state_boundaries);
  
          map.data.setStyle((feature) => {
            const district = feature.getProperty("District");
            const matchingCurrent = coastal_current.find(item => item.district === district);
  
            if (matchingCurrent) {
              const color = matchingCurrent.color;
              switch (color) {
                case 'Yellow':
                  return {
                    strokeColor: 'black',
                    strokeWeight: 1,
                    fillColor: '#ffff00',
                    fillOpacity: 0.9,
                  };
                case 'Orange':
                  return {
                    strokeColor: 'black',
                    strokeWeight: 1,
                    fillColor: '#ff8000',
                    fillOpacity: 0.9,
                  };
                case 'Red':
                  return {
                    strokeColor: 'black',
                    strokeWeight: 1,
                    fillColor: '#ff0000',
                    fillOpacity: 0.9,
                  };
                default:
                  break;
              }
            }
  
            return {
              strokeColor: 'black',
              strokeWeight: 1,
              fillColor: '#008000',
              fillOpacity: 0.9,
            };
          });
  
          const markers = [];
          map.data.forEach((feature) => {
            const district = feature.getProperty("District");
  
            if (district) {
              const bounds = new window.google.maps.LatLngBounds();
              feature.getGeometry().forEachLatLng((latLng) => {
                bounds.extend(latLng);
              });
  
              const marker = new window.google.maps.Marker({
                position: bounds.getCenter(),
                label: {
                  text: district,
                  fontSize: "0px",
                  fontWeight: "bold",
                  color: "black",
                },
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 0,
                },
                map: map,
              });
  
              markers.push(marker);
            }
          });
  
          setZoneMarkers(markers); 
          count_list('');
          const infowindow = new window.google.maps.InfoWindow();
  
       
          map.data.addListener('mouseover', function (event) {
            infowindow.close(); 
    
            const feature = event.feature;
            const district = feature.getProperty("District");
            const matchingCurrent = coastal_current.find(item => item.district === district);
    
            if (matchingCurrent) {
              infowindow.setContent(`<p>Issued Date : ${matchingCurrent.Issue_Date}</p><p>Message: ${matchingCurrent.Message}</p><p>Alert: ${matchingCurrent.Alert}</p><p>${matchingCurrent.district}(${matchingCurrent.state})</p>`);
            } else {
              infowindow.setContent(`<p>${district}</p><p>Alert: No Alert</p>`);
            }
    
            infowindow.setPosition(event.latLng);
            infowindow.open(map);
          });
    
          map.data.addListener('mouseout', function () {
            infowindow.close();  
          });
        }
      }
    }
  }, [menu, map, state_boundaries, coastal_current, tsunami]);
  

  const select_state = (e) => {
    setSelectedstates(e.target.value);
    count_list(e.target.value);
  }

 
    const select_district = (e) => {
      const district = e.target.value;
      setselecteddistrict(district);
      count_state_list(district);
      zoomme(district);
    };

  
  useEffect(() => {
   },[select_district]); 
   

   function zoomme(district) {
    // Check if the menu option is 'astronomical'
    if (menu === "astronomical") {
      const bounds = new window.google.maps.LatLngBounds();
      const latLng = new window.google.maps.LatLng('13.104573398213107', '80.30317769219579');
      bounds.extend(latLng);
  
      setTimeout(() => {
        map.fitBounds(bounds);
        const listener = window.google.maps.event.addListener(map, "bounds_changed", () => {
          map.setZoom(9); 
          window.google.maps.event.removeListener(listener); 
        });
      }, 100);
    } else {

      map.data.forEach((feature) => {
        const zoneName = feature.getProperty("District");
        if (zoneName === district) {
          const bounds = new window.google.maps.LatLngBounds();
          feature.getGeometry().forEachLatLng((latLng) => {
            bounds.extend(latLng);
          });
  
          setTimeout(() => {
            map.fitBounds(bounds);
            const listener = window.google.maps.event.addListener(map, "bounds_changed", () => {
              map.setZoom(9); 
              window.google.maps.event.removeListener(listener); 
            });
          }, 100);
        }
      });
    }
  }
  

const generateTideData = (data) => {
    const labels = data.map((entry) => {
      const date = new Date(entry.t);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${hours}:${minutes}`;
    });
  
    const tideValues = data.map((entry) => parseFloat(entry.v));
  
    return {
      labels: labels,
      datasets: [
        {
          label: 'Tide Forecasting',
          data: tideValues,
          borderColor: '#0D6ABF',
          backgroundColor: 'rgba(13, 106, 191, 0.5)',
          fill: true,
          tension: 0.4,
        }
      ]
    };
  };

  const tideOptions = {
    responsive: true,
    maintainAspectRatio: true, 
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value',
          color: 'white'
        },
        ticks: {
          color: 'white' 
        },
        grid: {
          color: '#444' 
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date-Time',
          color: 'white'
        },
        ticks: {
          color: 'white' 
        },
        grid: {
          color: '#444' 
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'white' 
        }
      },
      filler: {
        propagate: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}`; 
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.4 
      },
      point: {
        radius: 0 
      }
    }
  };





  const transformTideData = (data) => {
    const labels = [];
    const highData = [];
    const lowData = [];

    data.forEach(entry => {
      const date = new Date(entry.t).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (!labels.includes(date)) labels.push(date);
  
      if (entry.type === 'H') {
        highData.push({ x: date, y: parseFloat(entry.v) });
      } else if (entry.type === 'L') {
        lowData.push({ x: date, y: parseFloat(entry.v) });
      }
    });
    const groupedHighData = labels.map(label => highData.find(d => d.x === label)?.y || null);
    const groupedLowData = labels.map(label => lowData.find(d => d.x === label)?.y || null);
  
    return {
      labels,
      datasets: [
        {
          label: 'Highest Points',
          data: groupedHighData,
          borderColor: 'red',
          fill: false,
          tension: 0.4
        },
        {
          label: 'Lowest Points',
          data: groupedLowData,
          borderColor: 'blue',
          fill: false,
          tension: 0.4
        }
      ]
    };
  };


  

  const continents = [
    { name: 'Africa', position: { lat: 0, lng: 20 } },
    { name: 'Asia', position: { lat: 34, lng: 100 } },
    { name: 'Europe', position: { lat: 50, lng: 10 } },
    { name: 'North America', position: { lat: 54, lng: -100 } },
    { name: 'Oceania', position: { lat: -25, lng: 140 } },
    { name: 'South America', position: { lat: -15, lng: -60 } }
  ];

    return (
        <div>
            <section className="pcoded-main-container " style={{ background: '#262626' }}>
                <div className="pcoded-content">
                    <div className="row">
                        <div className="col-12">
                                 <div className="row">
                                    <div className='col-3 text-right'>
                                        <img className='gcc-logo' src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Chennai_Corporation_Emblem.png" style={{height:'8vh',width:'8vh'}} alt="GCC_logo" />
                                        </div>
                                            <div className='col-6 text-center'>
                                                <h3 className='gcc'><u>Greater Chennai Corporation</u></h3>
                                                {menu === "coastal" && <h4 className='ofcc'>Ocean Forecasting - Coastal Current</h4>}
                                                {menu === "wave" && <h4 className='ofcc'>Ocean Forecasting - Waves</h4>}
                                                {menu === "swell" && <h4 className='ofcc'>Ocean Forecasting - Swells</h4>}
                                                {menu === "astronomical" && <h4 className='ofcc'>Astronomical Tides</h4>}
                                                {menu === "tsunami" && <h4 className='ofcc'>Tsunami</h4>}
                                            </div>

                                        <div className='col-3 text-left'>
                                        <img className='gcc-logo mt-3' src="https://sarat.incois.gov.in/Home/images/logo.png" alt="Incois_logo" />
                                        
                                      </div>
                                 </div>

                        </div>
                        <div className="col-lg-12 col-xl-12">
                            <div className="card" style={{ background: '#262626' }}>
                                <div className="card-body"   >
                                    <div className="row">
                                    <div className="col-2 border border-light rounded" style={{background:'#ff9900', height:'100vh',overflowY: 'auto'}}>
                                        <div className="mt-3">
                                                  <p 
                                                    className={`text-light pointer menu-side ${menu === 'tsunami' ? 'sele' : ''}`} 
                                                    onClick={() => displayicon('tsunami')}
                                                    >
                                                    <img 
                                                        src="https://img.icons8.com/?size=100&id=XUcLHmmCk9ys&format=png&color=000000" 
                                                        alt="Tsunami Icon" 
                                                        style={{ width: '2em', height: '2em' }} 
                                                    /> 
                                                    Tsunami
                                                    </p>

                                                    <p 
                                                    className={`text-light pointer menu-side ${menu === 'storm' ? 'sele' : ''}`} 
                                                    onClick={() => displayicon('storm')}
                                                    >
                                                    <img 
                                                        src="https://img.icons8.com/?size=100&id=Htj5Mil1IpAa&format=png&color=000000" 
                                                        alt="Storm Surge Icon" 
                                                        style={{ width: '2em', height: '2em' }} 
                                                    /> 
                                                    Storm Surge
                                                    </p>

                                          
                                                    <p className={`text-light pointer menu-side ${menu === 'coastal' ? 'sele' : ''}`} 
                                                    onClick={() => displayicon('coastal')}>
                                                    <img 
                                                        src="https://img.icons8.com/?size=100&id=Y2pBHDZkP5lH&format=png&color=000000" 
                                                        alt="Coastal Current" 
                                                        style={{ width: '2em', height: '2em' }} 
                                                    />  Coastal Current
                                                    
                                                    </p>

                                                    <p 
                                                    className={`text-light pointer menu-side ${menu === 'wave' ? 'sele' : ''}`} 
                                                    onClick={() => displayicon('wave')}
                                                    >
                                                    <img 
                                                        src="https://img.icons8.com/?size=100&id=UC01sKb4gLlw&format=png&color=000000" 
                                                        alt="High Wave" 
                                                        style={{ width: '2em', height: '2em' }} 
                                                    /> High Wave
                                                    </p>

                                                    <p 
                                                    className={`text-light pointer menu-side ${menu === 'swell' ? 'sele' : ''}`} 
                                                    onClick={() => displayicon('swell')}
                                                    >
                                                    <img 
                                                        src="https://img.icons8.com/?size=100&id=4o0L4g68sfON&format=png&color=000000" 
                                                        alt="Swell Surge" 
                                                        style={{ width: '2em', height: '2em' }} 
                                                    /> Swell Surge
                                                    </p>

                                                    <p 
                                                    className={`text-light pointer menu-side ${menu === 'astronomical' ? 'sele' : ''}`} 
                                                    onClick={() => displayicon('astronomical')}
                                                    >
                                                    <img 
                                                        src="https://img.icons8.com/?size=100&id=18534&format=png&color=000000" 
                                                        alt="Astronomical Tides Icon" 
                                                        style={{ width: '2em', height: '2em' }} 
                                                    /> 
                                                    Astronomical Tides
                                                    </p>

                                                   
                                                  
                                            </div>
                                            </div>







                          <div className="col-10">
                             { menu === "astronomical" ? ( 
                                <>
                                <h3 style={{ color: '#ffffff'}}>Tides - Forecasting</h3>
                                <div className="border border-light rounded green-above">
                                <Line data={tideData} options={tideOptions} height={70}/>
                                 </div>
                                 </>
                                   ) : null }  

                                            <div className="row">
                                            <div className={menu === "astronomical" || menu === "tsunami" ? "col-5" : "col-9"}>
                                            <div className="row" style={ menu === "astronomical" || menu === "tsunami" ? { height: '100%' } : { height: '100vh' }}>
                                                <div className='blue-box col-12'>
                                                { menu === "coastal" || menu === "wave" || menu === "swell" ? (       
                                                <div className="blue-above">
                                                        <div className="row">
                                                        <div className="col-4">
                                                                <label htmlFor="dropdown" className='text-light'>State</label>
                                                                <select class="form-control form-control-sm text-light bg-dark" id="dropdown" value={selectedstates} onChange={select_state}>
                                                                    <option value="">Select State</option>
                                                                    {states.map((option) => (
                                                                    <option value={option}>
                                                                        {option}
                                                                    </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="col-4">
                                                                <label htmlFor="dropdown" className='text-light'>District</label>
                                                                <select className="form-control form-control-sm text-light bg-dark" id="dropdown" value={selecteddistrict} onChange={select_district}>
                                                                    <option value="">Choose District</option>
                                                                    {district
                                                                        .filter((option) => option.state_name === selectedstates) // Filter districts based on the selected state
                                                                        .map((option, index) => (
                                                                        <option key={index} value={option.district}>
                                                                            {option.district}
                                                                        </option>
                                                                        ))
                                                                    }
                                                                    </select>
                                                            </div>

                                                            <div className="col-4">
                                                            <h1 style={{ color: chcolor}} className='mt-4 float-right'>CHENNAI</h1>
                                                            </div>
                                                            </div>
                                                </div>
                                        ) : null }  
                                            
                                                <div className=" bg-primary border border-light rounded blue-below h-100">
                                                <LoadScript
                                                    googleMapsApiKey={gtoken}
                                                    >
                                                    <GoogleMap
                                                        mapContainerStyle={mapContainerStyle}
                                                        center={center}
                                                        zoom={mapzoom}
                                                        options={mapOptions}
                                                        onLoad={setMap}
                                                    >
                                                    </GoogleMap>
                                                    </LoadScript>
                                                </div>
                                                </div>
                                                
                                            </div>
                                        </div>

                                        {(menu === "coastal" || menu === "swell") && (
                                        <div className="col-3">
                                            <div className="row" style={{height:'100%'}}>

                                                <div className="col-6 border border-light text-center rounded">
                                                <p className='num1'>{totalstate}</p>
                                                <p className='num-text'>States</p>
                                                </div>

                                                <div className="col-6 border border-light text-center rounded">
                                                <p className='num2'>{totaldistrict}</p>
                                                <p className='num-text'>Districts</p>
                                                 </div>
                                           

                                            <div className='alert'>
                                            <p className='num3'>{totalred}</p>
                                            <p className='num-text'>Red Alerts</p>
                                            </div>

                                            <div className='alert'>
                                            <p className='num4'>{totalorange}</p>
                                            <p className='num-text'>Orange Alerts</p>
                                            </div>

                                            <div className='alert'>
                                            <p className='num5'>{totalyellow}</p>
                                            <p className='num-text'>Yellow Alerts</p>
                                            </div>

                                            <div className='alert'>
                                            <p className='num6'>{totaldistrict - (totalred + totalorange + totalyellow)}</p>
                                            <p className='num-text'>No Alerts</p>
                                            </div>

                                            </div>
                                        </div>
                                        )}


                                   {(menu === "wave") && (
                                        <div className="col-3">
                                            <div className="row" style={{height:'100%'}}>

                                                <div className="col-6 border border-light text-center rounded">
                                                <p className='num1'>{totalstate}</p>
                                                <p className='num-text'>States</p>
                                                </div>

                                                <div className="col-6 border border-light text-center rounded">
                                                <p className='num2'>{totaldistrict}</p>
                                                <p className='num-text'>Districts</p>
                                                 </div>
                                           

                                            <div className='alert'>
                                            <p className='num3'>{0}</p>
                                            <p className='num-text'>Red Alerts</p>
                                            </div>

                                            <div className='alert'>
                                            <p className='num4'>{0}</p>
                                            <p className='num-text'>Orange Alerts</p>
                                            </div>

                                            <div className='alert'>
                                            <p className='num5'>{0}</p>
                                            <p className='num-text'>Yellow Alerts</p>
                                            </div>

                                            <div className='alert'>
                                            <p className='num6'>{totaldistrict - (0)}</p>
                                            <p className='num-text'>No Alerts</p>
                                            </div>

                                            </div>
                                        </div>


                                        )}

                                    {(menu === "storm") && (
                                        <div className="col-3">
                                            <div className="row" style={{height:'100%'}}>
                                             <div className="col-12 text-light mt-4 text-center">No Active cyclones Alerts</div>  
                                            </div>
                                        </div>
                                        )}

                                        {menu === "tsunami" && (
                                        <>
                                         <div className="col-3 numbers2">
                                            <div className='alert9'>
                                                <h1 className='text-light text-center'>{tsunami.length}</h1>
                                                <h4 className='text-light text-center'>No. of Earthquakes's across Sea</h4>
                                            </div>
                                            <hr className='bg-light' />
                                            <div className='alert-txt'>
                                            {tsunami.length > 0 && (
                                            <h5 className='text-warning text-center'>
                                            {tsunami[tsunami.length - 1].properties.EVALUATION}
                                            </h5>
                                        )}
                                                <h3 className='text-center text-danger'>Evaluation</h3>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <table className="table table-xs table-bordered text-dark text-center text-light" style={{ fontSize: '12px' }}>
                                                <thead>
                                                    <tr>
                                                        <th colSpan={2} className='text-center'>Richter Scale</th>
                                                    </tr>
                                                    <tr>
                                                        <th>Magnitude</th>
                                                        <th>Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th style={{backgroundColor:'#87CEFA'}}><b>1.0–1.9</b></th>
                                                        <th>Micro</th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-dark"  style={{backgroundColor:'#AFEEEE'}}>2.0–2.9</th>
                                                        <th>Minor</th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-dark" style={{backgroundColor:'#98FB98'}}>3.0–3.9</th>
                                                        <th>Slight</th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-dark" style={{backgroundColor:'#ADFF2F'}}>4.0–4.9</th>
                                                        <th>Light</th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-dark" style={{backgroundColor:'#FFFF00'}}>5.0–5.9</th>
                                                        <th>Moderate</th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-dark" style={{backgroundColor:'#FFD700'}}>6.0–6.9</th>
                                                        <th>Strong</th>
                                                    </tr>
                                                    <tr>
                                                        <th style={{backgroundColor:'#FF8C00'}}>7.0–7.9</th>
                                                        <th>Major</th>
                                                    </tr>
                                                    <tr>
                                                        <th style={{backgroundColor:'#FF0000'}}>8.0–8.9</th>
                                                        <th>Great</th>
                                                    </tr>
                                                    <tr>
                                                        <th style={{backgroundColor:'#800000'}}>9.0–9.9</th>
                                                        <th>Extreme</th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        </>
                                        )}

                                        {menu === "astronomical" && (
                                        <>
                                        <div className="col-7" style={{ height: '58vh' }}>
                                        <div className='numbers'>
                                            <Line data={tideData2} options={tideOptions} style={{ height: '100vh' }}/>
                                        </div>
                                        </div>
                                        </>
                                        )}



                                        {menu === "tsunami" && (
                                         <div className="col-12 border-light rounded">
                                            <div className="table-responsive" style={{ height: '53vh', overflowY: 'auto' }}>
                                            <table className="table table-xs text-dark text-left text-light table-bordered" style={{ fontSize: '12px', textAlign:'left', paddingLeft:'0', marginLeft:'0'}}>
                                                <thead>
                                                    <tr>
                                                        <th>Sl</th>
                                                        <th>EVIS</th>
                                                        <th>BTYPE</th>
                                                        <th>BULNO</th>
                                                        <th>Region Name</th>
                                                        <th>Origin Time</th>
                                                        <th>MAGNITUDE</th>
                                                        <th>DEPTH</th>
                                                        <th> EVALUATION Details </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tsunami.map((data, index) => (
                                                        <tr key={data.properties.EVID}>
                                                            <td>{index + 1}</td>
                                                            <td>{data.properties.EVID}</td>
                                                            <td>{data.properties.BTYPE}</td>
                                                            <td>{data.properties.BULNO}</td>
                                                            <td>{data.properties.REGIONNAME}</td>
                                                            <td>{new Date(data.properties.ORIGINTIME).toLocaleString()}</td>
                                                            <td>{data.properties.MAGNITUDE}</td>
                                                            <td>{data.properties.DEPTH}</td>
                                                            <td className='text-left' style={{ whiteSpace: 'normal', width:'900px', wordBreak: 'break-word', paddingLeft:'0', marginLeft:'0'}}>
                                                                {data.properties.EVALUATION}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                                </div>

                                        </div>
                                        )}


                                      </div>

                                     

                          </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Ocean
