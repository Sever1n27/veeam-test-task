import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DynamicInput } from '@ui';
import { MainForm } from '@types';

type Props = {
    changeHandler: (e: React.FormEvent<HTMLInputElement>) => void;
    formState: Record<string, string | boolean> | null;
    form: MainForm;
};

export const Form = ({ form, formState, changeHandler }: Props) => {
    const { title = '', items = [], buttons = [] } = form;
    return (
        <Box
            sx={{
                width: '50%',
            }}
        >
            {title && <Typography>{title}</Typography>}
            {items.map((field, i) => (
                <Stack mt={2} direction='row' key={field.name + i} alignItems='center' justifyContent='space-between'>
                    <Typography>{field.label}</Typography>
                    <DynamicInput {...field} onChange={changeHandler} value={formState?.[field.name] ?? ''} />
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
};
