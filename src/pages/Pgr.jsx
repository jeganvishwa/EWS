import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import ward_boundary from '../pages/mapdata/Ward_Boundary.json';
import zone_boundaries from '../pages/mapdata/Zone_Boundary.json';
import school_data from '../pages/mapdata/schools.json';
import zone_address from '../pages/mapdata/zone_address.json';
import uphc_data from '../pages/mapdata/uphc.json';
import uchc_data from '../pages/mapdata/uchc.json';
import relief_data from '../pages/mapdata/relief.json';
import community_data from '../pages/mapdata/community.json';
import ammaunavagam_data from '../pages/mapdata/ammaunavagam.json';
import shelter_data from '../pages/mapdata/shelter.json';
import hospital_data from '../pages/mapdata/hospital.json';
import ndrf_data from '../pages/mapdata/ndrf.json';
import medical_data from '../pages/mapdata/medical.json';
import cctv_data from "../pages/mapdata/subway.json";
import rain_data from "../pages/mapdata/rain.json";
import flood_data from '../pages/mapdata/flood.json';
import contur from '../pages/mapdata/contour.jpg';

import firstres_data from '../pages/mapdata/firstres.json';
import appmit_data from '../pages/mapdata/volun.json';
import assosiation from '../pages/mapdata/assosiation.json';
import emotor_data from '../pages/mapdata/motors.json';
// import mmotor_data from '../pages/mapdata/moter.json';
import Modal from 'react-modal';
import { base_url, gtoken } from './service_token';

function Pgr() {
  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  const center = {
    lat: 13.057253814720971,
    lng: 80.18305764073715,
  };

  const [wardJsonData, setWardJsonData] = useState(null);
  const [map, setMap] = useState(null);
  const [zoneMarkers, setZoneMarkers] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [wardMarkers, setWardMarkers] = useState([]);
  const [schoolMarkers, setSchoolMarkers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [vmodalIsOpen, setvModalIsOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedtype, setSelectedtype] = useState(null);
  const [totalSchools, setTotalSchools] = useState(0);

  const [fromcurrentdate, setfromcurrentdate] = useState(new Date().toISOString().split('T')[0]);
  const [tocurrentdate, settocurrentdate] = useState(new Date().toISOString().split('T')[0]);



  const [pgrcomplaints, setpgrcomplaints] = useState({
    total: 0,
    one: 0,
    nammachennai: 0,
    web: 0,
    whatsapp: 0,
    social: 0,
    letter: 0,
    news: 0,
    qr: 0,
    ptotal: 0,
    pone: 0,
    pnammachennai: 0,
    pweb: 0,
    pwhatsapp: 0,
    psocial: 0,
    pletter: 0,
    pnews: 0,
    pqr: 0,
    rtotal: 0,
    rone: 0,
    rnammachennai: 0,
    rweb: 0,
    rwhatsapp: 0,
    rsocial: 0,
    rletter: 0,
    rnews: 0,
    rqr: 0,
    ctotal: 0,
    cone: 0,
    cnammachennai: 0,
    cweb: 0,
    cwhatsapp: 0,
    csocial: 0,
    cletter: 0,
    cnews: 0,
    cqr: 0
  });

  const [pgrzonecomplaints, setpgrzonecomplaints] = useState([]);
  



  const [selectedregion, setSelectedregion] = useState(null);
  const [Selectedactiveregion, setSelectedactiveregion] = useState('all');
  
  const [zoneslist, setzoneslist] = useState([]);

  const [zofficeMarkers, setzofficeMarkers] = useState([]);
  const [selectedzoffice, setSelectedzoffice] = useState(null);

  const [uphcMarkers, setuphcMarkers] = useState([]);
  const [selecteduphc, setSelecteduphc] = useState(null);

  const [uchcMarkers, setuchcMarkers] = useState([]);
  const [selecteduchc, setSelecteduchc] = useState(null);

  const [reliefMarkers, setreliefMarkers] = useState([]);
  const [selectedrelief, setSelectedrelief] = useState(null);

  const [communityMarkers, setcommunityMarkers] = useState([]);
  const [selectedcommunity, setSelectedcommunity] = useState(null);

  const [ammaMarkers, setammaMarkers] = useState([]);
  const [selectedamma, setSelectedamma] = useState(null);

  const [shelterMarkers, setshelterMarkers] = useState([]);
  const [selectedshelter, setSelectedshelter] = useState(null);

  const [hospitalMarkers, sethospitalMarkers] = useState([]);
  const [selectedhospital, setSelectedhospital] = useState(null);

  const [medicalMarkers, setmedicalMarkers] = useState([]);
  const [selectedmedical, setSelectedmedical] = useState(null);

  const [ndrfMarkers, setndrfMarkers] = useState([]);
  const [selectedndrf, setSelectedndrf] = useState(null);

  const [cctvMarkers, setcctvMarkers] = useState([]);
  const [selectedcctv, setSelectedcctv] = useState(null);
  const [cctvs, setcctvs] = useState([]);
  

  const [floodcamMarkers, setfloodcamMarkers] = useState([]);
  const [selectedfloodcam, setSelectedfloodcam] = useState(null);
  

  const [vModalIsOpen, setVModalIsOpen] = useState(false);
  const [selectedCctvId, setSelectedCctvId] = useState(null);

  const [rainModalIsOpen, setrainModalIsOpen] = useState(false);

  const [videolink, setvideolink] = useState(null);

  const [tabledata, settabledata] = useState([]);



  // rain
  const [rainMarkers, setrainMarkers] = useState([]);
  const [selectedrain, setSelectedrain] = useState(null);
  const [selectedrainId, setSelectedrainId] = useState(null);
  const [listrain_data, setlistrain_data] = useState();

  const [liverain_data, setliverain_data] = useState();

  const [totalrain, settotalrain] = useState(0);

  const [emotorMarkers, setemotorMarkers] = useState([]);
  const [selectedemotor, setSelectedemotor] = useState(null);

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const storedUserData = JSON.parse(sessionStorage.getItem('userData')) || { zone: '' };
    setUserData(storedUserData);
  }, []);
  
  useEffect(() => {
    if(userData.region > 0 && userData.zone > 0) {
      setSelectedZone(String(userData.zone));
    }
  }, [userData]);
  

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
    setWardJsonData(ward_boundary);
  }, []);

  useEffect(() => {
    if (map && zone_boundaries && pgrzonecomplaints) {
      const existingLegend = document.getElementById('map-legend');
        if (existingLegend) {
          existingLegend.parentNode.removeChild(existingLegend);
        }
        map.data.setStyle(null);
      map.data.addGeoJson(zone_boundaries);
      const markers = [];
  
      map.data.setStyle((feature) => {
        const zoneName = feature.getProperty("Zone");
        const complaintData = pgrzonecomplaints.find(e => String(e.zone) === String(zoneName).padStart(2, '0'));
  
        let style = {
          strokeColor: 'black',
          strokeWeight: 2,
          fillColor: 'white', 
          fillOpacity: 0.2,
        };
  
        if (complaintData) {
          if (complaintData.total > 250) {
            style.fillColor = '#F93763';  
          } else if (complaintData.total > 150 && complaintData.total <= 250) {
            style.fillColor = '#3CC6D0';     
          } else if (complaintData.total > 50 && complaintData.total <= 150) {
            style.fillColor = '#DCEC47';  
          }else if (complaintData.total > 0 && complaintData.total <= 50) {
            style.fillColor = '#f9dfb8';  
          } else if (complaintData.total === 0) {
            style.fillColor = '#ffffff';  
          }  else {
            style.fillColor = '#ffffff';  
          }
        }
        
  
        return style;
      });

      
      const legend = document.createElement('div');
      legend.id = 'map-legend'; // Assign an ID to the legend
      legend.innerHTML = `
        <div style="background: white; padding: 10px;">
          <h4>Complaint Levels</h4>
          <div><span style="background-color: #F93763; width: 20px; height: 20px; display: inline-block;"></span> > 250 complaints</div>
          <div><span style="background-color: #3CC6D0; width: 20px; height: 20px; display: inline-block;"></span> 151 - 250 complaints</div>
          <div><span style="background-color: #DCEC47; width: 20px; height: 20px; display: inline-block;"></span> 51 - 150 complaints</div>
          <div><span style="background-color: #f9dfb8; width: 20px; height: 20px; display: inline-block;"></span> 1 - 50 complaints</div>
          <div><span style="background-color: #ffffff; width: 20px; height: 20px; display: inline-block;"></span> 0 complaints</div>
        </div>
      `;
      legend.style.position = 'absolute';
      legend.style.bottom = '30px';
      legend.style.left = '10px';
  
      map.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
  
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
              fontSize: "14px",
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
  
      // Add click listener for zones
      map.data.addListener('click', (event) => {
        const feature = event.feature;
        const zoneName = feature.getProperty("Zone");
        if(userData.region >= 0 && userData.zone === 0)
        {

          if((userData.region === 1))
          {
            switch(zoneName)
            {
              case 1: setSelectedZone(String(zoneName)); 
              break;
              case 2: setSelectedZone(String(zoneName)); 
              break;
              case 3: setSelectedZone(String(zoneName)); 
              break;
              case 4: setSelectedZone(String(zoneName)); 
              break;
              case 5: setSelectedZone(String(zoneName)); 
              break;
            }
            
          }
          else if((userData.region === 2))
          {
            switch(zoneName)
            {
              case 6: setSelectedZone(String(zoneName)); 
              break;
              case 7: setSelectedZone(String(zoneName)); 
              break;
              case 8: setSelectedZone(String(zoneName)); 
              break;
              case 9: setSelectedZone(String(zoneName)); 
              break;
              case 10: setSelectedZone(String(zoneName)); 
              break;
            }
          }
          else if((userData.region === 3))
            {
              switch(zoneName)
              {
                case 11: setSelectedZone(String(zoneName)); 
                break;
                case 12: setSelectedZone(String(zoneName)); 
                break;
                case 13: setSelectedZone(String(zoneName)); 
                break;
                case 14: setSelectedZone(String(zoneName)); 
                break;
                case 15: setSelectedZone(String(zoneName)); 
                break;
              }
            }
            else
            if(userData.region === 0)
            {
              switch(zoneName)
              {
                case 1: setSelectedZone(String(zoneName)); 
                break;
                case 2: setSelectedZone(String(zoneName)); 
                break;
                case 3: setSelectedZone(String(zoneName)); 
                break;
                case 4: setSelectedZone(String(zoneName)); 
                break;
                case 5: setSelectedZone(String(zoneName)); 
                break;
                case 6: setSelectedZone(String(zoneName)); 
                break;
                case 7: setSelectedZone(String(zoneName)); 
                break;
                case 8: setSelectedZone(String(zoneName)); 
                break;
                case 9: setSelectedZone(String(zoneName)); 
                break;
                case 10: setSelectedZone(String(zoneName)); 
                break;
                case 11: setSelectedZone(String(zoneName)); 
                break;
                case 12: setSelectedZone(String(zoneName)); 
                break;
                case 13: setSelectedZone(String(zoneName)); 
                break;
                case 14: setSelectedZone(String(zoneName)); 
                break;
                case 15: setSelectedZone(String(zoneName)); 
                break;
              }
            }
          
        }
        else
        {
          setSelectedZone(String(userData.zone));
        }
        
      });
    }
  }, [map, zone_boundaries, pgrzonecomplaints, fromcurrentdate, tocurrentdate]);
  
  
  



  useEffect(() => {
    if (map && selectedZone && pgrzonecomplaints) {
      wardMarkers.forEach((marker) => marker.setMap(null));
      setWardMarkers([]);

      map.data.forEach((feature) => {
        if (feature.getProperty("Ward")) {
          map.data.remove(feature);
        }
      });

      map.data.forEach((feature) => {
        const zoneName = feature.getProperty("Zone");
        if (zoneName === parseInt(selectedZone)) {
          const bounds = new window.google.maps.LatLngBounds();
          feature.getGeometry().forEachLatLng((latLng) => {
            bounds.extend(latLng);
          });

          setTimeout(() => {
            map.fitBounds(bounds);
          }, 100);

          const filteredWardJsonData = {
            type: "FeatureCollection",
            features: wardJsonData.features.filter((feature) => feature.properties.Zone === parseInt(selectedZone)),
          };

          map.data.addGeoJson(filteredWardJsonData);
          map.data.setStyle((feature) => {
            const zoneName = feature.getProperty("Zone");


            map.data.setStyle((feature) => {
              const zoneName = feature.getProperty("Zone");
              const complaintData = pgrzonecomplaints.find(e => String(e.zone) === String(zoneName).padStart(2, '0'));
        
              let style = {
                strokeColor: 'black',
                strokeWeight: 2,
                fillColor: 'white', 
                fillOpacity: 0.2,
              };
        
              if (complaintData) {
                if (complaintData.total > 50) {
                  style.fillColor = 'red';  
                } else if (complaintData.total > 30) {
                  style.fillColor = 'orange';     
                } else if (complaintData.total > 20) {
                  style.fillColor = 'yellow';  
                }else if (complaintData.total > 0) {
                  style.fillColor = '#c8f542';  
                } else if (complaintData.total === 0) {
                  style.fillColor = 'green';  
                }  else {
                  style.fillColor = 'white';  
                }
              }
              
        
              return style;
            });
          });

          const markers = [];
          map.data.forEach((feature) => {
            const wardNo = feature.getProperty("Ward");
            if (wardNo) {
              const wardBounds = new window.google.maps.LatLngBounds();
              feature.getGeometry().forEachLatLng((latLng) => {
                wardBounds.extend(latLng);
              });

              const marker = new window.google.maps.Marker({
                position: wardBounds.getCenter(),
                label: {
                  text: wardNo.toString(),
                  fontSize: "10px",
                  fontWeight: "bold",
                  color: "blue",
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

          setWardMarkers(markers);
        }
      });
    }
  }, [selectedZone, map, wardJsonData, pgrzonecomplaints, fromcurrentdate,tocurrentdate]);

  const getValidComplaintCount = (complaintCount) => {
    return complaintCount === null || complaintCount === 'null' || complaintCount === undefined ? 0 : Number(complaintCount);
  };

  useEffect(() => {
    let modes = [
      '',
      'PHONE',
      'Namma Chennai App',
      'INTERNET',
      'WHATSAPP',
      'SOCIAL MEDIA',
      'NEWS PAPER',
      'PAPER FORM',
      'QR Code'
    ];
  
    modes.forEach((mode) => {
      fetch(`${base_url}pgrdata?mode=${mode}&from=${fromcurrentdate}&to=${tocurrentdate}`, {
        // You can add headers or other fetch options here if needed
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        if (result.Abstract && Array.isArray(result.Abstract) && result.Abstract.length > 0) {
          const complaintCount = result.Abstract[0].TotalComplaints;
          const pcomplaintCount = result.Abstract[0].TotalOpenComplaints;
          const rcomplaintCount = result.Abstract[0]['TotalRe-OpenedComplaints'];
          const ccomplaintCount = result.Abstract[0].TotalClosedComplaints;
          switch (mode) {
            case '':
              setpgrcomplaints(prevState => ({
                ...prevState,
                total : getValidComplaintCount(complaintCount),
                ptotal: getValidComplaintCount(pcomplaintCount),
                rtotal: getValidComplaintCount(rcomplaintCount),
                ctotal: getValidComplaintCount(ccomplaintCount)
              }));
              break;
            case 'PHONE':
              setpgrcomplaints(prevState => ({
                ...prevState,
                one : getValidComplaintCount(complaintCount),
                pone: getValidComplaintCount(pcomplaintCount),
                rone: getValidComplaintCount(rcomplaintCount),
                cone: getValidComplaintCount(ccomplaintCount)
              }));
              break;
            case 'Namma Chennai App':
              setpgrcomplaints(prevState => ({
                ...prevState,
                nammachennai : getValidComplaintCount(complaintCount),
                pnammachennai: getValidComplaintCount(pcomplaintCount),
                rnammachennai: getValidComplaintCount(rcomplaintCount),
                cnammachennai: getValidComplaintCount(ccomplaintCount)
              }));
              break;
            case 'INTERNET':
              setpgrcomplaints(prevState => ({
                ...prevState,
                web : getValidComplaintCount(complaintCount),
                pweb: getValidComplaintCount(pcomplaintCount),
                rweb: getValidComplaintCount(rcomplaintCount),
                cweb: getValidComplaintCount(ccomplaintCount)
              }));
              break;
            case 'WHATSAPP':
              setpgrcomplaints(prevState => ({
                ...prevState,
                whatsapp : getValidComplaintCount(complaintCount),
                pwhatsapp: getValidComplaintCount(pcomplaintCount),
                rwhatsapp: getValidComplaintCount(rcomplaintCount),
                cwhatsapp: getValidComplaintCount(ccomplaintCount)
              }));
              break;
            case 'SOCIAL MEDIA':
              setpgrcomplaints(prevState => ({
                ...prevState,
                social : getValidComplaintCount(complaintCount),
                psocial: getValidComplaintCount(pcomplaintCount),
                rsocial: getValidComplaintCount(rcomplaintCount),
                csocial: getValidComplaintCount(ccomplaintCount)
              }));
              break;
            case 'NEWS PAPER':
              setpgrcomplaints(prevState => ({
                ...prevState,
                news : getValidComplaintCount(complaintCount),
                pnews: getValidComplaintCount(pcomplaintCount),
                rnews: getValidComplaintCount(rcomplaintCount),
                cnews: getValidComplaintCount(ccomplaintCount)
              }));
              break;
            case 'PAPER FORM':
              setpgrcomplaints(prevState => ({
                ...prevState,
                letter : getValidComplaintCount(complaintCount),
                pletter: getValidComplaintCount(pcomplaintCount),
                rletter: getValidComplaintCount(rcomplaintCount),
                cletter: getValidComplaintCount(ccomplaintCount)
              }));
              break;
            case 'QR Code':
              setpgrcomplaints(prevState => ({
                ...prevState,
                qr : getValidComplaintCount(complaintCount),
                pqr: getValidComplaintCount(pcomplaintCount),
                rqr: getValidComplaintCount(rcomplaintCount),
                cqr: getValidComplaintCount(ccomplaintCount)
              }));
              break;
            default:
              console.warn(`Unhandled mode: ${mode}`);
              break;
          }
        } else {
          console.error("Unexpected response structure or no data in Abstract:", result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    });
  },[fromcurrentdate,tocurrentdate])
  
  

  useEffect(() => {
      fetch(`${base_url}zonewise_pgr?&from=${fromcurrentdate}&to=${tocurrentdate}`, {
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        if (result) {

          setpgrzonecomplaints(result);
          
           
        } else {
          console.error("Unexpected response structure or no data in Abstract:", result);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },[fromcurrentdate,tocurrentdate])
  
  
  




// function handlechangedates()
// {
//   get_totals();
//   zonewise_pgr();
// }
                
const closeModal = () => {
  zoomme();
  setVModalIsOpen(false);
  setrainModalIsOpen(false);
  setSelectedCctvId(null);
};



function selectregion(region)
{
   if(region!='')
   {
       setSelectedregion(region);
       setSelectedactiveregion(region);
   }
}


useEffect(() => {

  if(selectedregion=='north')
  {
    setzoneslist([]);
    setzoneslist(['1','2','3','4','5'])
    setSelectedregion(null);
  }
  else if(selectedregion=='central')
    {
      setzoneslist([]);
      setzoneslist(['6','7','8','9','10'])
      setSelectedregion(null);
    }
    else if(selectedregion=='south')
      {
        setzoneslist([]);
        setzoneslist(['11','12','13','14','15'])
        setSelectedregion(null);
      } 
      
      else
      {
        setSelectedregion('all');
      }
});

function zoomme() {
  map.data.forEach((feature) => {
    const zoneName = feature.getProperty("Zone");
    if (zoneName === parseInt(selectedZone)) {
      const bounds = new window.google.maps.LatLngBounds();
      feature.getGeometry().forEachLatLng((latLng) => {
        bounds.extend(latLng);
      });

      setTimeout(() => {
        map.fitBounds(bounds);
        const listener = window.google.maps.event.addListener(map, "bounds_changed", () => {
          map.setZoom(13); 
          window.google.maps.event.removeListener(listener); 
        });
      }, 100);
    }
  });
}



const zoommez = (lat, lan, showStreetNames = true) => {
  const bounds = new window.google.maps.LatLngBounds();
  const latLng = new window.google.maps.LatLng(lat, lan);
  bounds.extend(latLng); 

  setTimeout(() => {
      map.setMapTypeId(window.google.maps.MapTypeId.HYBRID);

    map.fitBounds(bounds); 
    let currentZoom = 13; 
    const targetZoom = 20; 
    const zoomStep = 1;

    const smoothZoom = setInterval(() => {
      if (currentZoom < targetZoom) {
        map.setZoom(++currentZoom); 
      } else {
        clearInterval(smoothZoom); 
      }
    }, 150); 

  }, 100);
};



const zoommeout = () => {
  let lat = 13.0524;
  let lng = 80.1612;
  const bounds = new window.google.maps.LatLngBounds();
  const latLng = new window.google.maps.LatLng(lat, lng);
  bounds.extend(latLng);

  setTimeout(() => {
    map.setMapTypeId(window.google.maps.MapTypeId.ROADMAP); 
    map.fitBounds(bounds); 

    let currentZoom = 20;
    const targetZoom = 11;
    const zoomStep = 1;

    const smoothZoomOut = setInterval(() => {
      if (currentZoom > targetZoom) {
        map.setZoom(--currentZoom); 
      } else {
        clearInterval(smoothZoomOut); 
      }
    }, 150); 

  }, 100);
};

const getgooglemap = (lat, lan) => {
  const currentLocation = "current+location";
  const destination = `${lat},${lan}`; 
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation}&destination=${destination}`;
  window.open(googleMapsUrl, '_blank');
};



  return (
    <>
      <section className="pcoded-main-container bg-dark">
        <div className="pcoded-content">
          <div className="row">
            <div className="col-lg-12 col-xl-12">
              <div className="card bg-dark">
              <div className="card-body">
                   <div className="row">
                    <div className="col-12 table-responsive" style={{margin:'-15px'}} >
                         <table className="table table-bordered table-card table-sm table-striped ml-5" style={{width:'100%',borderRadius:'10px'}}>
                          <thead>
                            <tr>
                              <th className='bg-info font-weight-bolder text-center'>Category</th>
                              <th className='bg-info font-weight-bolder text-center'>1913</th>
                              <th className='bg-info font-weight-bolder text-center'>Namma Chennai-App</th>
                              <th className='bg-info font-weight-bolder text-center'>Web Portal</th>
                              <th className='bg-info font-weight-bolder text-center'>Whatsapp</th>
                              <th className='bg-info font-weight-bolder text-center'>Social media</th>
                              <th className='bg-info font-weight-bolder text-center'>NEWS PAPER</th>
                              <th className='bg-info font-weight-bolder text-center'>Letter</th>
                              <th className='bg-info font-weight-bolder text-center'>QR</th>
                              <th className='bg-info font-weight-bolder text-center'>Total</th>
                            </tr>
                          </thead>
                          <tbody className='text-light'>
                          <tr>
                              <td className='bg-danger font-weight-bolder text-center'>Open</td>
                              <td className='bg-danger font-weight-bolder text-center'>{pgrcomplaints.pone}</td>
                              <td className='bg-danger font-weight-bolder text-center'>{pgrcomplaints.pnammachennai}</td>
                              <td className='bg-danger font-weight-bolder text-center'>{pgrcomplaints.pweb}</td>
                              <td className='bg-danger font-weight-bolder text-center'>{pgrcomplaints.pwhatsapp}</td>
                              <td className='bg-danger font-weight-bolder text-center'>{pgrcomplaints.psocial}</td>
                              <td className='bg-danger font-weight-bolder text-center'>{pgrcomplaints.pletter}</td>
                              <td className='bg-danger font-weight-bolder text-center'>{pgrcomplaints.pnews}</td>
                              <td className='bg-danger font-weight-bolder text-center'>{pgrcomplaints.pqr}</td>
                              <td className='bg-danger font-weight-bolder text-center'>{pgrcomplaints.ptotal}</td>
                            </tr>
                           
                            <tr>
                              <td className='bg-success text-dark font-weight-bolder text-center'>Closed</td>
                              <td className='bg-success text-dark font-weight-bolder text-center'>{pgrcomplaints.cone}</td>
                              <td className='bg-success text-dark font-weight-bolder text-center'>{pgrcomplaints.cnammachennai}</td>
                              <td className='bg-success text-dark font-weight-bolder text-center'>{pgrcomplaints.cweb}</td>
                              <td className='bg-success text-dark font-weight-bolder text-center'>{pgrcomplaints.cwhatsapp}</td>
                              <td className='bg-success text-dark font-weight-bolder text-center'>{pgrcomplaints.csocial}</td>
                              <td className='bg-success text-dark font-weight-bolder text-center'>{pgrcomplaints.cletter}</td>
                              <td className='bg-success text-dark font-weight-bolder text-center'>{pgrcomplaints.cnews}</td>
                              <td className='bg-success text-dark font-weight-bolder text-center'>{pgrcomplaints.cqr}</td>
                              <td className='bg-success text-dark font-weight-bolder text-center'>{pgrcomplaints.ctotal}</td>
                            </tr>
                            
                            <tr>
                               <td className='bg-warning text-dark font-weight-bolder text-center'>Re-open</td>
                              <td className='bg-warning text-dark font-weight-bolder text-center'>{pgrcomplaints.rone}</td>
                              <td className='bg-warning text-dark font-weight-bolder text-center'>{pgrcomplaints.rnammachennai}</td>
                              <td className='bg-warning text-dark font-weight-bolder text-center'>{pgrcomplaints.rweb}</td>
                              <td className='bg-warning text-dark font-weight-bolder text-center'>{pgrcomplaints.rwhatsapp}</td>
                              <td className='bg-warning text-dark font-weight-bolder text-center'>{pgrcomplaints.rsocial}</td>
                              <td className='bg-warning text-dark font-weight-bolder text-center'>{pgrcomplaints.rletter}</td>
                              <td className='bg-warning text-dark font-weight-bolder text-center'>{pgrcomplaints.rnews}</td>
                              <td className='bg-warning text-dark font-weight-bolder text-center'>{pgrcomplaints.rqr}</td>
                              <td className='bg-warning text-dark font-weight-bolder text-center'>{pgrcomplaints.rtotal}</td>
                            </tr>
                            <tr>
                              <td className='bg-dark font-weight-bolder text-center'>Total</td>
                              <td className='bg-dark font-weight-bolder text-center'>{pgrcomplaints.one}</td>
                              <td className='bg-dark font-weight-bolder text-center'>{pgrcomplaints.nammachennai}</td>
                              <td className='bg-dark font-weight-bolder text-center'>{pgrcomplaints.web}</td>
                              <td className='bg-dark font-weight-bolder text-center'>{pgrcomplaints.whatsapp}</td>
                              <td className='bg-dark font-weight-bolder text-center'>{pgrcomplaints.social}</td>
                              <td className='bg-dark font-weight-bolder text-center'>{pgrcomplaints.letter}</td>
                              <td className='bg-dark font-weight-bolder text-center'>{pgrcomplaints.news}</td>
                              <td className='bg-dark font-weight-bolder text-center'>{pgrcomplaints.qr}</td>
                              <td className='bg-dark font-weight-bolder text-center'>{pgrcomplaints.total}</td>
                            </tr>
                          </tbody>

                        </table>
                    </div>

                       

                   {/* <div className={`pointer p-2 mr-1 bg-danger text-center shadow-lg p-1 mb-3 rounded border border-1 border-warning col-md-1 col-sm-12`}>
                      <h5 className='text-dark'>Category</h5>
                      <hr className="text-light bg-dark"/>
                      <h4 className='text-dark'>Pending</h4>
                      <hr className="text-light bg-dark"/>
                      <h4 className='text-dark'>Total</h4>
                    </div>
                   <div className={`pointer p-2 mr-1 bg-success text-center shadow-lg p-1 mb-3 rounded border border-1 border-warning col-md-1 col-sm-12`}>
                      <h5 className='text-dark'>1913</h5>
                      <hr className="text-light bg-dark"/>
                      <h4 className='text-light'>{pgrcomplaints.one}</h4>
                      <hr className="text-light bg-dark"/>
                      <h4 className='text-light'>{pgrcomplaints.one}</h4>
                    </div>
                    <div className={`pointer p-2 mr-1 bg-primary text-center shadow-lg p-1 mb-3 rounded border border-1 border-warning col-md-2  col-sm-12  col-sm-12`}>
                      <h5 className='text-dark'>Namma Chennai-App</h5>
                      <hr className="text-light bg-warning"/>
                      <h4 className='text-light'>{pgrcomplaints.nammachennai}</h4>
                      <hr className="text-light bg-dark"/>
                      <h4 className='text-light'>{pgrcomplaints.nammachennai}</h4>
                    </div>
                    <div className={`pointer p-2 mr-1 bg-info text-center shadow-lg p-1 mb-3 rounded border border-1 border-warning col-md-1  col-sm-12  col-sm-12`}>
                      <h5 className='text-dark'>Web Portal</h5>
                      <hr className="text-light bg-warning"/>
                      <h4 className='text-light'>{pgrcomplaints.web}</h4>
                      <hr className="text-light bg-dark"/>
                      <h4 className='text-light'>{pgrcomplaints.nammachennai}</h4>
                    </div>
                    <div className={`pointer p-2 mr-1 bg-danger text-center shadow-lg p-1 mb-3 rounded border border-1 border-warning col-md-1  col-sm-12  col-sm-12`} style={{backgroundColor:'#6fff00'}}>
                      <h5 className='text-dark'>Whatsapp</h5>
                      <hr className="text-light bg-dark"/>
                      <h4 className='text-light'>{pgrcomplaints.whatsapp}</h4>
                      <hr className="text-light bg-dark"/>
                      <h4 className='text-light'>{pgrcomplaints.nammachennai}</h4>
                    </div>
                    <div className={`pointer p-2 mr-1 bg-secondary text-center shadow-lg p-1 mb-3 rounded border border-1 border-warning col-md-1  col-sm-12  col-sm-12`}>
                      <h5 className='text-dark'>Social media</h5>
                      <hr className="text-light bg-warning"/>
                      <h4 className='text-light'>{pgrcomplaints.social}</h4>
                      <hr className="text-light bg-dark"/>
                      <h4 className='text-light'>{pgrcomplaints.nammachennai}</h4>
                    </div>
                    <div className={`pointer p-2 mr-1 bg-warning text-center shadow-lg p-1 mb-3  rounded border border-1 border-warning col-md-1  col-sm-12  col-sm-12`}>
                      <h5  className='text-dark'>Letter</h5>
                      <hr className="text-light bg-dark"/>
                      <h4  className='text-dark'>{pgrcomplaints.letter}</h4>
                      <hr className="text-light bg-dark"/>
                      <h4 className='text-light'>{pgrcomplaints.nammachennai}</h4>
                    </div>
                    <div className={`pointer p-2 mr-1 bg-primary text-center shadow-lg p-1 mb-3 rounded border border-1 border-warning col-md-1  col-sm-12  col-sm-12`}>
                      <h5  className='text-dark'>NEWS PAPER</h5>
                      <hr className="text-light bg-warning"/>
                      <h4  className='text-light'>{pgrcomplaints.news}</h4>
                      <hr className="text-light bg-dark"/>
                      <h4 className='text-light'>{pgrcomplaints.nammachennai}</h4>
                    </div>
                    <div className={`pointer p-2 mr-1 bg-danger text-center shadow-lg p-1 mb-3 rounded border border-1 border-warning col-md-1  col-sm-12`}>
                      <h5  className='text-dark'>QR</h5>
                      <hr className="text-light bg-dark"/>
                      <h4  className='text-light'>{pgrcomplaints.qr}</h4>
                      <hr className="text-light bg-dark"/>
                      <h4 className='text-light'>{pgrcomplaints.nammachennai}</h4>
                    </div>
                    <div className={`pointer p-2 mr-1 bg-dark text-center shadow-lg p-1 mb-3 rounded border border-1 border-warning col-md-1  col-sm-12`}>
                      <h4  className='text-light'>Total</h4>
                      <hr className="text-light bg-warning"/>
                      <h4  className='text-light'>{pgrcomplaints.total}</h4>
                      <hr className="text-light bg-warning"/>
                      <h4 className='text-light'>503438</h4>
                    </div> */}

                  <div className="col-md-2 col-sm-12 bg-info border border-light rounded responsive-height">


                     <div className="row">

                     <div className={`pointer bg-light p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-success col-12`}>
                      <input 
                        type="date" 
                        name="" 
                        id="" 
                        value={fromcurrentdate} 
                        onChange={(e) => { setfromcurrentdate(e.target.value);

                        }
                        } 
                        className="form-control form-control-sm" 
                      />
                    </div>
                    <div className={`pointer bg-light p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-success col-12`}>
                      <input 
                        type="date" 
                        name="" 
                        id="" 
                        value={tocurrentdate} 
                        onChange={(e) => { settocurrentdate(e.target.value);
                        }
                        } 
                        className="form-control form-control-sm" 
                      />
                    </div>

                       <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-success col-12 ${Selectedactiveregion === 'all' ? 'sele' : ''}`} onClick={() => { selectregion('all'); zoommeout();}}>
                      <h4>All</h4>
                       </div>

                       <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-success col-4 ${Selectedactiveregion === 'north' ? 'sele' : ''}`} onClick={() => selectregion('north')} style={{background:'#ff9900'}}>

                      <h5>North</h5>
                       </div>

                       <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-success col-4 ${Selectedactiveregion === 'central' ? 'sele' : ''}`} onClick={() => selectregion('central')} style={{background:'#ff9900'}}>
                      <h5>Central</h5>
                       </div>

                       <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-success col-4 ${Selectedactiveregion === 'south' ? 'sele' : ''}`} onClick={() => selectregion('south')} style={{background:'#ff9900'}}>
                      <h5>South</h5>
                       </div>

                     </div>
                    </div>

                    <div className="col-md-6 col-sm-12 bg-info border border-light rounded" style={{height:'88vh',overflowY: 'auto'}}>
                    {(Selectedactiveregion === 'north' || Selectedactiveregion === 'all') && (
                      <>
                     <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-dark col-12`} style={{'backgroundColor':'#dddddd'}}>
                      <h4>Zone-01 </h4>
                      <hr className='border border-3 border-danger'/>
                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <h5>Open</h5>
                          <hr />
                          <h4  className='bg-youtube text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[0] ? pgrzonecomplaints[0].open : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Closed</h5>
                          <hr />
                          <h4 className='bg-success text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[0] ? pgrzonecomplaints[0].close : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Re-Open</h5>
                          <hr />
                          <h4 className='bg-warning text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[0] ? pgrzonecomplaints[0].reopen : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Total</h5>
                          <hr />
                          <h4 className='bg-dark text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[0] ? pgrzonecomplaints[0].total : 0}</h4>
                          </div>
                      </div>
                       </div>

                       <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-dark col-12`} style={{'backgroundColor':'#dddddd'}}>
                      <h4>Zone-02 </h4>
                      <hr className='border border-3 border-danger'/>
                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <h5>Open</h5>
                          <hr />
                          <h4 className='bg-youtube text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[1] ? pgrzonecomplaints[1].open : 0}</h4>
                          </div>
                          
                          <div className="col-md-3 col-sm-12">
                          <h5>Closed</h5>
                          <hr />
                          <h4 className='bg-success text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[1] ? pgrzonecomplaints[1].close : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Re-Open</h5>
                          <hr />
                          <h4 className='bg-warning text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[1] ? pgrzonecomplaints[1].reopen : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Total</h5>
                          <hr />
                          <h4 className='bg-dark text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[1] ? pgrzonecomplaints[1].total : 0}</h4>
                          </div>
                      </div>
                       </div>

                       <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-dark col-12`} style={{'backgroundColor':'#dddddd'}}>
                      <h4>Zone-03 </h4>
                      <hr className='border border-3 border-danger'/>
                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <h5>Open</h5>
                          <hr />
                          <h4 className='bg-youtube text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[2] ? pgrzonecomplaints[2].open : 0}</h4>
                          </div>
                        
                          <div className="col-md-3 col-sm-12">
                          <h5>Closed</h5>
                          <hr />
                          <h4 className='bg-success text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[2] ? pgrzonecomplaints[2].close : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Re-Open</h5>
                          <hr />
                          <h4 className='bg-warning text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[2] ? pgrzonecomplaints[2].reopen : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Total</h5>
                          <hr />
                          <h4 className='bg-dark text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[2] ? pgrzonecomplaints[2].total : 0}</h4>
                          </div>
                      </div>
                       </div>


                       
                       <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-dark col-12`} style={{'backgroundColor':'#dddddd'}}>
                      <h4>Zone-04 </h4>
                      <hr className='border border-3 border-danger'/>
                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <h5>Open</h5>
                          <hr />
                          <h4 className='bg-youtube text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[3] ? pgrzonecomplaints[3].open : 0}</h4>
                          </div>
                          
                          <div className="col-md-3 col-sm-12">
                          <h5>Closed</h5>
                          <hr />
                          <h4 className='bg-success text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[3] ? pgrzonecomplaints[3].close : 0}</h4>
                          </div>

                          <div className="col-md-3 col-sm-12">
                          <h5>Re-Open</h5>
                          <hr />
                          <h4 className='bg-warning text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[3] ? pgrzonecomplaints[3].reopen : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Total</h5>
                          <hr />
                          <h4 className='bg-dark text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[3] ? pgrzonecomplaints[3].total : 0}</h4>
                          </div>
                      </div>
                       </div>

                       
                       <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-dark col-12`} style={{'backgroundColor':'#dddddd'}}>
                      <h4>Zone-05 </h4>
                      <hr className='border border-3 border-danger'/>
                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <h5>Open</h5>
                          <hr />
                          <h4 className='bg-youtube text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[4] ? pgrzonecomplaints[4].open : 0}</h4>
                          </div>
                         
                          <div className="col-md-3 col-sm-12">
                          <h5>Closed</h5>
                          <hr />
                          <h4 className='bg-success text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[4] ? pgrzonecomplaints[4].close : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Re-Open</h5>
                          <hr />
                          <h4 className='bg-warning text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[4] ? pgrzonecomplaints[4].reopen : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Total</h5>
                          <hr />
                          <h4 className='bg-dark text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[4] ? pgrzonecomplaints[4].total : 0}</h4>
                          </div>
                      </div>
                       </div>
                       </>)}

                       {(Selectedactiveregion === 'central' || Selectedactiveregion === 'all') && (
                         <>
                        <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-dark col-12`} style={{'backgroundColor':'#dddddd'}}>
                      <h4>Zone-06 </h4>
                      <hr className='border border-3 border-danger'/>
                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <h5>Open</h5>
                          <hr />
                          <h4 className='bg-youtube text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[5] ? pgrzonecomplaints[5].open : 0}</h4>
                          </div>
                         
                          <div className="col-md-3 col-sm-12">
                          <h5>Closed</h5>
                          <hr />
                          <h4 className='bg-success text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[5] ? pgrzonecomplaints[5].close : 0}</h4>
                          </div>

                          <div className="col-md-3 col-sm-12">
                          <h5>Re-Open</h5>
                          <hr />
                          <h4 className='bg-warning text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[5] ? pgrzonecomplaints[5].reopen : 0}</h4>
                          </div>


                          <div className="col-md-3 col-sm-12">
                          <h5>Total</h5>
                          <hr />
                          <h4 className='bg-dark text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[5] ? pgrzonecomplaints[5].total : 0}</h4>
                          </div>
                      </div>
                       </div>

                       
                       <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-dark col-12`} style={{'backgroundColor':'#dddddd'}}>
                      <h4>Zone-07 </h4>
                      <hr className='border border-3 border-danger'/>
                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <h5>Open</h5>
                          <hr />
                          <h4 className='bg-youtube text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[6] ? pgrzonecomplaints[6].open : 0}</h4>
                          </div>
                         
                          <div className="col-md-3 col-sm-12">
                          <h5>Closed</h5>
                          <hr />
                          <h4 className='bg-success text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[6] ? pgrzonecomplaints[6].close : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Re-Open</h5>
                          <hr />
                          <h4 className='bg-warning text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[6] ? pgrzonecomplaints[6].reopen : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Total</h5>
                          <hr />
                          <h4 className='bg-dark text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[6] ? pgrzonecomplaints[6].total : 0}</h4>
                          </div>
                      </div>
                       </div>

                       
                       <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-dark col-12`} style={{'backgroundColor':'#dddddd'}}>
                      <h4>Zone-08 </h4>
                      <hr className='border border-3 border-danger'/>
                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <h5>Open</h5>
                          <hr />
                          <h4 className='bg-youtube text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[7] ? pgrzonecomplaints[7].open : 0}</h4>
                          </div>
                          
                          <div className="col-md-3 col-sm-12">
                          <h5>Closed</h5>
                          <hr />
                          <h4 className='bg-success text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[7] ? pgrzonecomplaints[7].close : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Re-Open</h5>
                          <hr />
                          <h4 className='bg-warning text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[7] ? pgrzonecomplaints[7].reopen : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Total</h5>
                          <hr />
                          <h4 className='bg-dark text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[7] ? pgrzonecomplaints[7].total : 0}</h4>
                          </div>
                      </div>
                       </div>

                       
                       <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-dark col-12`} style={{'backgroundColor':'#dddddd'}}>
                      <h4>Zone-09 </h4>
                      <hr className='border border-3 border-danger'/>
                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <h5>Open</h5>
                          <hr />
                          <h4 className='bg-youtube text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[8] ? pgrzonecomplaints[8].open : 0}</h4>
                          </div>
                        
                          <div className="col-md-3 col-sm-12">
                          <h5>Closed</h5>
                          <hr />
                          <h4 className='bg-success text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[8] ? pgrzonecomplaints[8].close : 0}</h4>
                          </div>

                          <div className="col-md-3 col-sm-12">
                          <h5>Re-Open</h5>
                          <hr />
                          <h4 className='bg-warning text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[8] ? pgrzonecomplaints[8].reopen : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Total</h5>
                          <hr />
                          <h4 className='bg-dark text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[8] ? pgrzonecomplaints[8].total : 0}</h4>
                          </div>
                      </div>
                       </div>

                       
                       <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-dark col-12`} style={{'backgroundColor':'#dddddd'}}>
                      <h4>Zone-10 </h4>
                      <hr className='border border-3 border-danger'/>
                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <h5>Open</h5>
                          <hr />
                          <h4 className='bg-youtube text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[9] ? pgrzonecomplaints[9].open : 0}</h4>
                          </div>
                          
                          <div className="col-md-3 col-sm-12">
                          <h5>Closed</h5>
                          <hr />
                          <h4 className='bg-success text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[9] ? pgrzonecomplaints[9].close : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Re-Open</h5>
                          <hr />
                          <h4 className='bg-warning text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[9] ? pgrzonecomplaints[9].reopen : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Total</h5>
                          <hr />
                          <h4 className='bg-dark text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[9] ? pgrzonecomplaints[9].total : 0}</h4>
                          </div>
                      </div>
                       </div>
                       </>)}

                       
                       {(Selectedactiveregion === 'south' || Selectedactiveregion === 'all') && (
                        <>
                      <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-dark col-12`} style={{'backgroundColor':'#dddddd'}}>
                      <h4>Zone-11 </h4>
                      <hr className='border border-3 border-danger'/>
                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <h5>Open</h5>
                          <hr />
                          <h4 className='bg-youtube text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[10] ? pgrzonecomplaints[10].open : 0}</h4>
                          </div>
                         
                          <div className="col-md-3 col-sm-12">
                          <h5>Closed</h5>
                          <hr />
                          <h4 className='bg-success text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[10] ? pgrzonecomplaints[10].close : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Re-Open</h5>
                          <hr />
                          <h4 className='bg-warning text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[10] ? pgrzonecomplaints[10].reopen : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Total</h5>
                          <hr />
                          <h4 className='bg-dark text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[10] ? pgrzonecomplaints[10].total : 0}</h4>
                          </div>
                      </div>
                       </div>

                       
                       <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-dark col-12`} style={{'backgroundColor':'#dddddd'}}>
                      <h4>Zone-12 </h4>
                      <hr className='border border-3 border-danger'/>
                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <h5>Open</h5>
                          <hr />
                          <h4 className='bg-youtube text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[11] ? pgrzonecomplaints[11].open : 0}</h4>
                          </div>
                        
                          <div className="col-md-3 col-sm-12">
                          <h5>Closed</h5>
                          <hr />
                          <h4 className='bg-success text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[11] ? pgrzonecomplaints[11].close : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Re-Open</h5>
                          <hr />
                          <h4 className='bg-warning text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[11] ? pgrzonecomplaints[11].reopen : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Total</h5>
                          <hr />
                          <h4 className='bg-dark text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[11] ? pgrzonecomplaints[11].total : 0}</h4>
                          </div>
                      </div>
                       </div>

                       
                       <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-dark col-12`} style={{'backgroundColor':'#dddddd'}}>
                      <h4>Zone-13 </h4>
                      <hr className='border border-3 border-danger'/>
                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <h5>Open</h5>
                          <hr />
                          <h4 className='bg-youtube text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[12] ? pgrzonecomplaints[12].open : 0}</h4>
                          </div>
                         
                          <div className="col-md-3 col-sm-12">
                          <h5>Closed</h5>
                          <hr />
                          <h4 className='bg-success text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[12] ? pgrzonecomplaints[12].close : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Re-Open</h5>
                          <hr />
                          <h4 className='bg-warning text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[12] ? pgrzonecomplaints[12].reopen : 0}</h4>
                          </div>

                          <div className="col-md-3 col-sm-12">
                          <h5>Total</h5>
                          <hr />
                          <h4 className='bg-dark text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[12] ? pgrzonecomplaints[12].total : 0}</h4>
                          </div>
                      </div>
                       </div>

                       
                       <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-dark col-12`} style={{'backgroundColor':'#dddddd'}}>
                      <h4>Zone-14 </h4>
                      <hr className='border border-3 border-danger'/>
                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <h5>Open</h5>
                          <hr />
                          <h4 className='bg-youtube text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[13] ? pgrzonecomplaints[13].open : 0}</h4>
                          </div>
                          
                          <div className="col-md-3 col-sm-12">
                          <h5>Closed</h5>
                          <hr />
                          <h4 className='bg-success text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[13] ? pgrzonecomplaints[13].close : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Re-Open</h5>
                          <hr />
                          <h4 className='bg-warning text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[13] ? pgrzonecomplaints[13].reopen : 0}</h4>
                          </div>

                          <div className="col-md-3 col-sm-12">
                          <h5>Total</h5>
                          <hr />
                          <h4 className='bg-dark text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[13] ? pgrzonecomplaints[13].total : 0}</h4>
                          </div>
                      </div>
                       </div>

                       
                       <div className={`pointer p-2 mt-2 text-center shadow-lg p-1 mb-3 rounded border border-1 border-dark col-12`} style={{'backgroundColor':'#dddddd'}}>
                      <h4>Zone-15 </h4>
                      <hr className='border border-3 border-danger'/>
                      <div className="row">
                        <div className="col-md-3 col-sm-12">
                          <h5>Open</h5>
                          <hr />
                          <h4 className='bg-youtube text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[14] ? pgrzonecomplaints[14].open : 0}</h4>
                          </div>
                         
                          <div className="col-md-3 col-sm-12">
                          <h5>Closed</h5>
                          <hr />
                          <h4 className='bg-success text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[14] ? pgrzonecomplaints[14].close : 0}</h4>
                          </div>
                          <div className="col-md-3 col-sm-12">
                          <h5>Re-Open</h5>
                          <hr />
                          <h4 className='bg-warning text-dark rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[14] ? pgrzonecomplaints[14].reopen : 0}</h4>
                          </div>

                          <div className="col-md-3 col-sm-12">
                          <h5>Total</h5>
                          <hr />
                          <h4 className='bg-dark text-light rounded p-3 border border-2 border-dark'>{pgrzonecomplaints[14] ? pgrzonecomplaints[14].total : 0}</h4>
                          </div>
                      </div>
                       </div>
                       </>)}

                    </div>

                    <div className="col-md-4 col-sm-12  bg-light border border-light rounded" style={{height:'88vh'}}>
                    <LoadScript googleMapsApiKey={gtoken}>
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={center}
                      zoom={11}
                      options={mapOptions}
                      onLoad={setMap}
                    >
                    </GoogleMap>
                  </LoadScript>
                    </div>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


  <Modal
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  contentLabel="School Details"
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      border: '1px solid #dee2e6',
      borderRadius: '0.375rem',
      padding: '1rem',
      maxWidth: '600px',
      margin: 'auto',
      height: '350px',
    },
  }} 
>
  {selectedSchool && (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">School Details 1 out of {totalSchools}</h5>
        <button
          type="button"
          className="close"
          onClick={() => setModalIsOpen(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="row">
          <div className="col-6 mb-2">Region</div>
          <div className="col-6 mb-2">{selectedSchool.region} </div>
          <div className="col-6 mb-2">Zone</div>
          <div className="col-6 mb-2">Zone-{selectedSchool.zone}</div>
          <div className="col-6 mb-2">Ward</div>
          <div className="col-6 mb-2">Ward-{selectedSchool.ward}</div>
          <div className="col-6 mb-2">Address</div>
          <div className="col-6">{selectedSchool.address}</div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setModalIsOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  )}
</Modal>



      <Modal
        isOpen={rainModalIsOpen}
        onRequestClose={closeModal}
        contentLabel="RAIN LIVE"
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          content: {
            border: '1px solid #dee2e6',
            borderRadius: '0.375rem',
            padding: '1rem',
            maxWidth: '600px',
            margin: 'auto',
            height: '550px',
          },
        }}
      >
        <div className="modal-content">
          <div className="modal-header bg-dark">
            <h5 className="modal-title text-light">From Yesterday 6:00 Am to now Rain fall {totalrain} mm</h5>
            <button
              type="button"
              className="close"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <div className="col-12 table-responsive">
              <table className='table table-sm table-bordered' style={{fontSize:'12px'}}>
                <thead>
                  <tr>
                    <th colSpan={2} className='text-center bg-success'>Hours</th>
                    <th className='text-center bg-success'>Value (mm)</th>
                  </tr>
                  
                </thead>
                <tbody>
                  {
                      Array.isArray(liverain_data) && liverain_data.length > 0 ? (
                        liverain_data.map((e, index) => (
                          <tr key={index} className={e.rain > 0 ? 'bg-success' : 'bg-light'}>
                            <td>{e.from}</td>
                            <td>{e.to}</td>
                            <td>{e.rain} mm</td>
                           </tr>
                        ))
                      ) : (
                        <td colSpan="12">No data available</td> // This provides a fallback message when data is empty
                      )
                    }
                    <tr className='bg-dark text-light'>
                      <td colSpan={2}>Total</td>
                      <td>{totalrain} mm</td>
                    </tr>
                </tbody>
              </table>
            </div>

          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>


    </>
  );
}
export default Pgr;
