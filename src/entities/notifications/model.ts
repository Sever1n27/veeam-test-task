import { createStore, createEvent, createEffect, forward, sample } from 'effector';

export type Notification = {
    id: number;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    timeout?: number;
};

export type Notify = Omit<Notification, 'id'>;

const cancel = createEvent<number>();
const notify = createEvent<Notify>();
const $notifications = createStore<Notification[]>([]);

const $id = createStore(0).on(notify, (prev) => prev + 1);
const delay = ({ id, timeout = 3000 }: { id: number; timeout?: number }) =>
    new Promise<number>((rs) => {
        setTimeout(rs, timeout, id);
    });
const timeoutFx = createEffect((next: Notification) => delay(next));

const notified = sample({
    clock: notify,
    source: $id,
    fn: (id, notification) => ({ id, ...notification }),
});

forward({ from: notified, to: timeoutFx });
forward({ from: timeoutFx.doneData, to: cancel });

$notifications.on(notified, (state, next) => state.concat(next).slice(-3));
$notifications.on(cancel, (state, cancelId) => state.filter(({ id }) => id !== cancelId));

export { cancel, notify, $notifications };
