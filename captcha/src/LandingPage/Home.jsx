import  { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from 'react-webcam';
import '../../src/style.css';

/*This is where the user will be prompted to upload a selfie. 
You'll notice a moving box overlay, which is where the CAPTCHA test will occur. 
After the user uploads their selfie, they will be redirected to the validation page.*/

//useState, useEffect, useRef these are for managing the hooks basically the logic of the code
//useNavigate is for routing the user to validation after taking a selfie
//Webcam is for accessing the camera
//boxposition is for the moving box inside the camera
//webcamRef is for the webcam component
//Math.random will generate random position for the box and those position will be called setBoxPosition
//attempts will initialize the count for how many attempts left for the user

/* The box will move every 2 seconds until the user decide to click continue then he will be redirect to validation page */


function Home() {
    const [boxPosition, setBoxPosition] = useState({ top: '50%', left: '50%' });
    const [attempts] = useState(0);
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setBoxPosition({ 
                top:`${Math.random() * 70 + 15}%`,
                left:`${Math.random() * 70 + 15}%`
             });
        }, 2000);

        return () => clearInterval(interval);
    });

    const handleContinue = () => {
        
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log('Captured image:', imageSrc);
            navigate('/validation', { state: { imageSrc, boxPosition, attempts } });
        }
    };

    return (
        <div>
            <h1>Take Selfie</h1>
            <div className="webcam-container">
                <Webcam
                    className="webcam"
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
                <div
                    className="box"
                    style={{ top: boxPosition.top, left: boxPosition.left }}
                />
            </div>
            <div>
                <button onClick={handleContinue}>
                    Continue
                </button>
            </div>
        </div>
    );
}

export default Home;
