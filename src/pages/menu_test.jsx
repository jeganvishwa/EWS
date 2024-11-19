import React, { useState, useEffect } from 'react';
import 'https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.28.0/feather.min.js';
import '../../src/men.css';
import { Link } from 'react-router-dom';

const Menu_test = () => {
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


    useEffect(() => {
        // Replace feather icons
        window.feather.replace();
    }, []);

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
       
       <div className="row menu_first">
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
       <table className="table table-sm table-bordered" style={{marginLeft:'300px', bottom:'5px', marginTop:'20px', position:'fixed'}}>
         <thead>
          <tr>
            <th className="text-center text-light bg-dark font-weight-bolder" colSpan={5}><h4 className='text-danger'>North east monsoon Reports(2024-2025)</h4></th>
          </tr>
           <tr>
             <th className="text-center text-dark bg-info font-weight-bolder"><h5><Link to="/Food_list" className='text-dark'><i className='fas fa fa-cookie' /> Food Distribution</Link></h5></th>
             <th className="text-center text-dark bg-info font-weight-bolder"><h5><Link to="/Shelter_list" className='text-dark'><i className='fas fa fa-school' /> Shelters</Link></h5></th>
             <th className="text-center text-dark bg-info font-weight-bolder"><h5><Link to="/Medical_camp" className='text-dark'><i className='fas fa fa-hospital' /> Medical Camps</Link></h5></th>
             <th className="text-center text-dark bg-info font-weight-bolder"><h5><Link to="/motor_pumps" className='text-dark'><i className='fas fa fa-gas-pump' /> Motor Pumps</Link></h5></th>
             <th className="text-center text-dark bg-info font-weight-bolder"><h5><Link to="/treefallen" className='text-dark'><i className='fas fa fa-tree' /> Tree Fallen</Link></h5></th>
           </tr>
         </thead>
       </table>
</div>

        </> );
};

export default Menu_test;
