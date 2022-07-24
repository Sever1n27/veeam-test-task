import React from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

const CustomAlert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={3} ref={ref} variant='filled' {...props} />;
});

type Props = {
    message: string;
    open: boolean;
    type?: AlertColor;
};

export function Notification({ message, open, type = 'success' }: Props) {
    return (
        <Snackbar open={open} autoHideDuration={3000}>
            <CustomAlert severity={type} sx={{ width: '100%' }}>
                {message}
            </CustomAlert>
        </Snackbar>
    );
}
