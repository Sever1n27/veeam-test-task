import { sample, createDomain } from 'effector';
import { MainForm } from '@types';
import { formatJson, TAB_WIDTH } from '../../helpers';

const formDomain = createDomain();

const inputChanged = formDomain.createEvent<React.ChangeEvent<HTMLInputElement>>();

const formInited = formDomain.createEvent();

const saveFormFx = formDomain.createEffect((data: MainForm) => {
    localStorage.setItem('form_state', formatJson(data, TAB_WIDTH));
});

const loadFormFx = formDomain.createEffect(() => {
    const data = localStorage.getItem('form_state');
    return data ? JSON.parse(data) : null;
});

const $form = formDomain.createStore<MainForm>({});
const $formValues = formDomain
    .createStore<Record<string, string | boolean>>({})
    .on(loadFormFx.doneData, (_, result) => result)
    .on(inputChanged, (state, e) => ({
        ...state,
        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));

sample({
    clock: $formValues,
    target: saveFormFx,
});

sample({
    clock: formInited,
    target: loadFormFx,
});

formInited();

export { inputChanged, $form, $formValues, formDomain, saveFormFx, loadFormFx, formInited };
