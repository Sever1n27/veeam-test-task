import React from 'react';
import TextField from '@mui/material/TextField';
import { InputProps } from '@types';
interface Props extends InputProps {
    maxRows?: number;
    minRows?: number;
}

export const MultilineInput = ({ label, variant, maxRows, minRows, onChange, name, value }: Props) => (
    <TextField
        label={label}
        variant={variant}
        multiline
        maxRows={maxRows}
        minRows={minRows}
        onChange={onChange}
        name={name}
        value={value}
    />
);
