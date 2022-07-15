import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { InputProps } from '@types';

type Props = InputProps & {
    options: {
        value: string;
        label: string;
    }[];
};

export const RadioInput = ({ onChange, value, name, options }: Props) => (
    <RadioGroup onChange={onChange} value={value} aria-labelledby='demo-radio-buttons-group-label' name={name}>
        {options.map(({ value, label }) => (
            <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
        ))}
    </RadioGroup>
);
