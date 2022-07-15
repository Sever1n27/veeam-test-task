import React from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { InputProps } from '@types';

export const DateInput = ({ onChange, value, name }: InputProps) => {
    return (
        <DesktopDatePicker
            label='Date desktop'
            inputFormat='MM/dd/yyyy'
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} onChange={onChange} />}
        />
    );
};
