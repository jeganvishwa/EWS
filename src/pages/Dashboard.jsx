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
import cluster_data from '../pages/mapdata/cluster.json';
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
import boatt_data from '../pages/mapdata/boat.json';
import flood_car_data from '../pages/mapdata/floodlayer.json'
import cooking_data from '../pages/mapdata/cookingcenter.json'
import disaster_data from '../pages/mapdata/disaster2024.json'


import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { gtoken,base_url } from './service_token';

function Dash() {
  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  const center = {
    lat: 13.0524,
    lng: 80.1612,
  };



  const [wardJsonData, setWardJsonData] = useState(null);
  const [map, setMap] = useState(null);
  const [zoneMarkers, setZoneMarkers] = useState([]);
  const [boat_data, setboat_data] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [wardMarkers, setWardMarkers] = useState([]);
  const [schoolMarkers, setSchoolMarkers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [vmodalIsOpen, setvModalIsOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedtype, setSelectedtype] = useState(null);
  const [totalSchools, setTotalSchools] = useState(0);

  const [feet, setFeet] = useState(7);


  const [selectedregion, setSelectedregion] = useState(null);
  const [Selectedactiveregion, setSelectedactiveregion] = useState(null);
  
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


  const [clusterMarkers, setclusterMarkers] = useState([]);
  const [selectedcluster, setSelectedcluster] = useState(null);

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

  const [boatMarkers, setboatMarkers] = useState([]);
  const [selectedboat, setSelectedboat] = useState(null);

  const [floodcarMarkers, setfloodcarMarkers] = useState([]);
  const [selectedfloodcar, setSelectedfloodcar] = useState(null);
  

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
    if (map && zone_boundaries) {
      map.data.addGeoJson(zone_boundaries);

      map.data.setStyle({
        strokeColor: '#800000',
        strokeWeight: 5,
        fillColor: '#920aa2',
        fillOpacity: 0,
      });

      // Add markers for the zones
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
              fontSize: "14px",
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
  }, [map, zone_boundaries, wardJsonData]);


// zoom 
  useEffect(() => {
    if (map && selectedZone) {
      // Remove previous ward markers
      wardMarkers.forEach((marker) => marker.setMap(null));
      setWardMarkers([]);

      // Clear previous ward data
      map.data.forEach((feature) => {
        if (feature.getProperty("Ward")) {
          map.data.remove(feature);
        }
      });

      // Find the selected zone and zoom into it
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

          // Filter and add wards in the selected zone
          const filteredWardJsonData = {
            type: "FeatureCollection",
            features: wardJsonData.features.filter((feature) => feature.properties.Zone === parseInt(selectedZone)),
          };

          map.data.addGeoJson(filteredWardJsonData);
          map.data.setStyle((feature) => {
            const zoneName = feature.getProperty("Zone");
            if (zoneName === parseInt(selectedZone)) {
              return {
                strokeColor: 'black',
                strokeWeight: 2,
                fillColor: 'yellow',
                fillOpacity: 0,
              };
            } else {
              return {
                strokeColor: 'yellow',
                strokeWeight: 6,
                fillColor: '#FF00FF',
                fillOpacity: 0.2,
              };
            }
          });

          // Add markers for the filtered wards
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
  }, [selectedZone, map, wardJsonData]);

  function displayicon(val) {
    const selectedValue = val;
    setSelectedtype(val);
  
    switch (selectedValue) {
      case 'school':
        school(); 
        break;
      case 'zonel_office':
        zoneloffice(); 
        break;
      case 'uphc':
        uphc()
        break;
      case 'relief':
        relief()
        break;
      case 'community':
        community()
        break;
      case 'ammaunavagam':
        ammaunavagam()
        break;
      case 'cluster':
        cluster()
        break;
      case 'shelter':
        shelter()
        break;
      case 'hospital':
        hospital()
        break;
      case 'ndrf':
        ndrf()
        break;
      case 'medical':
        medical()
        break;
      case 'cctv':
        cctv()
        break;
      case 'rain':
        rain()
        break;
      case 'e_motor':
        e_motor(); 
        break;
      case 'boat':
          boat(); 
          break;
      case 'flood_car':
            flood_car(); 
           break;
     case 'Reports':
           cooking_center();
           break;
      case 'disaster':
        disaster();
        break;
      default:
        
        break;
    }
  }
  
  

  function createMarkers(data, iconUrl) {
    return data.map((item) => {
      const position = {
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lan),
      };
  
      const marker = new window.google.maps.Marker({
        position,
        label: {
          fontSize: "8px",
          fontWeight: "bold",
          color: "red",
          fillColor: 'white',
          fillOpacity: 1.8,
        },
        title: item.address,
        icon: {
          url: iconUrl,
          scaledSize: new window.google.maps.Size(20, 10),
        },
        map: map,
      });
  
      return marker;
    });
  }
  
  

  useEffect(() => {
    if (selectedtype === 'school') {
        zofficeMarkers.forEach(marker => marker.setMap(null));
        uphcMarkers.forEach(marker => marker.setMap(null));
        uchcMarkers.forEach(marker => marker.setMap(null));
        reliefMarkers.forEach(marker => marker.setMap(null));
        communityMarkers.forEach(marker => marker.setMap(null));
        ammaMarkers.forEach(marker => marker.setMap(null));
        shelterMarkers.forEach(marker => marker.setMap(null));
        hospitalMarkers.forEach(marker => marker.setMap(null));
        ndrfMarkers.forEach(marker => marker.setMap(null));
        medicalMarkers.forEach(marker => marker.setMap(null));
        cctvMarkers.forEach(marker => marker.setMap(null));
        rainMarkers.forEach(marker => marker.setMap(null));
        floodcamMarkers.forEach(marker => marker.setMap(null));
        emotorMarkers.forEach(marker => marker.setMap(null));
        clusterMarkers.forEach(marker => marker.setMap(null));
        boatMarkers.forEach(marker => marker.setMap(null));
        floodcarMarkers.forEach(marker => marker.setMap(null));
        setzofficeMarkers([]);
        setuphcMarkers([]);
        setuchcMarkers([]);
        setreliefMarkers([]);
        setcommunityMarkers([]);
        setammaMarkers([]);
        setshelterMarkers([]);
        sethospitalMarkers([]);
        setndrfMarkers([]);
        setmedicalMarkers([]);
        setcctvMarkers([]);
        setrainMarkers([]);
        setfloodcamMarkers([]);
        setemotorMarkers([]);
        setclusterMarkers([]);
         setboatMarkers([]);
          setfloodcarMarkers([]);
        school(); 
    } else if (selectedtype === 'zonel_office') {
        schoolMarkers.forEach(marker => marker.setMap(null));
        uphcMarkers.forEach(marker => marker.setMap(null));
        uchcMarkers.forEach(marker => marker.setMap(null));
        reliefMarkers.forEach(marker => marker.setMap(null));
        communityMarkers.forEach(marker => marker.setMap(null));
        ammaMarkers.forEach(marker => marker.setMap(null));
        shelterMarkers.forEach(marker => marker.setMap(null));
        hospitalMarkers.forEach(marker => marker.setMap(null));
        ndrfMarkers.forEach(marker => marker.setMap(null));
        medicalMarkers.forEach(marker => marker.setMap(null));
        cctvMarkers.forEach(marker => marker.setMap(null));
        rainMarkers.forEach(marker => marker.setMap(null));
        floodcamMarkers.forEach(marker => marker.setMap(null));
        emotorMarkers.forEach(marker => marker.setMap(null));
        clusterMarkers.forEach(marker => marker.setMap(null));
        boatMarkers.forEach(marker => marker.setMap(null));
        floodcarMarkers.forEach(marker => marker.setMap(null));
        
        setSchoolMarkers([]); 
        setuphcMarkers([]);
        setuchcMarkers([]);
        setreliefMarkers([]);
        setcommunityMarkers([]);
        setammaMarkers([]);
        setshelterMarkers([]);
        sethospitalMarkers([]);
        setndrfMarkers([]);
        setmedicalMarkers([]);
        setcctvMarkers([]);
        setrainMarkers([]);
        setfloodcamMarkers([]);
        setemotorMarkers([]);
        setclusterMarkers([]);
         setboatMarkers([]);
          setfloodcarMarkers([]);
        
        zoneloffice();
    } else if (selectedtype === 'Reports') {
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));
      zofficeMarkers.forEach(marker => marker.setMap(null));
      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setuchcMarkers([]);
      setreliefMarkers([]);
      setcommunityMarkers([]);
      setammaMarkers([]);
      setshelterMarkers([]);
      sethospitalMarkers([]);
      setndrfMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setfloodcamMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
      setboatMarkers([]);
      setfloodcarMarkers([]);
      setzofficeMarkers([]); 
      
      cooking_center();
  }
    else if(selectedtype === 'uphc') {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));
      setSchoolMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]);
      setcommunityMarkers([]);
      setammaMarkers([]);
      setshelterMarkers([]);
      sethospitalMarkers([]);
      setndrfMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setfloodcamMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
       setboatMarkers([]);
        setfloodcarMarkers([]);
      uphc();
    }
    else if(selectedtype === 'uchc') {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));
      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]);  
      setreliefMarkers([]);
      setcommunityMarkers([]);
      setammaMarkers([]);
      setshelterMarkers([]);
      sethospitalMarkers([]);
      setndrfMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setfloodcamMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
       setboatMarkers([]);
        setfloodcarMarkers([]);
      uchc();
    }
    else if(selectedtype === 'relief') {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));
      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setcommunityMarkers([]);
      setammaMarkers([]);
      setshelterMarkers([]);
      sethospitalMarkers([]);
      setndrfMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setfloodcamMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
      setboatMarkers([]);
       setfloodcarMarkers([]);
      relief();
    }
    else if(selectedtype === 'community') {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));
      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]); 
      setammaMarkers([]);
      setshelterMarkers([]);
      sethospitalMarkers([]);
      setndrfMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setfloodcamMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
       setboatMarkers([]);
        setfloodcarMarkers([]);
      community();
    }
    else if(selectedtype === 'ammaunavagam') {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));

      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]); 
      setcommunityMarkers([]);
      setshelterMarkers([]);
      sethospitalMarkers([]);
      setndrfMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setfloodcamMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
       setboatMarkers([]);
        setfloodcarMarkers([]);
      ammaunavagam();
    }
    else if(selectedtype === 'shelter') {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));

      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]); 
      setammaMarkers([]);
      setcommunityMarkers([]);
      sethospitalMarkers([]);
      setndrfMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setfloodcamMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
       setboatMarkers([]);
        setfloodcarMarkers([]);
      shelter();
    }
    else if(selectedtype === 'hospital') {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));
      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]); 
      setammaMarkers([]);
      setcommunityMarkers([]);
      setshelterMarkers([]);
      setndrfMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setfloodcamMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
       setboatMarkers([]);
        setfloodcarMarkers([]);
      hospital();
    }

    else if(selectedtype === 'ndrf') {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));
      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]); 
      setammaMarkers([]);
      setcommunityMarkers([]);
      setshelterMarkers([]);
      setmedicalMarkers([]);
      sethospitalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setfloodcamMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
       setboatMarkers([]);
        setfloodcarMarkers([]);
      ndrf();
    }

    else if(selectedtype === 'medical') {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
     floodcamMarkers.forEach(marker => marker.setMap(null));
     emotorMarkers.forEach(marker => marker.setMap(null));
     clusterMarkers.forEach(marker => marker.setMap(null));
     boatMarkers.forEach(marker => marker.setMap(null));
     floodcarMarkers.forEach(marker => marker.setMap(null));

      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]); 
      setammaMarkers([]);
      setcommunityMarkers([]);
      setshelterMarkers([]);
      setndrfMarkers([]);
      sethospitalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setfloodcamMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
       setboatMarkers([]);
        setfloodcarMarkers([]);
      medical();
    }

    else if(selectedtype === 'cctv') {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));
     

      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]); 
      setammaMarkers([]);
      setcommunityMarkers([]);
      setshelterMarkers([]);
      setndrfMarkers([]);
      sethospitalMarkers([]);
      setmedicalMarkers([]);
      setrainMarkers([]);
      setfloodcamMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
       setboatMarkers([]);
        setfloodcarMarkers([]);

      
      cctv();
    }

    else if(selectedtype === 'rain') {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));
      
      
     

      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]); 
      setammaMarkers([]);
      setcommunityMarkers([]);
      setshelterMarkers([]);
      setndrfMarkers([]);
      sethospitalMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setfloodcamMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
       setboatMarkers([]);
        setfloodcarMarkers([]);
      
      

      
      rain();
    }
    else if(selectedtype === 'floodcamera')
    {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));
     

      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]); 
      setammaMarkers([]);
      setcommunityMarkers([]);
      setshelterMarkers([]);
      setndrfMarkers([]);
      sethospitalMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
      setboatMarkers([]);
       setfloodcarMarkers([]);

      
      floodcameras();
    }
    else if(selectedtype === 'boat')
    {

      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));
      

      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]); 
      setammaMarkers([]);
      setcommunityMarkers([]);
      setshelterMarkers([]);
      setndrfMarkers([]);
      sethospitalMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
      setfloodcamMarkers([]);
       setfloodcarMarkers([]);
     
      boat();
    }
    else if(selectedtype === 'disaster')
      {
  
        zofficeMarkers.forEach(marker => marker.setMap(null));
        schoolMarkers.forEach(marker => marker.setMap(null));
        uphcMarkers.forEach(marker => marker.setMap(null));
        uchcMarkers.forEach(marker => marker.setMap(null));
        reliefMarkers.forEach(marker => marker.setMap(null));
        ammaMarkers.forEach(marker => marker.setMap(null));
        communityMarkers.forEach(marker => marker.setMap(null));
        shelterMarkers.forEach(marker => marker.setMap(null));
        ndrfMarkers.forEach(marker => marker.setMap(null));
        hospitalMarkers.forEach(marker => marker.setMap(null));
        medicalMarkers.forEach(marker => marker.setMap(null));
        cctvMarkers.forEach(marker => marker.setMap(null));
        rainMarkers.forEach(marker => marker.setMap(null));
        emotorMarkers.forEach(marker => marker.setMap(null));
        clusterMarkers.forEach(marker => marker.setMap(null));
        floodcamMarkers.forEach(marker => marker.setMap(null));
        floodcarMarkers.forEach(marker => marker.setMap(null));
        
  
        setSchoolMarkers([]); 
        setuphcMarkers([]);
        setzofficeMarkers([]); 
        setuchcMarkers([]);
        setreliefMarkers([]); 
        setammaMarkers([]);
        setcommunityMarkers([]);
        setshelterMarkers([]);
        setndrfMarkers([]);
        sethospitalMarkers([]);
        setmedicalMarkers([]);
        setcctvMarkers([]);
        setrainMarkers([]);
        setemotorMarkers([]);
        setclusterMarkers([]);
        setfloodcamMarkers([]);
        setfloodcarMarkers([]);
       
         disaster();
      }

    

    else if(selectedtype === 'cluster')
      {
        zofficeMarkers.forEach(marker => marker.setMap(null));
        schoolMarkers.forEach(marker => marker.setMap(null));
        uphcMarkers.forEach(marker => marker.setMap(null));
        uchcMarkers.forEach(marker => marker.setMap(null));
        reliefMarkers.forEach(marker => marker.setMap(null));
        ammaMarkers.forEach(marker => marker.setMap(null));
        communityMarkers.forEach(marker => marker.setMap(null));
        shelterMarkers.forEach(marker => marker.setMap(null));
        ndrfMarkers.forEach(marker => marker.setMap(null));
        hospitalMarkers.forEach(marker => marker.setMap(null));
        medicalMarkers.forEach(marker => marker.setMap(null));
        cctvMarkers.forEach(marker => marker.setMap(null));
        rainMarkers.forEach(marker => marker.setMap(null));
        emotorMarkers.forEach(marker => marker.setMap(null));
       floodcamMarkers.forEach(marker => marker.setMap(null));
       boatMarkers.forEach(marker => marker.setMap(null));
       floodcarMarkers.forEach(marker => marker.setMap(null));
  
        setSchoolMarkers([]); 
        setuphcMarkers([]);
        setzofficeMarkers([]); 
        setuchcMarkers([]);
        setreliefMarkers([]); 
        setammaMarkers([]);
        setcommunityMarkers([]);
        setshelterMarkers([]);
        setndrfMarkers([]);
        sethospitalMarkers([]);
        setmedicalMarkers([]);
        setcctvMarkers([]);
        setrainMarkers([]);
        setemotorMarkers([]);
        setfloodcamMarkers([]);
         setboatMarkers([]);
          setfloodcarMarkers([]);
        
        cluster();
      }
  

      
      

    else if(selectedtype === 'water_bodies')
    {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));

      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]); 
      setammaMarkers([]);
      setcommunityMarkers([]);
      setshelterMarkers([]);
      setndrfMarkers([]);
      sethospitalMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
      setfloodcamMarkers([]);
       setboatMarkers([]);
        setfloodcarMarkers([]);
      water_bodies();
    }
    else if(selectedtype === 'firstres')
    {

      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));
     

      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]); 
      setammaMarkers([]);
      setcommunityMarkers([]);
      setshelterMarkers([]);
      setndrfMarkers([]);
      sethospitalMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
      setfloodcamMarkers([]);
       setboatMarkers([]);
        setfloodcarMarkers([]);

      firstres();
    }
    else if(selectedtype === 'appmit')
    {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));
     

      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]); 
      setammaMarkers([]);
      setcommunityMarkers([]);
      setshelterMarkers([]);
      setndrfMarkers([]);
      sethospitalMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
      setfloodcamMarkers([]);
       setboatMarkers([]);
        setfloodcarMarkers([]);

      firstres();
    }
    else if(selectedtype ==='rwa')
    {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));
     

      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]); 
      setammaMarkers([]);
      setcommunityMarkers([]);
      setshelterMarkers([]);
      setndrfMarkers([]);
      sethospitalMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
      setfloodcamMarkers([]);
       setboatMarkers([]);
        setfloodcarMarkers([]);

      firstres();
    }

   else if(selectedtype ==='m_motor')
    {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      emotorMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));
     

      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]); 
      setammaMarkers([]);
      setcommunityMarkers([]);
      setshelterMarkers([]);
      setndrfMarkers([]);
      sethospitalMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setemotorMarkers([]);
      setclusterMarkers([]);
      setfloodcamMarkers([]);
      setboatMarkers([]);
      setfloodcarMarkers([]);

      m_motor();
    }
  else if(selectedtype ==='e_motor')
    {
      zofficeMarkers.forEach(marker => marker.setMap(null));
      schoolMarkers.forEach(marker => marker.setMap(null));
      uphcMarkers.forEach(marker => marker.setMap(null));
      uchcMarkers.forEach(marker => marker.setMap(null));
      reliefMarkers.forEach(marker => marker.setMap(null));
      ammaMarkers.forEach(marker => marker.setMap(null));
      communityMarkers.forEach(marker => marker.setMap(null));
      shelterMarkers.forEach(marker => marker.setMap(null));
      ndrfMarkers.forEach(marker => marker.setMap(null));
      hospitalMarkers.forEach(marker => marker.setMap(null));
      medicalMarkers.forEach(marker => marker.setMap(null));
      cctvMarkers.forEach(marker => marker.setMap(null));
      rainMarkers.forEach(marker => marker.setMap(null));
      clusterMarkers.forEach(marker => marker.setMap(null));
      floodcamMarkers.forEach(marker => marker.setMap(null));
      boatMarkers.forEach(marker => marker.setMap(null));
      floodcarMarkers.forEach(marker => marker.setMap(null));
     

      setSchoolMarkers([]); 
      setuphcMarkers([]);
      setzofficeMarkers([]); 
      setuchcMarkers([]);
      setreliefMarkers([]); 
      setammaMarkers([]);
      setcommunityMarkers([]);
      setshelterMarkers([]);
      setndrfMarkers([]);
      sethospitalMarkers([]);
      setmedicalMarkers([]);
      setcctvMarkers([]);
      setrainMarkers([]);
      setclusterMarkers([]);
      setfloodcamMarkers([]);
       setboatMarkers([]);
       setfloodcarMarkers([]);

      e_motor();
    }

    else if(selectedtype ==='flood_car')
      {
        zofficeMarkers.forEach(marker => marker.setMap(null));
        schoolMarkers.forEach(marker => marker.setMap(null));
        uphcMarkers.forEach(marker => marker.setMap(null));
        uchcMarkers.forEach(marker => marker.setMap(null));
        reliefMarkers.forEach(marker => marker.setMap(null));
        ammaMarkers.forEach(marker => marker.setMap(null));
        communityMarkers.forEach(marker => marker.setMap(null));
        shelterMarkers.forEach(marker => marker.setMap(null));
        ndrfMarkers.forEach(marker => marker.setMap(null));
        hospitalMarkers.forEach(marker => marker.setMap(null));
        medicalMarkers.forEach(marker => marker.setMap(null));
        cctvMarkers.forEach(marker => marker.setMap(null));
        rainMarkers.forEach(marker => marker.setMap(null));
        clusterMarkers.forEach(marker => marker.setMap(null));
        floodcamMarkers.forEach(marker => marker.setMap(null));
        boatMarkers.forEach(marker => marker.setMap(null));
        emotorMarkers.forEach(marker => marker.setMap(null));
       
  
        setSchoolMarkers([]); 
        setuphcMarkers([]);
        setzofficeMarkers([]); 
        setuchcMarkers([]);
        setreliefMarkers([]); 
        setammaMarkers([]);
        setcommunityMarkers([]);
        setshelterMarkers([]);
        setndrfMarkers([]);
        sethospitalMarkers([]);
        setmedicalMarkers([]);
        setcctvMarkers([]);
        setrainMarkers([]);
        setclusterMarkers([]);
        setfloodcamMarkers([]);
        setboatMarkers([]);
        setemotorMarkers([]);
  
        flood_car();
      }


}, [selectedZone, selectedtype]);




function school() {
    if (map && school_data) {
        // Clear existing school markers
        schoolMarkers.forEach((marker) => marker.setMap(null));
        setSchoolMarkers([]);
        zoomme();

        let filteredSchools = [];

        if (selectedZone !== '') {
          filteredSchools = school_data.data.filter(rain => rain.Zone === selectedZone);
        } else {
          let allowedZones = [];
          switch (userData.region) {
            case 1:
              allowedZones = ["1", "2", "3", "4", "5"];
              break;
            case 2:
              allowedZones = ["5", "6", "7", "8", "9", "10"];
              break;
            case 3:
              allowedZones = ["11", "12", "13", "14", "15"];
              break;
            case 0:
              allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
              break;
            default:
              allowedZones = [];
          }
          filteredSchools = school_data.data.filter(rain => allowedZones.includes(rain.Zone));
        }
        setcctvs(filteredSchools);



        const markers = filteredSchools.map((school) => {
            const position = {
                lat: parseFloat(school.lat),
                lng: parseFloat(school.lan),
            };

            const marker = new window.google.maps.Marker({
                position,
                label: {
                    fontSize: "8px",
                    fontWeight: "bold",
                    color: "red",
                },
                title: school.address,
                icon: {
                    url: 'https://img.icons8.com/?size=100&id=40734&format=png&color=000000',
                    scaledSize: new window.google.maps.Size(40, 30),
                },
                map: map,
            });

            // marker.addListener('click', () => {
            //     setSelectedSchool(school);
            //     setModalIsOpen(true);
            // });

            return marker;
        });

        setSchoolMarkers(markers);
        setTotalSchools(filteredSchools.length);
    }
}

function zoneloffice() {
    if (map && zone_address) {
        zofficeMarkers.forEach((marker) => marker.setMap(null));
        setzofficeMarkers([]);
        zoomme();

        let filteredzaddress = [];

        if (selectedZone !== '') {
          filteredzaddress = zone_address.data.filter(rain => rain.Zone === selectedZone);
        } else {
          let allowedZones = [];
          switch (userData.region) {
            case 1:
              allowedZones = ["1", "2", "3", "4", "5"];
              break;
            case 2:
              allowedZones = ["5", "6", "7", "8", "9", "10"];
              break;
            case 3:
              allowedZones = ["11", "12", "13", "14", "15"];
              break;
            case 0:
              allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
              break;
            default:
              allowedZones = [];
          }
          filteredzaddress = zone_address.data.filter(rain => allowedZones.includes(rain.Zone));
        }
        setcctvs(filteredzaddress);
        
        const markers = filteredzaddress.map((address) => {
            const position = {
                lat: parseFloat(address.lat),
                lng: parseFloat(address.lan),
            };

            const marker = new window.google.maps.Marker({
                position,
                label: {
                    fontSize: "8px",
                    fontWeight: "bold",
                    color: "red",
                },
                title: address.address,
                icon: {
                    url: 'https://img.icons8.com/?size=100&id=2kJjC1CUYqsv&format=png&color=000000',
                    scaledSize: new window.google.maps.Size(40, 30),
                },
                map: map,
            });
            return marker;
        });

        setzofficeMarkers(markers);
    }
}



function uphc() {
  if (map && uphc_data) {
    uphcMarkers.forEach((marker) => marker.setMap(null));
      setuphcMarkers([]);
      zoomme();

      boatMarkers.forEach((marker) => marker.setMap(null));
    setboatMarkers([]); // Ensure the state is cleared

      let filtereduphc = [];

      if (selectedZone !== '') {
        filtereduphc = uphc_data.data.filter(rain => rain.Zone === selectedZone);
      } else {
        let allowedZones = [];
        switch (userData.region) {
          case 1:
            allowedZones = ["1", "2", "3", "4", "5"];
            break;
          case 2:
            allowedZones = ["5", "6", "7", "8", "9", "10"];
            break;
          case 3:
            allowedZones = ["11", "12", "13", "14", "15"];
            break;
          case 0:
            allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            break;
          default:
            allowedZones = [];
        }
        filtereduphc = uphc_data.data.filter(rain => allowedZones.includes(rain.Zone));
      }
      setcctvs(filtereduphc);


      const markers = filtereduphc.map((uphc) => {
          const position = {
              lat: parseFloat(uphc.lat),
              lng: parseFloat(uphc.lan),
          };

          const marker = new window.google.maps.Marker({
              position,
              label: {
                  fontSize: "8px",
                  fontWeight: "bold",
                  color: "red",
              },
              title: uphc.address,
              icon: {
                  url: 'https://img.icons8.com/?size=100&id=FhVEavxst_Wo&format=png&color=000000',
                  scaledSize: new window.google.maps.Size(40, 30),
              },
              map: map,
          });

          // marker.addListener('click', () => {
          //   console.log(address); 
          //     setSelectedzoffice(address);
          //     setModalIsOpen(true);
          // });

          return marker;
      });

      setuphcMarkers(markers);
  }
}


function uchc() {
  if (map && uchc_data) {
    uchcMarkers.forEach((marker) => marker.setMap(null));
      setuchcMarkers([]);
      zoomme();

      let filtereduchc = [];

      if (selectedZone !== '') {
        filtereduchc = uchc_data.data.filter(rain => rain.Zone === selectedZone);
      } else {
        let allowedZones = [];
        switch (userData.region) {
          case 1:
            allowedZones = ["1", "2", "3", "4", "5"];
            break;
          case 2:
            allowedZones = ["5", "6", "7", "8", "9", "10"];
            break;
          case 3:
            allowedZones = ["11", "12", "13", "14", "15"];
            break;
          case 0:
            allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            break;
          default:
            allowedZones = [];
        }
        filtereduchc = uchc_data.data.filter(rain => allowedZones.includes(rain.Zone));
      }
      setcctvs(filtereduchc);

      const markers = filtereduchc.map((uchc) => {
          const position = {
              lat: parseFloat(uchc.lat),
              lng: parseFloat(uchc.lan),
          };

          const marker = new window.google.maps.Marker({
              position,
              label: {
                  fontSize: "8px",
                  fontWeight: "bold",
                  color: "red",
              },
              title: uchc.Raddress,
              icon: {
                  url: 'https://img.icons8.com/?size=100&id=l_AX_kXOr_Ta&format=png&color=000000',
                  scaledSize: new window.google.maps.Size(40, 30),
              },
              map: map,
          });

          // marker.addListener('click', () => {
          //   console.log(address); 
          //     setSelectedzoffice(address);
          //     setModalIsOpen(true);
          // });

          return marker;
      });

      setuchcMarkers(markers);
  }
}



function flood_car() {
  if (map && flood_car_data) {
    uchcMarkers.forEach((marker) => marker.setMap(null));
    setuchcMarkers([]);
    zoomme();

    let filtereduchc = [];

    if (selectedZone !== '') {
      filtereduchc = flood_car_data.data.filter(rain => rain.Zone === selectedZone);
    } else {
      let allowedZones = [];
      switch (userData.region) {
        case 1:
          allowedZones = ["1", "2", "3", "4", "5"];
          break;
        case 2:
          allowedZones = ["5", "6", "7", "8", "9", "10"];
          break;
        case 3:
          allowedZones = ["11", "12", "13", "14", "15"];
          break;
        case 0:
          allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
          break;
        default:
          allowedZones = [];
      }

      if(feet === 0.3)
        {
          filtereduchc = flood_car_data.data.filter(rain => 
            allowedZones.includes(rain.Zone) && rain.Depth_ft_ < 0.4
          );
          
        }
          else if(feet === 1)
            {
              filtereduchc = flood_car_data.data.filter(rain => 
                allowedZones.includes(rain.Zone) && rain.Depth_ft_ < 1.1 && rain.Depth_ft_ > 0.3
              );
              
            }
            else if(feet === 2)
              {
                filtereduchc = flood_car_data.data.filter(rain => 
                  allowedZones.includes(rain.Zone) && rain.Depth_ft_ < 2.1 && rain.Depth_ft_ > 1
                );
                
              }
              else if(feet === 3)
                {
                  filtereduchc = flood_car_data.data.filter(rain => 
                    allowedZones.includes(rain.Zone) && rain.Depth_ft_ < 3.1 && rain.Depth_ft_ > 2
                  );
                  
                }
                else if(feet === 6)
                  {
                    filtereduchc = flood_car_data.data.filter(rain => 
                      allowedZones.includes(rain.Zone) && rain.Depth_ft_ < 6.1 && rain.Depth_ft_ > 3
                    );
                    
                  }
        else if(feet === 7)
        {
          filtereduchc = flood_car_data.data.filter(rain => 
            allowedZones.includes(rain.Zone)
          );
        }

      // filtereduchc = flood_car_data.data.filter(rain => allowedZones.includes(rain.Zone));
    }

    setcctvs(filtereduchc);


    const getCircleSVG = (depth) => {
      let fillColor;
      if (depth > 0 && depth <= 0.3) {
        fillColor = '#99cc00'; // Light Green
    } else if (depth > 0.3 && depth <= 1) {
        fillColor = '#2d4a00'; // Dark Green
    } else if (depth > 1 && depth <= 2) {
        fillColor = '#ffcc00'; // Yellow
    } else if (depth > 2 && depth <= 3) {
        fillColor = '#ff9933'; // Orange
    } else if (depth > 3 && depth <= 6) {
        fillColor = '#cc3300'; // Red
    } else {
        fillColor = ''; // Default case
    }

      return {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: fillColor,
        fillOpacity: 0.8,
        scale: 10 + depth * 2,
        strokeColor: 'black',
        strokeWeight: 1
      };
    };

    const markers = filtereduchc.map((uchc) => {
      const position = {
        lat: parseFloat(uchc.lan),
        lng: parseFloat(uchc.lat),
      };

      const marker = new window.google.maps.Marker({
        position,
        label: {
          fontSize: "8px",
          fontWeight: "bold",
          color: "red",
        },
        title: `${uchc.street} (${uchc.Depth_ft_} ft)`,
        icon: getCircleSVG(uchc.Depth_ft_), 
        map: map,
      });

      return marker;
    });

    setuchcMarkers(markers);
  }
}





function disaster() {
  if (map && disaster_data) {
    uchcMarkers.forEach((marker) => marker.setMap(null));
    setuchcMarkers([]);
    zoomme();

    let filtereduchc = [];

    if (selectedZone !== '') {
      filtereduchc = disaster_data.data.filter(rain => rain.Zone === selectedZone);
    } else {
      let allowedZones = [];
      switch (userData.region) {
        case 1:
          allowedZones = ["1", "2", "3", "4", "5"];
          break;
        case 2:
          allowedZones = ["5", "6", "7", "8", "9", "10"];
          break;
        case 3:
          allowedZones = ["11", "12", "13", "14", "15"];
          break;
        case 0:
          allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
          break;
        default:
          allowedZones = [];
      }

      if(feet === 0.3)
      {
        filtereduchc = disaster_data.data.filter(rain => 
          allowedZones.includes(rain.Zone) && rain.feet < 0.4
        );
        
      }
        else if(feet === 1)
          {
            filtereduchc = disaster_data.data.filter(rain => 
              allowedZones.includes(rain.Zone) && rain.feet < 1.1 && rain.feet > 0.3
            );
            
          }
          else if(feet === 2)
            {
              filtereduchc = disaster_data.data.filter(rain => 
                allowedZones.includes(rain.Zone) && rain.feet < 2.1 && rain.feet > 1
              );
              
            }
            else if(feet === 3)
              {
                filtereduchc = disaster_data.data.filter(rain => 
                  allowedZones.includes(rain.Zone) && rain.feet < 3.1 && rain.feet > 2
                );
                
              }
              else if(feet === 6)
                {
                  filtereduchc = disaster_data.data.filter(rain => 
                    allowedZones.includes(rain.Zone) && rain.feet < 6.1 && rain.feet > 3
                  );
                  
                }
      else if(feet === 7)
      {
        filtereduchc = disaster_data.data.filter(rain => 
          allowedZones.includes(rain.Zone)
        );
      }
     
    }

    setcctvs(filtereduchc);


    const getCircleSVG = (depth) => {
      let fillColor;
      if (depth > 0 && depth <= 0.3) {
        fillColor = '#99cc00'; // Light Green
    } else if (depth > 0.3 && depth <= 1) {
        fillColor = '#2d4a00'; // Dark Green
    } else if (depth > 1 && depth <= 2) {
        fillColor = '#ffcc00'; // Yellow
    } else if (depth > 2 && depth <= 3) {
        fillColor = '#ff9933'; // Orange
    } else if (depth > 3 && depth <= 6) {
        fillColor = '#cc3300'; // Red
    } else {
        fillColor = ''; // Default case
    }

      return {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: fillColor,
        fillOpacity: 0.8,
        scale: 10 + depth * 2,
        strokeColor: 'black',
        strokeWeight: 1
      };
    };

    const markers = filtereduchc.map((uchc) => {
      const position = {
        lat: parseFloat(uchc.lan),
        lng: parseFloat(uchc.lat),
      };

      const marker = new window.google.maps.Marker({
        position,
        label: {
          fontSize: "8px",
          fontWeight: "bold",
          color: "red",
        },
        title: `${uchc.address} (${uchc.feet} ft)`,
        icon: getCircleSVG(uchc.feet), 
        map: map,
      });

      return marker;
    });

    setuchcMarkers(markers);
  }
}


function disasternew()
{
  if(selectedtype == 'flood_car')
  {
      flood_car()
  }
  else
  {
     disaster()
  }
}


const renderLegend = () => {
  return (
    <div className="map-legend" style={legendStyle}>
      <h4>Depth</h4>
      <div><span style={legendSquare('#99cc00')}></span> 0 - 0.3 feet</div>
      <div><span style={legendSquare('#2d4a00')}></span> 0.3 - 1 feet</div>
      <div><span style={legendSquare('#ffcc00')}></span> 1 - 2 feet</div>
      <div><span style={legendSquare('#ff9933')}></span> 2 - 3 feet</div>
      <div><span style={legendSquare('#cc3300')}></span> 3 - 6 feet</div>
    </div>
  );
};

// Style for the legend
const legendStyle = {
  background: 'white',
  padding: '10px',
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  zIndex: 1000,
  borderRadius: '5px',
  fontSize: '14px',
  boxShadow: '0px 0px 5px rgba(0,0,0,0.3)',
};

// Style for each colored square in the legend
const legendSquare = (color) => ({
  display: 'inline-block',
  width: '15px',
  height: '15px',
  backgroundColor: color,
  marginRight: '8px',
});




// Relief center

function relief() {
  if (map && relief_data) {
    reliefMarkers.forEach((marker) => marker.setMap(null));
    setreliefMarkers([]);

      zoomme();


      let filteredrelief = [];

      if (selectedZone !== '') {
        filteredrelief = relief_data.data.filter(rain => rain.Zone === selectedZone);
      } else {
        let allowedZones = [];
        switch (userData.region) {
          case 1:
            allowedZones = ["1", "2", "3", "4", "5"];
            break;
          case 2:
            allowedZones = ["5", "6", "7", "8", "9", "10"];
            break;
          case 3:
            allowedZones = ["11", "12", "13", "14", "15"];
            break;
          case 0:
            allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            break;
          default:
            allowedZones = [];
        }
        filteredrelief = relief_data.data.filter(rain => allowedZones.includes(rain.Zone));
      }
      setcctvs(filteredrelief);

      const markers = filteredrelief.map((relief) => {
          const position = {
              lat: parseFloat(relief.lan),
              lng: parseFloat(relief.lat),
          };

          const marker = new window.google.maps.Marker({
              position,
              label: {
                  fontSize: "8px",
                  fontWeight: "bold",
                  color: "red",
              },
              title: relief.address,
              icon: {
                  url: 'https://img.icons8.com/?size=100&id=p9ZitbkLIHB9&format=png&color=000000',
                  scaledSize: new window.google.maps.Size(40, 30),
              },
              map: map,
          });

          // marker.addListener('click', () => {
          //   console.log(address); 
          //     setSelectedzoffice(address);
          //     setModalIsOpen(true);
          // });

          return marker;
      });

      setreliefMarkers(markers);
  }
}


// community_data

function community() {
  if (map && community_data) {
    communityMarkers.forEach((marker) => marker.setMap(null));
    setcommunityMarkers([]);
      zoomme();

      let filteredcommunity = [];
      if (selectedZone !== '') {
        filteredcommunity = community_data.data.filter(rain => rain.Zone === selectedZone);
      } else {
        let allowedZones = [];
        switch (userData.region) {
          case 1:
            allowedZones = ["1", "2", "3", "4", "5"];
            break;
          case 2:
            allowedZones = ["5", "6", "7", "8", "9", "10"];
            break;
          case 3:
            allowedZones = ["11", "12", "13", "14", "15"];
            break;
          case 0:
            allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            break;
          default:
            allowedZones = [];
        }
        filteredcommunity = community_data.data.filter(rain => allowedZones.includes(rain.Zone));
      }
      setcctvs(filteredcommunity);


      const markers = filteredcommunity.map((community) => {
          const position = {
              lat: parseFloat(community.lat),
              lng: parseFloat(community.lan),
          };

          const marker = new window.google.maps.Marker({
              position,
              label: {
                  fontSize: "8px",
                  fontWeight: "bold",
                  color: "red",
              },
              title: community.address,
              icon: {
                  url: 'https://img.icons8.com/?size=100&id=uxm9PMC536cy&format=png&color=000000',
                  scaledSize: new window.google.maps.Size(40, 30),
              },
              map: map,
          });

          return marker;
      });

      setcommunityMarkers(markers);
  }
}

// cluser

function cluster() {
  if (map && cluster_data) {
    clusterMarkers.forEach((marker) => marker.setMap(null));
    setclusterMarkers([]);

      zoomme();

      let filteredcluster = [];
      if (selectedZone !== '') {
        filteredcluster = cluster_data.data.filter(rain => rain.Zone === selectedZone);
      } else {
        let allowedZones = [];
        switch (userData.region) {
          case 1:
            allowedZones = ["1", "2", "3", "4", "5"];
            break;
          case 2:
            allowedZones = ["5", "6", "7", "8", "9", "10"];
            break;
          case 3:
            allowedZones = ["11", "12", "13", "14", "15"];
            break;
          case 0:
            allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            break;
          default:
            allowedZones = [];
        }
        filteredcluster = cluster_data.data.filter(rain => allowedZones.includes(rain.Zone));
      }
      setcctvs(filteredcluster);

      const markers = filteredcluster.map((cluster) => {
          const position = {
              lat: parseFloat(cluster.lan),
              lng: parseFloat(cluster.lat),
          };

          const marker = new window.google.maps.Marker({
              position,
              label: {
                  fontSize: "8px",
                  fontWeight: "bold",
                  color: "red",
              },
              title: cluster.address,
              icon: {
                  url: 'https://img.icons8.com/?size=100&id=0EK1_P46A7x6&format=png&color=000000',
                  scaledSize: new window.google.maps.Size(40, 30),
              },
              map: map,
          });

          return marker;
      });

      setclusterMarkers(markers);
  }
}

// ammaunavagam


function ammaunavagam() {
  if (map && ammaunavagam_data) {
    ammaMarkers.forEach((marker) => marker.setMap(null));
    setammaMarkers([]);

      zoomme();

      let filteredamma = [];
      if (selectedZone !== '') {
        filteredamma = ammaunavagam_data.data.filter(rain => rain.Zone === selectedZone);
      } else {
        let allowedZones = [];
        switch (userData.region) {
          case 1:
            allowedZones = ["1", "2", "3", "4", "5"];
            break;
          case 2:
            allowedZones = ["5", "6", "7", "8", "9", "10"];
            break;
          case 3:
            allowedZones = ["11", "12", "13", "14", "15"];
            break;
          case 0:
            allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            break;
          default:
            allowedZones = [];
        }
        filteredamma = ammaunavagam_data.data.filter(rain => allowedZones.includes(rain.Zone));
      }
      setcctvs(filteredamma);

      const markers = filteredamma.map((amma) => {
          const position = {
              lat: parseFloat(amma.lan),
              lng: parseFloat(amma.lat),
          };

          const marker = new window.google.maps.Marker({
              position,
              label: {
                  fontSize: "8px",
                  fontWeight: "bold",
                  color: "red",
              },
              title: amma.address,
              icon: {
                  url: 'https://img.icons8.com/?size=100&id=rKhhjCBChZFC&format=png&color=000000',
                  scaledSize: new window.google.maps.Size(40, 30),
              },
              map: map,
          });

          // marker.addListener('click', () => {
          //   console.log(address); 
          //     setSelectedzoffice(address);
          //     setModalIsOpen(true);
          // });

          return marker;
      });

      setammaMarkers(markers);
  }
}


// shelter

function shelter() {
  if (map && shelter_data) {
    shelterMarkers.forEach((marker) => marker.setMap(null));
    setshelterMarkers([]);

      zoomme();

    let filteredshelter = [];
      if (selectedZone !== '') {
        filteredshelter = shelter_data.data.filter(rain => rain.Zone === selectedZone);
      } else {
        let allowedZones = [];
        switch (userData.region) {
          case 1:
            allowedZones = ["1", "2", "3", "4", "5"];
            break;
          case 2:
            allowedZones = ["5", "6", "7", "8", "9", "10"];
            break;
          case 3:
            allowedZones = ["11", "12", "13", "14", "15"];
            break;
          case 0:
            allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            break;
          default:
            allowedZones = [];
        }
        filteredshelter = shelter_data.data.filter(rain => allowedZones.includes(rain.Zone));
      }
      setcctvs(filteredshelter);


      const markers = filteredshelter.map((shelter) => {
          const position = {
              lat: parseFloat(shelter.lat),
              lng: parseFloat(shelter.lan),
          };

          const marker = new window.google.maps.Marker({
              position,
              label: {
                  fontSize: "8px",
                  fontWeight: "bold",
                  color: "red",
              },
              title: shelter.address,
              icon: {
                  url: 'https://img.icons8.com/?size=100&id=HeIY53rnMIbi&format=png&color=000000',
                  scaledSize: new window.google.maps.Size(40, 30),
              },
              map: map,
          });

          // marker.addListener('click', () => {
          //   console.log(address); 
          //     setSelectedzoffice(address);
          //     setModalIsOpen(true);
          // });

          return marker;
      });

      setshelterMarkers(markers);
  }
}



// hospital

function hospital() {
  if (map && hospital_data) {
    hospitalMarkers.forEach((marker) => marker.setMap(null));
    sethospitalMarkers([]);

      zoomme();

    let filteredhospital = [];
      if (selectedZone !== '') {
        filteredhospital = hospital_data.data.filter(rain => rain.Zone === selectedZone);
      } else {
        let allowedZones = [];
        switch (userData.region) {
          case 1:
            allowedZones = ["1", "2", "3", "4", "5"];
            break;
          case 2:
            allowedZones = ["5", "6", "7", "8", "9", "10"];
            break;
          case 3:
            allowedZones = ["11", "12", "13", "14", "15"];
            break;
          case 0:
            allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            break;
          default:
            allowedZones = [];
        }
        filteredhospital = hospital_data.data.filter(rain => allowedZones.includes(rain.Zone));
      }
      setcctvs(filteredhospital);

      const markers = filteredhospital.map((hospital) => {
          const position = {
              lat: parseFloat(hospital.lat),
              lng: parseFloat(hospital.lan),
          };

          const marker = new window.google.maps.Marker({
              position,
              label: {
                  fontSize: "8px",
                  fontWeight: "bold",
                  color: "red",
              },
              title: hospital.address,
              icon: {
                  url: 'https://img.icons8.com/?size=100&id=7D50S7QGVn91&format=png&color=000000',
                  scaledSize: new window.google.maps.Size(40, 30),
              },
              map: map,
          });

          // marker.addListener('click', () => {
          //   console.log(address); 
          //     setSelectedzoffice(address);
          //     setModalIsOpen(true);
          // });

          return marker;
      });

      sethospitalMarkers(markers);
  }
}

// ndrf

function ndrf() {
  if (map && ndrf_data) {
    ndrfMarkers.forEach((marker) => marker.setMap(null));
    setndrfMarkers([]);

      zoomme();


      let filteredndrf = [];
      if (selectedZone !== '') {
        filteredndrf = ndrf_data.data.filter(rain => rain.Zone === selectedZone);
      } else {
        let allowedZones = [];
        switch (userData.region) {
          case 1:
            allowedZones = ["1", "2", "3", "4", "5"];
            break;
          case 2:
            allowedZones = ["5", "6", "7", "8", "9", "10"];
            break;
          case 3:
            allowedZones = ["11", "12", "13", "14", "15"];
            break;
          case 0:
            allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            break;
          default:
            allowedZones = [];
        }
        filteredndrf = ndrf_data.data.filter(rain => allowedZones.includes(rain.Zone));
      }
      setcctvs(filteredndrf);

      const markers = filteredndrf.map((ndrf) => {
          const position = {
              lat: parseFloat(ndrf.lat),
              lng: parseFloat(ndrf.lan),
          };

          const marker = new window.google.maps.Marker({
              position,
              label: {
                  fontSize: "8px",
                  fontWeight: "bold",
                  color: "red",
              },
              title: ndrf.address,
              icon: {
                  url: 'https://img.icons8.com/?size=100&id=vQ1V1tQKynEK&format=png&color=000000',
                  scaledSize: new window.google.maps.Size(40, 30),
              },
              map: map,
          });

          // marker.addListener('click', () => {
          //   console.log(address); 
          //     setSelectedzoffice(address);
          //     setModalIsOpen(true);
          // });

          return marker;
      });

      setndrfMarkers(markers);
  }
}


// motors

  function e_motor()
  {
    if (map && emotor_data) {
      emotorMarkers.forEach((marker) => marker.setMap(null));
      setemotorMarkers([]);
        zoomme();

      let filteremotor = [];
      if (selectedZone !== '') {
        filteremotor = emotor_data.data.filter(rain => rain.Zone === selectedZone);
      } else {
        let allowedZones = [];
        switch (userData.region) {
          case 1:
            allowedZones = ["1", "2", "3", "4", "5"];
            break;
          case 2:
            allowedZones = ["5", "6", "7", "8", "9", "10"];
            break;
          case 3:
            allowedZones = ["11", "12", "13", "14", "15"];
            break;
          case 0:
            allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            break;
          default:
            allowedZones = [];
        }
        filteremotor = emotor_data.data.filter(rain => allowedZones.includes(rain.Zone));
      }
      setcctvs(filteremotor);

        const markers = filteremotor.map((emotor) => {
            const position = {
                lat: parseFloat(emotor.lat),
                lng: parseFloat(emotor.lan),
            };
  
            const marker = new window.google.maps.Marker({
                position,
                label: {
                    fontSize: "8px",
                    fontWeight: "bold",
                    color: "red",
                },
                title: emotor.address,
                icon: {
                    url: 'https://img.icons8.com/?size=100&id=45PPRxojU608&format=png&color=000000',
                    scaledSize: new window.google.maps.Size(40, 30),
                },
                map: map,
            });
  
            return marker;
        });
  
        setemotorMarkers(markers);
    }
  }

  function m_motor()
  {
    // mmotor_data
  }

// medical

function medical() {
  if (map && medical_data) {
    medicalMarkers.forEach((marker) => marker.setMap(null));
    setmedicalMarkers([]);

      zoomme();

    let filteredmedical = [];
      if (selectedZone !== '') {
        filteredmedical = medical_data.data.filter(rain => rain.Zone === selectedZone);
      } else {
        let allowedZones = [];
        switch (userData.region) {
          case 1:
            allowedZones = ["1", "2", "3", "4", "5"];
            break;
          case 2:
            allowedZones = ["5", "6", "7", "8", "9", "10"];
            break;
          case 3:
            allowedZones = ["11", "12", "13", "14", "15"];
            break;
          case 0:
            allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            break;
          default:
            allowedZones = [];
        }
        filteredmedical = medical_data.data.filter(rain => allowedZones.includes(rain.Zone));
      }
      setcctvs(filteredmedical);

      const markers = filteredmedical.map((medical) => {
          const position = {
              lat: parseFloat(medical.lat),
              lng: parseFloat(medical.lan),
          };

          const marker = new window.google.maps.Marker({
              position,
              label: {
                  fontSize: "8px",
                  fontWeight: "bold",
                  color: "red",
              },
              title: medical.address,
              icon: {
                  url: 'https://img.icons8.com/?size=100&id=F9higOMoZBn9&format=png&color=000000',
                  scaledSize: new window.google.maps.Size(40, 30),
              },
              map: map,
          });

          // marker.addListener('click', () => {
          //   console.log(address); 
          //     setSelectedzoffice(address);
          //     setModalIsOpen(true);
          // });

          return marker;
      });

      setmedicalMarkers(markers);
  }
}


// CCTV

function cctv() {
  if (map && cctv_data) {
    cctvMarkers.forEach((marker) => marker.setMap(null));
    setcctvMarkers([]);
    setcctvs('');

      zoomme();

     let filteredcctv = [];
      if (selectedZone !== '') {
        filteredcctv = cctv_data.data.filter(rain => rain.Zone === selectedZone);
      } else {
        let allowedZones = [];
        switch (userData.region) {
          case 1:
            allowedZones = ["1", "2", "3", "4", "5"];
            break;
          case 2:
            allowedZones = ["5", "6", "7", "8", "9", "10"];
            break;
          case 3:
            allowedZones = ["11", "12", "13", "14", "15"];
            break;
          case 0:
            allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            break;
          default:
            allowedZones = [];
        }
        filteredcctv = cctv_data.data.filter(rain => allowedZones.includes(rain.Zone));
      }
      setcctvs(filteredcctv);
      
      const markers = filteredcctv.map((cctv) => {
          const position = {
              lat: parseFloat(cctv.lat),
              lng: parseFloat(cctv.lan),
          };

          const marker = new window.google.maps.Marker({
              position,
              label: {
                  fontSize: "8px",
                  fontWeight: "bold",
                  color: "red",
              },
              title: cctv.address,
              icon: {
                  url: 'https://img.icons8.com/?size=100&id=AHfv8M26Q3m1&format=png&color=000000',
                  scaledSize: new window.google.maps.Size(40, 30),
              },
              map: map,
          });

          marker.addListener('click', () => {
            openModal(cctv.id);
          });

          return marker;
      });

      setcctvMarkers(markers);
      
  }
}



function floodcameras() {
  if (map && flood_data) {
    floodcamMarkers.forEach((marker) => marker.setMap(null));
    setcctvMarkers([]);
    setcctvs('');
      zoomme();
       let filteredcctv = [];
      if (selectedZone !== '') {
        filteredcctv = flood_data.data.filter(rain => rain.Zone === selectedZone);
      } else {
        let allowedZones = [];
        switch (userData.region) {
          case 1:
            allowedZones = ["1", "2", "3", "4", "5"];
            break;
          case 2:
            allowedZones = ["5", "6", "7", "8", "9", "10"];
            break;
          case 3:
            allowedZones = ["11", "12", "13", "14", "15"];
            break;
          case 0:
            allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            break;
          default:
            allowedZones = [];
        }
        filteredcctv = flood_data.data.filter(rain => allowedZones.includes(rain.Zone));
      }
      setcctvs(filteredcctv);
      
      const markers = filteredcctv.map((cctv) => {
          const position = {
              lat: parseFloat(cctv.lat),
              lng: parseFloat(cctv.lan),
          };

          const marker = new window.google.maps.Marker({
              position,
              label: {
                  fontSize: "8px",
                  fontWeight: "bold",
                  color: "red",
              },
              title: cctv.address,
              icon: {
                  url: 'https://img.icons8.com/?size=100&id=vCW9ReFfBtOV&format=png&color=000000',
                  scaledSize: new window.google.maps.Size(40, 30),
              },
              map: map,
          });

          marker.addListener('click', () => {
            openModal(cctv.id);
          });

          return marker;
      });

      setcctvMarkers(markers);
      
  }
}


async function fetchBoatData() {
  try {
      const response = await fetch(`${base_url}get_boats`);
      const result = await response.json();
      setboat_data(result); // Ensure this updates correctly
  } catch (error) {
      console.error("Error fetching boat data:", error);
  }
}


function boat() {
  fetchBoatData();
  if (map && boat_data) {
    floodcamMarkers.forEach((marker) => marker.setMap(null));
    setcctvMarkers([]);
    setcctvs('');
      zoomme();
       let filteredcctv = [];
      if (selectedZone !== '') {
        filteredcctv = boat_data.filter(rain => rain.Zone === selectedZone);
      } else {
        let allowedZones = [];
        switch (userData.region) {
          case 1:
            allowedZones = ["1", "2", "3", "4", "5"];
            break;
          case 2:
            allowedZones = ["5", "6", "7", "8", "9", "10"];
            break;
          case 3:
            allowedZones = ["11", "12", "13", "14", "15"];
            break;
          case 0:
            allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            break;
          default:
            allowedZones = [];
        }
        filteredcctv = boatt_data.filter(rain => allowedZones.includes(rain.Zone));
      }
      setcctvs(filteredcctv);
      
      const markers = filteredcctv.map((cctv) => {
          const position = {
              lat: parseFloat(cctv.lan),
              lng: parseFloat(cctv.lat),
          };

          const marker = new window.google.maps.Marker({
              position,
              label: {
                  fontSize: "8px",
                  fontWeight: "bold",
                  color: "red",
              },
              title: cctv.address,
              icon: {
                  url: 'https://img.icons8.com/?size=100&id=tsDDCPu95L97&format=png&color=000000',
                  scaledSize: new window.google.maps.Size(40, 30),
              },
              map: map,
          });

          marker.addListener('click', () => {
            openModal(cctv.id);
          });

          return marker;
      });

      setcctvMarkers(markers);
      
  }
}


function cooking_center()
{
  if (map && cooking_data) {
    floodcamMarkers.forEach((marker) => marker.setMap(null));
    setcctvMarkers([]);
    setcctvs('');
      zoomme();
       let filteredcctv = [];
      if (selectedZone !== '') {
        filteredcctv = cooking_data.data.filter(rain => rain.Zone === selectedZone);
      } else {
        let allowedZones = [];
        switch (userData.region) {
          case 1:
            allowedZones = ["1", "2", "3", "4", "5"];
            break;
          case 2:
            allowedZones = ["5", "6", "7", "8", "9", "10"];
            break;
          case 3:
            allowedZones = ["11", "12", "13", "14", "15"];
            break;
          case 0:
            allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            break;
          default:
            allowedZones = [];
        }
        filteredcctv = cooking_data.data.filter(rain => allowedZones.includes(rain.Zone));
      }
      setcctvs(filteredcctv);
      
      const markers = filteredcctv.map((cctv) => {
          const position = {
              lat: parseFloat(cctv.lan),
              lng: parseFloat(cctv.lat),
          };

          const marker = new window.google.maps.Marker({
              position,
              label: {
                  fontSize: "8px",
                  fontWeight: "bold",
                  color: "red",
              },
              title: cctv.address,
              icon: {
                  url: 'https://img.icons8.com/?size=100&id=G4tBuoihEhYG&format=png&color=000000',
                  scaledSize: new window.google.maps.Size(40, 30),
              },
              map: map,
          });

          marker.addListener('click', () => {
            openModal(cctv.id);
          });

          return marker;
      });

      setcctvMarkers(markers);
      
  }
}





function water_bodies()
{
  setcctvs([]);
}




const openModal = (id) => {
  player(id);
};

function player(id) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch(`${base_url}live_camera?id=`+ id, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      // Remove any extra quotation marks from the URL
      const videoUrl = result.replace(/\\/g, "").replace(/"/g, "");
      // Open video in new window without header and footer
      setvideolink(videoUrl);
      setSelectedCctvId(id);
      setVModalIsOpen(true);
      window.open(videoUrl, "_blank", "toolbar=no,menubar=no,scrollbars=no,resizable=no,width=800,height=600");
    })
    .catch((error) => console.error(error));
}


const closeModal = () => {
  zoomme();
  setVModalIsOpen(false);
  setrainModalIsOpen(false);
  setSelectedCctvId(null);
};


// rain

function rain() {
  if (map && rain_data) {
    // Clear previous markers and data
    rainMarkers.forEach((marker) => marker.setMap(null));
    setrainMarkers([]);
    setlistrain_data([]);
    zoomme();

    let filteredRain = [];

    if (selectedZone !== '') {
      filteredRain = rain_data.data.filter(rain => rain.Zone === selectedZone);
    } else {
      let allowedZones = [];
      switch (userData.region) {
        case 1:
          allowedZones = ["1", "2", "3", "4", "5"];
          break;
        case 2:
          allowedZones = ["5", "6", "7", "8", "9", "10"];
          break;
        case 3:
          allowedZones = ["11", "12", "13", "14", "15"];
          break;
        case 0:
          allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
          break;
        default:
          allowedZones = [];
      }
      filteredRain = rain_data.data.filter(rain => allowedZones.includes(rain.Zone));
    }
    setcctvs(filteredRain);

    const iconUrl = 'https://img.icons8.com/?size=100&id=klFChfQt0wW6&format=png&color=000000';
    
    const markers = filteredRain.map((rain) => {
      const position = {
        lat: parseFloat(rain.lat),
        lng: parseFloat(rain.lan),
      };

      const marker = new window.google.maps.Marker({
        position,
        label: {
          fontSize: "8px",
          fontWeight: "bold",
          color: "red",
        },
        title: rain.address,
        icon: {
          url: iconUrl,
          scaledSize: new window.google.maps.Size(40, 30),
        },
        map: map,
      });

      return marker;
    });

    setrainMarkers(markers);
  }
}



// function live_rain_data(id) {
//   const requestOptions = {
//     method: "GET",
//     redirect: "follow",
//   };

//   return fetch(`${base_url}rain_data?dest_id=` + id, requestOptions)
//     .then((response) => response.json()) // Ensure the response is parsed as JSON
//     .then((result) => {
//       if (result && result.data) {
//         return result.data;
//       } else {
//         return 0;
//       }
//     })
//     .catch((error) => {
//      return 0;
//     });
// }



// // rain

// async function rain() {
//   if (map && rain_data) {
//     // Clear previous markers
//     rainMarkers.forEach((marker) => marker.setMap(null));
//     setrainMarkers([]);
//     setlistrain_data([]);
//     zoomme();

//     let filteredRain = [];

//     // Filter by selected zone or user's region
//     if (selectedZone !== '') {
//       filteredRain = rain_data.data.filter((rain) => rain.Zone === selectedZone);
//     } else {
//       let allowedZones = [];
//       switch (userData.region) {
//         case 1:
//           allowedZones = ["1", "2", "3", "4", "5"];
//           break;
//         case 2:
//           allowedZones = ["5", "6", "7", "8", "9", "10"];
//           break;
//         case 3:
//           allowedZones = ["11", "12", "13", "14", "15"];
//           break;
//         case 0:
//           allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
//           break;
//         default:
//           allowedZones = [];
//       }
//       filteredRain = rain_data.data.filter((rain) => allowedZones.includes(rain.Zone));
//     }
//     setcctvs(filteredRain);

//     const markers = await Promise.all(
//       filteredRain.map(async (rain) => {
//         // if (!rain || !rain.lat || !rain.lan) {
//         //   console.error('Invalid rain data:', rain);
//         //   return null; // Skip invalid data
//         // }
//         const rainIntensity = await live_rain_data(rain.d_id);
//         let iconUrl = '';

//         switch(true) {
//           case rainIntensity === 0:
//             iconUrl = 'https://img.icons8.com/?size=100&id=5wSfjHD2HPMD&format=png&color=000000';
//             break;
//           case rainIntensity > 0 && rainIntensity < 1:
//             iconUrl = 'https://img.icons8.com/?size=100&id=19541&format=png&color=000000';
//             break;
//           case rainIntensity >= 1 && rainIntensity < 2:
//             iconUrl = 'https://img.icons8.com/?size=100&id=ku1VTjg93fMi&format=png&color=000000';
//             break;
//           case rainIntensity >= 2 && rainIntensity < 10:
//             iconUrl = 'https://img.icons8.com/?size=100&id=sS05BACA8dfZ&format=png&color=000000';
//             break;
//           case rainIntensity >= 10 && rainIntensity < 100:
//             iconUrl = 'https://img.icons8.com/?size=100&id=klFChfQt0wW6&format=png&color=000000';
//             break;
//           default:
//             iconUrl = 'https://img.icons8.com/?size=100&id=mjZjr6anl8TU&format=png&color=000000'; // Use a default icon if no cases match
//         }
        
//         const position = {
//           lat: parseFloat(rain.lat),
//           lng: parseFloat(rain.lan),
//         };

//         const marker = new window.google.maps.Marker({
//           position,
//           label: {
//             fontSize: "8px",
//             fontWeight: "bold",
//             color: "red",
//           },
//           title: rain.address || "No address provided",
//           icon: {
//             url: iconUrl,
//             scaledSize: new window.google.maps.Size(40, 30),
//           },
//           map: map,
//         });

//         return marker;
//       })
//     );

//     // Filter out any null markers and set state
//     setrainMarkers(markers.filter(marker => marker !== null));
//   }
// }




 function sent_list_rain(d_id)
 {
  setliverain_data([]);
    fetch(`${base_url}rain_hourly?dest_id=${d_id}`)
    .then((response) => response.json()) 
    .then((result) => {
      if (Array.isArray(result) && result.length > 0) {
        setliverain_data(result); 
        setrainModalIsOpen(true);
      } else {
        console.error("Unexpected response structure:", result);
      }
    })
    .catch((error) => console.error("Error:", error));
}


                




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


useEffect(() => {
  if (Array.isArray(liverain_data) && liverain_data.length > 0) {
    zoomme(); 
  }
}, [liverain_data]);


useEffect(() => {
  if (Array.isArray(liverain_data) && liverain_data.length > 0) {
    const total = liverain_data.reduce((acc, e) => acc + e.rain, 0).toFixed(2);
    settotalrain(total); 
  }
}, [liverain_data]);



function firstres() {
  settabledata([]);
  if(firstres_data)
    {
      let filtertabledata = [];
      let firstdata = [];

      if (selectedtype === 'firstres' && firstres_data) {
      firstdata = firstres_data; 

      if (selectedZone !== '') {
        filtertabledata = firstres_data.data.filter(data => data.Zone === selectedZone);
          } else {

              let allowedZones = [];
              switch (userData.region) {
                case 1:
                  allowedZones = ["1", "2", "3", "4", "5"];
                  break;
                case 2:
                  allowedZones = ["5", "6", "7", "8", "9", "10"];
                  break;
                case 3:
                  allowedZones = ["11", "12", "13", "14", "15"];
                  break;
                case 0:
                  allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
                  break;
                default:
                  allowedZones = [];
              }

               filtertabledata = firstres_data.data.filter(rain => allowedZones.includes(rain.Zone));
          }
          settabledata(filtertabledata);
          
     }
     else if(selectedtype ==='appmit' && appmit_data)
     {
       firstdata = appmit_data; 

       if (selectedZone !== '') {
        filtertabledata = appmit_data.data.filter(data => data.Zone === selectedZone);
          } else {
              let allowedZones = [];
              switch (userData.region) {
                case 1:
                  allowedZones = ["1", "2", "3", "4", "5"];
                  break;
                case 2:
                  allowedZones = ["5", "6", "7", "8", "9", "10"];
                  break;
                case 3:
                  allowedZones = ["11", "12", "13", "14", "15"];
                  break;
                case 0:
                  allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
                  break;
                default:
                  allowedZones = [];
              }

               filtertabledata = appmit_data.data.filter(rain => allowedZones.includes(rain.Zone));
          }
          settabledata(filtertabledata); 
     }
     else if(selectedtype ==='rwa' && assosiation)
     {
          firstdata = assosiation; 

          if (selectedZone !== '') {
          filtertabledata = assosiation.data.filter(data => data.Zone === selectedZone);
            } else {
                let allowedZones = [];
              switch (userData.region) {
                case 1:
                  allowedZones = ["1", "2", "3", "4", "5"];
                  break;
                case 2:
                  allowedZones = ["5", "6", "7", "8", "9", "10"];
                  break;
                case 3:
                  allowedZones = ["11", "12", "13", "14", "15"];
                  break;
                case 0:
                  allowedZones = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
                  break;
                default:
                  allowedZones = [];
              }

               filtertabledata = assosiation.data.filter(rain => allowedZones.includes(rain.Zone));
            }
            settabledata(filtertabledata); 
     }
}
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


const get_color_code = (ft) => 
  {
      if (ft > 0 && ft <= 0.3) {
          return '#99cc00'; // Light Green
      } else if (ft > 0.3 && ft <= 1) {
          return '#2d4a00'; // Dark Green
      } else if (ft > 1 && ft <= 2) {
          return '#ffcc00'; // Yellow
      } else if (ft > 2 && ft <= 3) {
          return '#ff9933'; // Orange
      } else if (ft > 3 && ft <= 6) {
          return '#cc3300'; // Red
      } else {
          return ''; // Default case
      }
  };


const open_onepage = () => {
  setModalIsOpen(true);
}



  return (
    <>
      <section className="pcoded-main-container bg-dark">
        {/* <div className="pcoded-content"> */}
          <div className="row">
            <div className="col-lg-12 col-xl-12">
              <div className="card bg-dark">

              <div className="card-body">

                {(userData.region >= 0 && userData.zone === 0) && (<div className="row bg-dark border border-light rounded" style={{marginTop:'-20px'}}>
                   <div className={`col-md-2 col-sm-12 p-2 text-light pointer menu-top mr-1 ${Selectedactiveregion === 'onepage' ? 'sele' : ''}`}>
                  </div>

                   {(userData.region === 1 || userData.region === 0) && (
                  <div className={`col-md-1 col-sm-12 p-2 text-light pointer menu-top mr-1 ${Selectedactiveregion === 'north' ? 'sele' : ''}`} onClick={() => selectregion('north')}>
                    North
                  </div>
                   )}
                    {(userData.region === 2 || userData.region === 0) && (
                  <div className={`col-md-1 col-sm-12 p-2 text-light pointer menu-top mr-1 ${Selectedactiveregion === 'central' ? 'sele' : ''}`} onClick={() => selectregion('central')}>
                    Central
                  </div>
                    )}
                    {(userData.region === 3 || userData.region === 0) && (
                  <div className={`col-md-1 col-sm-12 p-2 text-light pointer menu-top mr-1 ${Selectedactiveregion === 'south' ? 'sele' : ''}`} onClick={() => selectregion('south')}>
                    South
                  </div>
                    )}
                  <div className={`col-md-1 col-sm-12 p-2 text-light pointer menu-top mr-1 ${Selectedactiveregion === '' ? 'sele' : ''}`} onClick={() => { setSelectedZone(''); zoommeout();}}>
                    Reset
                  </div>
                    
                    <div className="col-md-5 col-sm-12">
                       <div className="row">
                           {zoneslist.map((z) => (
                            <div className={`col-md-2 col-sm-12 p-2 text-light pointer menu-top mr-1 ${selectedZone === z ? 'sele' : ''}`}  onClick={() => setSelectedZone(z)}>Zone {z}</div>
                           ))}
                       </div>
                    </div>
                </div>
                )};

                
                  <div className="row" style={{marginTop:'-20px'}}>
                    <div className="col-md-6 col-sm-12">
                      <div className="row">
                        <div className="col-md-4 col-sm-12 border border-light rounded" style={{background:'#ff9900', height:'92vh',overflowY: 'auto'}}>
                          <div className="mt-3">

                          <p className={`text-light pointer  menu-side ${selectedtype === 'rain' ? 'sele' : ''}`} onClick={() => displayicon('rain')}><img src="https://img.icons8.com/?size=100&id=klFChfQt0wW6&format=png&color=000000" alt="Rain Icon" style={{width: '2em', height: '2em' }}/>Rain</p>
                          <p className={`text-light pointer  menu-side ${selectedtype === 'cctv' ? 'sele' : ''}`} onClick={() => displayicon('cctv')}><img src="https://img.icons8.com/?size=100&id=XRVL8AuYSFtW&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/>Subway Camera</p>

                          <p className={`text-light pointer  menu-side ${selectedtype === 'floodcamera' ? 'sele' : ''}`} onClick={() => displayicon('floodcamera')}><img src="https://img.icons8.com/?size=100&id=vCW9ReFfBtOV&format=png&color=000000" alt="floodcamera" style={{width: '2em', height: '2em' }}/>Flood Camera</p>

                          <p className={`text-light pointer  menu-side ${selectedtype === 'zonel_office' ? 'sele' : ''}`} onClick={() => displayicon('zonel_office')}><img src="https://img.icons8.com/?size=100&id=2kJjC1CUYqsv&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> Zonal Offices</p>

                          {/* <p className={`text-light pointer menu-side ${selectedtype === 'm_motor' ? 'sele' : ''}`} onClick={() => displayicon('m_motor')}><img src="https://img.icons8.com/?size=100&id=Htn3aKAqQM4L&format=png&color=000000" alt="Relief Icon" style={{width: '2em', height: '2em' }}/> Mechanical Motor</p> */}

                          <p className={`text-light pointer menu-side ${selectedtype === 'e_motor' ? 'sele' : ''}`} onClick={() => displayicon('e_motor')}><img src="https://img.icons8.com/?size=100&id=45PPRxojU608&format=png&color=000000" alt="Relief Icon" style={{width: '2em', height: '2em' }}/> Motor</p>

                          <p className={`text-light pointer menu-side ${selectedtype === 'relief' ? 'sele' : ''}`} onClick={() => displayicon('relief')}><img src="https://img.icons8.com/?size=100&id=p9ZitbkLIHB9&format=png&color=000000" alt="Relief Icon" style={{width: '2em', height: '2em' }}/> Relief Centre</p>

                          <p className={`text-light pointer menu-side ${selectedtype === 'community' ? 'sele' : ''}`} onClick={() => displayicon('community')}><img src="https://img.icons8.com/?size=100&id=uxm9PMC536cy&format=png&color=000000" alt="Relief Icon" style={{width: '2em', height: '2em' }}/> Community Centre</p>

                          <p className={`text-light pointer menu-side ${selectedtype === 'shelter' ? 'sele' : ''}`} onClick={() => displayicon('shelter')}><img src="https://img.icons8.com/?size=100&id=HeIY53rnMIbi&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> Shelter/night shelter</p>

                          <p className={`text-light pointer menu-side ${selectedtype === 'school' ? 'sele' : ''}`} onClick={() => displayicon('school')}><img src="https://img.icons8.com/?size=100&id=40734&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> School List</p>

                          <p className={`text-light pointer  menu-side ${selectedtype === 'medical' ? 'sele' : ''}`} onClick={() => displayicon('medical')}><img src="https://img.icons8.com/?size=100&id=F9higOMoZBn9&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> Medical College</p>

                          <p className={`text-light pointer  menu-side ${selectedtype === 'hospital' ? 'sele' : ''}`} onClick={() => displayicon('hospital')}><img src="https://img.icons8.com/?size=100&id=7D50S7QGVn91&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> Goverment Hospitals</p>

                          <p className={`text-light pointer menu-side ${selectedtype === 'uphc' ? 'sele' : ''}`} onClick={() => displayicon('uphc')}><img src="https://img.icons8.com/?size=100&id=FhVEavxst_Wo&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> UPHC </p>

                          <p className={`text-light pointer menu-side ${selectedtype === 'uchc' ? 'sele' : ''}`} onClick={() => displayicon('uchc')}><img src="https://img.icons8.com/?size=100&id=l_AX_kXOr_Ta&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> UCHC</p>

                          <p class={`text-light pointer menu-side ${selectedtype === 'ammaunavagam' ? 'sele' : ''}`} onClick={() => displayicon('ammaunavagam')}><img src="https://img.icons8.com/?size=100&id=rKhhjCBChZFC&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> Amma Unavagam</p>

                          <p className={`text-light pointer  menu-side ${selectedtype === 'Reports' ? 'sele' : ''}`} onClick={() => displayicon('Reports')}><img src="https://img.icons8.com/?size=100&id=G4tBuoihEhYG&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/>Cooking center</p>


                          <p class={`text-light pointer menu-side ${selectedtype === 'cluster' ? 'sele' : ''}`} onClick={() => displayicon('cluster')}><img src="https://img.icons8.com/?size=100&id=0EK1_P46A7x6&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> Cluster kitchen</p>

                          <p className={`text-light pointer menu-side ${selectedtype === 'firstres' ? 'sele' : ''}`} onClick={ () => displayicon('firstres') }><img src="https://img.icons8.com/?size=100&id=RsUHUPu4M660&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> First Responder</p>

                          <p className={`text-light pointer menu-side ${selectedtype === 'appmit' ? 'sele' : ''}`} onClick={() => displayicon('appmit')}><img src="https://aapdamitra.ndma.gov.in/wp-content/uploads/2022/06/ndma.png" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> AAPDA Mitra</p>

                          <p className={`text-light pointer  menu-side ${selectedtype === 'boat' ? 'sele' : ''}`} onClick={() => displayicon('boat')}><img src=" https://img.icons8.com/?size=100&id=09mzTarWhdwO&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> Boat Deployment</p>

                          <p className={`text-light pointer menu-side ${selectedtype === 'rwa' ? 'sele' : ''}`} onClick={() => displayicon('rwa')}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQCBChHu8XLV8_Yw97XGWNbfOz8NkjiYu_Ag&s" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> RESIDENTIAL WELFARE</p>
                          
                          <p class={`text-light pointer menu-side ${selectedtype === 'ndrf' ? 'sele' : ''}`} onClick={() => displayicon('ndrf')}><img src="https://img.icons8.com/?size=100&id=vQ1V1tQKynEK&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/>NDRF</p>

                          <p className={`text-light pointer  menu-side ${selectedtype === 'flood_car' ? 'sele' : ''}`} onClick={() => displayicon('flood_car')}><img src="https://img.icons8.com/?size=100&id=12226&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> Vulnerable Street - Warning</p>

                          <p className={`text-light pointer  menu-side ${selectedtype === 'disaster' ? 'sele' : ''}`} onClick={() => displayicon('disaster')}><img src="https://img.icons8.com/?size=100&id=RaftkQN5SGnm&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/>Severely Affected Location 2024</p>

                          <p className={`text-light pointer  menu-side ${selectedtype === 'water_bodies' ? 'sele' : ''}`} onClick={() => displayicon('water_bodies')}><img src=" https://img.icons8.com/?size=100&id=F55fxQvopOXm&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> Water Bodies</p>

                          </div>
                        </div>

<div className="col-md-8 col-sm-12 bg-primary border border-light rounded" style={{height:'92vh', overflowY: 'auto', width:'100%'}}>

{((selectedtype === 'disaster') || (selectedtype === 'flood_car')) &&(
<>

<div className="row">
  <div onClick={() => {setFeet(0.3); disasternew()}} className={`${feet === 0.3 ? 'sele' : ''} col-md-3 col-sm-12 btn menu-top text-light  border border-light rounded`}>0 - 0.3 Ft</div>
  <div onClick={() => {setFeet(1); disasternew()}} className={`${feet === 1 ? 'sele' : ''} col-md-3 col-sm-12 btn menu-top text-light  border border-light rounded`}>0.3 - 1 Ft</div>
  <div onClick={() => {setFeet(2); disasternew()}} className={`${feet === 2 ? 'sele' : ''} col-md-3 col-sm-12 btn menu-top text-light  border border-light rounded`}>1 - 2 Ft</div>
  <div onClick={() => {setFeet(3); disasternew()}} className={`${feet === 3 ? 'sele' : ''} col-md-3 col-sm-12 btn menu-top text-light  border border-light rounded`}>2 - 3 Ft</div>
  <div onClick={() => {setFeet(6); disasternew()}} className={`${feet === 6 ? 'sele' : ''} col-md-6 col-sm-12 btn menu-top text-light border border-light rounded`}>3 - 6 Ft</div>
  <div onClick={() => {setFeet(7); disasternew()}} className={`${feet === 7 ? 'sele' : ''} col-md-6 col-sm-12 btn menu-top text-light border border-light rounded`}>All</div>
</div>

</>
)}

  {/* <div style={{height:'80vh'}}> */}




{selectedtype !== 'rain' ? (
   <>

{selectedtype == 'zonel_office' && (
  <>
   <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total {cctvs.length}</div>
   {cctvs.map((e, index) => {
  return (
    <div className="card mt-2" key={e.id}>
      <div className="card-header" style={{ backgroundColor: '#203864' }}>
        <h4 className='text-light'>Zone-{e.Zone}</h4>
        <h5 className="text-light"> {e.address}</h5>

        <button className='ml-1 btn btn-sm btn-danger'  onClick={() => zoommez(e.lat, e.lan)}><i className='fa fa-map-marked'></i></button>
        <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lat, e.lan)}><i className='fa fa-route'></i></button>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-4 border border-1">Zonal Officer:</div>
          <div className="col-4 border border-1">{e.off1}</div>
          <div className="col-4 border border-1"> <a href={`tel:+91-${e.cont}`}>{e.cont} <i className='fa fa-phone'></i></a></div>

          <div className="col-4 border border-1">EE-1</div>
          <div className="col-4 border border-1">{e.ee_name}</div>
          <div className="col-4 border border-1"><a href={`tel:+91-${e.ee_num}`}>{e.ee_num} <i className='fa fa-phone'></i></a></div>

          <div className="col-4 border border-1">EE-2</div>
          <div className="col-4 border border-1">{e.ee_name1}</div>
          <div className="col-4 border border-1"><a href={`tel:+91-${e.ee_number}`}>{e.ee_number} <i className='fa fa-phone'></i></a></div>

          <div className="col-4 border border-1">Nodal Officer</div>
          <div className="col-4 border border-1">{e.nodal}</div>
          <div className="col-4 border border-1"><a href={`tel:+91-${e.acont}`}>{e.acont} <i className='fa fa-phone'></i></a></div>

          <div className="col-12 mt-3 text-center">
            <img src={`./zone_images/${e.Zone}.jpeg`} alt={`Zone ${e.Zone}`} style={{hight:"40vh", width:"50vh"}}/>
          </div>
        </div>
      </div>
    </div>
  );
})
}
  </>
)}


{selectedtype == 'cctv' && (
  <>
  <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total CCTV :  {cctvs.length}</div>
   {cctvs.map((e, index) => {
  return (
    <div className="card mt-2" key={e.id}>
      <div className="ml-2">Zone - {e.Zone}
      
                <span className="float-lg-right pointer mr-3 mt-1 mb-1">
                   <button className='ml-1 btn btn-sm btn-danger'  onClick={() => zoommez(e.lat, e.lan)}><i className='fa fa-map-marked'></i></button>
                     <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lat, e.lan)}><i className='fa fa-route'></i></button>

                     <button className='ml-1 btn btn-sm btn-primary' onClick={() =>openModal(e.id)}> <i className='fa fa-camera'></i></button>
                 </span>
      </div>
      <div className="card-header" style={{ backgroundColor: '#203864' }}>
        <h5 className='text-light'>{e.address}</h5>
      </div>
    </div>
  );
})
}
  </>
)}


{selectedtype == 'floodcamera' && (
  <>
  <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total CCTV :  {cctvs.length}</div>
   {cctvs.map((e, index) => {
  return (
    <div className="card mt-2" key={e.id}>
      <div className="ml-2">Zone - {e.Zone} ({e.type}) 
      <span className="float-lg-right pointer mr-3 mt-1 mb-1">
                   <button className='ml-1 btn btn-sm btn-danger'  onClick={() => zoommez(e.lat, e.lan)}><i className='fa fa-map-marked'></i></button>
                     <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lat, e.lan)}><i className='fa fa-route'></i></button>

                     <button className='ml-1 btn btn-sm btn-primary' onClick={() =>openModal(e.id)}> <i className='fa fa-camera'></i></button>
      </span>
      </div>
      <div className="card-header" style={{ backgroundColor: '#203864' }}>
        <h5 className='text-light'>{e.address}</h5>
      </div>
    </div>
  );
})
}
  </>
)}

{selectedtype === 'water_bodies' &&(
  <>
        <div className="card mt-2">
            <div className="card-header" style={{ backgroundColor: '#203864' }}>
              <h4 className='text-light'>Water Bodies</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                 <img src={contur} alt="" style={{width:'55vh'}} />
                </div>
              </div>
            </div>
          </div>
  </>
)}

{(selectedtype === 'community' || selectedtype === 'uphc') &&(
  <>
        <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total :  {cctvs.length}</div>
          {cctvs.map((e, index) => {
          return (
            <div className="card mt-2">
             <div className="ml-2">
                  Zone - {e.Zone} (Ward-{e.ward}) 
                  <span className="float-lg-right pointer mr-3 mt-1">
                    <a href={`tel:+91-${e.mobile}`}>
                      {e.mobile} <i className='fa fa-phone'></i>
                    </a>

                    <button className='ml-1 btn btn-sm btn-danger'  onClick={() => zoommez(e.lat, e.lan)}><i className='fa fa-map-marked'></i></button>
                     <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lat, e.lan)}><i className='fa fa-route'></i></button>
              
                  </span>
                </div>
              <div className="card-header" style={{ backgroundColor: '#203864' }}>
                <h5 className='text-light'>{e.desi} : {e.name}</h5>
                
                <p className='text-light'>{e.address}</p>
              </div>
            </div>
          );
        })
        }
  </>
)}

{(selectedtype === 'relief') &&(
  <>
        <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total :  {cctvs.length}</div>
          {cctvs.map((e, index) => {
          return (
            <div className="card mt-2">
             <div className="ml-2">
                  Zone - {e.Zone} (Ward-{e.ward}) 
                  <span className="float-lg-right pointer mr-3 mt-1">
                    <a href={`tel:+91-${e.Incharge_1}`}>
                      {e.Incharge_1} <i className='fa fa-phone'></i>
                    </a>

                     <button className='ml-1 btn btn-sm btn-danger'  onClick={() => zoommez(e.lan, e.lat)}><i className='fa fa-map-marked'></i></button>
                     <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lan, e.lat)}><i className='fa fa-route'></i></button>
              
                  </span>
                </div>
              <div className="card-header" style={{ backgroundColor: '#203864' }}>
                 <h5 className='text-light'>Capacity : {e.Capacity}</h5>
                    <br/>
                <h5 className='text-light'>Incharge : {e.Incharge_N}</h5>
                     <br/>
                <h5 className='text-light'>{e.SRO_Name} : 
                <a href={`tel:+91-${e.SRO_No}`}>
                      {e.SRO_No} <i className='fa fa-phone'></i>
                    </a>
                    </h5>
                <p className='text-light'>{e.address}</p>
              </div>
            </div>
          );
        })
        }
  </>
)}


{/*Reports  */}


{(selectedtype === 'Reports') &&(
 <>
 <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total :  {cctvs.length}</div>
          {cctvs.map((e, index) => {
          return (
            <div className="card mt-2">
             <div className="ml-2">
                  Zone - {e.Zone} (Ward-{e.ward}) 
                  <span className="float-lg-right pointer mr-3 mt-1">
                    <a href={`tel:+91-${e.Incharge_1}`}>
                      {e.Incharge_1} <i className='fa fa-phone'></i>
                    </a>

                    <button className='ml-1 btn btn-sm btn-danger'  onClick={() => zoommez(e.lan, e.lat)}><i className='fa fa-map-marked'></i></button>
                     <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lan, e.lat)}><i className='fa fa-route'></i></button>
              
                  </span>
                </div>
              <div className="card-header" style={{ backgroundColor: '#203864' }}>
                <h5 className='text-light'>{e.Incharge_N}</h5>
                <br/>
                <p className='text-light'>{e.SRO_Name}  <a href={`tel:+91-${e.SRO_No}`}>
                      {e.SRO_No} <i className='fa fa-phone'></i>
                    </a></p>
                
                <p className='text-light'>{e.address}</p>
              </div>
            </div>
          );
        })
        }
  </>
)}


{(selectedtype === 'ammaunavagam') &&(
  <>
        <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total :  {cctvs.length}</div>
          {cctvs.map((e, index) => {
          return (
            <div className="card mt-2">
             <div className="ml-2">
                  Zone - {e.Zone} (Ward-{e.ward}) 
                  <span className="float-lg-right pointer mr-3 mt-1">
                    <a href={`tel:+91-${e.mobile}`}>
                      {e.mobile} <i className='fa fa-phone'></i>
                    </a>

                    <button className='ml-1 btn btn-sm btn-danger'  onClick={() => zoommez(e.lan, e.lat)}><i className='fa fa-map-marked'></i></button>
                     <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lan, e.lat)}><i className='fa fa-route'></i></button>
              
                  </span>
                </div>
              <div className="card-header" style={{ backgroundColor: '#203864' }}>
                <h5 className='text-light'>{e.desi} : {e.name}</h5>
                
                <p className='text-light'>{e.address}</p>
              </div>
            </div>
          );
        })
        }
  </>
)}


{(selectedtype === 'boat') &&(
  <>
        <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total :  {cctvs.length}</div>
          {cctvs.map((e, index) => {
          return (
            <div className="card mt-2">
             <div className="ml-2">
                  Zone - {e.Zone}
                  <span className="float-lg-right pointer mr-3 mt-1">
                    <a href={`tel:+91-${e.mobile}`}>
                      {e.mobile} <i className='fa fa-phone'></i>
                    </a>

                    <button className='ml-1 btn btn-sm btn-danger'  onClick={() => zoommez(e.lan, e.lat)}><i className='fa fa-map-marked'></i></button>
                     <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lan, e.lat)}><i className='fa fa-route'></i></button>
              
                  </span>
                </div>
              <div className="card-header" style={{ backgroundColor: '#203864' }}>
                <h5 className='text-light'>Name : {e.name}</h5>
                
                <p className='text-light'>Address: {e.address}</p>
              </div>
            </div>
          );
        })
        }
  </>
)}



{(selectedtype==="cluster") &&(
  <>
        <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total :  {cctvs.length}

          
        <div className="float-right mr-3">
        <Link to="/Food_list">
                <h5 className='text-light'>History</h5>
        </Link>
        </div>
        </div>
          {cctvs.map((e, index) => {
          return (
            <div className="card mt-2">
             <div className="ml-2">
                  Zone - {e.Zone}
                  <span className="float-lg-right pointer mr-3 mt-1">
                    {/* <a href={`tel:+91-${e.mobile}`}>
                      {e.mobile} <i className='fa fa-phone'></i>
                    </a> */}

                    <button className='ml-1 btn btn-sm btn-danger'  onClick={() => zoommez(e.lan, e.lat)}><i className='fa fa-map-marked'></i></button>
                     <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lan, e.lat)}><i className='fa fa-route'></i></button>
              
                  </span>
                </div>
              <div className="card-header" style={{ backgroundColor: '#203864' }}>
                <h5 className='text-light'>Building : {e.CORP__SCHO}</h5>
                <p className='text-light'>{e.address}</p>
                <h5 className='text-light'>No of school attached: {e.No_of_Scho}</h5>
                <br />
                <h5 className='text-light'>No of beneficiaries : {e.No_of_Bene}</h5>
                <br />
                <h5 className='text-light'>Maximum Distance covered : {e.Maximum_di}</h5>
               
              </div>
            </div>
          );
        })
        }
  </>
)}



{(selectedtype === 'ndrf' || selectedtype === 'hospital' || selectedtype === 'medical') &&(
  <>
        <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total :  {cctvs.length}</div>
          {cctvs.map((e, index) => {
          return (
            <div className="card mt-2">
             <div className="ml-2">
                  Zone - {e.Zone} 
                  {/* (Ward-{e.ward})  */}
                  <span className="float-lg-right pointer mr-3 mt-1">
                    <a href={`tel:+91-${e.mobile}`}>
                      {/* {e.mobile} <i className='fa fa-phone'></i> */}
                    </a>
                    <button className='ml-1 btn btn-sm btn-danger'  onClick={() => zoommez(e.lat, e.lan)}><i className='fa fa-map-marked'></i></button>
                    <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lat, e.lan)}><i className='fa fa-route'></i></button>
              
                  </span>
                </div>
              <div className="card-header" style={{ backgroundColor: '#203864' }}>
                {/* <h5 className='text-light'>{e.desi} : {e.name}</h5> */}
                
                <p className='text-light'>{e.address}</p>
              </div>
            </div>
          );
        })
        }
  </>
)}


{(selectedtype === 'school') &&(
  <>
        <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total :  {cctvs.length}</div>
          {cctvs.map((e, index) => {
          return (
            <div className="card mt-2">
             <div className="ml-2">
                  Zone - {e.Zone} (Ward-{e.Ward}) 
                  <span className="float-lg-right pointer mr-3 mt-1">
                    <a href={`tel:+91-${e.HM_PHONE_N}`}>
                      {e.HM_PHONE_N} <i className='fa fa-phone'></i>
                    </a>
                    <button className='ml-1 btn btn-sm btn-danger'  onClick={() => zoommez(e.lat, e.lan)}><i className='fa fa-map-marked'></i></button>
                    <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lat, e.lan)}><i className='fa fa-route'></i></button>
              
                  </span>
                </div>
              <div className="card-header" style={{ backgroundColor: '#203864' }}>
                <h5 className='text-light'>H.M NAME: {e.HM_NAME}</h5>
                <br />
                <h5 className='text-light'>AEO: {e.AEO}</h5>
                <br />
                <h5 className='text-light'>Udise Code: {e.Udise_Code}</h5>
                
                <p className='text-light'>{e.address}</p>
              </div>
            </div>
          );
        })
        }
  </>
)}


{(selectedtype === 'uchc') &&(
  <>
        <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total :  {cctvs.length}</div>
          {cctvs.map((e, index) => {
          return (
            <div className="card mt-2">
             <div className="ml-2">
                  Zone - {e.Zone} (Ward-{e.ward}) 
                  <span className="float-lg-right pointer mr-3 mt-1">
                    <a href={`tel:+91-${e.CONT_NO}`}>
                      {e.CONT_NO} <i className='fa fa-phone'></i>
                    </a>

                    <button className='ml-1 btn btn-sm btn-success'  onClick={() => zoommez(e.lat, e.lan)}><i className='fa fa-map-marked'></i></button>
                    <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lat, e.lan)}><i className='fa fa-route'></i></button>
                  </span>
                </div>
              <div className="card-header" style={{ backgroundColor: '#203864' }}>
                <h5 className='text-light'>{e.Designatio} : {e.NAME}</h5>
                
                <p className='text-light'>{e.Raddress}</p>

              </div>
            </div>
          );
        })
        }
  </>
)}



{(selectedtype === 'flood_car') &&(
  <>
        <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total :  {cctvs.length}</div>
          {cctvs.map((e, index) => {
          return (
            <div className="card mt-2">
             <div className="pl-2 text-light font-weight-bolder" style={{backgroundColor:get_color_code(e.Depth_ft_)}}>
                  Zone - {e.Zone} (Ward-{e.ward}) 
                  <span className="float-lg-right pointer mr-3 mt-1">
                    {/* <a href={`tel:+91-${e.CONT_NO}`}>
                      {e.CONT_NO} <i className='fa fa-phone'></i>
                    </a> */}

                    <button className='ml-1 btn btn-sm btn-success'  onClick={() => zoommez(e.lan, e.lat)}><i className='fa fa-map-marked'></i></button>
                    <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lan, e.lat)}><i className='fa fa-route'></i></button>
                  </span>
                </div>
              <div className="card-header" style={{ backgroundColor: '#203864' }}>
                <h5 className='text-light'>Street : {e.street}</h5>
                <br />
                <h5 className='text-light'>Expected inundation Depth(ft) : {e.Depth_ft_} ft</h5>
                <br />
                <p className='text-light'>Remarks : {e.Remarks}</p>

              </div>
            </div>
          );
        })
        }
  </>
)}



{(selectedtype === 'disaster') &&(
  <>
        <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total :  {cctvs.length+2}</div>
          {cctvs.map((e, index) => {
          return (
            <div className="card mt-2">
             <div className="pl-2 text-light font-weight-bolder" style={{backgroundColor:get_color_code(e.feet)}}>
                  Zone - {e.Zone} (Ward-{e.ward}) 
                  <span className="float-lg-right pointer mr-3 mt-1">
                    {/* <a href={`tel:+91-${e.CONT_NO}`}>
                      {e.CONT_NO} <i className='fa fa-phone'></i>
                    </a> */}

                    <button className='ml-1 btn btn-sm btn-success'  onClick={() => zoommez(e.lan, e.lat)}><i className='fa fa-map-marked'></i></button>
                    <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lan, e.lat)}><i className='fa fa-route'></i></button>
                  </span>
                </div>
              <div className="card-header" style={{ backgroundColor: '#203864' }}>
                <h5 className='text-light'>Location : {e.address}</h5>
                <br />
                <h5 className='text-light'>Max water level during peak in ft : {e.feet} ft</h5>
                <br />
                <h5  className='text-light'>Water level at 2pm on 16.10.2024: {e.level}</h5>
                <br />
                <br />
                 <h5  className='text-light'>Major Reason for inundation : {e.reason}</h5>
                 <br />

                 <p  className='text-light'>Intervention required to avoid water stagnation in future :{e.solution}</p>

                <p className='text-light'>Remarks : {e.remarks}</p>

                     <img src={`https://icccapi.cscl.co.in/zone_images/dist/${e.slno}/1.png`} onError={(e) => { 
                          e.target.src = 'https://icccapi.cscl.co.in/zone_images/dist/00.jpg'; 
                          }} 
                          style={{ height: '40vh', width: '100%' }} 
                          alt="Zone Image" 
                        />


              </div>
            </div>
          );
        })
        }
  </>
)}



{(selectedtype === 'shelter') &&(
  <>
        <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total :  {cctvs.length}


        <div className="float-right mr-3">
        <Link to="/Shelter_list">
                <h5 className='text-light'>History</h5>
        </Link>
        </div>

        </div>
          {cctvs.map((e, index) => {
          return (
            <div className="card mt-2">
             <div className="ml-2">
                  Zone - {e.Zone} (Ward-{e.ward})
                  {/* (Ward-{e.ward})  */}
                  <span className="float-lg-right pointer mr-3 mt-1">
                    <a href={`tel:+91-${e.Contact_No}`}>
                      {e.Contact_No} <i className='fa fa-phone'></i>
                    </a>

                    <button className='ml-1 btn btn-sm btn-success'  onClick={() => zoommez(e.lat, e.lan)}><i className='fa fa-map-marked'></i></button>
                    <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lat, e.lan)}><i className='fa fa-route'></i></button>
                  </span>
                </div>
              <div className="card-header" style={{ backgroundColor: '#203864' }}>
              
                <h5 className='text-light'>contact name: {e.Co_ordinat}</h5>
                 <br />
                 <h5 className='text-light'>Type of Shelter: {e.Type_of_sh}</h5>
                 <br />
                 <h5 className='text-light'>Implemented: {e.Implementi}</h5>
                 <br />
                 
                <p className='text-light'>{e.address}</p>
              </div>
            </div>
          );
        })
        }
  </>
)}


{(selectedtype === 'firstres' || selectedtype === 'appmit' || selectedtype ==='rwa') &&(
  <>
        <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total :  {tabledata.length}</div>
          {tabledata.map((e, index) => {
          return (
            <div className="card mt-2">
             <div className="ml-2">
                  Zone - {e.Zone} 
                  {/* (Ward-{e.ward})  */}
                  <span className="float-lg-right pointer mr-3 mt-1">
                    <a href={`tel:+91-${e.mobile}`}>
                      {e.mobile} <i className='fa fa-phone'></i>
                    </a>

                    
                  </span>
                </div>
              <div className="card-header" style={{ backgroundColor: '#203864' }}>
                <h5 className='text-light'>{e.name}</h5>
              </div>
            </div>
          );
        })
        }
  </>
)}

{(selectedtype === 'e_motor') &&(
  <>
        <div className="bg-dark mt-1 text-light text-center" style={{fontSize:"16px"}}>Total :  {cctvs.length}</div>
          {cctvs.map((e, index) => {
          return (
            <div className="card mt-2">
             <div className="ml-2">
                  Zone - {e.Zone} (DIV-{e.ward? e.ward : ''})
                  <span className="float-lg-right pointer mr-3 mt-1">

                    {/* AEE :  */}
                    {/* <a href={`tel:+91-${e.AEE}`}>
                      {e.AEE} <i className='fa fa-phone'></i>
                    </a> */}
                    <button className='ml-1 btn btn-sm btn-danger'  onClick={() => zoommez(e.lat, e.lan)}><i className='fa fa-map-marked'></i></button>
                    <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lat, e.lan)}><i className='fa fa-route'></i></button>
                  </span>
                </div>
              <div className="card-header" style={{ backgroundColor: '#203864' }}>
                <h5 className='text-light'>Capacity : {e.Motor_Type}</h5>
                <br />
                <h5 className='text-warning'>Address : {e.address}</h5>
               
              </div>
            </div>
          );
        })
        }
  </>
)}


 </>
): 
(
  <>
  {selectedtype === 'rain' && (
    <>
      <div className="bg-dark mt-1 text-light text-center" style={{ fontSize: "16px" }}>
        Total : {cctvs.length}
        <div className="float-right mr-3">
        <Link to="/liverainfall">
                <h5 className='text-light'>History</h5>
        </Link>
        </div>
        
      </div>
      {cctvs.map((e, index) => {
        return (
          <div className="card mt-2" key={e.id}>
            <div className="card-header" style={{ backgroundColor: '#203864' }}>
              <span className='text-light'>{e.name}</span>
              <span className="float-lg-right pointer mr-3 mt-1">
              <button className='btn btn-sm btn-success' onClick={() => sent_list_rain(e.d_id)}>Live</button>
              <button className='ml-1 btn btn-sm btn-danger'  onClick={() => zoommez(e.lat, e.lan)}><i className='fa fa-map-marked'></i></button>
              <button className='ml-1 btn btn-sm btn-success'  onClick={() => getgooglemap(e.lat, e.lan)}><i className='fa fa-route'></i></button>
              </span>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-3">Address:</div>
                <div className="col-9">{e.address}</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  )}
</>



)

}

        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12  bg-light border border-light rounded" style={{height:'92vh'}}>
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
                  {((selectedtype === 'flood_car') || (selectedtype === 'disaster')) && renderLegend()}
                    </div>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        {/* </div> */}
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
      maxWidth: '90%',
      margin: 'auto',
      height: '100%',
    },
  }}
>
  <div className="modal-content" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
    <header className="modal-header">
      <h3 id="modal-title" className="modal-title">GREATER CHENNAI CORPORATION</h3>
      <button
        type="button"
        className="close"
        onClick={() => setModalIsOpen(false)}
        aria-label="Close modal"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </header>
    <main className="modal-body" id="modal-description">
        <table border="1" className="table table-sm table-bordered table-card" style={{ width: '100%', fontSize:'12px', borderCollapse: 'collapse' }}>
          <tbody>
          <tr>
            <td rowSpan={7}>1</td>
              <td rowSpan={3}>Rainfall <br/>Details<br/> (as per IMD)</td>
              <td colSpan={5}>Rainfall during North East Monsoon <br/>(01.10.2024 to 22.10.2024 up to 08.30 am)</td>
              <td>318.60 mm</td>
            </tr>
            <tr>
              <td colSpan={5}>Average Previous Day Rainfall <br />
              from 22.10.2024 (08.30 AM) to 23.10.2024 (8.30 am)</td>
              <td>0.00 mm</td>
            </tr>
            <tr>
              <td colSpan={5}>Total Rainfall 01.10.2024 (08.30 AM) to 23.10.2024 (09.00 am)</td>
              <td>318.60 mm</td>
            </tr>
            <tr>
              <td rowSpan={4}>Rainfall details <br /> as per ICCC</td>
            </tr>
            <tr>
              <td colSpan={5}>Rainfall from 23.10.2024 (8.30AM) to 23.10.2024 (01:00 PM)</td>
              <td rowSpan={3}>0.00 mm<br/>(cumulative)</td>
            </tr>
            <tr>
            <td colSpan={3}>Highest Rainfall</td>
            <td colSpan={2}>-</td>
            </tr>
            <tr>
            <td colSpan={3}>Lowest Rainfall</td>
            <td colSpan={2}>-</td>
            </tr>

            <tr>
            <td rowSpan={4}>2</td>
            <td rowSpan={4}>Water Stagnation Details</td>
            <td colSpan={5}>Description</td>
            <td>Total <br /> (14-10-1024 - 23-10-2014)</td>
            </tr>
            <tr>
              <td colSpan={5}>Total</td>
              <td>542</td>
            </tr>
            <tr>
              <td colSpan={5}>Cleared</td>
              <td>542</td>
            </tr>
            <tr>
              <td colSpan={5}>Balance</td>
              <td>0</td>
            </tr>
            <tr>
            <td rowSpan={4}>3</td>
            <td rowSpan={4}>Tree Fallen from <br /> 01.10.2024 to 23.10.2024</td>
            <td colSpan={3}>Description</td>
            <td>From (1.10.2014 to 23.10.2024)</td>
            <td>Today (23.10.2024 01.00 PM)</td>
            <td>Total</td>
            </tr>
            <tr>
              <td colSpan={3}>Fallen</td>
              <td>92</td>
              <td>0</td>
              <td>92</td>
            </tr>
            <tr>
              <td colSpan={3}>Removed</td>
              <td>92</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td colSpan={3}>Balance</td>
              <td>0</td>
              <td>0</td>
              <td>92</td>
            </tr>
            <tr>
            <td rowSpan="2">4</td>
            <td rowSpan="2">Subways</td>
            <td colSpan={3}>Total</td>
            <td>Water Stagnation</td>
            <td colSpan={2}>Subway Closed for Traffic</td>
            </tr>

            <tr>
              <td colSpan={3}>22</td>
              <td>Nil</td>
              <td colSpan={2}>Nil</td>
            </tr>

            <tr>
              <td rowSpan={2}>5</td>
              <td colSpan={6}>No. of Motor Pumps Available</td>
              <td>637</td>
            </tr>
            <tr>
              <td colSpan={6}>Running Pumps (Electrical - 326, Mechanical - 665)</td>
              <td>15</td>
            </tr>
            <tr>
              <td>6</td>
              <td colSpan={6}>JCB / Poclain Used</td>
              <td>15 / 33</td>
            </tr>
            <tr>
              <td rowSpan={2}>7</td>
              <td rowSpan={2}>Complaints Received in 1913 <br />GCC Control Room</td>
              <td colSpan={4}>Complaint Received on	15.10.2024 - 23.10.2024</td>
              <td>Completed</td>
              <td>Progress</td>
            </tr>
            <tr>
             <td colSpan={4}>16043</td>
             <td>10752</td>
             <td>5291</td>
            </tr>
            <tr>
              <td>8</td>
              <td colSpan={6}>No. of Relief Centers - Available</td>
              <td>300</td>
            </tr>
            <tr>
              <td rowSpan={4}>9</td>
              <td colSpan={6}>No. of Relief Centers Occupied by People</td>
              <td>Nil</td>
              
            </tr>
            <tr>
            <td rowSpan={3}>Maximum No. of Persons <br />Sheltered as on 23.10.2024</td>
            </tr>
            <tr>
              <td>Male</td>
              <td>Female</td>
              <td>Children</td>
              <td>Transgender</td>
              <td>Disabled</td>
              <td>Total</td>
            </tr>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Nil</td>
            </tr>
            <tr>
              <td rowSpan={8}>10</td>
              <td colSpan={6}>Food Packets Distributed - 15.10.2024 to 23.10.2024</td>
            </tr>
            <tr>
              <td colSpan={6}>No. of cooking center</td>
              <td>101</td>
            </tr>
            <tr>
              <td colSpan={6}>No. of cooking center in operation</td>
              <td>0</td>
            </tr>
            <tr>
              <td colSpan={3}></td>
              <td colSpan={3}>Till 18.10.2024</td>
              <td>Today (23.10.2024)</td>
            </tr>
            <tr>
            <td colSpan={3}>Breakfast</td>
            <td colSpan={3}>440,825</td>
            <td>0</td>
            </tr>
            <tr>
            <td colSpan={3}>Lunch</td>
            <td colSpan={3}>539,500</td>
            <td>0</td>
            </tr>
            <tr>
            <td colSpan={3}>Dinner</td>
            <td colSpan={3}>570,210</td>
            <td>0</td>
            </tr>
            <tr>
            <td colSpan={3}>Total</td>
            <td colSpan={3}>1,550,535</td>
            <td>0</td>
            </tr>
            <tr>
              <td></td>
              <td colSpan={7} className='text-right'>Grand Total - 1,550,535</td>
            </tr>
            <tr>
              <td rowSpan={6}>11</td>
              <td colSpan={7}> Details of Medical Camps</td>
              </tr>
              <tr>
              <td colSpan={2}>Date</td>
              <td colSpan={2}>Description</td>
              <td>Fixed</td>
              <td>Mobile</td>
              <td>Total</td>
              </tr>
              <tr>
                <td rowSpan={2} colSpan={2}>Medical Camps on <br />23.10.2024</td>
                <td colSpan={2}>No.of Camps</td>
                <td>90</td>
            <td>NIL</td>
            <td>90</td>
              </tr>
              <tr>
              <td colSpan={2}>No. of People benefited</td>
              <td>4791</td>
            <td>NIL</td>
            <td>4791</td>
              </tr>
              <tr>
              <td rowSpan={2} colSpan={2}>Cumulative from <br /> 15.10.2024 to 23.10.2024</td>
              <td colSpan={2}>No.of Camps</td>
              <td>1412</td>
            <td>06</td>
            <td>1412</td>
              </tr>
              <tr>
              <td colSpan={2}>No. of People benefited</td>
              <td>83980</td>
            <td>NIL</td>
            <td>83980</td>
              </tr>
            <tr>
              <td>12</td>
              <td>No. of Boats Deployed</td>
                <td colSpan={6}>Available - 40 Nos<br />Deployed at site (Standby) - 40</td>
              </tr>
            <tr>
              <td>13</td>
              <td>NDRF</td>
                <td colSpan={6}>-</td>
              </tr>
            <tr>
              <td>14</td>
              <td>SDRF</td>
                <td colSpan={6}>-</td>
              </tr>
            <tr>
              <td>15</td>
              <td>TNEB Power Outages</td>
                 <td colSpan={6}>Total Distribution Transformers – 37,200 Nos<br />Shutdown due to Water Logging – Nil</td>
              </tr>
            <tr>
              <td rowSpan={2}>16</td>
              <td rowSpan={2}>CMWSSB Sewage Pumping Station Status <br /> (Total - 356)</td>
              <td colSpan={2}>Working</td>
              <td colSpan={4}>356</td>
              </tr>
              <tr>
              <td colSpan={2}>Not Working</td>
              <td colSpan={4}>NIL</td>
              </tr>
            
          </tbody>
        </table>
    </main>
    <footer className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => setModalIsOpen(false)}
      >
        Close
      </button>
    </footer>
  </div>
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
            <h5 className="modal-title text-light">24 Hour Rain fall {totalrain} mm</h5>
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
                    <th colSpan={2} className='text-center bg-info'>Hours</th>
                    <th className='text-center bg-info'>Value (mm)</th>
                  </tr>
                  
                </thead>
                <tbody>
                  {
                      Array.isArray(liverain_data) && liverain_data.length > 0 ? (
                        liverain_data.map((e, index) => (
                          <tr key={index}>
                            <td>{e.from}</td>
                            <td>{e.to}</td>
                            <td style={{backgroundColor: e.rain > 100 
                                  ? '#F30000'  
                                  : e.rain > 50.1 
                                  ? '#F30000'   
                                  : e.rain > 30.1 
                                  ? '#F38F15'    
                                  : e.rain > 20.1 
                                  ? '#EEEB3B'   
                                  : e.rain > 10.1 
                                  ? '#019E0E'   
                                  : e.rain > 0.1 
                                  ? '#5CDE5C'
                                  : '#FFFFFF'             
                          }}>{e.rain} mm
                          </td>
                           </tr>
                        ))
                      ) : (
                        <td colSpan="12">No data available</td> // This provides a fallback message when data is empty
                      )
                    }
                    <tr className='bg-dark text-light'>
                      <td colSpan={2}>Total</td>
                      <td style={{
                        backgroundColor: totalrain > 204.4
                        ? '#F30000' 
                        : totalrain > 115.5
                        ? '#F30000' 
                        : totalrain > 64.4
                        ? '#F38F15' 
                        : totalrain > 15.5
                        ? '#EEEB3B' 
                        : totalrain > 2.4
                        ? '#019E0E'
                        : totalrain > 0.1
                        ? '#5CDE5C' 
                        : '#FFFFFF' 
                      }}>{totalrain} mm</td>
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
export default Dash;
