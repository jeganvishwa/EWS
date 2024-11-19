import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Reports() {
 
  const [selectedtype, setSelectedtype] = useState('rain');
  const [today, setToday] = useState('0.0.0000');
  const [yesterday, setyesterday] = useState('0.0.0000');
  const [currenttime, setcurrenttime] = useState('0:00');
  const [onepagedata, setOnePageData] = useState({
    liveimd: 0,
    preimd:0,
    livetree:{ltbal:0,ltrem:0,lttot:0},
    pretree:{ltbal:0,ltrem:0,lttot:0},
    waterstg:{wtot:0, wrem:0, wbal:0},
    subwayst:{tot: 0, water: 0, traffic: 0},
    icccdata:{},
    pumpdata: {mavail: 0, mrun: 0, eavail: 0, erun: 0},
    jcbused:{jcb: 0, poclain: 0},
    pgrdata: {Abstract:[{TotalClosedComplaints:0,TotalComplaints:0,TotalOpenComplaints:0,"TotalRe-OpenedComplaints":0 }]},
    shelterdata:{total: 0, occupaid: 0, cleared: 0, mtotal: 0, mcleared: 0, other: 0, disableds: 0},
    fooddata:{total: 0, operation: 0, breakfast: 0, lunch: 0, dinner: 0},
    foodtodaydata:{total: 0, operation: 0, breakfast: 0, lunch: 0, dinner: 0},
    medicaldata: {till: {total: 0, cleared: 0, mtotal: 0, mcleared: 0},today: {total: 0, cleared: 0, mtotal: 0, mcleared: 0}},
    boatdata: {total: 0, cleared: 0},
    pwater: {wtot: 0, wrem: 0, wbal: 0},
    remain: {ndrf: 0, sdrf: 0, totaltrans: 0, waterlog: 0, cmwssbwork: 0, cmwssbnotwork: 0, cmwssbwork:0, mavail:0,mrun:0,poclain:0,jcb:0,erun:0,btotal:0,bstand:0,bdeployed:0}
});


const cumulativeRainfall = Array.isArray(onepagedata.icccdata)? onepagedata.icccdata.reduce((sum, num) => sum + num, 0): 0;
const highest = Array.isArray(onepagedata.icccdata)? Math.max(...onepagedata.icccdata) : '0';
const nonZeroNumbers = Array.isArray(onepagedata.icccdata)? onepagedata.icccdata.filter(num => num > 0) : 0;
const lowest = nonZeroNumbers.length > 0? Math.min(...nonZeroNumbers) : '0';


  function displayicon(val) {
    const selectedValue = val;
    setSelectedtype(val);

  }




  const getonepagedata = async () => {
  const requestOptions = {
      method: "GET",
      headers: { 
      },
  };

  try {
      const response = await fetch("https://icccapi.cscl.co.in/public/api/onepage_data", requestOptions);
      const result = await response.json();
      if (response.ok) {
        setOnePageData(result);
      } else {
          throw new Error(result.message || 'Error fetching messages');
      }
  } catch (error) {
      console.error('Error fetching messages:', error);
  } 
};



function gettoday()
{
const todayDate = new Date();
const formattedDate = todayDate.toLocaleDateString("en-GB");
setToday(formattedDate.replace(/\//g, "."));

let hours = todayDate.getHours();
const minutes = todayDate.getMinutes().toString().padStart(2, "0");
const ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12 || 12; 
const formattedTime = `${hours}:${minutes} ${ampm}`;
setcurrenttime(formattedTime);


const previousDay = new Date(todayDate);
previousDay.setDate(todayDate.getDate() - 1);
const formattedpDate = `${previousDay.getDate()}.${previousDay.getMonth() + 1}.${previousDay.getFullYear()}`;
setyesterday(formattedpDate);

}

const [tabs, settabs] = useState(1);
const [subwaylist, setSubwaylist] = useState([]);
const currentDate     = '';

const switchtab = (tabNumber) => {
  settabs(tabNumber);
}


useEffect(() => {
  getsubways();
  gettoday();
  getonepagedata();
  const intervalId = setInterval(() => {
    getsubways();
    gettoday();
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
        const response = await fetch("https://icccapi.cscl.co.in/public/api/get_subways_list", requestOptions);
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


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currenttDate, setCurrenttDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 25;
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const getboat_type = (id) => 
    {
           switch(id)
           {
             case '': return '';
             break;
             case 1: return 'Life Boat';
             break;
             case 2: return 'Dinghy';
             break;
             case 3: return 'Catamaran';
             break;
             case 4: return 'Sail Boat';
             break;
             case 5: return 'Banana Boat';
             break;
             case 6: return 'Jetboat';
             break;
             case 7: return 'Runa Boat';
             break;
             case 8: return 'Others';
             break;
             default: return 'Others';
             break;
           }
    }
  
  const handleDateChange = (e) => {
    setCurrenttDate(e.target.value);
  };
 const fetchData = async () => {
    setLoading(true);
    setError('');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const mdate = currenttDate;

    try {
      const response = await fetch(`https://icccapi.cscl.co.in/public/api/get_boat_diployment?start=${start}&end=${end}&mdate=${mdate}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage,currenttDate]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const downloadPDF = () => {
    const input = document.getElementById('dataTable');
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('table-data.pdf');
    });
  };

  const my = () => {
    const printContent = document.getElementById('dataTable').outerHTML;
    const win = window.open('', '', 'height=700,width=900');
    win.document.write('<html><head><title>Boat diplyment-Print</title>');
    win.document.write('</head><body>');
    win.document.write(printContent);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
  };

  const filteredData = data.filter(item =>
    item.zone.toString().includes(searchTerm) ||
    item.subway.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(() => {
    fetchtodayData();
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    setCurrenttDate(formattedDate);
  }, []);


  const handlemyPrintt = () => {
    const printContent = document.getElementById('print-mytable').innerHTML;
    const newWindow = window.open('', '', 'width=800, height=600');
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
                table { width: 100%; border-collapse: collapse; }
            th, td {
              border: 1px solid #000000;
              padding: 8px;
              text-align: left;
              vertical-align: middle;
            }
          </style>
        </head>
        <body>
          <div>${printContent}</div>
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };


  

    const now = new Date();
    
    // Set 8:30 AM time for comparison
    const eightThirtyAM = new Date();
    eightThirtyAM.setHours(8, 30, 0, 0);
  
    // Determine if the current time is after 8:30 AM
    const isAfterEightThirty = now >= eightThirtyAM;
  
    // Format function for `dd.mm.yyyy`
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    };
  
    // Get today’s and yesterday’s date formatted as `dd.mm.yyyy`
    const todayFormatted = formatDate(now);
    const yesterday1 = new Date(now);
    yesterday1.setDate(yesterday1.getDate() - 1);
    const yesterdayFormatted = formatDate(yesterday1);
  
    // Choose date to display
    const displayDate = isAfterEightThirty ? todayFormatted : yesterdayFormatted;

    const handlemyPrint = () => {
      window.open("https://icccapi.cscl.co.in/public/downloads/"+urldata, "_blank");
    };

    const [urldata,seturlData] = useState('');
  
    const fetchtodayData = async () => {
      setLoading(true);
      setError('');
      const requestOptions = {
          method: "GET",
          headers: {
          },
      };
  
      try {
        const response = await fetch(`https://icccapi.cscl.co.in/public/api/get_reporttoday`, requestOptions);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        seturlData(result.reportname);
        
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  

  return (
    <>
      <section className="pcoded-main-container bg-dark">
        <div className="pcoded-content">
          <div className="row">
                        <div className="col-md-2 col-sm-12 border border-light rounded" style={{background:'#ff9900', height:'100vh',overflowY: 'auto'}}>
                          <div className="mt-5">
                          <div className="mt-6 mb-3 pt-3">
                             <h3>Reports</h3>
                            </div>
                          <p className={`text-light pointer  menu-side ${selectedtype === 'rain' ? 'sele' : ''}`} onClick={() => displayicon('rain')}><img src="https://img.icons8.com/?size=100&id=m8uSNCJYoOnh&format=png&color=000000" alt="Rain Icon" style={{width: '2em', height: '2em' }}/> Onepage</p>
                          <p className={`text-light pointer  menu-side ${selectedtype === 'boat' ? 'sele' : ''}`} onClick={() => displayicon('boat')}><img src="https://img.icons8.com/?size=100&id=T7v2OgwvnpTY&format=png&color=000000" alt="UPHC Icon" style={{width: '2em', height: '2em' }}/> Boat Deployment</p>
                          </div>
                        </div>

                        <div className="col-md-10 col-sm-12 border border-light rounded" style={{ height: '100vh', overflowY: 'auto' }}>
                          <div className="card mt-2">
                            <div className="card-header" style={{ backgroundColor: '#203864' }}>
                              <h4 className='text-light'>Reports  <span className='text-light float-right pr-5'> <button className="btn btn-sm btn-primary" onClick={handlemyPrint}>Download</button> {formatDateTime(currentDateTime)}</span></h4>
                             
                            </div>
                            <div className="card-body table-responsive" style={{ padding: '0' }}>


                            {selectedtype == 'rain' && (
                              <>
                              <table border="1" className="table table-sm table-bordered table-card font-weight-bold tablesborders" style={{ width: '80%', fontSize:'18px', borderCollapse: 'collapse', borderWidth:'4px', borderColor:'#000000'}} id="print-mytable">
                                  <tbody>
                                  <tr>
                                    <td rowSpan={6} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c18c7a', width:'2rpm'}}>1</td>
                                      <td rowSpan={2} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44', width:'50px'}}>Rainfall <br/>Details<br/> (as per IMD)</td>
                                      {/* <td colSpan={5}>Rainfall during North East <br/> Monsoon <br/>(01.10.2024 to <br/> {yesterday} up to 08.30 am)</td>
                                      <td style={{backgroundColor:'#9b9ac9',textAlign:'right'}}>{onepagedata.preimd} mm</td> */}
                                    </tr>
                                    {/* <tr>
                                      <td colSpan={5}>Average Previous Day<br/> Rainfall <br />
                                      from {yesterday} (08.30 AM) to <br/> {today} (8.30 am)</td>
                                      <td style={{backgroundColor:'#9b9ac9',textAlign:'right'}}>{onepagedata.liveimd} mm</td>
                                    </tr> */}
                                    <tr>
                                      <td colSpan={5} style={{textAlign:'left'}}>Total Rainfall <br />01.10.2024 (08.30 AM) to<br/> {today} (08.30 am)
                                        </td>
                                      <td style={{backgroundColor:'#9b9ac9',textAlign:'right'}}>{onepagedata.liveimd*1+onepagedata.preimd*1} mm</td>
                                    </tr>
                                    <tr>
                                      <td rowSpan={4} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Rainfall details <br /> as per ICCC</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={5}>Rainfall from <br/>{displayDate} (8.30AM) to <br/>{today} {currenttime}</td>
                                      <td rowSpan={3} style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{(cumulativeRainfall/30).toFixed(2)} mm<br/>(cumulative)</td>
                                    </tr>
                                    <tr>
                                    <td colSpan={3}>Highest <br/>Rainfall</td>
                                    <td colSpan={2}>{highest}</td>
                                    </tr>
                                    <tr>
                                    <td colSpan={3}>Lowest <br/>Rainfall</td>
                                    <td colSpan={2}>{lowest}</td>
                                    </tr>


                                    <tr>
                                        <td rowSpan={4} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>2</td>
                                        <td rowSpan={4} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Water Stagnation Details</td>
                                        <td colSpan="3">Description</td>
                                        <td>From 01.10.2024 to {yesterday}</td>
                                        <td>Today ({today} {currenttime})</td>
                                        <td>Total</td>
                                      </tr>
                                      <tr>
                                        <td colSpan="3">Total</td>
                                        <td>{onepagedata.waterstg.wtot}</td>
                                        <td>{onepagedata.pwater.wtot}</td>
                                        <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>
                                          {onepagedata.waterstg.wtot*1 + onepagedata.pwater.wtot*1}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="3">Cleared</td>
                                        <td>
                                          {onepagedata.waterstg.wrem}
                                        </td>
                                        <td>{onepagedata.pwater.wrem}</td>
                                        <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>
                                          {onepagedata.waterstg.wrem*1 + onepagedata.pwater.wrem*1}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="3">Balance</td>
                                        <td>
                                          {onepagedata.waterstg.wbal}
                                        </td>
                                        <td>{onepagedata.pwater.wbal}</td>
                                        <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>
                                          {onepagedata.waterstg.wbal*1 + onepagedata.pwater.wbal*1}
                                        </td>
                                      </tr>

                                    <tr>
                                    <td rowSpan={4} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>3</td>
                                    <td rowSpan={4} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Tree Fallen <br/>from <br /> 01.10.2024 to <br/>{today}</td>
                                    <td colSpan={3} style={{textAlign:'left'}}>Description</td>
                                    <td>From 1.10.2024 to<br/> {yesterday}</td>
                                    <td>Today <br/>({today} {currenttime})</td>
                                    <td style={{textAlign:'left'}}>Total</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={3} style={{textAlign:'left'}}>Fallen</td>
                                      <td style={{textAlign:'left'}}>{onepagedata.pretree.lttot}</td>
                                      <td style={{textAlign:'left'}}>{onepagedata.livetree.lttot}</td>
                                      <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.pretree.lttot*1 + onepagedata.livetree.lttot*1}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={3} style={{textAlign:'left'}}>Removed</td>
                                      <td style={{textAlign:'left'}}>{onepagedata.pretree.ltrem}</td>
                                      <td style={{textAlign:'left'}}>{onepagedata.livetree.ltrem}</td>
                                      <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.pretree.ltrem*1 + onepagedata.livetree.ltrem*1}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={3} style={{textAlign:'left'}}>Balance</td>
                                      <td style={{textAlign:'left'}}>{onepagedata.pretree.ltbal}</td>
                                      <td style={{textAlign:'left'}}>{onepagedata.livetree.ltbal}</td>
                                      <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.pretree.ltbal*1 + onepagedata.livetree.ltbal*1}</td>
                                    </tr>
                                    <tr>
                                    <td rowSpan="2" style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>4</td>
                                    <td rowSpan="2" style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Subways</td>
                                    <td colSpan={3} style={{textAlign:'left'}}>Total</td>
                                    <td style={{textAlign:'left'}}>Water Stagnation</td>
                                    <td colSpan={2} style={{textAlign:'left'}}>Subway Closed <br />for Traffic</td>
                                    </tr>

                                    <tr>
                                      <td colSpan={3} style={{textAlign:'left'}}>{onepagedata.subwayst.tot}</td>
                                      <td style={{textAlign:'left'}}>{onepagedata.subwayst.water}</td>
                                      <td colSpan={2} style={{textAlign:'left'}}>{onepagedata.subwayst.traffic}</td>
                                    </tr>

                                    <tr>
                                      <td rowSpan={2} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>5</td>
                                      <td colSpan={6} style={{backgroundColor:'#cdcd44'}}>No. of Motor <br />Pumps Available</td>
                                      <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.remain.mavail}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={6} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Running Pumps<br /> (Electrical - {onepagedata.remain.erun}, <br />Mechanical - {onepagedata.remain.mrun})</td>
                                      <td  style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.remain.erun*1 + onepagedata.remain.mrun*1}</td>
                                    </tr>
                                    <tr>
                                      <td style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>6</td>
                                      <td colSpan={6} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>JCB / Poclain <br />Used</td>
                                      <td  style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.remain.jcb} / {onepagedata.remain.poclain}</td>
                                    </tr>
                                    <tr>
                                      <td rowSpan={2} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>7</td>
                                      <td rowSpan={2} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Complaints Received <br />in 1913 <br /> / GCC Control Room</td>
                                      <td colSpan={4} style={{textAlign:'left'}}>Complaint Received on <br/>15.10.2024 - {today}</td>
                                      <td style={{textAlign:'left'}}>Completed</td>
                                      <td style={{textAlign:'left'}}>Progress</td>
                                    </tr>
                                    <tr>
                                    <td colSpan={4} style={{textAlign:'left'}}>{onepagedata.pgrdata.Abstract[0]["TotalComplaints"]}</td>
                                    <td style={{textAlign:'left'}}>{onepagedata.pgrdata.Abstract[0]["TotalClosedComplaints"]}</td>
                                    <td  style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.pgrdata.Abstract[0]["TotalOpenComplaints"]*1 + onepagedata.pgrdata.Abstract[0]["TotalRe-OpenedComplaints"]*1}</td>
                                    </tr>
                                    <tr>
                                      <td style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>8</td>
                                      <td colSpan={6} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>No. of Relief Center <br />- Available</td>
                                      <td  style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.shelterdata.total}</td>
                                    </tr>
                                    <tr>
                                      <td rowSpan={4} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>9</td>
                                      <td colSpan={6} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>No. of Relief centers<br /> Occupied by People</td>
                                      <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.shelterdata.occupaid}</td>
                                      
                                    </tr>
                                    <tr>
                                    <td rowSpan={3} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Maximum No. of Persons <br />Sheltered as on {today}</td>
                                    </tr>
                                    <tr>
                                      <td style={{textAlign:'left'}}>Male</td>
                                      <td style={{textAlign:'left'}}>Female</td>
                                      <td style={{textAlign:'left'}}>Children</td>
                                      <td style={{textAlign:'left'}}>Transgender</td>
                                      <td style={{textAlign:'left'}}>Disabled</td>
                                      <td style={{textAlign:'left'}}>Total</td>
                                    </tr>
                                    <tr>
                                      <td style={{textAlign:'left'}}>{onepagedata.shelterdata.cleared}</td>
                                      <td style={{textAlign:'left'}}>{onepagedata.shelterdata.mtotal}</td>
                                      <td style={{textAlign:'left'}}>{onepagedata.shelterdata.mcleared}</td>
                                      <td style={{textAlign:'left'}}>{onepagedata.shelterdata.other}</td>
                                      <td style={{textAlign:'left'}}>{onepagedata.shelterdata.disableds}</td>
                                      <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>
                                      {onepagedata.shelterdata.cleared*1+onepagedata.shelterdata.mtotal*1+onepagedata.shelterdata.mcleared*1+onepagedata.shelterdata.other*1+onepagedata.shelterdata.disableds*1}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td rowSpan={8} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>10</td>
                                      <td colSpan={7} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Food Packets <br />Distributed - <br />15.10.2024 to {today}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={6} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>No. of cooking center</td>
                                      <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.fooddata.total}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={6} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>No. of cooking <br />center in operation</td>
                                      <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.fooddata.operation}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan={3} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}></td>
                                      <td colSpan={3} style={{textAlign:'left'}}>Till {yesterday}</td>
                                      <td style={{textAlign:'left'}}>Today ({today})</td>
                                    </tr>
                                    <tr>
                                    <td colSpan={3} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Breakfast</td>
                                    <td colSpan={3} style={{textAlign:'left'}}>{onepagedata.fooddata.breakfast}</td>
                                    <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.foodtodaydata.breakfast}</td>
                                    </tr>
                                    <tr>
                                    <td colSpan={3} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Lunch</td>
                                    <td colSpan={3} style={{textAlign:'left'}}>{onepagedata.fooddata.lunch}</td>
                                    <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.foodtodaydata.lunch}</td>
                                    </tr>
                                    <tr>
                                    <td colSpan={3} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Dinner</td>
                                    <td colSpan={3} style={{textAlign:'left'}}>{onepagedata.fooddata.dinner}</td>
                                    <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.foodtodaydata.dinner}</td>
                                    </tr>
                                    <tr>
                                    <td colSpan={3} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Total</td>
                                    <td colSpan={3} style={{textAlign:'left'}}>{onepagedata.fooddata.breakfast*1+onepagedata.fooddata.lunch*1+onepagedata.fooddata.dinner*1}</td>
                                    <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.foodtodaydata.breakfast*1+onepagedata.foodtodaydata.lunch*1+onepagedata.foodtodaydata.dinner*1}</td>
                                    </tr>
                                    <tr>
                                      <td style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c9a59a'}}></td>
                                      <td colSpan={6} className='text-right' style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c9a59a'}}> Grand Total</td>
                                        <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#c9a59a'}}>{onepagedata.fooddata.breakfast*1+onepagedata.fooddata.lunch*1+onepagedata.fooddata.dinner*1}</td>
                                    </tr>
                                    <tr>
                                      <td rowSpan={6} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>11</td>
                                      <td colSpan={7}  style={{textAlign:'left'}}> Details of <br />Medical Camps</td>
                                      </tr>
                                      <tr>
                                      <td colSpan={2} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Date</td>
                                      <td colSpan={2}>Description</td>
                                      <td style={{textAlign:'left'}}>Fixed</td>
                                      <td style={{textAlign:'left'}}>Mobile</td>
                                      <td style={{textAlign:'left'}}>Total</td>
                                      </tr>
                                      <tr>
                                        <td rowSpan={2} colSpan={2}style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Medical <br />Camps on <br />{today}</td>
                                        <td colSpan={2}>No.of Camps</td>
                                        <td style={{textAlign:'left'}}>{onepagedata.medicaldata.till.total? onepagedata.medicaldata.till.total : 0}</td>
                                    <td style={{textAlign:'left'}}>{onepagedata.medicaldata.till.mtotal? onepagedata.medicaldata.till.mtotal : 0}</td>
                                    <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.medicaldata.till.total? onepagedata.medicaldata.till.total*1 : 0 + onepagedata.medicaldata.till.mtotal? onepagedata.medicaldata.till.mtotal*1 : 0}</td>
                                      </tr>
                                      <tr>
                                      <td colSpan={2}>No. of People<br /> benefited</td>
                                      <td style={{textAlign:'left'}}>{onepagedata.medicaldata.till.cleared? onepagedata.medicaldata.till.cleared : 0}</td>
                                    <td style={{textAlign:'left'}}>{onepagedata.medicaldata.till.mcleared? onepagedata.medicaldata.till.mcleared : 0}</td>
                                    <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{onepagedata.medicaldata.till.cleared? onepagedata.medicaldata.till.cleared*1 : 0 + onepagedata.medicaldata.till.mcleared? onepagedata.medicaldata.till.mcleared*1 : 0}</td>
                                      </tr>
                                      <tr>
                                      <td rowSpan={2} colSpan={2} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>Cumulative from <br /> 15.10.2024 <br />to {yesterday}</td>
                                      <td colSpan={2}>No.of Camps</td>
                                      <td style={{textAlign:'left'}}>{onepagedata.medicaldata.today.total? onepagedata.medicaldata.today.total : 0}</td>
                                    <td style={{textAlign:'left'}}>{onepagedata.medicaldata.today.mtotal? onepagedata.medicaldata.today.mtotal : 0}</td>
                                    <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{(onepagedata.medicaldata.today.total? onepagedata.medicaldata.today.total*1 : 0) + (onepagedata.medicaldata.today.mtotal? onepagedata.medicaldata.today.mtotal*1 : 0)}</td>
                                      </tr>
                                      <tr>
                                      <td colSpan={2}>No. of People<br /> benefited</td>
                                      <td style={{textAlign:'left'}}>{onepagedata.medicaldata.today.cleared? onepagedata.medicaldata.today.cleared : 0}</td>
                                    <td style={{textAlign:'left'}}>{onepagedata.medicaldata.today.mcleared? onepagedata.medicaldata.today.mcleared : 0}</td>
                                    <td style={{textAlign:'right', verticalAlign: 'middle', backgroundColor:'#9b9ac9'}}>{(onepagedata.medicaldata.today.cleared? onepagedata.medicaldata.today.cleared*1 : 0) + (onepagedata.medicaldata.today.mcleared? onepagedata.medicaldata.today.mcleared*1 : 0)}</td>
                                      </tr>
                                    <tr>
                                      <td  style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>12</td>
                                      <td style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>No. of Boats<br /> Deployed</td>
                                        <td colSpan={6} style={{textAlign:'left'}}>Available - {onepagedata.remain.btotal} Nos<br />Deployed at site <br />{onepagedata.remain.bdeployed} Nos,<br />(Standby) - {onepagedata.remain.bstand}</td>
                                      </tr>
                                    <tr>
                                      <td  style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>13</td>
                                      <td style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>NDRF</td>
                                        <td colSpan={6} style={{textAlign:'left'}}>{onepagedata.remain.ndrf==0? '-' : onepagedata.remain.ndrf}</td>
                                      </tr>
                                    <tr>
                                      <td  style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>14</td>
                                      <td style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>SDRF</td>
                                        <td colSpan={6} style={{textAlign:'left'}}>{onepagedata.remain.sdrf==0? '-' : onepagedata.remain.sdrf}</td>
                                      </tr>
                                    <tr>
                                      <td  style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>15</td>
                                      <td style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>TNEB Power <br />Outages</td>
                                        <td colSpan={6} style={{textAlign:'left'}}>Total Distribution<br /> Transformers - {onepagedata.remain.totaltrans} Nos<br />Shutdown due <br />to Water Logging – {onepagedata.remain.waterlog == 0? 'Nil' : onepagedata.remain.waterlog}</td>
                                      </tr>
                                    <tr>
                                      <td rowSpan={2}  style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#c18c7a'}}>16</td>
                                      <td rowSpan={2} style={{textAlign:'left', verticalAlign: 'middle', backgroundColor:'#cdcd44'}}>CMWSSB <br />Sewage <br />Pumping Station <br />Status <br /> (Total - {onepagedata.remain.cmwssbwork*1+onepagedata.remain.cmwssbnotwork*1})</td>
                                      <td colSpan={2} style={{textAlign:'left'}}>Working</td>
                                      <td colSpan={4} style={{textAlign:'left'}}>{onepagedata.remain.cmwssbwork == 0? 'Nil' : onepagedata.remain.cmwssbwork}</td>
                                      </tr>
                                      <tr>
                                      <td colSpan={2} style={{textAlign:'left'}}>Not <br />Working</td>
                                      <td colSpan={4} style={{textAlign:'left'}}>{onepagedata.remain.cmwssbnotwork == 0? 'Nil' : onepagedata.remain.cmwssbnotwork}</td>
                                      </tr>
                                    
                                  </tbody>
                                 
                                </table>

                               
                                </>
                                )}


{selectedtype == 'boat' && (
                              <> <div className='row d-flex'>
                <div className='col-sm-12 col-md-2 mb-1'>
                  <input 
                    type="date" 
                    value={currenttDate}  
                    className='float-end' 
                    size="sm" 
                    placeholder="date" 
                    onChange={handleDateChange}
                  />
                </div>

                <div className='col-sm-12 col-md-8 mb-1'>
                <div className="row justify-content-end">
                  <div className='col-sm-12 col-md-8 mb-1'>
                    <div className="d-flex justify-content-end">
                      <span className='mr-3'>
                        <button size='md' color="primary" className='btn-sm' onClick={downloadPDF}>PDF</button>
                      </span>
                      <span className='mr-3'>
                        <button size='md' color="secondary" className='btn-sm' onClick={my}>Print</button>
                      </span>
                    </div>
                  </div>
                </div>
                  </div>
               
   <div className="col-12 p-0">
  <div style={{ overflowX: 'auto' }} className='d-flex'> {/* Wrapper for responsiveness */}
    <table className="table table-bordered table-hover text-left text-xs w-100 justify-content-between mt-3" id="dataTable">
      <thead className="bg-info text-white">
        <tr>
          <th>Sl</th>
          <th>Date</th>
          <th>Time</th>
          <th>Zone</th>
          <th>Division</th>
          <th>Boat Type</th>
          <th>Inundation(ft)</th>
          <th>No of Boat</th>
          <th>People Evacuated</th>
          <th>Place</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="10" className="text-left">
              <div className="spinner-grow text-info" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </td>
          </tr>
        ) : error ? (
          <tr>
            <td colSpan="10" className="text-left">
              <div className="alert alert-danger">{error}</div>
            </td>
          </tr>
        ) : filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <tr key={item.id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.zone}</td>
              <td>{item.division}</td>
              <td>{getboat_type(item.boatType)}</td>
              <td>{item.Inundation} Ft</td>
              <td>{item.no_boat}</td>
              <td>{item.people_evacated} No's</td>
              <td>{item.place}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="10" className="text-left">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  <div className="d-flex justify-content-between mt-3">
    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
    <button onClick={handleNextPage}>Next</button>
  </div>
</div>

              </div>
              </>

            )}
                            </div>

                          </div>
                        </div>




            
          </div>
        </div>
      </section>




    </>
  );
}
export default Reports;
