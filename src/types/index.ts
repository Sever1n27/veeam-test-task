export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    variant?: 'standard' | 'filled' | 'outlined';
}
