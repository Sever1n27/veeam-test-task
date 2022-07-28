import { createEvent, createStore, createEffect, sample } from 'effector';
import { MainForm } from '@types';
import { formatJson } from '../../helpers';

const TAB_WIDTH = 4;

export const handleChange = createEvent<React.FormEvent<HTMLInputElement>>();

const saveFormFx = createEffect((data: MainForm | null) => {
    localStorage.setItem('form_state', formatJson(data, TAB_WIDTH));
});
const loadFormFx = createEffect(() => {
    const data = localStorage.getItem('form_state');
    return data ? JSON.parse(data) : null;
});

export const $form = createStore<MainForm>({});
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

loadFormFx();
