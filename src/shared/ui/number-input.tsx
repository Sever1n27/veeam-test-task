import React from 'react';
import TextField from '@mui/material/TextField';
import { InputProps } from '@types';

export const NumberInput = ({ variant, name, onChange, value }: InputProps) => (
    <TextField
        onChange={onChange}
        name={name}
        variant={variant}
        value={value}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
    />
);
