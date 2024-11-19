import React, { useEffect, useState, useRef} from 'react';
import Modal from 'react-modal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './liverain.css';

function Liverain() {
  const [selectedtype, setSelectedtype] = useState('live');
  function displayicon(val) {
    const selectedValue = val;
    setSelectedtype(val);
  }

  const [timeSlots, setTimeSlots] = useState([]);
  const [data, setdata] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const isOnRef = useRef(isOn);
  const [cdate, setcdate] = useState(new Date());
  
    const handleDateChange = (event) => {
      setcdate(new Date(event.target.value)); 
    };

  // useEffect(() => {
   
  //   isOnRef.current === false ? getsubways(1,cdate) : getsubways(2,cdate);
  //   dates();
  // }, [isOn,cdate]);


  useEffect(() => {
    isOnRef.current = isOn;
    if (cdate) {
      dates();
      getsubways(isOnRef.current === false ? 1 : 2, cdate);
    }
    const intervalId = setInterval(() => {
      dates();
      isOnRef.current === false ? getsubways(1,cdate) : getsubways(2,cdate);
    }, 120000);
    return () => clearInterval(intervalId);
  }, [cdate, isOn]);



  const dates = () => {
    let resetTimeoutId = null;
  
    const generateTimeSlots = () => {
      const slots = [];
      const now = new Date();
      const startTime = new Date();
  
      // Compare dates (not using == or === for Date objects)
      const isSameDay = now.toDateString() === cdate.toDateString();
  
      if (isSameDay) {
        if (isOnRef.current === false) {
          if (now.getHours() >= 6) {
            startTime.setHours(6, 0, 0, 0); // 6 AM today
          } else {
            startTime.setDate(startTime.getDate() - 1);
            startTime.setHours(6, 0, 0, 0); // 6 AM on previous day
          }
        } else {
          if (now.getHours() >= 8 || (now.getHours() === 8 && now.getMinutes() >= 30)) {
            startTime.setHours(8, 30, 0, 0); // 8:30 AM today
          } else {
            startTime.setDate(startTime.getDate() - 1);
            startTime.setHours(8, 30, 0, 0); // 8:30 AM on previous day
          }
        }
      } else {
        if (isOnRef.current === false) {
          startTime.setDate(startTime.getDate() - 1);
          startTime.setHours(6, 0, 0, 0); // 6 AM previous day
        } else {
          startTime.setDate(startTime.getDate() - 1);
          startTime.setHours(8, 30, 0, 0); // 8:30 AM previous day
        }
      }
  
      // Generate time slots for today
      if (isSameDay) {
        while (startTime <= now) {
          const hours = startTime.getHours();
          const minutes = startTime.getMinutes();
          const amPm = hours >= 12 ? "PM" : "AM";
          const formattedHour = hours % 12 || 12;
          const formattedMinutes = minutes === 0 ? "00" : minutes;
  
          const timeString = `${formattedHour}:${formattedMinutes} ${amPm}`;
          slots.push(timeString);
          startTime.setHours(startTime.getHours() + 1); // Increment by one hour
        }
      } else {
        if (isOnRef.current === false) {
          // Time slots until 6:00 AM on the next day
          const resetTime = new Date();
          resetTime.setHours(5, 0, 0, 0); // 6 AM
          while (startTime <= resetTime) {
            const hours = startTime.getHours();
            const minutes = startTime.getMinutes();
            const amPm = hours >= 12 ? "PM" : "AM";
            const formattedHour = hours % 12 || 12;
            const formattedMinutes = minutes === 0 ? "00" : minutes;
  
            const timeString = `${formattedHour}:${formattedMinutes} ${amPm}`;
            slots.push(timeString);
            startTime.setHours(startTime.getHours() + 1); // Increment by one hour
          }
        } else {
          // Time slots until 7:30 AM on the next day
          const resetTime = new Date();
          resetTime.setHours(7, 30, 0, 0); // 7:30 AM
          while (startTime <= resetTime) {
            const hours = startTime.getHours();
            const minutes = startTime.getMinutes();
            const amPm = hours >= 12 ? "PM" : "AM";
            const formattedHour = hours % 12 || 12;
            const formattedMinutes = minutes === 0 ? "00" : minutes;
  
            const timeString = `${formattedHour}:${formattedMinutes} ${amPm}`;
            slots.push(timeString);
            startTime.setHours(startTime.getHours() + 1); // Increment by one hour
          }
        }
      }
  
      setTimeSlots(slots); // Set the generated time slots to state
    };
  
    const resetTimeSlotsAtCustomTime = () => {
      const now = new Date();
      const nextResetTime = new Date();
  
      // Set reset time based on whether the switch is on or off
      if (isOnRef.current === false) {
        nextResetTime.setHours(5, 0, 0, 0); // Reset at 5 AM
      } else {
        nextResetTime.setHours(7, 30, 0, 0); // Reset at 7:30 AM
      }
  
      // If the current time is already past the reset time, schedule for the next day
      if (now > nextResetTime) {
        nextResetTime.setDate(nextResetTime.getDate() + 1);
      }
  
      const timeUntilNextReset = nextResetTime - now;
  
      resetTimeoutId = setTimeout(() => {
        generateTimeSlots(); // Regenerate time slots
        resetTimeSlotsAtCustomTime(); // Reset again after the specified time
      }, timeUntilNextReset);
    };
  
    generateTimeSlots();
    resetTimeSlotsAtCustomTime(); // Start the reset logic
  
    // Cleanup function to clear the timeout when component is unmounted or updated
    return () => {
      if (resetTimeoutId) {
        clearTimeout(resetTimeoutId); // Clear any existing timeout
      }
    };
  };
  
  

const [totavg, setTotavg] = useState(0);
useEffect(() => {
  const totalSum = data.reduce((total, item) => total + item.datas.reduce((sum, d) => sum + d, 0), 0);
  const totalItems = data.reduce((count, item) => count + item.datas.length, 0);
  const overallAverage = totalItems > 0 ? totalSum / 30 : 0;
  setTotavg(overallAverage.toFixed(2));
}, [data]);


  const getsubways = async (id,cdate) => {
    if (!cdate) {
      console.error("Date is undefined");
      return;
    }
  const formattedDate = cdate.toISOString().split("T")[0];
  const requestOptions = {
      method: "GET",
      headers: { 
      },
  };

  try {
    const response = await fetch(`https://icccapi.cscl.co.in/public/api/test?id=${id}&date=${formattedDate}`, requestOptions);
      const result = await response.json();
      if (response.ok) {
       setdata(result);
      } else {
          throw new Error(result.message || 'Error fetching messages');
      }
  } catch (error) {
      console.error('Error fetching messages:', error);
  } 
};


const [activeRow, setActiveRow] = useState(null);
const handleRowClick = (index) => {
  setActiveRow(index === activeRow ? null : index);
};


const toggleSwitch = () => {
  setIsOn((prevState) => !prevState);
};


const downloadPDF = () => {
  const todayDate = new Date();
  const formattedDate = todayDate.toLocaleDateString("en-GB");
  const todays = cdate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  const today = cdate.toISOString().split("T")[0];

  let hours = todayDate.getHours();
  const minutes = todayDate.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; 
  const formattedTime = ` ${hours}:${minutes} ${ampm}`;


  const input = document.getElementById('dataTable');

  html2canvas(input).then((canvas) => {
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 190; // Width of the image in the PDF
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    

    // Add a centered heading to the PDF
    const heading = `Rainfall Report of : ${todays}`;
    // const subHeading = 
    const subsubheading = `Avarage Rainfall: ${totavg} mm`

    pdf.setFontSize(16);
    const headingWidth = pdf.getStringUnitWidth(heading) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const headingX = (pageWidth - headingWidth) / 2; // Center the heading
    pdf.text(heading, headingX, 10); // Add the main heading

    // pdf.setFontSize(12);
    // const subHeadingWidth = pdf.getStringUnitWidth(subHeading) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    // const subHeadingX = (pageWidth - subHeadingWidth) / 2; // Center the subheading
    // pdf.text(subHeading, subHeadingX, 20); // Add the subheading with the date

    pdf.setFontSize(18);
    const subsubheadingWidth = pdf.getStringUnitWidth(subsubheading) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const subsubheadingX = (pageWidth - subsubheadingWidth) / 2; // Center the subsubheading
    pdf.text(subsubheading, subsubheadingX, 20); // Add the subheading with the date

    // Adjust image position to account for the heading
    const startPosition = 30; // Position after the headings
    pdf.addImage(imgData, 'PNG', 10, startPosition, imgWidth, imgHeight);
    heightLeft -= pageHeight - startPosition;

    while (heightLeft >= 0) {
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(today + 'rainreport.pdf');
  });
};


  return (
    <>
      <section className="pcoded-main-container bg-dark">
        <div className="pcoded-content">
          <div className="row">
                       

                        <div className="col-md-12 col-sm-12 border border-light rounded" style={{ height: '100vh', overflowY: 'auto' }}>
                          <div className="card mt-2">
                            
                            <div className="card-body table-responsive bg-dark" style={{ padding: '0' }}>
                                 <div className="row" style={{display:'flex'}}>
                               
                                <div className="col-sm-12 col-md-4 p-2" style={{display:'flex'}}>
                                  <div className='border border-light rounded p-4'>

                                  <img src="https://img.icons8.com/?size=100&id=19541&format=png&color=000000" alt="Rain Icon" style={{width: '2em', height: '2em' }}/><span className='text-light'>Avg Rain Fall</span>
                                  <h4 className='text-light'>{totavg} mm</h4>

                                  </div>

                                  <div className="row">
                                      <div className="col-12">
                                         <input type="date" 
                                          value={cdate.toISOString().split("T")[0]} 
                                          className="form-control form-control-sm text-light"
                                          onChange={handleDateChange}
                                         />
                                         
                                      </div>
                                      <div className="col-12" style={{ display: "flex", cursor: "pointer" }} onClick={toggleSwitch}>
                                      {isOn ? (
                                        <div className="text-light col-12 text-center bg-secondary border border-light rounded pt-3">
                                           08:30AM
                                          <br/>
                                          TO
                                          <br/>
                                          08:30AM
                                        </div>
                                      ) : (
                                        <div className="text-light col-12 text-center bg-secondary border border-light rounded pt-3">
                                          06:00AM
                                          <br/>
                                          TO
                                          <br/>
                                          06:00AM
                                        </div>
                                      )}
                                      </div>
                                    </div>
                               
                                </div>
                                <div
                                    className="col-sm-12 col-md-4 p-4"
                                  >
                                   <span size='md' color="light" className='col-sm-12 col-md-4 btn btn-sm btn-light pointer' onClick={downloadPDF}>Download</span>
                                </div>

                                
                                {/* <div className="  border border-light" style={{display:'flex'}}> */}
                                <table className="hide-on-mobile col-sm-12 col-md-4 table table-sm table-bordered table-card text-center font-weight-bold tablesborders float-right" style={{ padding:'0', right:'0'}}>
                                    <thead>
                                    <tr>
                                        <th style={{fontSize:'8px', padding:'1px'}}>Color</th>
                                        <th style={{fontSize:'8px', padding:'1px'}}>Classification</th>
                                        <th style={{fontSize:'8px', padding:'1px'}}>Total Rainfall (mm)</th>
                                        <th style={{fontSize:'8px', padding:'1px'}}>Hourly Rainfall (mm)</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                   
                                      <tr>
                                      <td style={{fontSize:'8px', padding:'1px'}}></td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>No Rain</td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>0</td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>0</td>
                                      </tr>
                                      <tr>
                                      <td style={{fontSize:'8px', padding:'1px', backgroundColor:'#5CDE5C'}}></td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>Very Light Rain</td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>0.1 - 2.4</td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>0.1 - 10</td>
                                      </tr>
                                      <tr>
                                      <td style={{fontSize:'8px', padding:'1px', backgroundColor:'#019E0E'}}></td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>Light Rain</td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>2.5 - 15.5</td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>10.1 - 20</td>
                                      </tr>
                                      <tr>
                                      <td style={{fontSize:'8px', padding:'1px', backgroundColor:'#EEEB3B'}}></td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>Moderate Rain</td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>15.6 - 64.4</td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>20.1 - 30</td>
                                      </tr>
                                      <tr>
                                      <td style={{fontSize:'8px', padding:'1px', backgroundColor:'#F38F15'}}></td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>Heavy Rain</td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>64.5 - 115.5</td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>30.1 - 50</td>
                                      </tr>
                                      <tr>
                                      <td style={{fontSize:'8px', padding:'1px', backgroundColor:'#F30000'}}></td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>Very Heavy Rain</td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>115.6 - 204.4</td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>50.1 - 100</td>
                                      </tr>
                                      <tr>
                                      <td style={{fontSize:'8px', padding:'1px', backgroundColor:'#A40D3A'}}></td>
                                      <td style={{fontSize:'8px', padding:'1px'}}>Extremely Heavy Rain</td>
                                      <td style={{fontSize:'8px', padding:'1px'}}> {'>204.4'}</td>
                                      <td style={{fontSize:'8px', padding:'1px'}}> {'>100.1'}</td>
                                      
                                      </tr>
                                    </tbody>
                                  </table>
                                {/* </div> */}
                              <div className="col-sm-12 col-md-12">
                               <table id="dataTable" className="table table-sm table-bordered table-hover table-active table-card table-pointer font-weight-bold tablesborders zoom-table" style={{fontSize:'12px', padding:'0'}}>
                                <thead>
                                  <tr>
                                  <th style={{fontSize:'12px', padding:'2px', backgroundColor:'#add8e6'}}>SL</th>
                                  <th style={{fontSize:'12px', padding:'2px', backgroundColor:'#add8e6'}}>Location</th>
                                  {timeSlots.map((slot, index) => (
                                    <th key={index} style={{fontSize:'12px', padding:'2px', backgroundColor:'#add8e6'}}>{slot}</th>
                                  ))}
                                  <th style={{fontSize:'12px', padding:'2px', backgroundColor:'#add8e6'}}>Total</th>
                                  </tr>
                                </thead>
                                <tbody className={activeRow !== null ? 'blurred-rows' : ''}>
                                  {data.map((data, index) => {
                                    const average = data.datas.reduce((sum, d) => sum + d, 0);
                                    // settotavg(average+totavg);
                                    return (
                                        <tr key="{index}"
                                        className={activeRow === index ? 'zoom-row' : ''}
                                        >
                                        <td style={{ fontSize: '12px', padding: '2px', backgroundColor: '#add8e6' }}>{index + 1}</td>
                                        <td onClick={() => handleRowClick(index)} style={{ fontSize: '12px', padding: '2px', backgroundColor: '#add8e6' }}>{data.name}</td>

                                        {data.datas.map((d, i) => (
                                          <td
                                          key={i}
                                          style={{
                                            fontSize: '12px',
                                            padding: '2px',
                                            backgroundColor:
                                              d > 100 ? '#A40D3A' :
                                              d > 50.1 ? '#F30000' :
                                              d > 30.1 ? '#F38F15' :
                                              d > 20.1 ? '#EEEB3B' :
                                              d > 10.1 ? '#019E0E' :
                                              d > 0.1 ? '#5CDE5C' :
                                              '#FFFFFF',
                                          }}
                                          className="zoom-cell"
                                          >
                                          {d === 0 ? '0.00' : d.toFixed(2)}
                                        </td>
                                        ))}

                                        {/* Average column with conditional background */}
                                        <td
                                        style={{
                                          fontSize: '12px',
                                          padding: '2px',
                                          backgroundColor:
                                            average > 204.4 ? '#A40D3A' :
                                            average > 115.5 ? '#F30000' :
                                            average > 64.4 ? '#F38F15' :
                                            average > 15.5 ? '#EEEB3B' :
                                            average > 2.4 ? '#019E0E' :
                                            average > 0.1 ? '#5CDE5C' :
                                            '#FFFFFF',
                                        }}
                                        className="zoom-cell"
                                        >
                                        {average.toFixed(2)}
                                                </td>
                                              </tr>
                                            );
                                          })}
                                        </tbody>
                              </table>
                              </div>
                              </div>
                              </div>

                              </div>

                              </div>

















                        </div>
                        </div>
                        </section>
                        </>
  )
};

export default Liverain;


  // const dates = () => {
  //   let resetTimeoutId = null; 
  
  //   const generateTimeSlots = () => {
  //     const slots = [];
  //     const now = new Date();
  //     const startTime = new Date();
  
  //     if (isOnRef.current === false) {
  //       if (now.getHours() >= 6) {
  //         startTime.setHours(6, 0, 0, 0);
  //       } else {
  //         startTime.setDate(startTime.getDate() - 1);
  //         startTime.setHours(6, 0, 0, 0);
  //       }
  //     } else {
  //       if (now.getHours() >= 8 || (now.getHours() === 8 && now.getMinutes() >= 30)) {
  //         startTime.setHours(8, 30, 0, 0);
  //       } else {
  //         startTime.setDate(startTime.getDate() - 1);
  //         startTime.setHours(8, 30, 0, 0);
  //       }
  //     }
  
  //     while (startTime <= now) {
  //       const hours = startTime.getHours();
  //       const minutes = startTime.getMinutes();
  //       const amPm = hours >= 12 ? "PM" : "AM";
  //       const formattedHour = hours % 12 || 12;
  //       const formattedMinutes = minutes === 0 ? "00" : minutes;
  
  //       const timeString = `${formattedHour}:${formattedMinutes} ${amPm}`;
  //       slots.push(timeString);
  //       startTime.setHours(startTime.getHours() + 1);
  //     }
  //     setTimeSlots(slots); 
  //   };
  
  //   const resetTimeSlotsAt5AM = () => {
  //     const now = new Date();
  //     const nextResetTime = new Date();
  //     nextResetTime.setHours(5, 0, 0, 0);
  
  //     if (now > nextResetTime) {
  //       nextResetTime.setDate(nextResetTime.getDate() + 1);
  //     }
  
  //     const timeUntilNextReset = nextResetTime - now;
  
  //     resetTimeoutId = setTimeout(() => {
  //       generateTimeSlots();
  //       resetTimeSlotsAt5AM();
  //     }, timeUntilNextReset);
  //   };
  
  //   generateTimeSlots();
  //   resetTimeSlotsAt5AM();

  //   return () => {
  //     if (resetTimeoutId) {
  //       clearTimeout(resetTimeoutId);
  //     }
  //   };
  // };