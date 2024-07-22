import { useLocation, useNavigate } from 'react-router-dom';
import '../../src/style.css';
import { useState, useEffect } from 'react';

/*This is where the selfie is uploaded after the user clicks 'Continue'. 
This is also where the CAPTCHA test begins the user will be asked to select certain shapes within the box.*/

//useLocation is for transfering the selfie photo to validation and useNavigation is used to navigate the use to result
//watermarkedBox it will track the boxes with watermark
//selectedBox this will track the user where he selects the box
//targetShape this is will tell the user what shape he needs to select to pass the captcha
//The useEffect hook randomly assigns watermarks to half of the grid sectors and randomly selects a target shape.
//The handleShapeClick function toggles the selection of sectors.
//maxattempt will be the users max attempt to solve the captcha 
//remainingattempt will be the remaining attempts left for the user

function Validation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { imageSrc, boxPosition, attempts = 0 } = location.state || {};

    const rows = 4;
    const cols = 4;

    const [watermarkedSectors, setWatermarkedSectors] = useState([]);
    const [selectedSectors, setSelectedSectors] = useState([]);
    const [targetShape, setTargetShape] = useState(null);
    const maxAttempts = 3;
    const remainingAttempts = maxAttempts - attempts;

    useEffect(() => {
        const totalSectors = rows * cols;
        const numberOfWatermarks = Math.floor(totalSectors / 2);
        const sectors = [];

        while (sectors.length < numberOfWatermarks) {
            const randomSector = Math.floor(Math.random() * totalSectors);
            if (!sectors.includes(randomSector)) {
                sectors.push(randomSector);
            }
        }

        const shapes = ['triangle', 'square', 'circle'];
        const watermarked = sectors.map(sector => ({
            index: sector,
            shape: shapes[Math.floor(Math.random() * shapes.length)]
        }));

        setWatermarkedSectors(watermarked);

        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        setTargetShape(randomShape);
    }, []);

    const handleShapeClick = (index) => {
        if (selectedSectors.includes(index)) {
            setSelectedSectors(selectedSectors.filter(sector => sector !== index));
        } else {
            setSelectedSectors([...selectedSectors, index]);
        }
    };

    const handleValidate = () => {
        navigate('/result', {
            state: {
                targetShape,
                watermarkedSectors,
                selectedSectors,
                attempts: attempts + 1,
                imageSrc,
                boxPosition
            }
        });
    };

    return (
        <div>
            <h1>Validation</h1>
            <p>Attempts left: {remainingAttempts}</p>
            {targetShape && <p>Please select all sectors with a {targetShape}</p>}
            {imageSrc && (
                <div className="webcam-container">
                    <img src={imageSrc} alt="Captured" className="captured-image" />
                    <div
                        className="validation-box"
                        style={{ top: boxPosition.top, left: boxPosition.left }}
                    >
                        {Array.from({ length: rows - 1 }).map((_, i) => (
                            <div
                                key={`h-line-${i}`}
                                className="horizontal-line"
                                style={{ top: `${((i + 1) / rows) * 100}%` }}
                            />
                        ))}
                        {Array.from({ length: cols - 1 }).map((_, i) => (
                            <div
                                key={`v-line-${i}`}
                                className="vertical-line"
                                style={{ left: `${((i + 1) / cols) * 100}%` }}
                            />
                        ))}
                        {watermarkedSectors.map(({ index, shape }) => {
                            const row = Math.floor(index / cols);
                            const col = index % cols;
                            const top = `${(row / rows) * 100}%`;
                            const left = `${(col / cols) * 100}%`;
                            const width = `${100 / cols}%`;
                            const height = `${100 / rows}%`;
                            return (
                                <div
                                    key={index}
                                    className={`watermark ${shape} ${selectedSectors.includes(index) ? 'selected' : ''}`}
                                    style={{ top, left, width, height }}
                                    onClick={() => handleShapeClick(index)}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
            <button onClick={handleValidate} disabled={remainingAttempts <= 0}>Validate</button>
        </div>
    );
}

export default Validation;
