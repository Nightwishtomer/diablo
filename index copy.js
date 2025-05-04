////////
// *
// Example of using:
// *
// 
// *еееу ssssss
////////s
s
//import Settings from "../game-project/config/settings.js";
import Settings from "settings";
import Environment from "environment";
import { Application, Assets, Sprite, Container, Texture, AnimatedSprite, Ticker } from "pixi";
import { Keyboard } from "ui/keyboard"; // кнопки
import { loadCursor } from "ui/cursor"; // кнопки
//import { InitHero } from "hero/hero"; // инициализируем игрока.
//import { Hero, HeroData } from "hero/hero"; // класс игрока. для получения и изменения данных
import Hero  from "hero/hero"; // класс игрока. для получения и изменения данных
import { InitLevel } from "level/initLevel"; // инициализируем уровень.
import ControlPanel from "controlPanel/controlPanel"; // панель управления
//import { Objects } from "objects/objects"; // objects
import { menuManager } from "menu/menuManager";




//if (Environment.debug.showDebugInfo) {
  //console.log("Текущая громкость музыки:", Settings.audio.musicVolume);// Current music volume (Текущая громкость музыки)
  //console.log("Ограничение FPS:", Settings.graphics.fpsLimit); // FPS limit (Ограничение FPS)
  //console.log("Текущий режим:", Environment.mode);
  //console.log("Сервер пользователей:", Environment.server.userServerURL);
//}


//import  from "./constants.js";
//import * as constants from './constants.js';
//import CONST from "./constants.js"; // Константы
//import { settings } from "./settings.js"; // Переменные
//import { Mouse } from "./ui/mouse.js";
//import { Pointer } from "./ui/pointer.js";
//import { Keyboard } from "./ui/keyboard.js"; // кнопки
//import { MainMenu } from "./menu/mainMenu.js";
    

let firstTime;
if (Environment.debug.timeSpent){
  firstTime = performance.now(); // Затраченное время
}


export class Index {
  constructor () {
    //this.app = app;
    console.log("Class Index is Load");
    //new Pointer(); // Инициализация класса Поинтера
    loadCursor();
    new Keyboard(); // Инициализируем клавиатуру и обработку кнопок.
    
    //new Mouse(); // Инициализация класса Мыши. Положение, и тд
    //new MainMenu();
    
    //console.log(app);

    // Инициализация основных классов.
    // * 
    // Инициализация класса Поинтера
    // Инициализируем клавиатуру и обработку кнопок.
    // Инициализация класса Мыши. Положение, и тд
    // *
    


    /*
     * Оставить это! Это вывод меню. 
     * Самое важное! Затем уже и new InitGame().init("warrior", "TOMER", 1);
     * 
     * const menuManager = new MenuManager(app);// Инициализация меню
     * menuManager.showMenu("mainMenu"); // Вывод главного меню
     * 
     */
    const menuManager = new MenuManager();// Инициализация меню
     menuManager.showMenu("mainMenu"); // Вывод главного меню
    



    new InitGame().init("warrior", "TOMER", 1);
    //const HERO = new Hero;
    //const HERO = Hero;
    //console.log(HERO.resistLightning);
    
    
    //HERO.mannaC = 10;
/*
    HERO.posIsoX = 0;
    HERO.posIsoY = 0;


    console.log("posCellX : " + HERO.posCellX);
    console.log("posCellY : " + HERO.posCellY);
    console.log("posCartX : " + HERO.posCartX);
    console.log("posCartY : " + HERO.posCartY); 
    console.log("posIsoX : " + HERO.posIsoX);
    console.log("posIsoY : " + HERO.posIsoY);

    HERO.posIsoX = 0;
    HERO.posIsoY = 30;


    console.log("posCellX : " + HERO.posCellX);
    console.log("posCellY : " + HERO.posCellY);
    console.log("posCartX : " + HERO.posCartX);
    console.log("posCartY : " + HERO.posCartY); 
    console.log("posIsoX : " + HERO.posIsoX);
    console.log("posIsoY : " + HERO.posIsoY);
*/


    // Загрузка меню через uiManager.js -> (тут реализовываем выбор какого именно меню) -> return new mainMenu() из mainMenu.js
  }

}




//new InitGame(this._data.buttons[this._selected].heroType , this.__name,  level);

//инициализируем с выбранным игроком и уровнем.
export class InitGame {
  constructor(){
   
  }
  init(newClassType, newClassName, level){
    //console.log("newClassType : " + newClassType);
    //console.log("newClassName : " + newClassName);
    //console.log("level : " + level);
    new InitHeroIndex(newClassType, newClassName)

    
    
    /*
     * Оставить это! Это вывод меню. 
     * Самое важное!  Геренация уровня
     * 
     *
     * new InitLevelIndex(level)
     *
     */

    
    //console.log(HeroData);

    new InitControlPanel(); // Панель управления
    
  }

  // инициализируем игру.
//генерируем мир, персонажей,карту, монстров. 
}


  // Панель управления
  export class InitControlPanel{
    constructor(){
      console.log("Панель управления ------");
      ControlPanel.init();
      console.log("Панель управления ------");
    }
  }


//инициализируем игрока и уровня.
export class InitHeroIndex {
  constructor(newClassType, newClassName){
    
    this.newClassType = newClassType;
    this.newClassName = newClassName;
    /*console.log("//-----------------------");
    console.log("Инициализируем игрока");
    console.log("Класс героя: " + this.newClassType);
    console.log("Имя: " + this.newClassName);

*/
    console.log("//-----------------------");

    //new InitHero(this);
    Hero.init(this.newClassType, this.newClassName);
    
  }

  // инициализируем игру.
//генерируем мир, персонажей,карту, монстров. 
}



//инициализируем игрока и уровня.
export class InitLevelIndex {
  constructor(levelNum){
    this.levelNum = levelNum; // Уровень который будет генерирован
    console.log("//-----------------------");
    console.log("Инициализируем уровнь");
    console.log("Уровень: " + this.levelNum);
    console.log("//-----------------------");
    
    //this.map =  
    new InitLevel(this.levelNum).init();

    
  }

  // инициализируем игру.
//генерируем мир, персонажей,карту, монстров. 
}































// Create the application helper and add its render target to the page
export const app = new Application();
globalThis.__PIXI_APP__ = app;

await app.init({ 
  width: Settings.graphics.resolution.width,
  height: Settings.graphics.resolution.height,
  background: Settings.graphics.background,
  canvas : document.getElementById(Settings.htmlData.canvasElement)
});

// Функция обновления фреймов для игры
app.ticker.add((ticker) => {
 
});

new Index(); // Инициализация игры

if (Environment.debug.timeSpent){
  let timeSpent = performance.now() - firstTime;
  if (Environment.debug.showDebugInfo) {
    console.log("Время выполнения кода : " + timeSpent); // Затраченное время. Вывод
  }
}









