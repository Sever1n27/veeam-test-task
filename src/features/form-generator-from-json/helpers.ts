import { MainForm, ComponentTypes, Field } from '@types';

const availableComponentTypes = Object.values(ComponentTypes);

export const closeChars = new Map([
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
]);

export const closeQuotes = new Map([
    ['"', '"'],
    ["'", "'"],
]);

export const testJson: MainForm = {
    title: 'Пример формы',
    buttons: ['OK', 'Cancel', 'Apply'],
    items: [
        {
            type: ComponentTypes.Number,
            value: '0',
            name: 'asd',
            label: 'testnumber',
        },
        {
            type: ComponentTypes.Checkbox,
            checked: false,
            name: 'asd5',
            label: 'checkboxxxxx',
        },
        {
            type: ComponentTypes.Multiline,
            value: '4',
            name: 'xddddd',
            label: 'multilineinput',
        },
        {
            type: ComponentTypes.Text,
            value: 'teststes',
            name: 'texttest',
            label: 'test',
        },
        {
            type: ComponentTypes.Date,
            value: '',
            name: 'testdate',
            label: 'date',
        },
    ],
};

export const hasWrongComponentType = (items?: Field[]) => {
    if (!items) return false;
    return !items.every((item) => availableComponentTypes.includes(item.type));
};

export const missingLabelsOrNames = (items?: Field[]) => {
    if (!items) return false;
    return !items.every(({ label, name }: { label?: string; name?: string }) => Boolean(label && name));
};

export const formatJson = (data: MainForm | null, tabWidth: number) => JSON.stringify(data, null, tabWidth);
