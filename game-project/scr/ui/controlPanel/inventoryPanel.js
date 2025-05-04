import { Application, Assets, Sprite, Container, Text, formatShader, Texture, AnimatedSprite, Rectangle, Graphics, getMaxFragmentPrecision, autoDetectRenderer } from "pixi";
import Hero from "hero/hero";
import { LoadData } from "controlPanel/loadData"; // controlPanel/loadData
import { assetsData } from "controlPanel/controlPanel"; // controlPanel/controlPanel
import Settings from "settings";
import { Objects } from "objects/objects"; // objects
import { selected as selectedDraggable,  Draggable } from "draggable"; // Draggable
//import { InvPerson } from "hero/inventory/person"; // Подключение файла. Для получения снаряжения персонажа
//import { InvBag } from "hero/inventory/bag"; // Подключение файла. Для получения снаряжения рюкзака
import ControlPanel from "controlPanel/controlPanel"; // панель управления
import { DescriptionRender } from "objects/descriptionRender"; // objects/descriptionRender

//import { UIcreateContainer, UIcreateSprite } from "ui/uiManager";

export class InventoryPanelClass {
  constructor(){
    if (!InventoryPanelClass.instance) {
      this.screenWidth = Settings.graphics.resolution.width;
      this._offsetX = 0;
      this.obtainingData();
    }
    return InventoryPanelClass.instance;
  }

  // получение данных
  async obtainingData(){
    this._data = await LoadData("inventory", "buttons"); // Получаем данные хорактеристик buttons
  }

  // inventory - Panel
  async init(){
    let texture = assetsData.inv[Hero.type] || assetsData.inv_warrior;
    this._offsetX = this.screenWidth - texture.width;
    const background = new Sprite(texture);
    background.label = "InvPanelBackground";
    background.x = this.screenWidth - texture.width;
    background.y = 0;
    background.anchor.set(0, 0);
    const panel = new Container();
    panel.label = "InvPanelContainer";
    panel.addChild(background);
    panel.visible = ControlPanel.panelVisible.inventoryPanel;
    panel.addChild(await this._renderInventoryCells());
    return panel;
  }

  // Отрисовка Ячеек в Инвинатре
  async _renderInventoryCells(){
    const container = new Container();
    container.label = "inventoryCellsContainer";
    container.sortableChildren = true;
    if (this._data) {
      for (let key in this._data){
        const data = this._data[key];
        if (key == "bag") {
          for (let y in data) {
            for (let x in data[y]) {
              container.addChild(await this._renderBagCell(data[y][x], [y, x]));
            }
          }
        } else {   
          container.addChild(await this._renderBodyCell(data, key));
        }
      }
    }  
    return container;
  }

  // Отрисовка Ячейки тела
  async _renderBodyCell(data){
    const key = data.label;
    const sprite = new Sprite(false); // Спрайт кнопки
    sprite.buttonMode = true;
    sprite.label = data.label + " Sprite";
    sprite.x = data.position[0] + this._offsetX;
    sprite.y = data.position[1];
    sprite.width = data.width;
    sprite.height = data.height;
    sprite.anchor.set(0, 0);
    const redBackground = new Graphics();
    redBackground.beginFill(0xff0000, 0.2); // Красный цвет
    redBackground.drawRect(data.position[0] + this._offsetX, data.position[1], data.width, data.height); // Прямоугольник с размерами экрана
    redBackground.fill();
    redBackground.label = data.label + " Background";
    redBackground.visible = false;
    const container = new Container(); // Контейнер кнопки
    container.label = data.label + " Container";
    container.hitArea = new Rectangle(data.position[0] + this._offsetX, data.position[1], data.width, data.height); // координаты и размер области нажатия
    container.interactive = true; 
    container.on('pointerdown', async (event) => { 

      if (event.data.button === 0) {
        //console.log('Левый клик!');
        // Здесь твоя логика
        sprite.texture = false;
        if (selectedDraggable) {
          new Draggable().put("person", key);
        } else {
          new Draggable().take("person", key);
        }
      }
      if (event.data.button === 2) {
        //console.log('Правый клик!');
        // Здесь твоя логика
      }



      
    });
    container.on('pointerupoutside', () => { });
    container.on('pointerup',  async () => { });
    container.addChild(redBackground);
    container.addChild(sprite)
    return container;
  }


  // Отрисовка Ячейки рюкзака
  async _renderBagCell(data, key){
    const texture = false;
    const sprite = new Sprite(texture); // Спрайт кнопки
    sprite.buttonMode = true;
    sprite.label = data.label + " Sprite";
    sprite.x = data.position[0] + this._offsetX;
    sprite.y = data.position[1];
    sprite.width = data.width;
    sprite.height = data.height;
    sprite.anchor.set(0, 0);    
    const background = new Graphics();
    background.beginFill(0xff0000, 0.2); // Красный цвет
    background.fill();
    background.label = data.label + " Background";
    background.visible = false;
    const container = new Container(); // Контейнер кнопки
    container.label = data.label + " Container";
    container.zIndex = 0;
    container.hitArea = new Rectangle(data.position[0] + this._offsetX, data.position[1], data.width, data.height); // координаты и размер области нажатия
    container.interactive = true; 
    container.on('pointerdown', async (event) => { 

      if (event.data.button === 0) {
        //console.log('Левый клик!');
sprite.texture = false;
      if (selectedDraggable) {
        new Draggable().put("bag", key);
      } else {
        new Draggable().take("bag", key);
        container.zIndex = 0;
        sprite.zIndex = 0;
        sprite.width = 28;
        sprite.height = 28;
        background.clear();
        background.beginFill(0xff0000, 0.2); // Красный цвет
        background.rect(sprite.x, sprite.y, 28, 28); // Прямоугольник с размерами экрана
        background.fill();
        container.hitArea = new Rectangle(sprite.x, sprite.y, 28, 28);
      }
   
      }
      if (event.data.button === 2) {
        //console.log('Правый клик!');
        // Здесь твоя логика
        //Hero.inventory.belt.action(key);
        Hero.inventory.bag.actionClick(key);
      }

      

    });

    container.on('pointerupoutside', () => { });
    container.on('pointerup',  async () => { });
    container.addChild(background);
    container.addChild(sprite)
    return container;
  }


  // Отрисовка данных уже в готовых контейнерах
  rerender(){
    if (this._data) {
      for (let key in this._data){
        const data = this._data[key];
        if (key == "bag") {
          for (let y in data) {
            for (let x in data[y]) {
              //console.log("key", key)
              let Object = Hero.inventory.bag.getCell([y, x]);
              this._rerenderCell("bag" + y + x, Object);
            }
          }
        } else {
          let Object = Hero.inventory.person.getCell(key);
          this._rerenderCell(key, Object);
          //console.log("key", key)
        }
      }
    }  
  }

  async _rerenderCell(name, Object){
    let background = ControlPanel.UIContainer.getChildByLabel(name + " Background", true);
    background.visible = !!Object;
    /*
    if (!["string", "number"].includes(typeof ObjectID)) {
      return false;
    }
    */
    //const objectData = (Object != null) ? Object : false;
    this._rerenderSprite(name, (Object != null) ? Object : false);
  }

  
  async _rerenderSprite(name, objectData){
    //const texture = objectData.texture;
    const texture = (objectData) ? objectData.texture : false; // если есть что тов ячейке, выводим текстуру
    
    //console.log(texture);
    let spriteDimensions = {width : 28, height : 28};
    let zIndex = 0;
        
    if (texture) {
      zIndex = 3;
      spriteDimensions.width = texture.sprite.width;
      spriteDimensions.height = texture.sprite.height;
    }
    let sprite = ControlPanel.UIContainer.getChildByLabel(name + " Sprite", true);
        sprite.texture = texture.sprite;
        sprite.visible = true;
        sprite.zIndex = zIndex;
        sprite.width = spriteDimensions.width;
        sprite.height = spriteDimensions.height;
        //console.log("objectData.canBeUsed"); console.log(objectData);
    if ( objectData.canBeUsed ) { // проверяем, можно ли использовать предмет
        sprite.tint = 0xFFFFFF; // Цветовые каналы (красный, зеленый, синий) остаются неизменными.
    } else { 
        sprite.tint = 0xff0000; // Красный цвет в формате HEX   <----  ИСПОЛЬЗОВАТЬ ДЛЯ ПРЕДМЕТОВ, КОТОРЫЕ НЕЛЬЗЯ ИМПОЛЬЗОВАТЬ
    }
    let container = ControlPanel.UIContainer.getChildByLabel(name + " Container", true);
        container.hitArea = new Rectangle(sprite.x, sprite.y, spriteDimensions.width, spriteDimensions.height);
        container.zIndex = zIndex;
    let background = ControlPanel.UIContainer.getChildByLabel(name + " Background", true);
        background.clear();
        background.beginFill(0xff0000, 0.2); // Красный цвет
        background.rect(sprite.x, sprite.y, spriteDimensions.width, spriteDimensions.height); // Прямоугольник с размерами экрана
        background.fill();
        container.on("pointerover", () => {
          new DescriptionRender(objectData.descriptionData);
        });
        container.on("pointerout", () => {
          new DescriptionRender();
        });
  }
}

// sprite.on("pointerdown", () => {});
// sprite.on("pointermove", () => {});
// sprite.on("pointerup", () => {});
// sprite.on("pointerupoutside", () => {});

const InventoryPanel = new InventoryPanelClass();
export default InventoryPanel;