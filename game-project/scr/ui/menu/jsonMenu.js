import { MenuManager } from "menu/menuManager";
import { Assets, Sprite, Container, Text, formatShader } from "pixi";
import { loadMenuData } from "menu/menuLoader";
import { loadUserData } from "menu/loadUserData";// получаем данные пользователя
import Environment from "environment";
import { logo } from "ui/diabloLogo"; // Логотип Diablo на экране
import { DText } from "text/text"; // текст
import { PentagramSpiner } from "menu/pentagramSpiner"; // Вращающиеся спиннеры
import { setAllKeyboardNull, keys } from "ui/keyboard"; // кнопки
import { app, InitGame } from "index";

import hardURLs from "hardURLs"; // hardURLs


// Получаем ассеты картинок
const AssetsData = {
    selectField  : hardURLs.assets.data.ui.menu.selectField,
    selectChar   : hardURLs.assets.data.ui.menu.selectChar,
    img_all      : hardURLs.assets.data.ui.menu.img_all,
    img_rogue    : hardURLs.assets.data.ui.menu.img_rogue,
    img_sorcerer : hardURLs.assets.data.ui.menu.img_sorcerer,
    img_warrior  : hardURLs.assets.data.ui.menu.img_warrior,
};

export class JsonMenu {
    constructor(menuName) {
        this.menuName = menuName;
        this.container = new Container();
        this.container.label = "Buttons Menus";
        this._selected = 0; // выбранный пункт массива
        this._buttonLength  = 0; // длина меню
        this._leftSpinner = null;
        this._rightSpinner = null;
        this._data = null; // данные
        this.menuManager = new MenuManager(app);// Инициализация меню
        setAllKeyboardNull(); // Сброс бинда кнопок
        this._interfaceImages = []; // картинки на сцене
        this._textOut = {}; // массив с текстом
        this.selectedClassHero = null; // класс выбранного героя
        this.__name = "TOMER";// Имя при инициализиции нового класса героя
        this._menuActions = {
            // mainMenu -----------------------------
            singlePlayer: () => {
              this._switchMenu('selectPlayer'); 
              //console.log("-> Один игрок. Выполняем функцию: this._switchMenu('selectPlayer');"); 
            },
            settings: () => {
              this._switchMenu('settingsMenu'); 
              //console.log('-> Меню настроек'); 
              //console.log('settings + какая нибудь функция');
              
            },
            exit: () => {
              //console.log('-> Выход'); 
              //console.log('exit + какая нибудь функция');
            },
            
            // settingsMenu -------------------------
            settingsMenuAudio: () => {
              //console.log('-> Настройки Аудио'); 
              //console.log('AudioSettings + какая нибудь функция');
            },
            settingsMenuVideo: () => {
              //console.log('-> Настройки Видео'); 
              //console.log('VideoSettings + какая нибудь функция');
            },
            settingsMenuControl: () => {
              //console.log('-> '); ; 
              //console.log('ControlSettings + какая нибудь функция');
            },
            settingsMenuExit: () => {
              //console.log("<- Вернуться в предыдущее меню. Выполняем функцию: this._switchMenu('mainMenu');"); 
              this._switchMenu("mainMenu");
            },
          
            // singlePlayerMenu ---------------------
            selectPlayerOk : () => {
                
                //console.log("-> Загрузить персонажа номер : " + this._selected); 
                //this._switchMenu("selectPlayerOk");
                this._selectPlayerOk();


            },
            selectPlayerDelete : () => {
                //console.log("-> Удалить сохранение. Выполняем функцию: "); 
            },
          
            // selectNewPlayer ----------------------
            selectNewPlayer : () => {
                //console.log("-> новый игрок. Выбор игрока."); 
                this._switchMenu("selectNewPlayer");
            },

            // --------------

            selectClassHeroOk : () => {
                //console.log("-> Выбран класс нового игрока: " +  this._selected); 
                //console.log(this._data.buttons[this._selected].heroType);
                new InitGame().init(this._data.buttons[this._selected].heroType , this.__name, 1); // Инициализируем героев и карту первого уровня
            },




          
            // -----------------------------------------
            backToMain: () => {
              this._switchMenu("mainMenu");
              //console.log("-> Один игрок. Выполняем функцию: this._switchMenu('selectPlayer');"); 
            },
        
        };
    }

    async load() {
        this._selected = 0; // выбранный пункт массива
        app.stage.removeChildren(); // очистка сцены
        this._data = await loadMenuData("menu", this.menuName); // получаем данные
        this._buttonLength  = this._getLengthOfObject(this._data.buttons); // считаем колличество кнопок в меню
        if (!this._data) return; // если ошибка
        //this.container.removeChildren(); // очистка сцены
        // ------------------------------ // ------------------------------ // ------------------------------
        if (this._data.logo.visible) this._addLogo();// Логотип
        // ------------------------------ // ------------------------------ // ------------------------------
        this._initSpinner(); 
        // ------------------------------ // ------------------------------ // ------------------------------
        // Выводим картинки интерфейса

         if(this._data.interfacePictures !== undefined){
            this._data.interfacePictures.forEach((interfacePicturesData, index) => { // проходимся по массиву картинок интерфейса 
                this._interfacePicturesOutput(interfacePicturesData); //вывод картинок интерфейса 
            });
         }
         // ------------------------------ // ------------------------------ // ------------------------------
         // вывод текста на страницу
         if(this._data.texts !== undefined){
            this._data.texts.forEach((textData, index) => { // проходимся по массиву пунктов меню
                this._textOutput(textData); //вывод текста
            });
         }
         // ------------------------------ // ------------------------------ // ------------------------------
         // ------------------------------ // ------------------------------ // ------------------------------

        // Если меню selectPlayer, то получаем список игроков
        if (this.menuName == "selectPlayer") {
            this.loadUserData = await loadUserData(); // получаем данные пользователя;
            if (!this.loadUserData) return; // если ошибка  
            for (let index = 0; index < Object.keys(this.loadUserData).length; index++) {
                this.loadUserData[index].position = {
                    x : this._data.positionButtons.x,
                    y : this._data.positionButtons.y[index],
                };
            }
            this._data.buttons = this.loadUserData;
            this._buttonLength  = this._getLengthOfObject(this._data.buttons); // считаем колличество кнопок в меню
            this._data.buttons.forEach((data, index) => { // пересчет позиций
                this._selectedMenuButton(data, index);
            });
        } else {
            if(this.menuName == "selectNewPlayer"){
                        const heroesData = await heroDataLoader("heroesData", "heroesData");
                        if (!heroesData) return; // если ошибка  
                        this.loadUserData = this._obtainingHeroesBriefInformation(heroesData); // получение краткой информации о классах героев
                        const heroesDataLength  = this._getLengthOfObject(this.loadUserData); // считаем колличество кнопок в меню
                        for (let index = 0; index < heroesDataLength; index++) {
                            this.loadUserData[index].position = {
                                x : this._data.positionButtons.x,
                                y : this._data.positionButtons.y[index],
                            };
                        }
                        this._data.buttons = this.loadUserData;
                        this._buttonLength  = this._getLengthOfObject(this._data.buttons); // считаем колличество кнопок в меню
                        this._data.buttons.forEach((data, index) => { // пересчет позиций
                            this._selectedMenuButton(data, index);
                        });
            }else{
                this._data.buttons.forEach((btnData, index) => { // проходимся по массиву пунктов меню
                    this._createButton(btnData, index);
                });
            }
              
        }






        // ------------------------------ // ------------------------------ // ------------------------------
        // ------------------------------ // ------------------------------ // ------------------------------
        this._bindButton(); // Назначение кнопок
        // ------------------------------ // ------------------------------ // ------------------------------

        // Инициализируем спиннеры
       
        //this._leftSpinner = new PentagramSpiner({x:0, y : 0}, this._data.spinner.type); // инициализируем Левый спиннер
        //this._rightSpinner = new PentagramSpiner({x:0, y : 0}, this._data.spinner.type); // инициализируем Правый спиннер       
        // ------------------------------ // ------------------------------ // ------------------------------
        // Создаем пункты меню
        if (!Array.isArray(this._data.buttons)) {
            console.error("Ошибка: кнопки меню не загружены или неверный формат JSON", this._data);
            return;
        }
        app.stage.addChild(this.container); // добавляем все в контейнер
    }

    //  создание строки
    _createButton(btnData, index){
        let button;
        if(Environment.typeOfText == "ttf"){ // Выводим текст в формате: TTF
            const style = { 
                    fontFamily: btnData.style.fontFamily,
                    fontSize: btnData.style.fontSize, 
                    fill: btnData.style.fill
            };
            button = new Text({text : btnData.text, style : style}); // Создаем объект Текст
            button.anchor.set(0.5, 0.5);
        }
        if(Environment.typeOfText == "img"){ // Выводим текст в формате: IMG
            button = new DText(btnData.text, btnData.textType); // Создаем обьект текст в виде картинок
        }
        button.interactive = true;
        button.buttonMode = true;
        button.eventMode = 'static'; // тип курсора
        let position = this._calculationPositionsItemsMenuu(btnData.position.x, btnData.position.y); // высчитываем положение пунктов меню
        button.x = position.x;
        button.y = position.y;
        this._data.buttons[index].width = button.width;
        button.label = btnData.label;
        button.on("pointerdown", () => {
            this._handleAction(btnData.action);
        });
        button.on("pointerover", () => {
            if (this._selected === index) return;  
            if (this._selected !== index) {     
                this._selected = index;
                this._updateSelection();
            }
        });
        this.container.addChild(button);
        if (this._selected === index) { // если активен, выводим спинеры
            this._addSpinners(btnData, this._data.buttons[index].width); // выводим спинеры
        }
    }

//  создание строки в меню выбора игрока
    _selectedMenuButton(btnData, index){
        ////console.log(btnData);
        let button;
        if(Environment.typeOfText == "ttf"){ // Выводим текст в формате: TTF
            const style = { 
                    fontFamily: this._data.styleButtons.fontFamily,
                    fontSize: this._data.styleButtons.fontSize, 
                    fill: this._data.styleButtons.fill
                };   
            button = new Text({text : btnData.name, style : style}); // Создаем объект Текст
            button.anchor.set(0.5, 0.5);
        }
        if(Environment.typeOfText == "img"){ // Выводим текст в формате: IMG
            button = new DText(btnData.name, btnData.textType); // Создаем обьект текст в виде картинок
        }
        button.interactive = true;
        button.buttonMode = true;
        button.eventMode = 'static'; // тип курсора
    
        let position = this._calculationPositionsItemsMenuu(btnData.position.x, btnData.position.y); // высчитываем положение пунктов меню
        button.x = position.x;
        button.y = position.y;
       
        this.loadUserData[index] = {...this.loadUserData[index], width: button.width};
        button.label = btnData.label;

        //console.log(btnData);
        button.on("pointerdown", () => {

            ////console.log(this.menuName);
            if(this.menuName == "selectNewPlayer"){
                //this.selectedClassHero
                ////console.log("++++++++++++");
                this._handleAction("selectClassHeroOk");
            
            } else {
                //
                this._handleAction("selectPlayerOk");
            }
            
        });


        button.on("pointerover", () => {
            if (this._selected === index) return;  
            if (this._selected !== index) {     
                this._selected = index;
                this._updateSelection();
            }
        });

        this.container.addChild(button);
        if (this._selected === index) { // если активен, выводим спинеры
            this._addSpinners(btnData, button.width); // выводим спинеры
            this._outputProperties(this._selected);
        }
    }

    // Назначение кнопок
    _bindButton(){
        keys.ArrowUp.funcDown = () => { // Функция для переключения меню. НАЗАД
            this._selected = ( this._selected == 0 ) ? this._buttonLength -1 : this._selected-1;
            this._updateSelection();
        }; 
        keys.ArrowDown.funcDown = () => { // Функция для переключения меню. ВПЕРЕД
            this._selected = ( this._selected >= this._buttonLength  - 1 ) ? 0 : this._selected+1; 
            this._updateSelection();
        };
        keys.Enter.funcDown = () => { // Функция для переключения меню. ВЫБОР        
            if (this.menuName == "selectPlayer") {   
                this._handleAction("selectPlayerOk");
            } else {
                this._handleAction(this._data.buttons[this._selected].action);  
            }
        };  
        keys.Escape.funcDown = () => { // Функция для переключения меню. ВЫБОР
            this._handleAction("settingsMenuExit");
        }; 
    }

    // Инициализируем спиннеры
    _initSpinner(){
        this._leftSpinner = new PentagramSpiner({x:0, y : 0}, this._data.spinner.type); // инициализируем Левый спиннер
        this._rightSpinner = new PentagramSpiner({x:0, y : 0}, this._data.spinner.type); // инициализируем Правый спиннер 
    }

    // вывод спинеров
    _addSpinners(btnData, width) {
        ////console.log(btnData);
        if (btnData.position.x == null) {
            // Нет жесткой привязки по оси X
            this._leftSpinner.x = (app.screen.width / 2) - (width / 2) - 10;
            this._rightSpinner.x = (app.screen.width / 2) + (width / 2) + 10;
        } else {
            // Есть жесткая привязка по оси X
            this._leftSpinner.x = btnData.position.x - (width/2) - 10;
            this._rightSpinner.x = btnData.position.x + (width/2) + 10;
        }
        this._leftSpinner.y = btnData.position.y;
        this._rightSpinner.y = btnData.position.y;

        if (!this.container.children.includes(this._leftSpinner)) {
            this.container.addChild(this._leftSpinner);
            this.container.addChild(this._rightSpinner);
        }
    }

    // меняем положение спинера на текущую строчку меню
    _updateSelection() {
        let btnData = this._data.buttons[this._selected];
        if (btnData) {
            this._addSpinners(btnData, btnData.width);
            if (this.menuName == "selectPlayer") {
                this._outputProperties(this._selected); 
            }
            if (this.menuName == "selectNewPlayer") {
                this._outputProperties(this._selected); 
            }
        }
    }

    // ****************************************************************************************************************************

    // действие при выборе меню
    _handleAction(actionName) {
        //console.log(actionName);
        if (typeof this._menuActions[actionName] === "function") {
            this._menuActions[actionName]();
        } else {
            console.error(`Неизвестное действие: ${actionName}`);
        }
    }

    // переключение меню. загрузка новой страницы
    _switchMenu(newMenu) {
        this.container.removeChildren(); // Убираем старые элементы
        this.menuName = newMenu; // меняем заголовок
        this._selected = 0; // обнуляем выбронный пункт меню
        setAllKeyboardNull(); // Сброс бинда кнопок
        this.load(); // загружаем страницу
    }

    // Вывод Логотипа
    _addLogo(){
        const logoSprite = logo();
        this.container.addChild(logoSprite);
    }

    // Calculation of the position of menu items (расчет положения пунктов меню)
    _calculationPositionsItemsMenuu(positionX, positionY){
        let result = {
            x : app.screen.width / 2, 
            y : positionY
        };
        if (positionX == null) {
            // Нет жесткой привязки по оси X
        } else {
            // Есть жесткая привязка по оси X
            result.x = positionX;
        }
        if(Environment.typeOfText == "ttf"){}            
        if(Environment.typeOfText == "img"){
            result.x += 30;
        }
        return result;
    }

    //вывод текста
    _textOutput(textData){
        if(textData.visibility){
            let text;
            if(Environment.typeOfText == "ttf"){ // Выводим текст в формате: TTF
                const style = { 
                    fontFamily: textData.style.fontFamily,
                    fontSize: textData.style.fontSize, 
                    fill: textData.style.fill
                };                        
                text = new Text({text : textData.text, style : style}); // Создаем объект Текст
            }
            if(Environment.typeOfText == "img"){ // Выводим текст в формате: IMG
                text = new DText(textData.text, textData.textType); // Создаем обьект текст в виде картинок
            }
            let position = this._calculationPositionsItemsMenuu(textData.position.x, textData.position.y); // высчитываем положение пунктов меню
            text.x = position.x;
            text.y = position.y;
            if (textData.anchor) text.anchor.set(textData.anchor.x, textData.anchor.y);
            
            if (textData.action != undefined) {
                text.interactive = true;
                text.buttonMode = true;
                text.eventMode = 'static'; // тип курсора
                text.on("pointerdown", () => this._handleAction(textData.action));
            }
            text.label = textData.label; 
            text.sourceText = textData.text;
            this._textOut[text.label] = text;
            this.container.addChild(text);
        }
    }

    _interfacePicturesOutput(interfacePicturesData){//вывод картинок интерфейса 
        const interfacePicture = this._renderPicture(
            AssetsData[interfacePicturesData.name], // Исходный ассет
            {x : interfacePicturesData.position.x, y : interfacePicturesData.position.y}, // Позиция
            {x : Environment.menuScale, y : Environment.menuScale}, // Масштаб
            {x : interfacePicturesData.anchor.x, y : interfacePicturesData.anchor.y}, // анхор
            interfacePicturesData.label, // Лейбел
            interfacePicturesData.visible
        );
        this._interfaceImages[interfacePicturesData.name] = interfacePicture;
        this.container.addChild(interfacePicture);
    }

    // Вывод Изображений
    _renderPicture(asset, position={x:0,y:0}, scale={x:0,y:0}, anchor={x:0,y:0}, label, visible){
        const result = new Sprite(asset);
        result.x = position.x;
        result.y = position.y;
        result.visible = visible
        result.scale.x = scale.x;
        result.scale.y = scale.y;
        result.anchor.set(anchor.x, anchor.y);
        result.label = label;
        return result;
    }

    // вывод свойств персонажа
    _outputProperties(selected){
        const information = this.loadUserData[selected].briefInformation;
        Object.keys(information).forEach(key => {
            this._textOut[key + "Text"].text = this._textOut[key + "Text"].sourceText +  " " + information[key]; 
        });
    }

    // Функциая выбора либо создаем нового игрока или заружаем.
    _selectPlayerOk() {
        if (this._selected == 0) {
            // новый  игрок
            this._switchMenu('selectNewPlayer'); // загрузка меню выбора игрока
            
        } else {
            // Загружаем игрока с id : this._selected
            //console.log("Загружаем игрока с id : " + this._selected);
        }
    }

    //определение длины обьекта
    _getLengthOfObject(data){
        return Object.keys(data).length;
    }

    // получение краткой информации о классах героев
    _obtainingHeroesBriefInformation(data){
        let result = [];        
        let counter = 0
        for (let [key, value] of Object.entries(data)) {
            const dataLine = {
                "id"       : counter, 
                "name"     : value.name,
                "heroType" : value.previewImage,
                "briefInformation" : {
                    "level"         : value.level,
                    "strength"      : value.characteristics.start.strength,
                    "magic"         : value.characteristics.start.magic,
                    "dexterity"     : value.characteristics.start.dexterity,
                    "survivability" : value.characteristics.start.vitality
                }
            };
            result.push(dataLine);
            counter++;
        }
        return result;
    }



    
}
