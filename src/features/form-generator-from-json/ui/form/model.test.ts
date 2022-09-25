import { fork, allSettled, createEvent } from 'effector';
import { inputChanged, $form, $formValues, formDomain, saveFormFx, formInited, loadFormFx } from './model';

const resetResults = createEvent('');
const emptyForm = createEvent({});

beforeEach(() => {
    $form.reset(resetResults);
    $formValues.reset(emptyForm);
});

afterEach(() => {
    $form.off(resetResults);
    $formValues.off(emptyForm);
});

const TEST_VALUE = { value: '123', name: 'test' };
const event = {
    target: TEST_VALUE,
} as React.ChangeEvent<HTMLInputElement>;

describe('form', () => {
    resetResults();
    const mockFn = jest.fn();
    const scope = fork(formDomain, {
        handlers: new Map<any, any>([
            [saveFormFx, mockFn],
            [loadFormFx, mockFn],
        ]),
    });
    test('should change state when input changes', async () => {
        await allSettled(inputChanged, { scope, params: event });
        expect(scope.getState($formValues)).toEqual({ [TEST_VALUE.name]: TEST_VALUE.value });
    });

    test('should trigger save form effect when input changes', async () => {
        await allSettled(inputChanged, { scope, params: event });
        expect(mockFn).toHaveBeenCalled();
    });

    test('should trigger load form effect when form inited', async () => {
        await allSettled(formInited, { scope });
        expect(mockFn).toHaveBeenCalled();
    });
});
