import React from 'react';
import { ComponentTypes, BasicPrimitive } from '@types';
import { BooleanInput } from './boolean-input';
import { DateInput } from './date-input';
import { MultilineInput } from './multiline-input';
import { NumberInput } from './number-input';
import { TextInput } from './text-input';
import { RadioInput } from './radio-input';

interface Props {
    type?: ComponentTypes;
    name: string;
    value?: BasicPrimitive;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    options?: { value: string; label: string }[];
}

const componentsMapping = {
    text: TextInput,
    checkbox: BooleanInput,
    date: DateInput,
    multiline: MultilineInput,
    number: NumberInput,
    radio: RadioInput,
};

export function DynamicInput({ type = ComponentTypes.Text, name, onChange, value, options }: Props) {
    const DynamicComponent = componentsMapping[type];
    return (
        <div>
            {DynamicComponent ? (
                <DynamicComponent name={name} onChange={onChange} value={value} options={options} />
            ) : (
                'Wrong component type'
            )}
        </div>
    );
}
