import { Filter,  Application, Assets, Sprite, Container, Text, formatShader, Texture, AnimatedSprite, Rectangle, Graphics, getMaxFragmentPrecision, autoDetectRenderer } from "pixi";
import Hero from "hero/hero";
import { LoadData } from "controlPanel/loadData"; // controlPanel/loadData
import ControlPanel from "controlPanel/controlPanel"; // controlPanel/controlPanel
//import { Belt } from "hero/inventory/belt"; // Подключение файла. Для получения пояса
////import { Objects } from "objects/objects"; // objects
//import { Object } from "objects/object"; // object new
import { selected as selectedDraggable,  Draggable } from "draggable"; // Draggable
import { DescriptionRender } from "objects/descriptionRender"; // objects/descriptionRender
 


export class BeltPanelClass {
  constructor(){
    if (!BeltPanelClass.instance) {
      this._offsetY = 336
      this.obtainingData();
    }
    return BeltPanelClass.instance;
  }

  async obtainingData(){
    this._data = await LoadData("main", "belt"); // Получаем данные хорактеристик buttons
  }

  async init(){
    const container = new Container(); // Контейнер кнопки
    container.label = "Belt Container";
    if (this._data) {
      for (let key in this._data) {
        const buttonContainer = await this._renderCell(this._data[key], key); // вывод кнопки пояса
        container.addChild(buttonContainer);
      }
    }
    return container; // Добавляем в контейнер
  }

  // вывод кнопки пояса
  async _renderCell(data, key){
    const sprite = new Sprite(); // Спрайт кнопки
    sprite.buttonMode = true;
    sprite.label = data.label + " Sprite";     
    sprite.x = data.position[0];
    sprite.y = data.position[1] + this._offsetY;
    sprite.width = data.width;
    sprite.height = data.height;
    sprite.anchor.set(0, 0);
    const redBackground = new Graphics();
    redBackground.beginFill(0xff0000, 0.2); // Красный цвет
    redBackground.drawRect(data.position[0], data.position[1] + this._offsetY, data.width, data.height); // Прямоугольник с размерами экрана
    redBackground.fill();
    redBackground.label = data.label + " Background";
    redBackground.visible = false;
    const container = new Container(); // Контейнер кнопки
    container.label = data.label + " Container";
    container.hitArea = new Rectangle(data.position[0], this._offsetY + data.position[1], data.width, data.height); // координаты и размер области нажатия
    container.interactive = true;
    container.on('pointerdown', async (event) => { 
      if (event.data.button === 0) {
        //console.log('Левый клик!');
        // Здесь твоя логика
        sprite.texture = false;
        if (selectedDraggable) {
          new Draggable().put("belt", key);
        } else {
          new Draggable().take("belt", key);
        }
      }
      if (event.data.button === 2) {
        //console.log('Правый клик!');
        // Здесь твоя логика
        Hero.inventory.belt.action(key);
      }
      
    });
    container.on('pointerupoutside', () => { });
    container.on('pointerup',  async () => { });
    container.addChild(redBackground);
    container.addChild(sprite)
    return container;
  }

  //получить данные ячейки пояса // для вывода б рендера 
  _getDataBeltCell(keyBelt){
    //const ObjectID = await new Belt().getCell(keyBelt); // получаем данные id ячейки пояса для отрисовки ячейки
    const Object = Hero.inventory.belt.getCell(keyBelt); // получаем данные id ячейки пояса для отрисовки ячейки
    return (Object != null) ? Object : false;
  }

  // Отрисовка данных уже в готовых контейнерах
  async rerender(){
    if (this._data) {
      for (let key in this._data) {
        const beltCellData = this._getDataBeltCell(key); 
        //console.log(beltCellData);
        const texture = (beltCellData) ? beltCellData.texture.sprite : false; // если есть что тов ячейке, выводим текстуру
        let sprite = ControlPanel.UIContainer.getChildByLabel(this._data[key].label + " Sprite", true);
        sprite.texture = texture;
        sprite.visible = true;
        sprite.alpha = 1; // Полная непрозрачность для самой картинки
        let background = ControlPanel.UIContainer.getChildByLabel(this._data[key].label + " Background", true);
        background.visible = !!texture;

        let container = ControlPanel.UIContainer.getChildByLabel(this._data[key].label + " Container", true);
        container.on("pointerover", () => {
          //console.log("\\\\\\\\\\\//////");
         // console.log(beltCellData);
          new DescriptionRender(beltCellData.descriptionData);
         // console.log(beltCellData);
        });
        container.on("pointerout", () => {
          new DescriptionRender();
        });

      }
    }
  } 
}

// sprite.on("pointerdown", () => {});
// sprite.on("pointermove", () => {});
// sprite.on("pointerup", () => {});
// sprite.on("pointerupoutside", () => {});

const BeltPanel = new BeltPanelClass();
export default BeltPanel;