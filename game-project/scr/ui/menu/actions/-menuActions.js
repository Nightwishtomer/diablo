export const menuActions = {
 
  // mainMenu -----------------------------
  singlePlayer: () => {
    /*this.menuManager.showMenu('selectPlayer');*/ 
    console.log('-> Один игрок'); 
    console.log('singlePlayer + какая нибудь функция');
  },
  settings: () => {
    console.log(this);
    this.switchMenu('-> Меню настроек'); 
    console.log('settings + какая нибудь функция');
    
  },
  exit: () => {
    console.log('-> Выход'); 
    console.log('exit + какая нибудь функция');
  },
  
  // settingsMenu -------------------------
  settingsMenuAudio: () => {
    console.log('-> Настройки Аудио'); 
    console.log('AudioSettings + какая нибудь функция');
  },
  settingsMenuVideo: () => {
    console.log('-> Настройки Видео'); 
    console.log('VideoSettings + какая нибудь функция');
  },
  settingsMenuControl: () => {
    console.log('-> Настройки Управления'); 
    console.log('ControlSettings + какая нибудь функция');
  },
  settingsMenuExit: () => {
    console.log('<- Вернуться в предыдущее меню'); 
    this.switchMenu("mainMenu");
  },

  // singlePlayerMenu ---------------------
  



  // -----------------------------------------
  backToMain: () => {
    this.switchMenu("mainMenu");
  },
};
