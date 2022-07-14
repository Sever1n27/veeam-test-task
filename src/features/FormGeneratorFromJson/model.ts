import { createEvent, createStore, createEffect, sample } from 'effector';
import { isJsonString } from '@lib';

const INVALID_JSON_ERROR_MSG = 'not valid json string';

const TAB_WIDTH = 4;
const TAB = ' '.repeat(TAB_WIDTH);

const closeChars = new Map([
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
]);

const closeQuotes = new Map([
    ['"', '"'],
    ["'", "'"],
]);

export const submitForm = createEvent<React.FormEvent<HTMLFormElement>>();

export const changeFormInput = createEvent<React.ChangeEvent<HTMLTextAreaElement>>();

export const handleKeyDown = createEvent<React.KeyboardEvent<HTMLTextAreaElement>>();

export const updateFields = createEvent();

export const handleChange = createEvent<React.ChangeEvent<HTMLInputElement>>();

export const $errorMsg = createStore(INVALID_JSON_ERROR_MSG);

export const $showErrorMsg = createStore(false).on(changeFormInput, () => false);

export const $formJsonInput = createStore('')
    .on(changeFormInput, (_, e) => {
        return e.target.value;
    })
    .on(handleKeyDown, (_, e) => {
        const textArea = e.currentTarget;

        // handling tab
        if (e.key === 'Tab') {
            e.preventDefault();
            textArea.setRangeText(TAB, textArea.selectionStart, textArea.selectionEnd, 'end');
        }

        // handling pair brackets
        const closeChar = closeChars.get(e.key);
        if (closeChar) {
            e.preventDefault();
            textArea.setRangeText(
                e.key + '\n' + '\n' + closeChar,
                textArea.selectionStart,
                textArea.selectionEnd,
                'end',
            );
            textArea.selectionEnd = textArea.selectionEnd - 2;
            return e.currentTarget.value;
        }

        // handling pair quotes
        const closeQuote = closeQuotes.get(e.key);
        if (closeQuote) {
            e.preventDefault();
            textArea.setRangeText(e.key + closeQuote, textArea.selectionStart, textArea.selectionEnd, 'end');
            textArea.selectionEnd = textArea.selectionEnd - 1;
            return e.currentTarget.value.replace(/[']/g, '"');
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
    fn: (isValid) => !isValid,
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
    }))
    .on(submitForm, () => null);

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
