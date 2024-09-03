// src/routes/AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManageColumns from '../pages/ManageColumns';
import ColumnCharts from '../pages/ColumnCharts';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ManageColumns />} />
                <Route path="/graficos" element={<ColumnCharts />} />
            </Routes>
        </Router>
    );
}

export default App;
