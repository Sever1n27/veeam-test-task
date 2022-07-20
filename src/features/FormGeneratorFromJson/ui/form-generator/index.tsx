import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

type Props = {
    submitHandler: React.FormEventHandler<HTMLFormElement>;
    changeHandler: React.ChangeEventHandler<HTMLTextAreaElement>;
    keyDownHandler: React.KeyboardEventHandler<HTMLTextAreaElement>;
    formState: string;
    error?: string;
};

export const FormGenerator = ({ submitHandler, changeHandler, formState, keyDownHandler, error }: Props) => {
    return (
        <Box
            sx={{
                width: '50%',
            }}
        >
            <form onSubmit={submitHandler}>
                <Stack spacing={2}>
                    <textarea
                        cols={50}
                        rows={40}
                        name='formJson'
                        value={formState}
                        onChange={changeHandler}
                        onKeyDown={keyDownHandler}
                    />
                    <Button type='submit' variant='outlined'>
                        Apply
                    </Button>
                </Stack>
            </form>
            {error && (
                <Snackbar open={true}>
                    <MuiAlert elevation={3} severity='error' sx={{ width: '100%' }}>
                        {error}
                    </MuiAlert>
                </Snackbar>
            )}
        </Box>
    );
};
