import React, { useState, useEffect } from 'react';
import 'https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.28.0/feather.min.js';
import '../../src/men.css';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const Menu = () => {
    const [visibleSubmenus, setVisibleSubmenus] = useState({
        menu1: false,
        menu2: false,
        menu3: false,
        menu4: false,
        menu5: false,
        menu6: false,
        menu7: false,
        menu8: false,
        menu9: false,
        menu10: false,
        menu11: false,
        menu12: false,
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);


    useEffect(() => {
        // Replace feather icons
        window.feather.replace();
    }, []);


    const open_onepage = () => {
      setModalIsOpen(true);
    }

    const toggleMenu = (menuKey) => {
      setVisibleSubmenus(prevState => ({
          menu1: menuKey === 'menu1',
          menu2: menuKey === 'menu2',
          menu3: menuKey === 'menu3',
          menu4: menuKey === 'menu4',
          menu5: menuKey === 'menu5',
          menu6: menuKey === 'menu6',
          menu7: menuKey === 'menu7',
          menu8: menuKey === 'menu8',
          menu9: menuKey === 'menu9',
          menu10: menuKey === 'menu10',
          menu11: menuKey === 'menu11',
          menu12: menuKey === 'menu12',
      }));
    }

    return (
<>
       
       <div className="row background">
       <table className="table table-sm table-bordered" style={{marginLeft:'30px', top:'-80px'}}>
         <thead>
          <tr>
            <th className="text-center text-light bg-dark font-weight-bolder" colSpan={8}><h4 className='text-danger'>North east monsoon Reports(2024-OCT-DEC)</h4></th>
          </tr>
           <tr>
           {/* <th className="text-center text-dark bg-info font-weight-bolder pointer" onMouseOver={() => toggleMenu('')} onClick={() => { open_onepage() }}><h5><i className='fas fa fa-sticky-note' /> One Page Report</h5></th> */}


           <th className="text-center text-dark bg-info font-weight-bolder" onMouseOver={() => toggleMenu('')}><h5><Link to="/reports" className='text-dark'><i className='fas fa fa-list-alt' /> Reports</Link></h5></th>
           
            <th className="text-center text-dark bg-info font-weight-bolder" onMouseOver={() => toggleMenu('')}><h5><Link to="/liveflood" className='text-dark'><i className='fas fa fa-warehouse' /> Subway Status</Link></h5></th>

             <th className="text-center text-dark bg-info font-weight-bolder" onMouseOver={() => toggleMenu('')}><h5><Link to="/liverainfall" className='text-dark'><i className='fas fa fa-cloud-sun-rain' /> Rain Fall</Link></h5></th>
             <th className="text-center text-dark bg-info font-weight-bolder" onMouseOver={() => toggleMenu('')}><h5><Link to="/Food_list" className='text-dark'><i className='fas fa fa-cookie' /> Food Distribution</Link></h5></th>
             <th className="text-center text-dark bg-info font-weight-bolder" onMouseOver={() => toggleMenu('')}><h5><Link to="/Shelter_list" className='text-dark'><i className='fas fa fa-school' /> Shelters</Link></h5></th>
             <th className="text-center text-dark bg-info font-weight-bolder" onMouseOver={() => toggleMenu('')}><h5><Link to="/Medical_camp" className='text-dark'><i className='fas fa fa-hospital' /> Medical Camps</Link></h5></th>
             <th className="text-center text-dark bg-info font-weight-bolder" onMouseOver={() => toggleMenu('')}><h5><Link to="/motor_pumps" className='text-dark'><i className='fas fa fa-gas-pump' /> Motor Pumps</Link></h5></th>
             <th className="text-center text-dark bg-info font-weight-bolder" onMouseOver={() => toggleMenu('')}><h5><Link to="/treefallen" className='text-dark'><i className='fas fa fa-tree' /> Tree Fallen</Link></h5></th>
           </tr>
         </thead>
       </table>


       <div className="col-12">
       
        <nav className="orbital-menu nbody">

            <div className="row"  align="center">
         <div className="row">
                  <div className="col-md-12">
                   <Link to="/rainfall">
                    <div className="orbital-menu__center-pic bg-primary" onMouseOver={() => toggleMenu('menu2')}>
                        <h5 className='text-dark'>Rainfall Forecast</h5>
                    </div>
                    </Link>


            {visibleSubmenus.menu2 && (
                <ul className="orbital-menu__list"> 
                    <li className="orbital-menu__item">
                    <p className="orbital-menu__link">
                      <span className="orbital-menu__link-text"><h5 className='text-dark'>ECMWF</h5></span>
                    </p>
                    </li>
                    <li className="orbital-menu__item">
                    <p className="orbital-menu__link">
                      <span className="orbital-menu__link-text"><h5 className='text-dark'>NCEPGFS</h5></span>
                    </p>
                 </li>
                
                  <li className="orbital-menu__item">
                        <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>TNUIFSL</h5></span>
                          </p>
                  </li>
                <li className="orbital-menu__item">
                         <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Today Rainfall</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                        <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Tomorrow Rainfall</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                       <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Day After Tomorrow</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                       <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Hourly Rainfall</h5></span>
                          </p>
               </li>
                <li className="orbital-menu__item">
                        <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>3Hours Average Rainfall</h5></span>
                          </p>
                </li>
                </ul>
            )}

          </div>



          <div className="col-12 mt-5">
                  <Link to="/pgr">
                <div className="orbital-menu__center-pic" style={{'background-color':'#444444'}} onMouseOver={() => toggleMenu('menu12')}>
                    <h5 className='text-light'>Live PGR</h5>
                </div>
                </Link>
                {visibleSubmenus.menu12 && (
                    <ul className="orbital-menu__list">
                        <li className="orbital-menu__item">
                        <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Total Grievances</h5></span>
                          </p>
                        </li>
                        <li className="orbital-menu__item">
                        <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Resolved Grievances</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Pending Grievances</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Re-Opened Grievances</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Mode Of Grievances</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Type Of Grievances</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Pending Grievances Ageing</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Trend Analysis</h5></span>
                          </p>
                </li>
                
                    </ul>
                )}


                </div>
                

                </div>



        <div className="row">

        <div className="col-12">
                  <Link to="/imd">
                <div className="orbital-menu__center-pic bg-dark" onMouseOver={() => toggleMenu('menu11')}>
                    <h5 className='text-light'>IMD</h5>
                </div>
                </Link>
                {visibleSubmenus.menu11 && (
                     <ul className="orbital-menu__list"> 
                     <li className="orbital-menu__item">
                     <p className="orbital-menu__link">
                       <span className="orbital-menu__link-text"><h5 className='text-dark'>ECMWF</h5></span>
                     </p>
                     </li>
                     <li className="orbital-menu__item">
                     <p className="orbital-menu__link">
                       <span className="orbital-menu__link-text"><h5 className='text-dark'>NCEPGFS</h5></span>
                     </p>
                  </li>
                 
                   <li className="orbital-menu__item">
                         <p className="orbital-menu__link">
                             <span className="orbital-menu__link-text"><h5 className='text-dark'>TNUIFSL</h5></span>
                           </p>
                   </li>
                 <li className="orbital-menu__item">
                          <p className="orbital-menu__link">
                             <span className="orbital-menu__link-text"><h5 className='text-dark'>Today Rainfall</h5></span>
                           </p>
                 </li>
                 <li className="orbital-menu__item">
                         <p className="orbital-menu__link">
                             <span className="orbital-menu__link-text"><h5 className='text-dark'>Tomorrow Rainfall</h5></span>
                           </p>
                 </li>
                 <li className="orbital-menu__item">
                        <p className="orbital-menu__link">
                             <span className="orbital-menu__link-text"><h5 className='text-dark'>Day After Tomorrow</h5></span>
                           </p>
                 </li>
                 <li className="orbital-menu__item">
                        <p className="orbital-menu__link">
                             <span className="orbital-menu__link-text"><h5 className='text-dark'>Hourly Rainfall</h5></span>
                           </p>
                </li>
                 <li className="orbital-menu__item">
                         <p className="orbital-menu__link">
                             <span className="orbital-menu__link-text"><h5 className='text-dark'>3Hours Average Rainfall</h5></span>
                           </p>
                 </li>
                 </ul>
                )}


                </div>




          

           
                <div className="col-12 mt-5">
                  <Link to="/grievance">
                <div className="orbital-menu__center-pic bg-info" onMouseOver={() => toggleMenu('menu5')}>
                    <h5 className='text-dark'>Grievance Details</h5>
                </div>
                </Link>
                {visibleSubmenus.menu5 && (
                    <ul className="orbital-menu__list">
                        <li className="orbital-menu__item">
                        <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Total Grievances</h5></span>
                          </p>
                        </li>
                        <li className="orbital-menu__item">
                        <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Resolved Grievances</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Pending Grievances</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Re-Opened Grievances</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Mode Of Grievances</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Type Of Grievances</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Pending Grievances Ageing</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Trend Analysis</h5></span>
                          </p>
                </li>
                
                    </ul>
                )}


                </div>

             </div>



             <div className="row mt-4">
        <div className="col-12">
                <Link to="/information">
                <div className="orbital-menu__center-pic bg-light" onMouseOver={() => toggleMenu('menu6')}>
                    <h5 className='text-dark'>Informations</h5>
                </div>
                </Link>
                {visibleSubmenus.menu6 && (
                    <ul className="orbital-menu__list">
                    <li className="orbital-menu__item">
                    <p className="orbital-menu__link">
                        <span className="orbital-menu__link-text"><h5 className='text-dark'>Zonal Offices</h5></span>
                      </p>
                    </li>
                    <li className="orbital-menu__item">
                    <p className="orbital-menu__link">
                        <span className="orbital-menu__link-text"><h5 className='text-dark'>Relief Centre</h5></span>
                      </p>
            </li>
            <li className="orbital-menu__item">
            <p className="orbital-menu__link">
                        <span className="orbital-menu__link-text"><h5 className='text-dark'>Community Centre</h5></span>
                      </p>
            </li>
            <li className="orbital-menu__item">
            <p className="orbital-menu__link">
                        <span className="orbital-menu__link-text"><h5 className='text-dark'>Shelter</h5></span>
                      </p>
            </li>
            <li className="orbital-menu__item">
            <p className="orbital-menu__link">
                        <span className="orbital-menu__link-text"><h5 className='text-dark'> Schools </h5></span>
                      </p>
            </li>
            <li className="orbital-menu__item">
            <p className="orbital-menu__link">
                        <span className="orbital-menu__link-text"><h5 className='text-dark'>Medical College</h5></span>
                      </p>
            </li>
            <li className="orbital-menu__item">
            <p className="orbital-menu__link">
                        <span className="orbital-menu__link-text"><h5 className='text-dark'>NDRF</h5></span>
                      </p>
            </li>
            <li className="orbital-menu__item">
            <p className="orbital-menu__link">
                        <span className="orbital-menu__link-text"><h5 className='text-dark'>Hospitals</h5></span>
                      </p>
            </li>
            
                </ul>
                )}
                </div>


                <div className="col-12 mt-4">
                  <Link to="/flood">
                  <div className="orbital-menu__center-pic bg-warning text-dark" onMouseOver={() => toggleMenu('menu1')}>
                    <h5>Flood</h5>
                  </div>
                  </Link>

                  {visibleSubmenus.menu1 && (
                      <ul className="orbital-menu__list">
                          <li className="orbital-menu__item">
                              <p className="orbital-menu__link">
                                  <span className="orbital-menu__link-text"><h5 className='text-dark'>Efficiency</h5></span>
                              </p>
                          </li>
                          <li className="orbital-menu__item">
                  <p className="orbital-menu__link">
                    <span className="orbital-menu__link-text"><h5 className='text-dark'>Lake</h5></span>
                  </p>
                </li>
                <li className="orbital-menu__item">
                  <p className="orbital-menu__link">
                    <span className="orbital-menu__link-text"><h5 className='text-dark'>Canal</h5></span>
                  </p>
                </li>
                <li className="orbital-menu__item">
                  <p className="orbital-menu__link">
                    <span className="orbital-menu__link-text"><h5 className='text-dark'>River</h5></span>
                  </p>
                </li>
                <li className="orbital-menu__item">
                  <p className="orbital-menu__link">
                    <span className="orbital-menu__link-text"><h5 className='text-dark'>Subway</h5></span>
                  </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                    <span className="orbital-menu__link-text"><h5 className='text-dark'>Well</h5></span>
                  </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                    <span className="orbital-menu__link-text"><h5 className='text-dark'>Flood sencers</h5></span>
                  </p>
                </li>
                <li className="orbital-menu__item">
                  <p className="orbital-menu__link">
                    <span className="orbital-menu__link-text"><h5 className='text-dark'>IOT</h5></span>
                  </p>
                </li>
                            </ul>
                        )}
                    </div>

                </div>





             <div className="row mt-4">



              
          <div className="col-12">
           <Link to="/ocean">
            <div className="orbital-menu__center-pic bg-success" onMouseOver={() => toggleMenu('menu3')}>
                <h5 className='text-dark'>Ocean Forecast</h5>
            </div>
            </Link>
            {visibleSubmenus.menu3 && (
                <ul className="orbital-menu__list">
                   <li className="orbital-menu__item">
                    <p className="orbital-menu__link">
                      <span className="orbital-menu__link-text"><h5 className='text-dark'>Ocean Forecasting</h5></span>
                    </p>
                    </li>
                    <li className="orbital-menu__item">
                    <p className="orbital-menu__link">
                      <span className="orbital-menu__link-text"><h5 className='text-dark'>Coastal Current Alerts</h5></span>
                    </p>
                 </li>
                
                  <li className="orbital-menu__item">
                        <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>High Wave Alerts</h5></span>
                          </p>
                  </li>
                <li className="orbital-menu__item">
                         <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Swell Surge Alerts</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                        <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Tides</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                       <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Tsunami</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                       <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Storm Surge</h5></span>
                          </p>
               </li>
                <li className="orbital-menu__item">
                        <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>INCOIS</h5></span>
                          </p>
                </li>
                </ul>
            )}


            </div>

          

                

              
            <div className="col-12 mt-5">
                  <Link to="/inundation">
                <div className="orbital-menu__center-pic bg-danger" onMouseOver={() => toggleMenu('menu4')}>
                    <h5 className='text-dark'>Inundation Analysis</h5>
                </div>
                </Link>
                {visibleSubmenus.menu4 && (
                    <ul className="orbital-menu__list">
                        <li className="orbital-menu__item">
                             <p className="orbital-menu__link">
                                  <span className="orbital-menu__link-text"><h5 className='text-dark'>Low Inundations</h5></span>
                             </p>
                        </li>
                        <li className="orbital-menu__item">
                        <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Medium Inundations</h5></span>
                          </p>
                      </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>High Inundations</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Very High Inundations</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Vulnerability Assessment</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Yearly Inundations</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Region Inundations</h5></span>
                          </p>
                </li>
                <li className="orbital-menu__item">
                <p className="orbital-menu__link">
                            <span className="orbital-menu__link-text"><h5 className='text-dark'>Zone Inundations</h5></span>
                          </p>
                </li>
                    </ul>
                )}


                </div>


       

            </div>
       

            </div>
            
        </nav>
        </div>
       
</div>





<Modal
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  contentLabel="School Details"
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      zIndex: 99999999999,
      border: '1px solid #002222',
      borderRadius: '0.375rem',
      padding: '1rem',
      maxWidth: '100%',
      margin: 'auto',
      height: '100%',
    },
  }}
>
  <div className="modal-content" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
    <header className="modal-header bg-info" style={{width:'100%'}}>
      <div className="row" style={{width:'100%'}}>
        <div className="col-3"><h5>Date: 29-10-2024</h5></div>
        <div className="col-6"><h4>GREATER CHENNAI CORPORATION - Hourly Report</h4></div>
        <div className="col-3"><h5>Time: 12:00PM</h5></div>
      </div>
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
        <table border="1" className="table table-sm table-bordered table-card font-weight-bold tablesborders" style={{ width: '100%', fontSize:'13px', borderCollapse: 'collapse', borderWidth:'4px', borderColor:'#000000'}}>
          <tbody>
          <tr>
            <td rowSpan={7} style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c18c7a', width:'2rpm'}}>1</td>
              <td rowSpan={3} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44', width:'50px'}}>Rainfall <br/>Details<br/> (as per IMD)</td>
              <td colSpan={5}>Rainfall during North East Monsoon <br/>(01.10.2024 to 22.10.2024 up to 08.30 am)</td>
              <td style={{backgroundColor:'#9b9ac9',textAlign:'right'}}>318.60 mm</td>
            </tr>
            <tr>
              <td colSpan={5}>Average Previous Day Rainfall <br />
              from 22.10.2024 (08.30 AM) to 23.10.2024 (8.30 am)</td>
              <td style={{backgroundColor:'#9b9ac9',textAlign:'right'}}>0.00 mm</td>
            </tr>
            <tr>
              <td colSpan={5} style={{textAlign:'left'}}>Total Rainfall <br />01.10.2024 (08.30 AM) to 23.10.2024 (08.30 am)
                 </td>
              <td style={{backgroundColor:'#9b9ac9',textAlign:'right'}}>318.60 mm</td>
            </tr>
            <tr>
              <td rowSpan={4} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Rainfall details <br /> as per ICCC</td>
            </tr>
            <tr>
              <td colSpan={5}>Rainfall from 23.10.2024 (8.30AM) to 23.10.2024 (01:00 PM)</td>
              <td rowSpan={3} style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>0.00 mm<br/>(cumulative)</td>
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
            <td rowSpan={4} style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>2</td>
            <td rowSpan={4} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Water Stagnation Details</td>
            <td colSpan={5} style={{textAlign:'center'}}>Description</td>
            <td style={{textAlign:'center'}}>Total <br /> (14-10-1024 - 23-10-2014)</td>
            </tr>
            <tr>
              <td colSpan={5} style={{textAlign:'center'}}>Total</td>
              <td  style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>542</td>
            </tr>
            <tr>
              <td colSpan={5} style={{textAlign:'center'}}>Cleared</td>
              <td  style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>542</td>
            </tr>
            <tr>
              <td colSpan={5} style={{textAlign:'center'}}>Balance</td>
              <td  style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>0</td>
            </tr>
            <tr>
            <td rowSpan={4} style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>3</td>
            <td rowSpan={4} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Tree Fallen from <br /> 01.10.2024 to 23.10.2024</td>
            <td colSpan={3} style={{textAlign:'center'}}>Description</td>
            <td>From 1.10.2014 to 23.10.2024</td>
            <td>Today (23.10.2024 01.00 PM)</td>
            <td style={{textAlign:'center'}}>Total</td>
            </tr>
            <tr>
              <td colSpan={3} style={{textAlign:'center'}}>Fallen</td>
              <td style={{textAlign:'center'}}>92</td>
              <td style={{textAlign:'center'}}>0</td>
              <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>92</td>
            </tr>
            <tr>
              <td colSpan={3} style={{textAlign:'center'}}>Removed</td>
              <td style={{textAlign:'center'}}>92</td>
              <td style={{textAlign:'center'}}>0</td>
              <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>0</td>
            </tr>
            <tr>
              <td colSpan={3} style={{textAlign:'center'}}>Balance</td>
              <td style={{textAlign:'center'}}>0</td>
              <td style={{textAlign:'center'}}>0</td>
              <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>92</td>
            </tr>
            <tr>
            <td rowSpan="2" style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>4</td>
            <td rowSpan="2" style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Subways</td>
            <td colSpan={3} style={{textAlign:'center'}}>Total</td>
            <td style={{textAlign:'center'}}>Water Stagnation</td>
            <td colSpan={2} style={{textAlign:'center'}}>Subway Closed for Traffic</td>
            </tr>

            <tr>
              <td colSpan={3} style={{textAlign:'center'}}>22</td>
              <td style={{textAlign:'center'}}>Nil</td>
              <td colSpan={2} style={{textAlign:'center'}}>Nil</td>
            </tr>

            <tr>
              <td rowSpan={2} style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>5</td>
              <td colSpan={6} style={{backgroundColor:'#cdcd44'}}>No. of Motor Pumps Available</td>
              <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>637</td>
            </tr>
            <tr>
              <td colSpan={6} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Running Pumps (Electrical - 326, Mechanical - 665)</td>
              <td  style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>15</td>
            </tr>
            <tr>
              <td style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>6</td>
              <td colSpan={6} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>JCB / Poclain Used</td>
              <td  style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>15 / 33</td>
            </tr>
            <tr>
              <td rowSpan={2} style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>7</td>
              <td rowSpan={2} style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Complaints Received in 1913 <br />GCC Control Room</td>
              <td colSpan={4} style={{textAlign:'center'}}>Complaint Received on	15.10.2024 - 23.10.2024</td>
              <td style={{textAlign:'center'}}>Completed</td>
              <td style={{textAlign:'center'}}>Progress</td>
            </tr>
            <tr>
             <td colSpan={4} style={{textAlign:'center'}}>16043</td>
             <td style={{textAlign:'center'}}>10752</td>
             <td  style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>5291</td>
            </tr>
            <tr>
              <td style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>8</td>
              <td colSpan={6} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>No. of Relief Centers - Available</td>
              <td  style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>300</td>
            </tr>
            <tr>
              <td rowSpan={4} style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>9</td>
              <td colSpan={6} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>No. of Relief Centers Occupied by People</td>
              <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>Nil</td>
              
            </tr>
            <tr>
            <td rowSpan={3} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Maximum No. of Persons <br />Sheltered as on 23.10.2024</td>
            </tr>
            <tr>
              <td style={{textAlign:'center'}}>Male</td>
              <td style={{textAlign:'center'}}>Female</td>
              <td style={{textAlign:'center'}}>Children</td>
              <td style={{textAlign:'center'}}>Transgender</td>
              <td style={{textAlign:'center'}}>Disabled</td>
              <td style={{textAlign:'center'}}>Total</td>
            </tr>
            <tr>
              <td style={{textAlign:'center'}}>-</td>
              <td style={{textAlign:'center'}}>-</td>
              <td style={{textAlign:'center'}}>-</td>
              <td style={{textAlign:'center'}}>-</td>
              <td style={{textAlign:'center'}}>-</td>
              <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>Nil</td>
            </tr>
            <tr>
              <td rowSpan={8} style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>10</td>
              <td colSpan={7} style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Food Packets Distributed - 15.10.2024 to 23.10.2024</td>
            </tr>
            <tr>
              <td colSpan={6} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>No. of cooking center</td>
              <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>101</td>
            </tr>
            <tr>
              <td colSpan={6} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>No. of cooking center in operation</td>
              <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>0</td>
            </tr>
            <tr>
              <td colSpan={3} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}></td>
              <td colSpan={3} style={{textAlign:'center'}}>Till 18.10.2024</td>
              <td style={{textAlign:'center'}}>Today (23.10.2024)</td>
            </tr>
            <tr>
            <td colSpan={3} style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Breakfast</td>
            <td colSpan={3} style={{textAlign:'center'}}>440,825</td>
            <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>0</td>
            </tr>
            <tr>
            <td colSpan={3} style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Lunch</td>
            <td colSpan={3} style={{textAlign:'center'}}>539,500</td>
            <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>0</td>
            </tr>
            <tr>
            <td colSpan={3} style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Dinner</td>
            <td colSpan={3} style={{textAlign:'center'}}>570,210</td>
            <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>0</td>
            </tr>
            <tr>
            <td colSpan={3} style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Total</td>
            <td colSpan={3} style={{textAlign:'center'}}>1,550,535</td>
            <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>0</td>
            </tr>
            <tr>
              <td style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c9a59a'}}></td>
              <td colSpan={6} className='text-right' style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c9a59a'}}> Grand Total</td>
                <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#c9a59a'}}>1,550,535</td>
            </tr>
            <tr>
              <td rowSpan={6} style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>11</td>
              <td colSpan={7}  style={{textAlign:'center'}}> Details of Medical Camps</td>
              </tr>
              <tr>
              <td colSpan={2} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Date</td>
              <td colSpan={2}>Description</td>
              <td style={{textAlign:'center'}}>Fixed</td>
              <td style={{textAlign:'center'}}>Mobile</td>
              <td style={{textAlign:'center'}}>Total</td>
              </tr>
              <tr>
                <td rowSpan={2} colSpan={2}style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Medical Camps on <br />23.10.2024</td>
                <td colSpan={2}>No.of Camps</td>
                <td style={{textAlign:'center'}}>90</td>
            <td style={{textAlign:'center'}}>NIL</td>
            <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>90</td>
              </tr>
              <tr>
              <td colSpan={2}>No. of People benefited</td>
              <td style={{textAlign:'center'}}>4791</td>
            <td style={{textAlign:'center'}}>NIL</td>
            <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>4791</td>
              </tr>
              <tr>
              <td rowSpan={2} colSpan={2} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Cumulative from <br /> 15.10.2024 to 23.10.2024</td>
              <td colSpan={2}>No.of Camps</td>
              <td style={{textAlign:'center'}}>1412</td>
            <td style={{textAlign:'center'}}>06</td>
            <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>1412</td>
              </tr>
              <tr>
              <td colSpan={2}>No. of People benefited</td>
              <td style={{textAlign:'center'}}>83980</td>
            <td style={{textAlign:'center'}}>NIL</td>
            <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>83980</td>
              </tr>
            <tr>
              <td  style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>12</td>
              <td style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>No. of Boats Deployed</td>
                <td colSpan={6} style={{textAlign:'center'}}>Available - 40 Nos<br />Deployed at site (Standby) - 40</td>
              </tr>
            <tr>
              <td  style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>13</td>
              <td style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>NDRF</td>
                <td colSpan={6} style={{textAlign:'center'}}>-</td>
              </tr>
            <tr>
              <td  style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>14</td>
              <td style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>SDRF</td>
                <td colSpan={6} style={{textAlign:'center'}}>-</td>
              </tr>
            <tr>
              <td  style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>15</td>
              <td style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>TNEB Power Outages</td>
                 <td colSpan={6} style={{textAlign:'center'}}>Total Distribution Transformers – 37,200 Nos<br />Shutdown due to Water Logging – Nil</td>
              </tr>
            <tr>
              <td rowSpan={2}  style={{textAlign:'center', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>16</td>
              <td rowSpan={2} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>CMWSSB Sewage <br />Pumping Station Status <br /> (Total - 356)</td>
              <td colSpan={2} style={{textAlign:'center'}}>Working</td>
              <td colSpan={4} style={{textAlign:'center'}}>356</td>
              </tr>
              <tr>
              <td colSpan={2} style={{textAlign:'center'}}>Not Working</td>
              <td colSpan={4} style={{textAlign:'center'}}>NIL</td>
              </tr>
            
          </tbody>
        </table>
    </main>
    <footer className="modal-footer bg-info">
      <button
        type="button"
        className="btn btn-outline-danger btn-secondary"
        onClick={() => setModalIsOpen(false)}
      >
        Close
      </button>
    </footer>
  </div>
</Modal>




        </> );
};

export default Menu;
