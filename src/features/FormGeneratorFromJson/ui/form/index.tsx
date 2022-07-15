import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DynamicInput } from '@ui';

type Props = {
    changeHandler: React.ChangeEventHandler<HTMLInputElement>;
    formState: any;
    title?: string;
    fields: any[];
};

export const Form = ({ title, fields = [], formState, changeHandler }: Props) => {
    return (
        <Box
            sx={{
                width: '50%',
            }}
        >
            {title && <Typography>{title}</Typography>}
            {fields.map((field, i) => (
                <Stack direction='row' key={field.name + i} alignItems='center' justifyContent='space-between'>
                    <Typography>{field.label}</Typography>
                    <DynamicInput {...field} onChange={changeHandler} value={formState?.[field.name] ?? ''} />
                </Stack>
            ))}
        </Box>
    );
};
