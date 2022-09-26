import { fork, allSettled, createEvent } from 'effector';
import {
    formGeneratorDomain,
    formSubmited,
    inputChanged,
    $jsonInputValue,
    $parsedFormJson,
    hasWrongTypes,
    validForm,
    invalidJson,
    $mainForm,
    fieldsUpdated,
} from './model';
import { formatJson } from '../../helpers';

const TEST_VALUE = 'testValue';

const event = {
    target: { value: TEST_VALUE },
} as React.ChangeEvent<HTMLTextAreaElement>;

const formEvent = { preventDefault() {} } as React.FormEvent<HTMLFormElement>;

const RIGHT_PAYLOAD_STRING =
    '{"title": "Пример формы","items": [{"type": "number","value": "0","name": "asd","label": "testnumber"}]}';

const eventWithUnformattedValue = {
    target: { value: RIGHT_PAYLOAD_STRING },
} as React.ChangeEvent<HTMLTextAreaElement>;

const eventWithWrongType = {
    target: {
        value: '{"title": "Пример формы","items": [{"type": "unknown","value": "0","name": "asd","label": "testnumber"}]}',
    },
} as React.ChangeEvent<HTMLTextAreaElement>;

const resetResults = createEvent('');
const emptyForm = createEvent({});

beforeEach(() => {
    $jsonInputValue.reset(resetResults);
    $parsedFormJson.reset(emptyForm);
});

afterEach(() => {
    $jsonInputValue.off(resetResults);
    $parsedFormJson.off(emptyForm);
});

describe('form-generator', () => {
    resetResults();
    const scope = fork(formGeneratorDomain);
    test('should change state when input changes', async () => {
        await allSettled(inputChanged, { scope, params: event });
        expect(scope.getState($jsonInputValue)).toEqual(TEST_VALUE);
    });

    test('should beautify json string after form submit', async () => {
        await allSettled(inputChanged, { scope, params: eventWithUnformattedValue });
        await allSettled(formSubmited, { scope, params: formEvent });
        expect(scope.getState($jsonInputValue)).toEqual(formatJson(JSON.parse(RIGHT_PAYLOAD_STRING), 4));
    });

    test('should parse json after form submit and change state', async () => {
        await allSettled(inputChanged, { scope, params: eventWithUnformattedValue });
        await allSettled(formSubmited, { scope, params: formEvent });
        expect(scope.getState($parsedFormJson)).toEqual(JSON.parse(RIGHT_PAYLOAD_STRING));
    });

    test('should trigger wrong type error when wrong type presents', async () => {
        const errorTriggered = jest.fn();
        hasWrongTypes.watch(errorTriggered);
        await allSettled(inputChanged, { scope, params: eventWithWrongType });
        await allSettled(formSubmited, { scope, params: formEvent });
        expect(errorTriggered).toBeCalledTimes(1);
    });

    test('should trigger invalid json error when bad string format presents', async () => {
        const errorTriggered = jest.fn();
        invalidJson.watch(errorTriggered);
        await allSettled(inputChanged, {
            scope,
            params: {
                target: {
                    value: '{"title": "Пример формы","items"": [{"type": "unknown","value": "0","name: "asd","label": "testnumber"}]}',
                },
            } as React.ChangeEvent<HTMLTextAreaElement>,
        });
        await allSettled(formSubmited, { scope, params: formEvent });
        expect(errorTriggered).toBeCalledTimes(1);
    });

    test('should trigger success message event when string accepted', async () => {
        const successTriggered = jest.fn();
        validForm.watch(successTriggered);
        await allSettled(inputChanged, { scope, params: eventWithUnformattedValue });
        await allSettled(formSubmited, { scope, params: formEvent });
        expect(successTriggered).toBeCalledTimes(1);
    });

    test('should update main form state and trigger fieldsUpdate event when correct string passed', async () => {
        const fieldsUpdateTrigger = jest.fn();
        fieldsUpdated.watch(fieldsUpdateTrigger);
        await allSettled(inputChanged, { scope, params: eventWithUnformattedValue });
        await allSettled(formSubmited, { scope, params: formEvent });
        expect(fieldsUpdateTrigger).toBeCalledTimes(1);
        expect(scope.getState($mainForm)).toEqual(JSON.parse(RIGHT_PAYLOAD_STRING));
    });
});
