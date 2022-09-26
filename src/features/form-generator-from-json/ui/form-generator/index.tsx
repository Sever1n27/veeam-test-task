import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useStore } from 'effector-react';
import { ComponentTypes } from '@types';
import { formSubmited, inputChanged, keyPressed, $jsonInputValue } from './model';
import text from './text.json';

export function FormGenerator() {
    const inputValue = useStore($jsonInputValue);
    return (
        <>
            <Box
                sx={{
                    width: '50%',
                }}
            >
                <form onSubmit={formSubmited}>
                    <Stack spacing={2}>
                        <textarea
                            cols={50}
                            rows={40}
                            name='formJson'
                            value={inputValue}
                            onChange={inputChanged}
                            onKeyDown={keyPressed}
                        />
                        <Button type='submit' variant='outlined'>
                            {text.button}
                        </Button>
                    </Stack>
                </form>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: 80,
                    right: 20,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.600'),
                    color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.50'),
                    border: '1px solid',
                    borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
                    p: 2,
                    borderRadius: 2,
                }}
            >
                <Stack spacing={2} marginBottom={2}>
                    <Typography>Available components tip:</Typography>
                </Stack>
                <Stack spacing={1}>
                    {Object.values(ComponentTypes).map((component) => (
                        <Typography key={component}>{component}</Typography>
                    ))}
                </Stack>
            </Box>
        </>
    );
}
