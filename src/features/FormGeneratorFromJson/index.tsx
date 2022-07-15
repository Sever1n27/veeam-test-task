import React from 'react';
import { useStore } from 'effector-react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
    $errorMsg,
    $showErrorMsg,
} from './model';

export const FormGeneratorFromJson = () => {
    const [tab, setTab] = React.useState(0);

    const formValues = useStore($resultFormData);
    const formGeneratorValue = useStore($formJsonInput);
    const formError = useStore($errorMsg);
    const showErrorMsg = useStore($showErrorMsg);
    const resultForm = useStore($mainForm);

    const handleTab = (event: React.SyntheticEvent, tab: number) => {
        setTab(tab);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={handleTab} aria-label='tabs'>
                    <Tab label='Config' {...a11yProps(0)} />
                    <Tab label='Result' {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
                <FormGenerator
                    submitHandler={submitForm}
                    changeHandler={changeFormInput}
                    keyDownHandler={handleKeyDown}
                    formState={formGeneratorValue}
                />
                {showErrorMsg && <Typography>{formError}</Typography>}
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Form changeHandler={handleChange} form={resultForm} formState={formValues} />
            </TabPanel>
        </Box>
    );
};
