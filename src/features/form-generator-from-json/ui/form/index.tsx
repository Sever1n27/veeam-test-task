import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useStore } from 'effector-react';
import { DynamicInput } from '@ui';
import { MainForm } from '@types';
import { handleChange, $resultFormData } from './model';

export function Form({ form }: { form: MainForm }) {
    const { title = '', items = [], buttons = [] } = form;
    const formValues = useStore($resultFormData);
    return (
        <Box
            sx={{
                width: '50%',
            }}
        >
            {title && <Typography>{title}</Typography>}
            {items.map((field) => (
                <Stack mt={2} direction='row' key={field.name} alignItems='center'>
                    <Box sx={{ minWidth: 250 }}>
                        <Typography>{field.label}</Typography>
                    </Box>
                    <DynamicInput {...field} onChange={handleChange} value={formValues} />
                </Stack>
            ))}
            {buttons.length && (
                <Stack direction='row' mt={2} spacing={2} justifyContent='flex-end'>
                    {buttons.map((button) => (
                        <Button variant='outlined' key={button}>
                            {button}
                        </Button>
                    ))}
                </Stack>
            )}
        </Box>
    );
}
