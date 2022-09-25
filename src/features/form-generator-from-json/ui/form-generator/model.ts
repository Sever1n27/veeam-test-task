import { sample, split, createDomain } from 'effector';
import { isJsonString } from '@lib';
import { MainForm } from '@types';
import { notify } from '@entities';
import {
    testJson,
    formatJson,
    hasWrongComponentType,
    missingLabelsOrNames,
    textAreaKeyHandler,
    TAB_WIDTH,
} from '../../helpers';

import text from './text.json';

const formGeneratorDomain = createDomain();
const formSubmited = formGeneratorDomain.createEvent<React.FormEvent<HTMLFormElement>>();
const inputChanged = formGeneratorDomain.createEvent<React.ChangeEvent<HTMLTextAreaElement>>();
const keyPressed = formGeneratorDomain.createEvent<React.KeyboardEvent<HTMLTextAreaElement>>();
const fieldsUpdated = formGeneratorDomain.createEvent<MainForm>();

const $jsonInputValue = formGeneratorDomain
    .createStore(JSON.stringify(testJson, null, 4))
    .on(inputChanged, (_, e) => {
        return e.target.value;
    })
    .on(keyPressed, textAreaKeyHandler);

const $mainForm = formGeneratorDomain.createStore<MainForm>({}).on(fieldsUpdated, (_, json) => json);
const $isFormJsonValid = sample({
    clock: formSubmited,
    source: $jsonInputValue,
    fn: (data) => isJsonString(data),
});

const $parsedFormJson = formGeneratorDomain.createStore<MainForm>({});

sample({
    clock: formSubmited,
    source: $jsonInputValue,
    fn: (data) => (isJsonString(data) ? JSON.parse(data) : {}),
    target: $parsedFormJson,
});

sample({
    clock: $parsedFormJson,
    filter: $isFormJsonValid,
    target: fieldsUpdated,
});

// format json in textarea after submit
sample({
    clock: formSubmited,
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

formSubmited.watch((e) => {
    e.preventDefault();
});

export {
    $mainForm,
    $isFormJsonValid,
    $parsedFormJson,
    $jsonInputValue,
    inputChanged,
    keyPressed,
    formSubmited,
    fieldsUpdated,
    formGeneratorDomain,
    invalidJson,
    hasWrongTypes,
    missingLabels,
    validForm,
};
