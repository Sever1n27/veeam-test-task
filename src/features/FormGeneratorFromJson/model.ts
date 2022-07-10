import { createEvent, createStore, createEffect, sample } from 'effector';
import { isJsonString } from 'shared/lib';

const INVALID_JSON_ERROR_MSG = 'not valid json string';

export const submitForm = createEvent<React.FormEvent<HTMLFormElement>>();

export const changeFormInput = createEvent<React.ChangeEvent<HTMLTextAreaElement>>();

export const handleKeyDown = createEvent<React.KeyboardEvent<HTMLTextAreaElement>>();

export const updateFields = createEvent();

export const handleChange = createEvent<React.ChangeEvent<HTMLInputElement>>();

export const $errorMsg = createStore(INVALID_JSON_ERROR_MSG);

export const $showErrorMsg = createStore(false);

export const $formJsonInput = createStore('')
    .on(changeFormInput, (_, e) => e.target.value)
    .on(handleKeyDown, (_, e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const textArea = e.currentTarget;
            textArea.setRangeText('\t', textArea.selectionStart, textArea.selectionEnd, 'end');
        }
    });

export const $parsedFormJson = $formJsonInput.map((state) => (isJsonString(state) ? JSON.parse(state) : null));

export const $mainForm = createStore({}).on(updateFields, (_, json) => json);

const $isFormJsonValid = $formJsonInput.map((state) => isJsonString(state));

sample({
    clock: submitForm,
    filter: $isFormJsonValid,
    source: $parsedFormJson,
    target: updateFields,
});

sample({
    clock: submitForm,
    source: $isFormJsonValid,
    fn: (_, isValidJson) => !isValidJson,
    target: $showErrorMsg,
});

sample({
    clock: submitForm,
    filter: $isFormJsonValid,
    source: $parsedFormJson.map((state) => JSON.stringify(state, undefined, 4)),
    target: $formJsonInput,
});

submitForm.watch((e) => {
    e.preventDefault();
});

const saveFormFx = createEffect((data) => {
    localStorage.setItem('form_state', JSON.stringify(data, null, 4));
});
export const loadFormFx = createEffect(() => {
    return JSON.parse(localStorage.getItem('form_state'));
});

export const $resultFormData = createStore(null)
    .on(loadFormFx.doneData, (_, result) => result)
    .on(handleChange, (state, e) => ({
        ...state,
        [e.currentTarget.name]: e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value,
    }));

sample({
    clock: $resultFormData,
    target: saveFormFx,
});

loadFormFx();

const testJson = {
    items: [
        {
            type: 'text',
            value: '0',
            name: 'asd',
            label: '123123',
        },
        {
            type: 'checkbox',
            checked: false,
            name: 'asd5',
            label: 'checkboxxxxx',
        },
        {
            type: 'multiline',
            value: '4',
            name: 'xddddd',
            label: 'multilineinput',
        },
    ],
};

updateFields(testJson);

$resultFormData.watch((state) => console.log(state));

$parsedFormJson.watch((state) => console.log(state));

$isFormJsonValid.watch((state) => console.log('valid', state));

$showErrorMsg.watch((state) => console.log('error', state));
