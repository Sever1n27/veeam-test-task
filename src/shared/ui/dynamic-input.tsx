import React from 'react';
import { BooleanInput } from './boolean-input';
import { DateInput } from './date-input';
import { MultilineInput } from './multiline-input';
import { NumberInput } from './number-input';
import { TextInput } from './text-input';
import { RadioInput } from './radio-input';
import { ComponentTypes } from '@types';

interface Props {
    type?: ComponentTypes;
    name: string;
    value?: string | number | boolean;
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
            {DynamicComponent ? (
                <DynamicComponent label='' name={name} onChange={onChange} value={value} />
            ) : (
                'Wrong component type'
            )}
        </div>
    );
};
