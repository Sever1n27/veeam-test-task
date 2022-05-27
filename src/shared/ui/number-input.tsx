import React from 'react';
import TextField from '@mui/material/TextField';

export const NumberInput = () => (
    <TextField
        id='outlined-basic'
        label='Outlined'
        variant='outlined'
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
    />
);
