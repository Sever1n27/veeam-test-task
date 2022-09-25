import { MainForm, ComponentTypes, Field } from '@types';

const availableComponentTypes = Object.values(ComponentTypes);

export const TAB_WIDTH = 4;
const TAB = ' '.repeat(TAB_WIDTH);

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

export const textAreaKeyHandler = (_: any, e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textArea = e.target as HTMLTextAreaElement;
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
    }
    // handling pair quotes and replace single quotes
    const closeQuote = closeQuotes.get(e.key);
    if (closeQuote) {
        e.preventDefault();
        const cursorPosition = textArea.selectionStart;
        textArea.setRangeText(e.key + closeQuote, textArea.selectionStart, textArea.selectionEnd, 'end');
        const value = textArea.value.replace(/[']/g, '"');
        textArea.value = value;
        textArea.selectionEnd = cursorPosition + 1;
    }
    return textArea.value;
};
