import { Application, Assets, Sprite, Container, Text, formatShader, Texture, AnimatedSprite, Rectangle, Graphics, getMaxFragmentPrecision, autoDetectRenderer } from "pixi";
import { LoadData } from "controlPanel/loadData"; // controlPanel/loadData
import { assetsData, actions } from "controlPanel/controlPanel"; // controlPanel/controlPanel
import Settings from "settings";

export let UIdescriptionWindow = {}; // 


export class MainPanelClass {
  constructor(){
    if (!MainPanelClass.instance) {
      this._appHeight = Settings.graphics.resolution.height; // Высота экрана игры
      this._offsetY = 336;
      this.obtainingData();
    }
    return MainPanelClass.instance;
  }


  // получение данных
  async obtainingData(){
    this._data = await LoadData("main", "buttons"); // Получаем данные хорактеристик buttons
  }
  
  async init(){
    const container = new Container(); // Контейнер главного меню
    container.label = "main Container";
    const background = new Sprite(assetsData.mainPanel); // Спрайт главного меню
    background.label = "main Background";
    background.x = 0;
    background.y = this._appHeight;
    background.anchor.set(0, 1);
    //console.log(background);
    container.addChild(background); // Добавляем Спрайт главного меню в Контейнер главного меню
    const data = this._data; // Получаем данные главного меню
    if (data) {
      for (let key in data) {
        const button = this._renderButton(data[key]); // вывод кнопки
        container.addChild(button);
      }
    } 
    container.addChild(await this.descriptionInit());
    return container; // Добавляем в контейнер
  }
  
  // вывод  кнопки
  _renderButton(data){
    const sprite = new Sprite(); // Спрайт кнопки
    sprite.label = data.label + " Sprite";
    sprite.x = data.position[0];
    sprite.y = data.position[1] + this._offsetY;
    sprite.width = data.width;
    sprite.height = data.height;
    sprite.anchor.set(0, 0);
    sprite.texture = Texture.from(data.texture);
    const container = new Container(); // Контейнер кнопки
    container.label = data.label + " Container";
    container.hitArea = new Rectangle(data.position[0], this._offsetY + data.position[1], data.width, data.height); // координаты и размер области нажатия
    container.interactive = true; 
    container.on('pointerdown', () => { 
      actions.pointerdown[data.action]?.();
      sprite.x += 1;
      sprite.y += 1;
    });
    container.on('pointerup',   () => {
      actions.pointerup[data.action]?.();
      sprite.x -= 1;
      sprite.y -= 1;
    });
    container.addChild(sprite)
    return container;
  }

  async descriptionInit(){
    /*
    const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x333333 });
    document.body.appendChild(app.view);
    
    // Создаем контейнер
    const textContainer = new PIXI.Container();
    textContainer.width = 300;
    textContainer.height = 100;
    textContainer.x = 250;
    textContainer.y = 250;
    
    // Фон контейнера для наглядности (по сути, это прямоугольник)
    const bg = new PIXI.Graphics();
    bg.beginFill(0x222222);
    bg.drawRect(0, 0, textContainer.width, textContainer.height);
    bg.endFill();
    textContainer.addChild(bg);
    
    // Первый текст
    const text1 = new PIXI.Text("Первый текст", { fill: "white", fontSize: 20 });
    text1.x = 10;
    text1.y = 10;
    textContainer.addChild(text1);
    
    // Второй текст (если нужен)
    const text2 = new PIXI.Text("Второй текст", { fill: "yellow", fontSize: 20 });
    text2.x = 10;
    text2.y = text1.y + text1.height + 5; // Чтобы не пересекался с первым текстом
    textContainer.addChild(text2);
    
    // Добавляем контейнер на сцену
    app.stage.addChild(textContainer);
*/    













    const descriptionWindow = new Container();
    descriptionWindow.label = "descriptionWindow";

    const background = new Graphics();
    background.rect(167, 56 + 338, 309, 73);

    //background.beginFill(0x00ff00, 0.1); // Красный цвет
    //background.fill();
    background.label = "DescriptionBackground";
    background.visible = true;
    //background.x = 167;
    //background.y = 56;
    //background.height = 73;
    //background.width = 309;
    //console.log(background);
    UIdescriptionWindow = background;

    descriptionWindow.addChild(background);
    /*const text = new Text({
      text  : "",
      style : { "fontFamily": "Diablo", "fontSize": 15, "fill": "#B8B8B8" },
      //x     : (data.position[0] + (data.width / 2 )),
      //y     : (data.position[1] + (data.height / 2 )),
      //label : data.name + " Text",
    });
    text.anchor.set(0.5); // Центрирование текста относительно его точки привязки
    descriptionWindow.addChild(text);*/
 
    return descriptionWindow;




  }






}


const MainPanel = new MainPanelClass();
export default MainPanel;