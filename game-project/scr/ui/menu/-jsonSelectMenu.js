// ./game-project/scr/ui/menu/jsonMenu.js
import { MenuManager } from "./menuManager.js";
import { Assets, Sprite, Container, Text } from "./../../../../game-project/pixijs/pixi.mjs";
import { loadMenuData } from "./menuLoader.js";
import { loadUserData } from "./loadUserData.js";
import Environment from "./../../../../game-project/config/environment.js";
import { logo } from "./../diabloLogo.js"; // Логотип Diablo на экране
import { DText } from "./../text/text.js"; // текст
import { PentagramSpiner } from "./pentagramSpiner.js"; // Вращающиеся спиннеры
import { setAllKeyboardNull, keys } from "./../keyboard.js"; // кнопки
import { app } from "./../../../../index.js";


const  AssetsData = {
    selectField : await Assets.load('./../../../../game-project/assets/images/ui/menu/selectField.png'),
    selectChar : await Assets.load('./../../../../game-project/assets/images/ui/menu/selectChar.png'),

    img_all : await Assets.load('./../../../../game-project/assets/images/ui/menu/img_all.png'), // Все: warrior, rogue, sorcerer (Воин, Лучница, Маг)
    img_rogue : await Assets.load('./../../../../game-project/assets/images/ui/menu/img_rogue.png'),// rogue (Лучница)
    img_sorcerer : await Assets.load('./../../../../game-project/assets/images/ui/menu/img_sorcerer.png'), // sorcerer (Маг)
    img_warrior : await Assets.load('./../../../../game-project/assets/images/ui/menu/img_warrior.png'),// warrior (Воин)
    
    
    







};


export class JsonSelectMenu {
    constructor(menuName) {
        this.menuName = menuName;
        this.container = new Container();
        this.container.label = "Buttons Menus";
        this.selected = 0; // выбранный пункт массива
        this.buttonLength = 0; // длина меню
        this.loadUserData = null;// данные пользователя

        this.leftSpinner = null;
        this.rightSpinner = null;
        
        this.interfaceImages = []; // картинки на сцене
        this.menuManager = new MenuManager(app);// Инициализация меню

        /*this.actions = {
        singlePlayer: () => {console.log("Выбор игроков"); this.switchMenu("singlePlayer")},
        exitGame: () => console.log("Выход"),
        openSettings: () => this.switchMenu("settingsMenu"),
        backToMain: () => this.switchMenu("mainMenu"),
        }; */
        this.data = null; // данные
        setAllKeyboardNull(); // Сброс бинда кнопок
    }

    async load() {
        app.stage.removeChildren(); // очистка сцены
        console.log(" Загружаем новое меню в jsonSelectMenu");
        
        this.data = await loadMenuData("selectMenu", this.menuName); // получаем данные
        if (!this.data) return; // если ошибка
        this.loadUserData = await loadUserData(); // получаем данные пользователя
        if (!this.loadUserData) return; // если ошибка
        // ------------------------------ // ------------------------------ // ------------------------------
        this.addLogo();// Логотип 
        // ------------------------------ // ------------------------------ // ------------------------------
        // Выводим картинки интерфейса
         //console.log( this.data.texts);
         if(this.data.interfacePictures !== undefined){
            this.data.interfacePictures.forEach((interfacePicturesData, index) => { // проходимся по массиву картинок интерфейса 
                this.interfacePicturesOutput(interfacePicturesData, index); //вывод картинок интерфейса 
                console.log(interfacePicturesData);
            });
         }


         // ------------------------------ // ------------------------------ // ------------------------------
         // вывод текста на страницу
         if(this.data.texts !== undefined){
            this.data.texts.forEach((textData, index) => { // проходимся по массиву пунктов меню
                this.textOutput(textData, index); //вывод текста

                console.log("выводим : " + textData.text);
            });
         }
         // ------------------------------ // ------------------------------ // ------------------------------
         this.bindButton(); // Назначение кнопок
         // ------------------------------ // ------------------------------ // ------------------------------
         // ------------------------------ // ------------------------------ // ------------------------------

        
        app.stage.addChild(this.container);


        return;
  // singlePlayer
  if (this.menuName == "singlePlayer") { // Если страница, singlePlayer, то выполняем эту функцию
    // warrior, rogue, sorcerer (Воин, Лучница, Маг)
    console.log( "Если страница, singlePlayer, то выполняем эту функцию");
    
   // console.log(this.loadUserData);


    this.loadUserData.forEach((savedUser, index) => { // проходимся по массиву пунктов меню
        console.log(savedUser);
       
/*
        savedUser.id
        savedUser.name
        savedUser.heroType


*/
        
        this.data.buttons.push({
            text: savedUser.name, 
            label : "Load" + savedUser.id, 
            action: "console.log('загружаем сейф + " + index + " + какая нибудь функция');", 
            textType : "big",
            position : {"x": 430, "y": 250 + (index * 40 )},
            style : {
                fontFamily: "Diablo",
                fontSize: 30,
                fill: "#988B5D"
            }
        });
        
    });

}






        this.buttonLength = Object.keys(this.data.buttons).length; // считаем колличество кнопок в меню

        // MenuButtons (Кнопки меню) *** START ***

        this.leftSpinner = new PentagramSpiner({x:0, y : 0}, this.data.spinner.type); // инициализируем Левый спиннер
        this.rightSpinner = new PentagramSpiner({x:0, y : 0}, this.data.spinner.type); // инициализируем Правый спиннер



      
       
       
        
        // Создаем пункты меню
        this.data.buttons.forEach((btnData, index) => { // проходимся по массиву пунктов меню
            this.createButton(btnData, index);
        });



        //вывод картинок интерфейса 
         //console.log( this.data.texts);
         if(this.data.interfacePictures !== undefined){
            this.data.interfacePictures.forEach((interfacePicturesData, index) => { // проходимся по массиву картинок интерфейса 
                this.interfacePicturesOutput(interfacePicturesData, index); //вывод картинок интерфейса 
            });
         }




         //вывод текста 
         //console.log( this.data.texts);
         if(this.data.texts !== undefined){
            this.data.texts.forEach((textData, index) => { // проходимся по массиву пунктов меню
                this.textOutput(textData, index); //вывод текста
                console.log("выводим");
            });
         }
         
        

    
    }

    






    
    //вывод текста
    textOutput(textData, index){
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
                let position = this.calculationPositionsItemsMenu(text.height, text.width, textData.position.x, textData.position.y); // высчитываем положение пунктов меню
                //console.log(position);
                text.x = position.x;
                text.y = position.y;
                //"anchor" : {"x" : 0, "y" : 0},
                if (textData.anchor) {
                    console.log("++++++++++++++++++");
                    text.anchor.set(textData.anchor.x, textData.anchor.y);
                }
                
            text.label = textData.label;   
            this.container.addChild(text);
        }
    }


      
  




    
    //  создание строки
    createButton(btnData, index){
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
        
        //if (btnData.positionX == null) {
            // Нет жесткой привязки по оси X
            let position = this.calculationPositionsItemsMenu(button.height, button.width, btnData.position.x, btnData.position.y); // высчитываем положение пунктов меню
            button.x = position.x;
            button.y = position.y;
        //} else {
            // Есть жесткая привязка по оси X
        //    button.x = btnData.position.x;
        //    button.y = btnData.position.y;
        //}


        this.data.buttons[index].width = button.width;
        button.label = btnData.label;



        
       


        button.on("pointerdown", () => this.handleAction(btnData));
        button.on("pointerover", () => {
            if (this.selected === index) return;  
            if (this.selected !== index) {     
                this.selected = index;
                this.updateSelection(this.selected );
            }
        });
    
        this.container.addChild(button);

        if (this.selected === index) { // если активен, выводим спинеры
            this.addSpinners(btnData, this.data.buttons[index].width); // выводим спинеры
        }
        app.stage.addChild(this.container); // добавляем все в контейнер
    }


    

    // вывод спинеров
    addSpinners(btnData, width) {
        //console.log("btnData.position.x : " + btnData.position.x)
        //console.log("btnData.position.y : " + btnData.position.y)
        //console.log("width : " + width);
        if (btnData.position.x == null) {
            // Нет жесткой привязки по оси X
            this.leftSpinner.x = (app.screen.width / 2) - (width / 2) - 10;
            this.rightSpinner.x = (app.screen.width / 2) + (width / 2) + 10;
        } else {
            // Есть жесткая привязка по оси X
            this.leftSpinner.x = btnData.position.x - (width/2) - 10;
            this.rightSpinner.x = btnData.position.x + (width/2) + 10;
        }

        //this.leftSpinner.x = (app.screen.width / 2) - (width / 2) - 10;
        
        this.leftSpinner.y = btnData.position.y;
        //this.rightSpinner.x = (app.screen.width / 2) + (width / 2) + 10;
        this.rightSpinner.y = btnData.position.y;

        //console.log("this.leftSpinner.x : " + this.leftSpinner.x + " this.leftSpinner.y : " + this.leftSpinner.y);
    
        if (!this.container.children.includes(this.leftSpinner)) {
            this.container.addChild(this.leftSpinner);
            this.container.addChild(this.rightSpinner);
        }
    }


    // меняем положение спинера на текущую строчку меню
    updateSelection(index) {
        let btnData = this.data.buttons[this.selected];
        if (btnData) {
            this.addSpinners(btnData, this.data.buttons[index].width); 
            if (this.menuName == "singlePlayer") { // Если страница, singlePlayer, то выполняем эту функцию
            
                console.log(this.data.buttons[index].label);
                if (this.data.buttons[index].label == "newPlayer") {

                } else {

                    
                }
            
            }



        }




    }







    // переключение меню. загрузка новой страницы
    switchMenu(newMenu) {
        this.container.removeChildren(); // Убираем старые элементы
        this.menuName = newMenu; // меняем заголовок
        this.selected = 0; // обнуляем выбронный пункт меню
        this.load(); // загружаем страницу
    }

  


    // Calculation of the position of menu items (расчет положения пунктов меню)
    calculationPositionsItemsMenu(heightText, widthText, positionX, positionY){
        //console.log(heightText);
        let result = {
            //x : (widthScreen / 2) - (widthText / 2), 
            x : app.screen.width / 2, 
            y : positionY
        };
        if (positionX == null) {
            // Нет жесткой привязки по оси X
            
        } else {
            // Есть жесткая привязка по оси X
            result.x = positionX;
        }



        //console.log("positionX --*----------------");
        //console.log("positionX -> " + positionX);
        
        
        if(Environment.typeOfText == "ttf"){
//            result.y -= 35;
        }            
        if(Environment.typeOfText == "img"){
            result.x += 30;
        }
        return result;
    }










    //****************************************************************************************************************************************** */

      // Вывод Логотипа
      addLogo(){ 
        if (this.data.logo.visible) {
            const logoSprite = logo();
            this.container.addChild(logoSprite);
        }
    }

    interfacePicturesOutput(interfacePicturesData, index){//вывод картинок интерфейса 
        const interfacePicture = this.renderPicture(
            AssetsData[interfacePicturesData.name], // Исходный ассет
            {x : interfacePicturesData.position.x, y : interfacePicturesData.position.y}, // Позиция
            {x : Environment.menuScale, y : Environment.menuScale}, // Масштаб
            {x : interfacePicturesData.anchor.x, y : interfacePicturesData.anchor.y}, // анхор
            interfacePicturesData.label, // Лейбел
            interfacePicturesData.visible
        );
        this.interfaceImages.push(interfacePicture);
        app.stage.addChild(interfacePicture);
    }

    // Вывод Изображений
  renderPicture(asset, position={x:0,y:0}, scale={x:0,y:0}, anchor={x:0,y:0}, label, visible){
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






 //вывод текста
 textOutput(textData, index){
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
            let position = this.calculationPositionsItemsMenu(text.height, text.width, textData.position.x, textData.position.y); // высчитываем положение пунктов меню
            //console.log(position);
            text.x = position.x;
            text.y = position.y;
            //"anchor" : {"x" : 0, "y" : 0},
            if (textData.anchor) {
                //console.log("++++++++++++++++++");
                text.anchor.set(textData.anchor.x, textData.anchor.y);
            }
            if (textData.action != undefined) {
                //console.log("pointerdown");

                text.interactive = true;
                text.buttonMode = true;
                text.eventMode = 'static'; // тип курсора


                text.on("pointerdown", () => this.handleAction(textData.action));
                
                //text.on("pointerdown", () => console.log("textData.action"));
                

            }
            
        text.label = textData.label;   
        this.container.addChild(text);
    }
}




// действие при выборе меню
handleAction(action) {
    //this.actions[btnData.action]?.();
    try {
        const actionFunc = new Function(action);
        actionFunc.call(this);
    } catch (error) {
        console.error("Ошибка при выполнении действия:", error);
    }
}

// Назначение кнопок
bindButton(){
    keys.ArrowUp.funcDown = () => { // Функция для переключения меню. НАЗАД
        this.selected = ( this.selected == 0 ) ? this.buttonLength-1 : this.selected-1;
        this.updateSelection(this.selected );
    }; 
    keys.ArrowDown.funcDown = () => { // Функция для переключения меню. ВПЕРЕД
        this.selected = ( this.selected >= this.buttonLength - 1 ) ? 0 : this.selected+1; 
        this.updateSelection(this.selected );
    };
    keys.Enter.funcDown = () => { // Функция для переключения меню. ВЫБОР
        this.handleAction(this.data.buttons[this.selected]);
    };   
    keys.Escape.funcDown = () => { // Функция для переключения меню. ВЫБОР
        this.menuManager.showMenu('mainMenu');
    };   
}



}
