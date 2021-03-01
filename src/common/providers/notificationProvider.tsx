import React, { useState, useCallback } from 'react';

interface IProps{
    children: any
}

type Notification = {
    message: string,
    status: string
}
type NotificationContext = {
    notification: null | Notification,
    addNotification: ((message: string, status: string) => void) | (() => void),
    removeNotification: () => void,
}

export const APINotificationContext = React.createContext<NotificationContext>({
    notification: null,
    addNotification: () => {},
    removeNotification: () => {}
});

export default function APINotificationProvider({ children }: IProps) {
    const [notification, setNotification] = useState<Notification | null>(null);

    const removeNotification = () => {
        if (notification) {
            setNotification(null);
        }
    }

    const addNotification = (message: string, status: string) => setNotification({message, status});

    const contextValue = {
        notification,
        addNotification: useCallback((message: string, status: string) => addNotification(message, status), []),
        removeNotification: useCallback(() => removeNotification(), [])
    };

    return (
        <APINotificationContext.Provider value={contextValue}>
            {children}
        </APINotificationContext.Provider>
    );
}
