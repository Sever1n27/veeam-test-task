import { createEvent, createStore, createEffect, sample } from 'effector';
import { isJsonString } from '@lib';
import { MainForm, ComponentTypes } from '@types';
import { closeChars, closeQuotes, testJson } from './helpers';

const TAB_WIDTH = 4;
const TAB = ' '.repeat(TAB_WIDTH);
const availableComponentTypes = Object.values(ComponentTypes);

export const submitForm = createEvent<React.FormEvent<HTMLFormElement>>();
export const changeFormInput = createEvent<React.ChangeEvent<HTMLTextAreaElement>>();
export const handleKeyDown = createEvent<React.KeyboardEvent<HTMLTextAreaElement>>();
export const updateFields = createEvent<MainForm>();
export const handleChange = createEvent<React.FormEvent<HTMLInputElement>>();

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
            textArea.setRangeText(
                e.key + '\n' + '\n' + closeChar,
                textArea.selectionStart,
                textArea.selectionEnd,
                'end',
            );
            textArea.selectionEnd = textArea.selectionEnd - 2;
            return textArea.value;
        }

        // handling pair quotes and replace single quotes
        const closeQuote = closeQuotes.get(e.key);
        if (closeQuote) {
            e.preventDefault();
            textArea.setRangeText(e.key + closeQuote, textArea.selectionStart, textArea.selectionEnd, 'end');
            textArea.selectionEnd = textArea.selectionEnd - 1;
            return textArea.value.replace(/[']/g, '"');
        }
    });

export const $parsedFormJson = $formJsonInput.map((state) => (isJsonString(state) ? JSON.parse(state) : null));
export const $mainForm = createStore<MainForm>({}).on(updateFields, (_, json) => json);
const $isFormJsonValid = $formJsonInput.map((state) => isJsonString(state));

sample({
    clock: submitForm,
    filter: $isFormJsonValid,
    source: $parsedFormJson,
    target: updateFields,
});

sample({
    clock: submitForm,
    source: [$parsedFormJson, $isFormJsonValid],
    fn: ([form, isValid]) => {
        if (!isValid) return 'invalid json string';
        const items = form.items;
        const hasWrongComponentType = !items.every(({ type }: { type: ComponentTypes }) =>
            availableComponentTypes.includes(type),
        );
        const missingLabelsOrNames = !items.every(({ label, name }: { label?: string; name?: string }) =>
            Boolean(label && name),
        );
        return hasWrongComponentType
            ? 'wrong component type presents'
            : missingLabelsOrNames
            ? 'some fields missing name or label'
            : '';
    },
    target: $errorMsg,
});

sample({
    clock: submitForm,
    filter: $isFormJsonValid,
    source: $parsedFormJson.map((state) => JSON.stringify(state, null, TAB_WIDTH)),
    target: $formJsonInput,
});

submitForm.watch((e) => {
    e.preventDefault();
});

const saveFormFx = createEffect((data: MainForm | null) => {
    localStorage.setItem('form_state', JSON.stringify(data, null, TAB_WIDTH));
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
    }))
    .on(submitForm, () => null);

sample({
    clock: $resultFormData,
    target: saveFormFx,
});

sample({
    clock: updateFields,
    filter: $isFormJsonValid,
    source: $parsedFormJson.map((state) =>
        state.items.reduce(
            (acc: Record<string, string>, curr: { name: string; value: string }) => ({
                ...acc,
                [curr.name]: curr.value,
            }),
            {},
        ),
    ),
    target: $resultFormData,
});

loadFormFx();

updateFields(testJson);
