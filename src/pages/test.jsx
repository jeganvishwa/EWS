import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {base_url} from '../pages/service_token';

const Dashboard = () => {
  const canvasRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let letters = 'Rain Camera Flood Water Bodies Sub Ways Relief Centre Community Centre NGOs First Responder Food Distribution Amma Unavagam Boat Deployment Shelter/night shelter Fire/ Police/Fisheries/ EB/ PWD/ Traffic Police/ NDRF';
    letters = letters.split('');

    const fontSize = 30;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }).map(() => 1);

    const draw = () => {
      // Clear only the area with letters to keep the background transparent
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drops.forEach((drop, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = '#fff';
        ctx.fillText(text, i * fontSize, drop * fontSize);
        drops[i]++;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      });
    };

    const intervalId = setInterval(draw, 150);

    return () => clearInterval(intervalId);
  }, []);


  const loginme = async (username, password) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    };
  
    try {
      const response = await fetch(`${base_url}login`, requestOptions);
      const result = await response.json();
      if (response.ok) {
        return result; 
      } else {
        throw new Error(result.message || 'Login failed'); 
      }
    } catch (error) {
      console.error(error);
      return null; 
    }
  };
  
  const handleSignin = async () => {
    setIsLoading(true); 
    const auth_data = await loginme(username, password);
    setIsLoading(false); 
    if(auth_data) {
      sessionStorage.setItem('userData', JSON.stringify({
        name: auth_data.name,
        token: auth_data.token,
        user_id: auth_data.user_id,
        zone: auth_data.zone,
        region: auth_data.region,
      }));
      sessionStorage.setItem('authToken', auth_data.token);
      sessionStorage.setItem('zone', auth_data.zone);
      window.location.href = '/menu';
    } else {
      alert('Invalid username or password');
    }
  };
  

  return (
    <>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      <div className="auth-wrapper" style={{background: 'none'}}>
        <div className="auth-content">
        <div className="card" style={{ opacity: 0.8 }}>
            <div className="row align-items-center text-center">
              <div className="col-md-12">
                <div className="card-body">
                <form
                        onSubmit={(e) => {
                          e.preventDefault(); // Prevent the form from refreshing the page
                          handleSignin(); // Trigger the login function
                        }}
                      >
                  <h4 className="mb-3 f-w-400">Signin</h4>
                  <div className="form-group mb-3">
                    <input type="text" className="form-control" id="Email" placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input type="password" className="form-control" id="Password" placeholder="Password" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)} 
                     />
                  </div>
                  {isLoading ? (
                      <div>Loading...</div> // Replace with a spinner if you have one
                    ) : (
                      <button type="submit" className="btn btn-block btn-primary mb-4" onClick={handleSignin}>
                        Signin
                      </button>
                    )}
                   </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

