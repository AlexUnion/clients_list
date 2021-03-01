import React from "react";
import useNotification from "../../hooks/notification.hook";
import s from './notification.module.css';

const style = "fixed rounded-md bottom-8 right-6 p-4 cursor-pointer z-10";

function Notification() {
    const { notification, removeNotification } = useNotification();
    const classes = [style, s.in];

    if (!notification) return null;

    switch (notification.status) {
        case "success": {
            classes.push("bg-green-300");
            break;
        }
        case "error": {
            classes.push("bg-red-300");
            break;
        }
        default: {
            classes.push("bg-gray-300");
        }
    }

    return (
        <div className={classes.join(' ')}
             onClick={() => removeNotification()}>
            <div className='pb-2 text-lg text-gray-900'>
                Уведомление
            </div>
            <div className='text-gray-800'>
                <div>
                    {notification.message}
                </div>
            </div>
        </div>
    )
}

export default Notification;
