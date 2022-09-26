import React from 'react';
import { useStore } from 'effector-react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel, a11yProps } from '@ui';
import { Form, FormGenerator } from './ui';
import { fieldsUpdated, $mainForm } from './model';
import { testJson } from './helpers';

fieldsUpdated(testJson);

export function FormGeneratorFromJson() {
    const [currentTab, setTab] = React.useState(0);
    const form = useStore($mainForm);
    const handleTab = (event: React.SyntheticEvent, tab: number) => {
        setTab(tab);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currentTab} onChange={handleTab} aria-label='tabs'>
                    <Tab label='Config' {...a11yProps(0)} />
                    <Tab label='Result' {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={currentTab} index={0}>
                <FormGenerator />
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                {form && <Form form={form} />}
            </TabPanel>
        </Box>
    );
}
