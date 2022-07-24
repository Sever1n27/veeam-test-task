import { createEvent, createStore, createEffect, sample, combine } from 'effector';
import { debounce } from 'patronum/debounce';
import { isJsonString } from '@lib';
import { MainForm, Field } from '@types';
import { closeChars, closeQuotes, testJson, hasWrongComponentType, missingLabelsOrNames, formatJson } from './helpers';

const TAB_WIDTH = 4;
const TAB = ' '.repeat(TAB_WIDTH);
const NOTIFICATION_TIMEOUT = 4000;
export const successMessage = 'form succesfully generated u can see it in Result tab';

export const submitForm = createEvent<React.FormEvent<HTMLFormElement>>();
export const changeFormInput = createEvent<React.ChangeEvent<HTMLTextAreaElement>>();
export const handleKeyDown = createEvent<React.KeyboardEvent<HTMLTextAreaElement>>();
export const updateFields = createEvent<MainForm>();
export const handleChange = createEvent<React.FormEvent<HTMLInputElement>>();
export const showError = createEvent();
export const showSuccess = createEvent();

export const hideNotifications = createEvent();
const delayedHide = debounce({ source: hideNotifications, timeout: NOTIFICATION_TIMEOUT });

export const $showSuccessMessage = createStore(false)
    .on(showSuccess, () => true)
    .on(changeFormInput, () => false)
    .on(delayedHide, () => false);
export const $showErrorMessage = createStore(false)
    .on(showError, () => true)
    .on(changeFormInput, () => false)
    .on(delayedHide, () => false);
export const $errorMsg = createStore('').on(changeFormInput, () => '');
export const $formJsonInput = createStore(JSON.stringify(testJson, null, 4))
    .on(changeFormInput, (_, e) => {
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

export const $parsedFormJson = $formJsonInput.map((state) => (isJsonString(state) ? JSON.parse(state) : null));
export const $mainForm = createStore<MainForm>({}).on(updateFields, (_, json) => json);
const $isFormJsonValid = $formJsonInput.map((state) => isJsonString(state));
const $isValidForm = combine($isFormJsonValid, $errorMsg, (isValid, error) => isValid && !error);

sample({
    clock: [$showErrorMessage, $showSuccessMessage],
    target: hideNotifications,
});

sample({
    clock: submitForm,
    source: $parsedFormJson,
    filter: $isValidForm,
    target: updateFields,
});

sample({
    clock: submitForm,
    source: [$parsedFormJson, $isFormJsonValid],
    fn: ([form, isValid]) => {
        if (!isValid) return 'invalid json string';
        const { items }: { items: Field[] } = form;
        if (hasWrongComponentType(items)) {
            return 'wrong component type presents';
        }
        if (missingLabelsOrNames(items)) {
            return 'some fields missing name or label';
        }
        return '';
    },
    target: $errorMsg,
});

// format json in textarea after submit
sample({
    clock: submitForm,
    source: $parsedFormJson.map((state) => formatJson(state, TAB_WIDTH)),
    filter: $isValidForm,
    target: $formJsonInput,
});

sample({
    clock: submitForm,
    filter: $isValidForm,
    target: showSuccess,
});

sample({
    clock: submitForm,
    filter: $isValidForm.map((isValid) => !isValid),
    target: showError,
});

submitForm.watch((e) => {
    e.preventDefault();
});

const saveFormFx = createEffect((data: MainForm | null) => {
    localStorage.setItem('form_state', formatJson(data, TAB_WIDTH));
});
const loadFormFx = createEffect(() => {
    const data = localStorage.getItem('form_state');
    return data ? JSON.parse(data) : null;
});

export const $resultFormData = createStore<Record<string, string | boolean> | null>(null)
    .on(loadFormFx.doneData, (_, result) => result)
    .on(handleChange, (state, e) => ({
        ...state,
        [e.currentTarget.name]: e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value,
    }));

sample({
    clock: $resultFormData,
    target: saveFormFx,
});

sample({
    clock: updateFields,
    source: $parsedFormJson.map((state) =>
        state?.items?.reduce(
            (acc: Record<string, string>, curr: { name: string; value: string }) => ({
                ...acc,
                [curr.name]: curr.value,
            }),
            {},
        ),
    ),
    filter: $isValidForm,
    target: $resultFormData,
});

loadFormFx();

updateFields(testJson);
