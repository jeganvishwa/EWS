import React, { useEffect, useState } from 'react';


function Alert_feed() {

        const [selectedCamera, setSelectedCamera] = useState('');
        const [selectedFile, setSelectedFile] = useState(null);
        const [fileName, setFileName] = useState('');
        const [camlist, setcamlist] = useState([]);
        const [alertlist, setalertlist] = useState([]);

        const handleCameraChange = (e) => {
            setSelectedCamera(e.target.value);
        };
        

        const handleFileChange = (e) => {
            const file = e.target.files[0];
    
            // Validate if the file is an image
            const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (file && !allowedFileTypes.includes(file.type)) {
                alert('Only image files (JPEG, PNG, GIF) are allowed.');
                return;
            }
    
            if (file) {
                setSelectedFile(file);
                setFileName(file.name);
            }
        };

        const handleUpload = async () => {
            if (!selectedCamera || !selectedFile) {
                alert('Please select a camera and a file.');
                return;
            }
            const formData = new FormData();
            formData.append('camera_id', selectedCamera);
            formData.append('file', selectedFile);
            try {
                const response = await fetch('https://icccapi.cscl.co.in/public/api/save_camimage', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    setFileName('');
                    setSelectedCamera('');
                    alert('File uploaded successfully!');
                } else {
                    alert('Failed to upload the file.');
                }
            } catch (error) {
                console.error('Error uploading the file:', error);
                alert('Error uploading the file.');
            }
        };


        const formatDate = (dateString) => {
            const date = new Date(dateString);
        
            const options = { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: false 
            };
        
            const formattedDate = date.toLocaleString('en-IN', options).replace(',', ''); 
            return formattedDate;
        };



        useEffect(() => {
            fetchBoatData();
        },[])

        async function fetchBoatData() {
            try {
                setcamlist([]);
                const response = await fetch("https://icccapi.cscl.co.in/public/api/view_cams");
                const result = await response.json();
                setcamlist(result); 
            } catch (error) {
                console.error("Error fetching boat data:", error);
            }
          } 



          async function fetchdata_images() {
            try {
                setalertlist([]);
                const response = await fetch("https://icccapi.cscl.co.in/public/api/view_alerts");
                const result = await response.json();
                setalertlist(result); 
            } catch (error) {
                console.error("Error fetching boat data:", error);
            }
          } 


          
        useEffect(() => {
            fetchdata_images();
        },[fileName])

    return (
        <>
          <section className="pcoded-main-container bg-dark">
            <div className="pcoded-content">
                <div className="mt-5">N</div>
              <div className="row mt-3">

                <div className="col-md-6 col-sm-12">

                    <div className="card bg-light">
                        <div className="card-header bg-info">
                            <h5>Alert Upload</h5>
                        </div>
                        <div className="card-body">

                        <div className="input-group mb-3">
                        <select className="custom-select" id="inputGroupSelect01" onChange={handleCameraChange}>
                            <option value="" selected={true}>Select camera</option>
                            {camlist.map((cam, index) => (
                                <option key={index} value={cam.id}>
                                    {cam.asset_name}
                                </option>
                            ))}
                        </select>
                        </div>

                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="validatedCustomFile"
                             required
                              accept="image/*"
                             onChange={handleFileChange} />
                             <label className="custom-file-label" htmlFor="validatedCustomFile">
                              {fileName || 'Choose file...'}
                             </label>
                        </div>

                        </div>

                        <div className="card-footer">
                        <button type="button" className='float-right text-right btn btn-sm btn-primary'  onClick={handleUpload}>Upload</button>
						</div>

                    </div>

                </div>

                <div className="col-md-6 col-sm-12">

                {alertlist.map((alert, index) => (
    <div className="card bg-light" key={index}>
        <div className="card-header bg-info">
            <h5>{alert.asset_name}</h5>
            <span className='float-right'>{formatDate(alert.created_at.date)}</span>
        </div>
        <div className="card-body">
            <img 
                src={`https://115.124.111.196/${alert.image_name}`} 
                alt="" 
                style={{height:'20', width:'100%'}}
            />
        </div>
    </div>
))}


                 </div>
                </div>
            </div>
        </section>

               </>)

}


export default Alert_feed;