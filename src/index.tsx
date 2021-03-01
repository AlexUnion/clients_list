import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import './index.css';
import APINotificationProvider from "./common/providers/notificationProvider";
import Notification from "./components/notification/notification.component";

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <APINotificationProvider>
                <App />
                <Notification/>
            </APINotificationProvider>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
