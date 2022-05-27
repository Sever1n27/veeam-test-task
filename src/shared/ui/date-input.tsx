import React from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';

export const DateInput = () => {
    <DesktopDatePicker
        label='Date desktop'
        inputFormat='MM/dd/yyyy'
        value=''
        renderInput={(params) => <TextField {...params} />}
    />;
};
