import React from 'react';
import TextField from '@mui/material/TextField';
import { InputProps } from '@types';

export function NumberInput({ variant, name, onChange, value }: InputProps) {
    return (
        <TextField
            onChange={onChange}
            name={name}
            variant={variant}
            value={value}
            type='number'
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
    );
}
