import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <App />
        </LocalizationProvider>
    </BrowserRouter>,
);

if (module.hot) {
    module.hot.accept();
}
