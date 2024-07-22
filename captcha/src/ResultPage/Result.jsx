import { useLocation, useNavigate } from 'react-router-dom';
import '../../src/style.css';

/* This where the results will be shown whether you pass or fail and here is also where you can click retry if you fail the test */

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { targetShape, watermarkedSectors, selectedSectors, attempts, imageSrc, boxPosition } = location.state || {};

  const correctSectors = watermarkedSectors
    .filter(sector => sector.shape === targetShape)
    .map(sector => sector.index);

  const passed = selectedSectors.length === correctSectors.length &&
                 selectedSectors.every(sector => correctSectors.includes(sector));

  const maxAttempts = 3; 

  const handleRetry = () => {
    navigate('/validation', {
      state: {
        imageSrc, 
        boxPosition, 
        attempts 
      }
    });
  };

  return (
    <div>
      <h1>Validation Result</h1>
      {passed ? (
        <p>You passed the CAPTCHA test!</p>
      ) : (
        <p>You failed the CAPTCHA test. {attempts < maxAttempts ? 'Try again.' : 'You have been blocked.'}</p>
      )}
      {!passed && attempts < maxAttempts && (
        <button onClick={handleRetry}>Retry</button>
      )}
    </div>
  );
}

export default Result;
