import React from 'react';
import TextField from '@mui/material/TextField';
import { InputProps } from '@types';

export function DateInput({ onChange, value, name }: InputProps) {
    return (
        <TextField
            type='date'
            value={value}
            name={name}
            sx={{ width: 220 }}
            onChange={onChange}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
}
