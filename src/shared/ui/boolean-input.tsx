import React from 'react';
import Checkbox from '@mui/material/Checkbox';

export const BooleanInput = ({ onChange, name, value }) => <Checkbox onChange={onChange} name={name} checked={value} />;
