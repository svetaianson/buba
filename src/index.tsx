import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

// Функция для загрузки скрипта
const loadTelegramScript = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-web-app.js';
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('Failed to load Telegram Web App script'));
        document.body.appendChild(script);
    });
};

const Main = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        loadTelegramScript()
            .then(() => {
                console.log('Telegram Web App script loaded');
                setIsLoaded(true); // Устанавливаем состояние, как только скрипт загружен
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // Рендерим приложение только когда скрипт загружен
    if (!isLoaded) {
        return <div>Loading...</div>; // Вы можете изменить это на свою удобную загрузку
    }

    return <App />;
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);
