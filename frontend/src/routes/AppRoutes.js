import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManageColumns from '../pages/ManageColumns';


const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/manage-columns" element={<ManageColumns />} /> 
        </Routes>
    </Router>
);

export default AppRoutes;