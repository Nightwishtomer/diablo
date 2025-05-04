// Переменные среды для различных режимов разработки (например, режим отладки или продакшн).

////////
// *
// Example of using:
// *
// if (Environment.debug.showDebugInfo) { // check for: show debug info (проверка на: показывать отладочную информацию)
//  console.log("Текущий режим:", Environment.mode); // Current mode (Текущий режим)
//  console.log("Сервер пользователей:", Environment.server.userServerURL); // User server (Сервер пользователей)
// }
// *
////////





const Environment = {
  mode: "development", // Текущий режим работы (development, production, test)

  menuScale : 0.6, // Масштаб в меню


  typeOfText: "ttf", // какой текст выводиться. (ttf, img)

  server: {
      userServerURL: "ws://localhost:3001", // WebSocket-сервер для пользователей
      dataServerURL: "http://localhost:3002", // Сервер данных (сохранения, JSON)
      enableWebSockets: true, // Включить WebSocket-соединение
      requestTimeout: 5000 // Таймаут запросов к серверу (мс)
  },

  database: {
      useLocalStorage: true, // Использовать localStorage для хранения прогресса
      remoteSaveEnabled: true, // Разрешить сохранение на сервере
      saveInterval: 300, // Интервал автосохранения в секундах
  },

  debug: {
      timeSpent: true,     // Time taken to generate page (Затраченное время генерации страницы)
      showDebugInfo: true, // Показывать отладочную информацию
      logLevel: "verbose", // Уровень логов (error, warning, info, verbose)
      enableCheats: false  // Включить чит-коды в отладочном режиме
  },

  assets: {
      basePath: "/assets/", // Базовый путь к ресурсам игры
      imagePath: "/assets/images/", // Путь к изображениям
      audioPath: "/assets/audio/", // Путь к звукам
      fontPath: "/assets/fonts/" // Путь к шрифтам
  },

  security: {
      enableEncryption: false, // Включить шифрование сохранений
      encryptionKey: "supersecretkey", // Ключ шифрования (если включено)
      apiKeys: {
          analytics: "your-analytics-api-key", // API-ключ для аналитики (если есть)
      }
  },

  pixi: {
    showLabel : true, // Вывод в pixi label pixi conteiner

  },
};

// Экспортируем объект для использования в других модулях
export default Environment;
