import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '@pages';

export function App() {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
        </Routes>
    );
}
