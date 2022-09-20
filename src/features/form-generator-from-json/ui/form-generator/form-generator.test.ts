import { fork, allSettled, createEvent } from 'effector';
import { formGeneratorDomain, formSubmited, inputChanged, $jsonInputValue, $parsedFormJson } from './model';
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

const resetResults = createEvent('');

beforeAll(() => {
    $jsonInputValue.reset(resetResults);
});

afterAll(() => {
    $jsonInputValue.off(resetResults);
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
});
