// Конфигурация игры, включая настройки разрешений экрана, графики, звука и другие параметры.

////////
// *
// Example of using:
// *
// console.log("Текущая громкость музыки:", Settings.audio.musicVolume);// Current music volume (Текущая громкость музыки)
// console.log("Ограничение FPS:", Settings.graphics.fpsLimit); // FPS limit (Ограничение FPS)
// *
////////


const Settings = {
    textStyle : {
        uiCharacteristics : {
            fontFamily: "Diablo",
            fontSize: 15,
            fill: "#B8B8B8"
        },
    },
  graphics: {
    resolution: {
        width: 640, // Ширина экрана по умолчанию
        height: 480,  // Высота экрана по умолчанию
        fullscreen: false // Полноэкранный режим
    },
    pixelScaling: 2, // Масштаб пиксельной графики (если используются ретро-спрайты)
    enableVSync: true, // Включить вертикальную синхронизацию
    fpsLimit: 60, // Ограничение FPS
    background : "#000000", // Цвет заднего фона
    tile : {
        width  : 192,  // Ширина тайла (подставь своё значение)
        height : 128, // Высота тайла (подставь своё значение)
    },

  },

  htmlData: {
    canvasElement: "myCanvas", // id елемента canvas
    canvasCTXcontent : "2d",  // тип контенат
    
  },
  cursor : { 
    default : "objcurs_1.png",
  },



  

  controls: {
      movement: {
          up: "ArrowUp",    // Клавиша движения вверх
          down: "ArrowDown", // Клавиша движения вниз
          left: "ArrowLeft", // Клавиша движения влево
          right: "ArrowRight" // Клавиша движения вправо
      },
      actions: {
          attack: "Space", // Клавиша атаки
          interact: "KeyE", // Клавиша взаимодействия (открытие дверей, разговоры)
          inventory: "KeyI", // Открытие инвентаря
          pause: "Escape" // Пауза / открытие меню
      },
      mouse: {
          sensitivity: 1.0, // Чувствительность мыши
          invertY: false // Инвертирование оси Y
      }
  },

  audio: {
      masterVolume: 0.8, // Громкость игры (0.0 - 1.0)
      musicVolume: 0.5, // Громкость музыки
      soundEffectsVolume: 0.7, // Громкость звуковых эффектов
      mute: false // Отключить весь звук
  },

  gameplay: {
      pause: false, // Game activity (is the game active or paused) (Активность игры (активна игра или на паузе))
      difficulty: "normal", // Сложность игры (easy, normal, hard)
      autoSave: true, // Автоматическое сохранение
      autoSaveInterval: 300, // Интервал автосохранения в секундах
      showFPS: true, // Отображение FPS на экране
  },

  network: {
      useWebSocket: true, // Использовать WebSocket для связи с сервером
      serverURL: "ws://localhost:3000" // Адрес WebSocket-сервера
  }
};

// Экспортируем объект конфигурации для использования в других файлах
export default Settings;
