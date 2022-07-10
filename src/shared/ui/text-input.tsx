import React from 'react';
import TextField from '@mui/material/TextField';
import { InputProps } from '@types';

export const TextInput = ({ label, name, variant, onChange, value }: InputProps) => (
    <TextField label={label} name={name} variant={variant} onChange={onChange} value={value} />
);
