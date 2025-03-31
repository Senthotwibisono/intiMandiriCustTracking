import { useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from 'sweetalert2';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Home from "./home";
import Detil from "./detil";
import Manifest from "./manifest";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detil" element={<Detil />} />
        <Route path="/manifest" element={<Manifest />} />
      </Routes>
    </Router>
  );
};

export default App;
