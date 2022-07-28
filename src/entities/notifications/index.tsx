import React from 'react';
import { useList } from 'effector-react';
import { Notification } from '@ui';
import { notify, $notifications } from './model';

export { notify };

export function Notifications() {
    const notificationsList = useList($notifications, ({ type, message, id }) => (
        <Notification key={id} message={message} type={type} open />
    ));

    return <div>{notificationsList}</div>;
}
