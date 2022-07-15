import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { InputProps } from '@types';

type Props = InputProps & {
    value?: boolean;
};

export const BooleanInput = ({ onChange, name, value }: Props) => (
    <Checkbox onChange={onChange} name={name} checked={value} />
);
