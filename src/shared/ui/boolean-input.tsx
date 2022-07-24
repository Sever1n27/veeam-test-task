import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { InputProps } from '@types';

type Props = InputProps & {
    checked?: boolean;
};

export function BooleanInput({ onChange, name, checked }: Props) {
    return <Checkbox onChange={onChange} name={name} checked={checked} />;
}
