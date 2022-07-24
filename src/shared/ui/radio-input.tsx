import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { InputProps } from '@types';

type Props = InputProps & {
    options?: {
        value: string;
        label: string;
    }[];
};

export function RadioInput({ onChange, value, name, options }: Props) {
    return (
        <RadioGroup onChange={onChange} value={value} aria-labelledby='radio-buttons-group-label' name={name}>
            {options &&
                options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
        </RadioGroup>
    );
}
