import React from 'react';
import Box from '@mui/material/Box';

type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
};

export function TabPanel({ children, value, index }: TabPanelProps) {
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
