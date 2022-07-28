import React from 'react';
import { FormGeneratorFromJson } from '@features';
import { Notifications } from '@entities';

export function Home() {
    return (
        <>
            <FormGeneratorFromJson /> <Notifications />
        </>
    );
}
