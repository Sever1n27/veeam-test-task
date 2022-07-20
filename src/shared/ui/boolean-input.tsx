import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { InputProps } from '@types';

type Props = InputProps & {
    checked?: boolean;
};

export const BooleanInput = ({ onChange, name, checked }: Props) => (
    <Checkbox onChange={onChange} name={name} checked={checked} />
);
