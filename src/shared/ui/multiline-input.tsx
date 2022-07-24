import React from 'react';
import TextField from '@mui/material/TextField';
import { InputProps } from '@types';

interface Props extends InputProps {
    maxRows?: number;
    minRows?: number;
}

export function MultilineInput({ variant, maxRows, minRows = 5, onChange, name, value }: Props) {
    return (
        <TextField
            variant={variant}
            multiline
            maxRows={maxRows}
            minRows={minRows}
            onChange={onChange}
            name={name}
            value={value}
        />
    );
}
