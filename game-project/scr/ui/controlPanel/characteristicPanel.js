import { Sprite, Container, Text, Texture, Rectangle } from "pixi";
import Hero from "hero/hero";
import { LoadData } from "controlPanel/loadData"; // controlPanel/loadData
import { assetsData } from "controlPanel/controlPanel"; // controlPanel/controlPanel
import ControlPanel from "controlPanel/controlPanel"; // панель управления

export class CharacteristicPanelClass {
  constructor(){
    if (!CharacteristicPanelClass.instance) {
      this.obtainingData(); // получение данных
    }
    return CharacteristicPanelClass.instance;
  }

  // получение данных
  async obtainingData(){
    this._data = {
      text : await LoadData("characteristics", "windows"), // Получаем данные хорактеристик windows
      buttons : await LoadData("characteristics", "buttons"), // Получаем данные хорактеристик buttons
    };
  }

  async init(){
    const background = new Sprite(assetsData.char);
    background.label = "CharPanelBackground";
    background.x = 0;
    background.y = 0;
    background.anchor.set(0, 0);
    const panel = new Container();
    panel.label = "CharPanelContainer";
    panel.visible = ControlPanel.panelVisible.CharacteristicPanel;
    panel.addChild(background, await this._renderText(), await this._renderButtons());
    return panel;
  }
   
  async _renderText(){
    const containerWindows = new Container();
    containerWindows.label = "containerWindows";
    if (this._data.text) {
      for (let key in this._data.text){
        const data = this._data.text[key];
        const text = new Text({
          text  : "",
          style : { "fontFamily": "Diablo", "fontSize": 15, "fill": "#B8B8B8" },
          x     : (data.position[0] + (data.width / 2 )),
          y     : (data.position[1] + (data.height / 2 )),
          label : data.name + " Text",
        });
        text.anchor.set(0.5); // Центрирование текста относительно его точки привязки
        containerWindows.addChild(text);
      }
    }
    return containerWindows;
  }

  async _renderButtons(){
    const containerButtons = new Container();
    containerButtons.label = "containerButtons";
    if (Hero.experience.newPoints > 0) {
      if (this._data.buttons) {
        for (let key in this._data.buttons){
          const data = this._data.buttons[key];
          let container = new Container();
          let sprite = new Sprite(Texture.from(data.texture[0]));
          container.x = data.position[0];
          container.y = data.position[1];
          container.hitArea = new Rectangle(0, 0, data.width, data.height); // координаты и размер области нажатия
          container.interactive = true;
          sprite.interactive = true;
          container.on('pointerdown', () => {
            sprite.texture = Texture.from(data.texture[1]);
          });
          container.on('pointerup', () => {
            this._addButtonCharacteristics(data.action);
            sprite.texture = Texture.from(data.texture[0]);
          });
          sprite.width = data.width;
          sprite.height = data.height;
          container.label = data.name + "Container";
          sprite.label = data.name + "Sprite";
          container.addChild(sprite);
          containerButtons.addChild(container);
        }
      }
    }
    return containerButtons;
  }

  async _addButtonCharacteristics(action){
    if (Hero.experience.newPoints <= 0) return; // Проверяем наличие героя и очков
    const attrMap = {
      vitality: Hero.char.vitality,
      dexterity: Hero.char.dexterity,
      magic: Hero.char.magic,
      strength: Hero.char.strength
    };
    
    if (attrMap[action]) {
      attrMap[action].increaseBase(1);
    }
    Hero.experience.decreaseNewPoints();
    if (Hero.experience.newPoints <= 0) { // Скрываем кнопки, если очков больше нет
      ["Strength", "Magic", "Dexterity", "Vitality"].forEach(stat => {
          const btnContainer = ControlPanel.UIContainer.getChildByLabel(`Add${stat}Container`, true);
          if (btnContainer) btnContainer.visible = false;
      });
    }
    this.rerender(); // Обновление Окна
  }

  // Отрисовка данных уже в готовых контейнерах
  async rerender(){
    const text = [ 
      { name : "nameHero",      position : [16, 17],   width : 140, height : 20, value : Hero.name                           },
      { name : "typeHero",      position : [164, 17],  width : 140, height : 20, value : Hero.type                           },
      { name : "level",         position : [60, 55],   width : 51,  height : 20, value : Hero.experience.level               },
      { name : "experience",    position : [211, 55],  width : 93,  height : 20, value : Hero.experience.experience          },
      { name : "toNextLevel",   position : [211, 83],  width : 93,  height : 20, value : Hero.experience.toNextLevel         },
      { name : "gold",          position : [211, 132], width : 93,  height : 20, value : Hero.gold.value                     },
      { name : "strengthN",     position : [91, 140],  width : 39,  height : 21, value : Hero.char.strength.base             },
      { name : "strengthC",     position : [138, 140], width : 39,  height : 21, value : Hero.char.strength.value            },
      { name : "magicN",        position : [91,  168], width : 39,  height : 21, value : Hero.char.magic.base                },
      { name : "magicC",        position : [138, 168], width : 39,  height : 21, value : Hero.char.magic.value               },
      { name : "dexterityN",    position : [91, 196],  width : 39,  height : 21, value : Hero.char.dexterity.base            },
      { name : "dexterityC",    position : [138, 196], width : 39,  height : 21, value : Hero.char.dexterity.value           },
      { name : "vitalityN",     position : [91, 224],  width : 39,  height : 21, value : Hero.char.vitality.base             },
      { name : "vitalityC",     position : [138, 224], width : 39,  height : 21, value : Hero.char.vitality.value            },
      { name : "newPoints",     position : [91, 252],  width : 39,  height : 21, value : Hero.experience.newPoints           },
      { name : "lives",         position : [91, 289],  width : 39,  height : 21, value : Hero.charMain.life.base             },
      { name : "currentLives",  position : [138, 289], width : 39,  height : 21, value : Hero.charMain.life.value            },
      { name : "manna",         position : [91,  317], width : 39,  height : 21, value : Hero.charMain.mana.base             },
      { name : "currentManna",  position : [138, 317], width : 39,  height : 21, value : Hero.charMain.mana.value            },
      { name : "armorClass",    position : [253, 168], width : 51,  height : 20, value : Hero.property.armorClass.valueText  },
      { name : "chanceToHit",   position : [253, 196], width : 51,  height : 20, value : Hero.property.chanceToHit.valueText }, 
      { name : "demage",        position : [253, 224], width : 51,  height : 20, value : Hero.property.demage.valueText      },
      { name : "resistMagic",   position : [253, 261], width : 51,  height : 20, value : Hero.resist.magic.valueText         },
      { name : "resistFire",    position : [253, 289], width : 51,  height : 20, value : Hero.resist.fire.valueText          },
      { name : "resistLgtning", position : [253, 317], width : 51,  height : 20, value : Hero.resist.lightning.valueText     },
    ];

    for (let key in text){
      const data = text[key];
      let element = ControlPanel.UIContainer.getChildByLabel(data.name + " Text", true);
      element.text = data.value;
    }    
  }

}

const CharacteristicPanel = new CharacteristicPanelClass();
export default CharacteristicPanel;