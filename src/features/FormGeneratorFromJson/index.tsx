import React from 'react';
import { useStore } from 'effector-react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel, a11yProps, Notification } from '@ui';
import { Form, FormGenerator } from './ui';
import {
    $resultFormData,
    $mainForm,
    submitForm,
    changeFormInput,
    $formJsonInput,
    handleChange,
    handleKeyDown,
    $errorMsg,
    successMessage,
    $showSuccessMessage,
    $showErrorMessage,
} from './model';

export function FormGeneratorFromJson() {
    const [currentTab, setTab] = React.useState(0);
    const formValues = useStore($resultFormData);
    const formGeneratorValue = useStore($formJsonInput);
    const formError = useStore($errorMsg);
    const showSuccessMessage = useStore($showSuccessMessage);
    const showErrorMessage = useStore($showErrorMessage);
    const resultForm = useStore($mainForm);

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
                <FormGenerator
                    submitHandler={submitForm}
                    changeHandler={changeFormInput}
                    keyDownHandler={handleKeyDown}
                    formState={formGeneratorValue}
                />
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                <Form changeHandler={handleChange} form={resultForm} formState={formValues} />
            </TabPanel>
            {formError && <Notification message={formError} type='error' open={showErrorMessage} />}
            <Notification message={successMessage} type='success' open={showSuccessMessage} />
        </Box>
    );
}
