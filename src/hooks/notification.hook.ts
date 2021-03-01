import { useContext } from 'react';
import { APINotificationContext } from "../common/providers/notificationProvider";

const useNotification = () => {
    const { addNotification, notification, removeNotification } = useContext(APINotificationContext);
    return { addNotification, notification, removeNotification };
}

export default useNotification;
