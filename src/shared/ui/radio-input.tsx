import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export const RadioInput = () => (
    <RadioGroup aria-labelledby='demo-radio-buttons-group-label' defaultValue='female' name='radio-buttons-group'>
        <FormControlLabel value='female' control={<Radio />} label='Female' />
        <FormControlLabel value='male' control={<Radio />} label='Male' />
        <FormControlLabel value='other' control={<Radio />} label='Other' />
    </RadioGroup>
);
