import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './LandingPage/Home';
import Validation from './ValidationPage/Validation';
import Result from './ResultPage/Result';
/* This is where the routing takes place. I designed it this way to make routing between pages easier and cleaner. 
Each page is imported here, allowing us to set up routes for them. */

//react-router-dom is for routing functionalities
// Validation, Home, Result are different pages to where the user is redirected


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/validation" element={<Validation />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
