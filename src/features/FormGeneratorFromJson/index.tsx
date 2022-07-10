import React from 'react';
import { useStore } from 'effector-react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel, a11yProps } from '@ui';
import { Form, FormGenerator } from './ui';
import {
    $resultFormData,
    $mainForm,
    submitForm,
    changeFormInput,
    $formJsonInput,
    handleChange,
    handleKeyDown,
} from './model';

export const FormGeneratorFromJson = () => {
    const [value, setValue] = React.useState(0);

    const formValues = useStore($resultFormData);
    const formGeneratorValue = useStore($formJsonInput);
    const { label = '', items = [] } = useStore($mainForm);

    const handleTab = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleTab} aria-label='tabs'>
                    <Tab label='Config' {...a11yProps(0)} />
                    <Tab label='Result' {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <FormGenerator
                    submitHandler={submitForm}
                    changeHandler={changeFormInput}
                    keyDownHandler={handleKeyDown}
                    formState={formGeneratorValue}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Form changeHandler={handleChange} fields={items} label={label} formState={formValues} />
            </TabPanel>
        </Box>
    );
};
