import { Application, Assets, Sprite, Container, Text, formatShader, Texture, AnimatedSprite, Rectangle, Graphics, getMaxFragmentPrecision, autoDetectRenderer } from "pixi";
import Hero from "hero/hero";
import { LoadData } from "controlPanel/loadData"; // controlPanel/loadData
import ControlPanel from "controlPanel/controlPanel"; // controlPanel/controlPanel

import Settings from "settings";

export class BulbsPanelClass {
  constructor(){
    if (!BulbsPanelClass.instance) {
      this._appWidth = Settings.graphics.resolution.width; // Ширина экрана игры
      this._appHeight = Settings.graphics.resolution.height; // Высота экрана игры
    }
    return BulbsPanelClass.instance;
  }

   // bulbs - Panel - START
  async init(){
    const bulbsContainer = new Container(); // Контейнер bulbs
    bulbsContainer.zIndex = 1;
    bulbsContainer.label = "Bulbs Container";
    bulbsContainer.addChild(this._renderLives(), this._renderManna());
    return bulbsContainer;
  } 
 
  // Отрисовка манны
  _renderManna(){
    const sprite = new Sprite(); 
    sprite.zIndex = 3;
    sprite.label = "p8bulbsManna Sprite";
    sprite.x = this._appWidth - 178;
    sprite.y = this._appHeight - 144;
    sprite.anchor.set(0, 0);
    return sprite;
  }

  // Отрисовка Жизни
  _renderLives(){
    const sprite = new Sprite(); 
    sprite.zIndex = 3;
    sprite.label = "p8bulbsLives Sprite";
    sprite.x = 95; 
    sprite.y = this._appHeight - 144;
    sprite.anchor.set(0, 0);
    return sprite;
  }

  // Отрисовка данных уже в готовых контейнерах
  async rerender(){
    this._data = await LoadData("bulbs", "bulbs"); // Получаем данные bulbs
    if (this._data) {
      for (let key in this._data) {
        const data = this._data[key];
        const livesRatio = Hero.charMain.life.ratio;
        if ((livesRatio <= data.range[0] ) && (livesRatio > data.range[1])) {
          let spriteLives = ControlPanel.UIContainer.getChildByLabel("p8bulbsLives Sprite", true);
          spriteLives.texture = Texture.from("p8bulbsLives" + data.textureID + ".png"); 
          spriteLives.y = this._appHeight - data.offset;
          break;
        }
      }
      for (let key in this._data) {
        const data = this._data[key];  
        const mannaRatio = Hero.charMain.mana.ratio;     
        if ((mannaRatio <= data.range[0] ) && (mannaRatio > data.range[1])) {
          let spriteManna = ControlPanel.UIContainer.getChildByLabel("p8bulbsManna Sprite", true);
          spriteManna.texture = Texture.from("p8bulbsManna" + data.textureID + ".png"); 
          spriteManna.y = this._appHeight - data.offset;       
          break;
        }
      }
    } 
  }
}

const BulbsPanel = new BulbsPanelClass();
export default BulbsPanel;