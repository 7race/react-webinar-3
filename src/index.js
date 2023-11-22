import React from 'react';
import { createRoot } from 'react-dom/client';
import { getUniqueNumber } from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: getUniqueNumber(), title: 'Название элемента' },
    { code: getUniqueNumber(), title: 'Некий объект' },
    { code: getUniqueNumber(), title: 'Заголовок' },
    {
      code: getUniqueNumber(),
      title: 'Очень длинное название элемента из семи слов',
    },
    { code: getUniqueNumber(), title: 'Запись' },
    { code: getUniqueNumber(), title: 'Шестая запись' },
    { code: getUniqueNumber(), title: 'Седьмая запись' },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
