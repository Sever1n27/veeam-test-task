import { createEvent, createStore, sample, split } from 'effector';
import { isJsonString } from '@lib';
import { MainForm } from '@types';
import { notify } from '@entities';
import {
    closeChars,
    closeQuotes,
    testJson,
    formatJson,
    hasWrongComponentType,
    missingLabelsOrNames,
} from '../../helpers';
import text from './text.json';

const TAB_WIDTH = 4;
const TAB = ' '.repeat(TAB_WIDTH);

export const submitForm = createEvent<React.FormEvent<HTMLFormElement>>();
export const handleChange = createEvent<React.ChangeEvent<HTMLTextAreaElement>>();
export const handleKeyDown = createEvent<React.KeyboardEvent<HTMLTextAreaElement>>();
export const updateFields = createEvent<MainForm | null>();

export const $jsonInputValue = createStore(JSON.stringify(testJson, null, 4))
    .on(handleChange, (_, e) => {
        return e.target.value;
    })
    .on(handleKeyDown, (_, e) => {
        const textArea = e.target;
        // handling tab
        if (e.key === 'Tab') {
            e.preventDefault();
            textArea.setRangeText(TAB, textArea.selectionStart, textArea.selectionEnd, 'end');
        }
        // handling pair brackets
        const closeChar = closeChars.get(e.key);
        if (closeChar) {
            e.preventDefault();
            textArea.setRangeText(`${e.key}\n\n${closeChar}`, textArea.selectionStart, textArea.selectionEnd, 'end');
            textArea.selectionEnd -= 2;
            return textArea.value;
        }
        // handling pair quotes and replace single quotes
        const closeQuote = closeQuotes.get(e.key);
        if (closeQuote) {
            e.preventDefault();
            textArea.setRangeText(e.key + closeQuote, textArea.selectionStart, textArea.selectionEnd, 'end');
            textArea.selectionEnd -= 1;
            return textArea.value.replace(/[']/g, '"');
        }
        return textArea.value;
    });

export const $mainForm = createStore<MainForm | null>({}).on(updateFields, (_, json) => json);
export const $isFormJsonValid = sample({
    clock: submitForm,
    source: $jsonInputValue,
    fn: (data) => isJsonString(data),
});

export const $parsedFormJson = createStore<MainForm | null>(null);

sample({
    clock: submitForm,
    source: $jsonInputValue,
    fn: (data) => (isJsonString(data) ? JSON.parse(data) : null),
    target: $parsedFormJson,
});

sample({
    clock: $parsedFormJson,
    filter: $isFormJsonValid,
    target: updateFields,
});

// format json in textarea after submit
sample({
    clock: submitForm,
    source: $parsedFormJson.map((state) => formatJson(state, TAB_WIDTH)),
    filter: $isFormJsonValid,
    target: $jsonInputValue,
});

const { invalidJson, hasWrongTypes, missingLabels, validForm } = split($parsedFormJson, {
    invalidJson: (form) => !form,
    hasWrongTypes: (form) => hasWrongComponentType(form?.items),
    missingLabels: (form) => missingLabelsOrNames(form?.items),
    validForm: (form) => Boolean(form) && !hasWrongComponentType(form?.items) && !missingLabelsOrNames(form?.items),
});

sample({
    clock: hasWrongTypes,
    target: notify.prepend(() => ({ message: text.wrongComponentMessage, type: 'error' })),
});

sample({
    clock: missingLabels,
    target: notify.prepend(() => ({ message: text.missingLabelOrNameMessage, type: 'error' })),
});

sample({
    clock: invalidJson,
    target: notify.prepend(() => ({ message: text.invalidJsonMessage, type: 'error' })),
});

sample({
    clock: validForm,
    target: notify.prepend(() => ({
        message: text.successMessage,
        type: 'success',
    })),
});

submitForm.watch((e) => {
    e.preventDefault();
});
