import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useStore } from 'effector-react';
import { submitForm, handleChange, handleKeyDown, $jsonInputValue } from './model';
import text from './text.json';

export function FormGenerator() {
    const inputValue = useStore($jsonInputValue);
    return (
        <Box
            sx={{
                width: '50%',
            }}
        >
            <form onSubmit={submitForm}>
                <Stack spacing={2}>
                    <textarea
                        cols={50}
                        rows={40}
                        name='formJson'
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <Button type='submit' variant='outlined'>
                        {text.button}
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}
