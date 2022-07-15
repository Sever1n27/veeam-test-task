export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    variant?: 'standard' | 'filled' | 'outlined';
}

export type ComponentTypes = 'number' | 'text' | 'multiline' | 'checkbox' | 'radio' | 'date';

type Field = {
    label: string;
    name: string;
    type?: ComponentTypes;
};

export type MainForm = {
    title?: string;
    items?: Field[];
    buttons?: string[];
};
