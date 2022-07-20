import React from 'react';
import TextField from '@mui/material/TextField';
import { InputProps } from '@types';

export const TextInput = ({ name, variant, onChange, value }: InputProps) => (
    <TextField name={name} variant={variant} onChange={onChange} value={value} />
);
