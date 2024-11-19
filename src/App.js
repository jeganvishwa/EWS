import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom'; 
import Dashboard from './pages/test';
import Railfall from './pages/rainfall';
import Flood from './pages/flood';
import Disaster from './pages/Disaster';
import Inundation from './pages/Inundation_Analysis';
import Grievance from './pages/Grievance';
import Dash from './pages/Dashboard';
import Ocean from './pages/ocean/Ocean';
import Menu from './pages/Menu';
import VideoPlayer from './pages/video';
import Imd from './pages/Imd';
import Rain from './pages/IMD/IMD/Rain';
import Pgr  from './pages/Pgr';
import './App.css'; 
import Alert_feed from './pages/Alertimageupload';
import Liverainfall from './pages/Liverainfall';
import Shelter_list from './pages/shelter_list';
import Food_list from './pages/Fooddist';
import Medical_camp from './pages/Medical_camp';
import MotorPumps from './pages/MotorPumps';
import TreeFallen from './pages/TreeFallan';
import Menu_test from './pages/menu_test';
import Liveflood from './pages/liveflood';
import Reports from './pages/reports';
import Liverain from './pages/liverain';
import { base_url } from './pages/service_token';

function ChatBox() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const location = useLocation();
  const [message, setMessage] = useState(''); 
  const [file, setFile] = useState(null); 
  const [messages, setMessages] = useState([]);
  const endOfMessagesRef = useRef(null);



  useEffect(() => {
    const storedUserData = JSON.parse(sessionStorage.getItem('userData')) || { zone: '' };
    setUserData(storedUserData);
    getmessages();
  }, []);

  const toggleChat = () => {
    setIsChatOpen(prevState => !prevState);
  };


  const handleSendMessage = async () => {
    const bareertkn = userData.token;
  
    const formData = new FormData();
    formData.append('message', message);
    if (file) {
      formData.append('file', file); 
    }
  
    const requestOptions = {
      method: "POST",
      headers: {
        
        Authorization: `Bearer ${bareertkn}`, 
      },
      body: formData, 
    };
  
    try {
      const response = await fetch(`${base_url}save_chat`, requestOptions);
      const result = await response.json();
      if (response.ok) {
        getmessages();
      } else {
        throw new Error(result.message || 'Message sending failed');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setMessage(''); 
    setFile(null); 
  };


  useEffect(() => {
    getmessages();
    const intervalId = setInterval(() => {
        getmessages();
    }, 60000); 

    return () => clearInterval(intervalId);
}, []);

useEffect(() => {
  endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  const getmessages = async () => {
    const bareertkn = userData.token;
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${bareertkn}`, 
        },
    };

    try {
        const response = await fetch(`${base_url}get_chat`, requestOptions);
        const result = await response.json();

        if (response.ok) {
            setMessages(result);
        } else {
            throw new Error(result.message || 'Error fetching messages');
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    } 
};

function formattedDate(dateString) {
  const date = new Date(dateString);
  
  // Format the date as 23-Oct-2024 06:04
  return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
  }).replace(',', '');
}



  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
    {(userData.zone !== '') && (
     
    <div className={`chat-container ${isChatOpen ? 'open' : 'closed'}`}>
      <div className="chat-header" onClick={toggleChat}>
        <h5 className='text-dark'>EWS Chatbox {isChatOpen ? '▲' : '▼'}</h5>
      </div>
      {isChatOpen && (
       <div className="chat-body">
        {(messages.length === 0) && (
            <p>Welcome to Early warning System Chat..</p>
        )}
         {(messages.length > 0) && (<div className="message-container">
      
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.user_id === userData.user_id ? 'message-left' : 'message-right'}`}
            >
              <p>
                <span className="message-sender">{msg.name}</span>: {msg.message}
              </p>
              {msg.file_name && (
                <a href={msg.file_name} target="_blank" rel="noopener noreferrer" className="file-link">
                  View File
                </a>
              )}
            <p className="float-right text-c-purple">{formattedDate(msg.created_at)}</p>
            </div>
          ))}
          <div ref={endOfMessagesRef} /> {/* Corrected this line */}
        </div>)}

       <div className='row align-items-center'>
         <div className='col-1 p-0'>
           <label className='file-input-label mt-3'>
             <input type="file" className="file-input" 
             onChange={handleFileChange} 
             />
             <i className='fa fa-paperclip'></i>
           </label>
         </div>
         <div className='col-9 p-0'>
           <input 
             type="text" 
             className="form-control" 
             placeholder="Type a message..." 
             value={message} 
             onChange={(e) => setMessage(e.target.value)} 
           />
         </div>
         <div className='col-2 p-0 mt-2'>
           <button 
             className='btn-send btn' 
             onClick={handleSendMessage}
           >
             <i className='fa fa-paper-plane text-primary'></i>
           </button>
         </div>
       </div>
     </div>
     
      )}
    </div>
    
  )}
  </>
  );

}

function AppContent({ userData }) {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const menu = () => {
    setIsActive(prev => !prev);
    console.log('Menu button clicked. Active:', !isActive);
  };

  const handlelogoutClick = () => {
    sessionStorage.removeItem('userData'); 
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('zone');
    window.location.href = '/';
  };

  return (
    <>
      {(userData.zone !== '' && location.pathname !== '/menu') && (
        <>
        <a href="/menu" id="hideme">
          <button
            type="button"
            className={`btn btn-icon btn-light btn-outline-dark menu-btn ${isActive ? 'rotate' : ''}`}
          >
            <i className="fa fa-home" />
          </button>
        </a>
        {/* <a id="hideme">
          <button
            type="button"
            className={`btn btn-icon btn-light btn-outline-dark alert-btn ${isActive ? 'rotate' : ''}`}
          >
            <i className="fa fa-bell" />
          </button>
        </a> */}
        </>
      )}

      {(userData.zone !== '') && (
      <button
      type="button"
      onClick={handlelogoutClick}
      className={`btn btn-sm btn-light btn-outline-dark logout-btn ${isActive ? 'rotate' : ''}`}
      >
      <i className="fa fa-sign-in-alt" /> logout
      </button>
      )}

      {isActive && (
        <nav className="pcoded-navbar menu-dark mcard">
          <div className="navbar-wrapper">
            <div className="navbar-content scroll-div">
              <ul className="nav pcoded-inner-navbar">
           
              </ul>
            </div>
          </div>
        </nav>
      )}

   
      <ChatBox />
    </>
  );
}

function App() {
  const [userData, setUserData] = useState({ zone: '' });

  useEffect(() => {
    const storedUserData = JSON.parse(sessionStorage.getItem('userData')) || { zone: '' };
    setUserData(storedUserData);
  }, []);

  return (
    <BrowserRouter>
      <AppContent userData={userData} />
      <Routes>
        {userData.zone === '' ? (
          <Route path="*" element={<Dashboard />} />
        ) : (
          <>
            <Route path="/menu" element={<Menu />} />
            <Route path="/rainfall" element={<Railfall />} />
            <Route path="/flood" element={<Flood />} />
            <Route path="/disaster" element={<Disaster />} />
            <Route path="/ocean" element={<Ocean />} />
            <Route path="/inundation" element={<Inundation />} />
            <Route path="/grievance" element={<Grievance />} />
            <Route path="/information" element={<Dash />} />
            <Route path="/test" element={<Imd />} />
            <Route path="/imd" element={<Rain />} />
            <Route path="/video" element={<VideoPlayer />} />
            <Route path="/pgr" element={<Pgr />} />
            <Route path="/alert" element={<Alert_feed />} />
            <Route path="/liverainfall" element={<Liverain />} />
            <Route path="/Shelter_list" element={<Shelter_list />} />
            <Route path="/Food_list" element={<Food_list />} />
            <Route path="/Medical_camp" element={<Medical_camp />} />
            <Route path="/motor_pumps" element={<MotorPumps />} />
            <Route path="/treefallen" element={<TreeFallen/>} />

            <Route path="/liveflood" element={<Liveflood />} />
            <Route path="/reports" element={<Reports />} />

            <Route path="/rainlive" element={<Liverainfall />} />

            <Route path="/menu_test" element={<Menu_test/>} />
            
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
