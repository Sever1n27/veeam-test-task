import React from 'react';
import { BooleanInput } from './boolean-input';
import { DateInput } from './date-input';
import { MultilineInput } from './multiline-input';
import { NumberInput } from './number-input';
import { TextInput } from './text-input';
import { RadioInput } from './radio-input';

interface Props {
    type?: 'number' | 'text' | 'multiline' | 'checkbox' | 'radio' | 'date';
    name: string;
    value?: string | number | undefined;
    onChange: (value: any) => void;
}

const componentsMapping = {
    text: TextInput,
    checkbox: BooleanInput,
    date: DateInput,
    multiline: MultilineInput,
    number: NumberInput,
    radio: RadioInput,
};

export const DynamicInput = ({ type = 'text', name, onChange, value }: Props) => {
    const DynamicComponent = componentsMapping[type];

    return (
        <div>
            <div>
                {DynamicComponent ? (
                    <DynamicComponent label='' name={name} onChange={onChange} value={value} />
                ) : (
                    'Wrong component type'
                )}
            </div>
        </div>
    );
};
