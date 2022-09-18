import { createEvent, createStore, createEffect, sample } from 'effector';
import { MainForm } from '@types';
import { formatJson } from '../../helpers';

const TAB_WIDTH = 4;

const inputChanged = createEvent<React.FormEvent<HTMLInputElement>>();

const saveFormFx = createEffect((data: MainForm) => {
    localStorage.setItem('form_state', formatJson(data, TAB_WIDTH));
});
const loadFormFx = createEffect(() => {
    const data = localStorage.getItem('form_state');
    return data ? JSON.parse(data) : null;
});

const $form = createStore<MainForm>({});
const $formValues = createStore<Record<string, string | boolean>>({})
    .on(loadFormFx.doneData, (_, result) => result)
    .on(inputChanged, (state, e) => ({
        ...state,
        [e.currentTarget.name]: e.currentTarget.type === 'checkbox' ? e.currentTarget.checked : e.currentTarget.value,
    }));

sample({
    clock: $formValues,
    target: saveFormFx,
});

loadFormFx();

export { inputChanged, $form, $formValues };
