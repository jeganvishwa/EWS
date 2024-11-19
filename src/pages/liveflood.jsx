import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { base_url } from './service_token';

function Liveflood() {
 
  const [selectedtype, setSelectedtype] = useState(null);

  function displayicon(val) {
    const selectedValue = val;
    setSelectedtype(val);

  }

  const [tabs, settabs] = useState(1);
const [subwaylist, setSubwaylist] = useState([]);
const currentDate     = '';

const switchtab = (tabNumber) => {
  settabs(tabNumber);
}

useEffect(() => {
  getsubways();
  const intervalId = setInterval(() => {
    getsubways();
  }, 60000); 
  return () => clearInterval(intervalId);
}, []); 


const getsubways = async () => {

      setSubwaylist(['']);
    const requestOptions = {
        method: "GET",
        headers: { 
        },
    };

    try {
        const response = await fetch(`${base_url}get_subways_list`, requestOptions);
        const result = await response.json();
        if (response.ok) {
            
            setSubwaylist(result);
        } else {
            throw new Error(result.message || 'Error fetching messages');
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    } 
};





const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); 
    return () => clearInterval(intervalId);
  }, []);

  const formatDateTime = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const downloadPDF = () => {
    const todayDate = new Date();
    const formattedDate = todayDate.toLocaleDateString("en-GB");
    const todays = formattedDate.replace(/\//g, "-");
    const today = formattedDate.replace(/\//g, "_");

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
      const heading = "Subway Status Report";
      const subHeading = `Generated on: ${todays + formattedTime}`;
  
      pdf.setFontSize(16);
      const headingWidth = pdf.getStringUnitWidth(heading) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      const headingX = (pageWidth - headingWidth) / 2; // Center the heading
      pdf.text(heading, headingX, 10); // Add the main heading
  
      pdf.setFontSize(12);
      const subHeadingWidth = pdf.getStringUnitWidth(subHeading) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
      const subHeadingX = (pageWidth - subHeadingWidth) / 2; // Center the subheading
      pdf.text(subHeading, subHeadingX, 20); // Add the subheading with the date
  
      // Adjust image position to account for the heading
      const startPosition = 30; // Position after the headings
      pdf.addImage(imgData, 'PNG', 10, startPosition, imgWidth, imgHeight);
      heightLeft -= pageHeight - startPosition;
  
      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save(today + 'SubwayStatus.pdf');
    });
  };
  
  


  return (
    <>
      <section className="pcoded-main-container bg-dark">
        <div className="pcoded-content">
          <div className="row">
                        <div className="col-md-2 col-sm-12 border border-light rounded" style={{background:'#ff9900', height:'100vh',overflowY: 'auto'}}>
                          <div className="mt-5">
                          <div className="mt-6 mb-3 pt-3">
                             <h3>Subway Status</h3>
                            </div>
                          <p className={`text-light pointer  menu-side ${selectedtype === 'rain' ? 'sele' : ''}`} onClick={() => displayicon('rain')}><img src="https://img.icons8.com/?size=100&id=XBWD8aL6KpGz&format=png&color=000000" alt="Rain Icon" style={{width: '2em', height: '2em' }}/> Subway Live Status</p>
                          {/* <p className={`text-light pointer  menu-side ${selectedtype === 'cctv' ? 'sele' : ''}`} onClick={() => displayicon('cctv')}><img src="https://img.icons8.com/?size=100&id=r55X8auIfVQP&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> History</p> */}
                          </div>
                        </div>

                        <div className="col-md-10 col-sm-12 border border-light rounded" style={{ height: '100vh', overflowY: 'auto' }}>
                          <div className="card mt-2">
                            <div className="card-header" style={{ backgroundColor: '#203864' }}>
                            
                              <h4 className='text-light'>Subway Live Status   <span className='text-light float-right pr-5'><span size='md' color="light" className='btn btn-sm btn-light pointer' onClick={downloadPDF}>Download</span> {formatDateTime(currentDateTime)}</span></h4>
                            </div>
                            <div className="card-body table-responsive" style={{ padding: '0' }}> {/* Remove padding around the table */}
                              <table id="dataTable" className="ml-5 table table-bordered table-center text-center table-hover table-sm" 
                               style={{
                                width: '100vh',
                                margin: '20px auto',
                                border: '1px solid black',
                                fontWeight: 'bold'
                              }}
                              >
                                <thead style={{ backgroundColor: '#d1ecf1', width: '100vh' }}>
                                  <tr  style={{  border: '1px solid black',}}>
                                    <th  style={{  border: '1px solid black',}} className='text-center'>Sl</th>
                                    <th  style={{  border: '1px solid black',}} className='text-center'>Subway</th>
                                    <th  style={{  border: '1px solid black',}} className='text-center'>Zone</th>
                                    <th  style={{  border: '1px solid black',}} className='text-center'>Ward</th>
                                    <th  style={{  border: '1px solid black',}} className='text-center'>Water Stagnation status</th>
                                    <th  style={{  border: '1px solid black',}} className='text-center'>Is Subway Closed For Traffic</th>
                                  </tr>
                                </thead>
                                <tbody style={{width: '100vh' }}>
                                  {subwaylist.length === 0 && <i className="fas fa-circle-notch fa-spin" />}
                                  {subwaylist.map((data, index) => (
                                    <tr key={data.id || index}  style={{ padding:'0px', border: '1px solid black',}}>
                                      <td  style={{ padding:'2px', border: '1px solid black',}} className='text-center'>{index + 1}</td>
                                      <td  style={{ width: '200rem',padding:'0px', border: '1px solid black',}} className='text-left'>{data.subway}
                                      </td>
                                      <td  style={{ padding:'0px', border: '1px solid black',}} className='text-center'>{data.zone > 9? data.zone : '0'+data.zone }</td>

                                      <td  style={{ padding:'0px', border: '1px solid black',}} className='text-center'>{data.ward > 99? data.ward : data.ward >9 ? '0'+data.ward : '00'+data.ward}</td>

                                      {data.id == 4? <td colSpan={2} style={{ padding:'0px', border: '1px solid black', textAlign:'center'}}>Bridge work Under Progress</td>:
                                      <>
                                      <td className={ data.water_status === 1 ? 'bg-primary text-center' : 'bg-success text-center'}  style={{ padding:'0px', border: '1px solid black',}}>
                                      {data.water_status === 1 ? 'Yes' : 'No'}
                                    </td>
                                  <td className={data.trafic_status === 1 ? 'bg-primary text-center' : 'bg-success text-center'}  style={{ padding:'0px', border: '1px solid black',}}>
                                      {data.trafic_status === 1 ? 'Yes' : 'No'}
                                    </td>
                                    </>
                                      }


                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>




            
          </div>
        </div>
      </section>




    </>
  );
}
export default Liveflood;
