import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import ward_boundary from '../pages/mapdata/Ward_Boundary.json';
import zone_boundaries from '../pages/mapdata/Zone_Boundary.json';
import school_data from '../pages/mapdata/schools.json';
import zone_address from '../pages/mapdata/zone_address.json';
import Modal from 'react-modal';

function Dashboard() {
  const mapContainerStyle = {
    height: "600px",
    width: "100%",
  };

  const center = {
    lat: 13.0524,
    lng: 80.1612,
  };

  const [wardJsonData, setWardJsonData] = useState(null);
  const [map, setMap] = useState(null);
  const [zoneMarkers, setZoneMarkers] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [wardMarkers, setWardMarkers] = useState([]);
  const [schoolMarkers, setSchoolMarkers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedtype, setSelectedtype] = useState(null);
  const [totalSchools, setTotalSchools] = useState(0);

  const [zofficeMarkers, setzofficeMarkers] = useState([]);
  const [selectedzoffice, setSelectedzoffice] = useState(null);

  const mapOptions = {
    styles: [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
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
        strokeColor: 'black',
        strokeWeight: 2,
        fillColor: 'grey',
        fillOpacity: 0.1,
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

        if (zoneName) {
          // Clear previous wards and markers
          setWardMarkers([]);
          map.data.forEach((feature) => {
            if (feature.getProperty("Ward")) {
              map.data.remove(feature);
            }
          });

          schoolMarkers.forEach((marker) => marker.setMap(null));
          setSchoolMarkers([]);

          // Zoom into the selected zone
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
            features: wardJsonData.features.filter((feature) => feature.properties.Zone === zoneName),
          };

          map.data.addGeoJson(filteredWardJsonData);
          map.data.setStyle({
            strokeColor: 'black',
            strokeWeight: 2,
            fillColor: 'yellow',
            fillOpacity: 0.1,
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
  }, [map, zone_boundaries, wardJsonData]);

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
          map.data.setStyle({
            strokeColor: 'black',
            strokeWeight: 2,
            fillColor: 'yellow',
            fillOpacity: 0.1,
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

  function displayicon(e) {
    const selectedValue = e.target.value;
    setSelectedtype(selectedValue);
  
    switch (selectedValue) {
      case 'school':
        school(); 
        break;
      case 'zonel_office':
        zoneloffice(); 
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
        setzofficeMarkers([]);
        school(); 
    } else if (selectedtype === 'zonel_office') {
        schoolMarkers.forEach(marker => marker.setMap(null));
        setSchoolMarkers([]); 
        zoneloffice();
    }
}, [selectedZone, selectedtype]);

function school() {
    if (map && school_data && selectedZone) {
        // Clear existing school markers
        schoolMarkers.forEach((marker) => marker.setMap(null));
        setSchoolMarkers([]);

        // Filter and create markers for schools
        const filteredSchools = school_data.data.filter(school => school.zone === selectedZone);
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
                    url: 'https://img.icons8.com/?size=100&id=103879&format=png&color=000000',
                    scaledSize: new window.google.maps.Size(20, 10),
                },
                map: map,
            });

            marker.addListener('click', () => {
                setSelectedSchool(school);
                setModalIsOpen(true);
            });

            return marker;
        });

        setSchoolMarkers(markers);
        setTotalSchools(filteredSchools.length);
    }
}

function zoneloffice() {
    if (map && zone_address && selectedZone) {
        // Clear existing zonal office markers
        zofficeMarkers.forEach((marker) => marker.setMap(null));
        setzofficeMarkers([]);

        // Filter and create markers for zonal offices
        const filteredzaddress = zone_address.data.filter(address => address.Zone === selectedZone);
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
                    url: 'https://img.icons8.com/?size=100&id=UngWXIZSG10K&format=png&color=000000',
                    scaledSize: new window.google.maps.Size(40, 30),
                },
                map: map,
            });

            marker.addListener('click', () => {
              console.log(address); 
                setSelectedzoffice(address);
                setModalIsOpen(true);
            });

            return marker;
        });

        setzofficeMarkers(markers);
    }
}



  return (
    <>
      <section className="pcoded-main-container bg-dark">
        <div className="pcoded-content">
          <div className="row">
            <div className="col-lg-12 col-xl-12">
              <div className="card bg-dark">
                <div className="card-header">
                  <div className="row">

                  <div className="col-2">
                  </div>
                    <div className="col-2">
                      <select className="form-control form-control-sm text-light bg-dark" onChange={displayicon}>
                      <option value={true}>All category</option>
                      <option value={true}>Rain</option>
                      <option value={true}>Camera</option>
                      <option value={true}>Flood</option>
                      <option value={true}>Water Bodies</option>
                      <option value={true}>Sub Ways</option>
                      <option value={true}>INCOIS</option>
                      <option value={true}>Boom Barrier</option>
                      <option value={true}>Floodo meter</option>
                      <option value={true}>Pump Locations</option>
                      <option value="zonel_office">Zonal Offices</option>
                      <option value={true}>Relief Centre</option>
                      <option value="school">School List</option>
                      <option value={true}>Community Centre</option>
                      <option value={true}>Boat Deployment</option>
                      <option value={true}>NGOs'</option>
                      <option value={true}>First Responder</option>
                      <option value={true}>Food Distribution</option>
                      <option value={true}>Primary health camp & UPHC</option>
                      <option value={true}>Shelter/night shelter</option>
                      <option value={true}>Amma Unavagam</option>
                      <option value={true}>Fire/ Police/Fisheries/ EB/ PWD/ Traffic Police/ NDRF</option>
                      </select>
                    </div>
                    
                    <div className="col-2">
                      <select className="form-control form-control-sm text-light bg-dark"
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                  >
                    <option value="">Select Zone</option>
                    {zone_boundaries?.features.map((feature, index) => (
                      <option key={index} value={feature.properties.Zone}>
                        {feature.properties.Zone}
                      </option>
                    ))}
                  </select>
                    </div>
                    <div className="col-2">
                    </div>
                    <div className="col-2">
                  </div>
                  <div className="col-2">
                  </div>
                </div>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div className="col-6">

                    </div>
                    <div className="col-6">
                    <LoadScript googleMapsApiKey="AIzaSyDmZ6ggUr3WrlRxdLIo6wE4vev_Bz8DdAs">
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


    </>
  );
}
export default Dashboard;
