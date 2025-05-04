import { Application, Assets, Sprite, Container, Text, formatShader, Texture, AnimatedSprite, Rectangle, Graphics, getMaxFragmentPrecision, autoDetectRenderer } from "pixi";
import ControlPanel from "controlPanel/controlPanel"; // controlPanel/controlPanel
import { selected as selectedDraggable,  Draggable } from "draggable"; // Draggable
export let DescriptionInformationDisplayed = false;
// информация выведена

/**
 * The Description class generates a description of an item based on the passed data.
 */
export class DescriptionRender {
  constructor(inputData) {
    this.inputData = inputData;
    this.position = { x : 167, y : 394 };
    this.dimensions = { width  : 309, height : 73 };
    this.DescriptionBackground = ControlPanel.UIContainer.getChildByLabel("DescriptionBackground", true);
    this.data = new Container();
    if (inputData) {
      if (!DescriptionInformationDisplayed) {
        this._highlightingBackground(); // выделение нужным цветом
        if (inputData.property) {
          // есть хорактеристики. Выводим дальше
          this._drawName(true); // вывод просто имя предмета сверху
          this._displayPropertys();
        } else {
          // выводим просто имя предмета
          this._drawName(false); // вывод просто имя предмета по середине
        }
        this.DescriptionBackground.fill();
        DescriptionInformationDisplayed = true;
      }
     } else {
      if (!selectedDraggable) {
        this._cleaningBackground(); // Фон очистки
      }
    }
    this.DescriptionBackground.addChild(this.data);
  }

  _highlightingBackground() {
    let color = "0xF0E68C";// Стандартный цвет // Фон стандартный для предметов
    let alpha = 0.05;// Стандартный цвет // Фон стандартный для предметов
    if (!this.inputData.canBeUsed) {
      color = "0xFF0000"; // Maroon цвет - не подходит для одевания // Фон предметов, которые нельзя использловать
      alpha = 0.1; // Maroon цвет - не подходит для одевания // Фон предметов, которые нельзя использловать
    } else {
      if (this.inputData.unique) {
        color = "0x708090"; // SlateGrey цвет - Уникальный // Фон для уникальных предметов
      }
    }  
    this.DescriptionBackground.beginFill(color, alpha); 
  }

  // Фон очистки
  _cleaningBackground() {
      DescriptionInformationDisplayed = false;
    this.DescriptionBackground.clear()
    this.DescriptionBackground.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    this.DescriptionBackground.removeChildren(); // очистка поля
  }
                   
  // вывод просто имя предмета по середине или сверху
  _drawName(positionText = false){
    const text = new Text({ 
      text  : this.inputData.name,
      style : { "fontFamily": "Diablo", "fontSize": 15, "fill": "#B8B8B8" },
      label   : "name Description",
    });
    text.x = this.position.x + (this.dimensions.width / 2 );
    if (positionText) {
      text.y = this.position.y;
      text.anchor.set(0.5, 0); // Центрируем текс
    } else {
      text.y = this.position.y + (this.dimensions.height / 2 );
      text.anchor.set(0.5, 0.5); // Центрируем текс
    }
    this.data.addChild(text);
  }

  _drawText(text, x, y) {
    const textTexture = new Text({ 
      text  : text,
      style : { "fontFamily": "Diablo", "fontSize": 12, "fill": "#B8B8B8" },
      label   : "name Description",
    });
    textTexture.x = x;
    textTexture.y = y;
    textTexture.anchor.set(0.5, 0.5); // Центрируем текс
    this.data.addChild(textTexture);
  }


  // выод свойств приедмета
  _displayPropertys() {
    const property = this.inputData.property;
    const length = property.length;
    if (length == 1) {
      this._drawText(property[0], this.position.x + (this.dimensions.width / 2 ), this.position.y + (this.dimensions.height / 2 ));
    }
    
    if (length == 2) {
      this._drawText(property[0], this.position.x + ((this.dimensions.width / 4) * 2 ), this.position.y + 30);
      this._drawText(property[1], this.position.x + ((this.dimensions.width / 4) * 2 ), this.position.y + 55);                   
    }

    if (length == 3) {
      this._drawText(property[0], this.position.x + ((this.dimensions.width / 4) * 1 ), this.position.y + 30);
      this._drawText(property[1], this.position.x + ((this.dimensions.width / 4) * 3 ), this.position.y + 30);
      this._drawText(property[2], this.position.x + ((this.dimensions.width / 4) * 2 ), this.position.y + 55);
    }

    if (length == 4) {
      this._drawText(property[0], this.position.x + ((this.dimensions.width / 4) * 1 ), this.position.y + 30);
      this._drawText(property[1], this.position.x + ((this.dimensions.width / 4) * 3 ), this.position.y + 30);
      this._drawText(property[2], this.position.x + ((this.dimensions.width / 4) * 1 ), this.position.y + 55);
      this._drawText(property[3], this.position.x + ((this.dimensions.width / 4) * 3 ), this.position.y + 55);
    }
  }










}