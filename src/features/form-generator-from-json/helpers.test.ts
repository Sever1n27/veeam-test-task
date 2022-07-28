import { ComponentTypes } from '@types';
import { hasWrongComponentType, missingLabelsOrNames } from './helpers';

const wrongItems = [
    {
        type: 'wrongtype' as ComponentTypes,
        label: '123',
        name: 'wrong',
        value: 'text',
    },
];

const rightItems = [
    {
        type: 'text' as ComponentTypes,
        label: '123',
        name: 'wrong',
        value: 'text',
    },
];

const fieldsWithMissingNames = [
    {
        type: 'text' as ComponentTypes,
        label: '123',
        value: 'text',
        name: '',
    },
];

describe('test hasWrongComponentType check function', () => {
    it('should return true if wrong type presents', () => {
        expect(hasWrongComponentType(wrongItems)).toBe(true);
    });
    it('should return false if only right types presents', () => {
        expect(hasWrongComponentType(rightItems)).toBe(false);
    });
});

describe('test missingLabelsOrNames check function', () => {
    it('should return false when label or name is missing', () => {
        expect(missingLabelsOrNames(fieldsWithMissingNames)).toBe(true);
    });
    it('should return false if label and names presents', () => {
        expect(missingLabelsOrNames(rightItems)).toBe(false);
    });
});
