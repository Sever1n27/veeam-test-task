export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    variant?: 'standard' | 'filled' | 'outlined';
    name: string;
    value?: BasicPrimitive;
    onChange: React.FormEventHandler;
    options?: { value: string; label: string }[];
}

export type BasicPrimitive = number | string | boolean;

export enum ComponentTypes {
    Number = 'number',
    Text = 'text',
    Multiline = 'multiline',
    Checkbox = 'checkbox',
    Radio = 'radio',
    Date = 'date',
}

type Field = {
    label: string;
    name: string;
    type?: ComponentTypes;
    value?: string;
    checked?: boolean;
    options?: {
        value: string;
        label: string;
    }[];
};

export type MainForm = {
    title?: string;
    items?: Field[];
    buttons?: string[];
};
