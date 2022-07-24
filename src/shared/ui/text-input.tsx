import React from 'react';
import TextField from '@mui/material/TextField';
import { InputProps } from '@types';

export function TextInput({ name, variant, onChange, value }: InputProps) {
    return <TextField name={name} variant={variant} onChange={onChange} value={value} />;
}
