import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DynamicInput } from '@ui';
import styles from './form.module.scss';

type Props = {
    changeHandler: React.ChangeEventHandler<HTMLInputElement>;
    formState: any;
    label?: string;
    fields: any[];
};

export const Form = ({ label, fields = [], formState, changeHandler }: Props) => {
    return (
        <Box>
            {fields.map((field, i) => (
                <Stack direction='row' key={field.name + i} alignItems='center'>
                    <Typography className={styles.label}>{field.label}</Typography>
                    <DynamicInput {...field} onChange={changeHandler} value={formState?.[field.name] ?? ''} />
                </Stack>
            ))}
        </Box>
    );
};
