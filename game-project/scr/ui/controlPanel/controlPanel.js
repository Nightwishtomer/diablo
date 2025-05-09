import { app } from "index";
import { Application, Assets, Sprite, Container, Text, formatShader, Texture, AnimatedSprite, Rectangle, Graphics, getMaxFragmentPrecision, autoDetectRenderer } from "pixi";
import Environment from "environment";
import Settings from "settings";

import MainPanel from "controlPanel/mainPanel"; // controlPanel/mainPanel
import BulbsPanel from "controlPanel/bulbsPanel"; // controlPanel/bulbsPanel
import BeltPanel from "controlPanel/beltPanel"; // controlPanel/beltPanel
import CharacteristicPanel from "controlPanel/characteristicPanel"; // controlPanel/characteristicPanel
import InventoryPanel from "controlPanel/inventoryPanel"; // controlPanel/inventoryPanel
import hardURLs from "hardURLs"; // hardURLs


await Assets.load(hardURLs.data.ui.ControlPanel.main.mainPanel); // Ассет. Нижней Панели 
await Assets.load(hardURLs.data.ui.ControlPanel.p8bulbs); // Ассет. шары здоровья и маны
await Assets.load(hardURLs.data.ui.ControlPanel.buttonChar); // Ассет. Кнопок для повышения хорактеристик






export const assetsData = {
  char         : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/char.png'),         // Окно характеристик
  ////charbut      : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/charbut.png'),      // Кнопки окна характеристик

  inv : {
    rogue    : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/inv_rogue.png'),    // Окно инвентаря Лучницы
    sorcerer : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/inv_sorcerer.png'), // Окно инвентаря Мага
    warrior  : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/inv_warrior.png'),	// Окно инвентаря Воина
  },
  //p8bulbs      : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/p8bulbs.png'),	    // Пустые шары здоровья и маны
  mainPanel       : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/mainPanel.png'),       // Нижняя панель 
  //spelicon_cel : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/spelicon_cel.png'), // Иконки Магии 1
  //spellbk      : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/spellbk.png'),	    // Окно навыков
  //spellbkb     : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/spellbkb.png'),     // Кнопки окна навыков
  ////spelli2_cel  : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/spelli2_cel.png'),  // Иконки Магии 2
  //buttonChar   : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/buttonChar.json'),  // Ассет. Кнопок для повышения хорактеристик
};

export const actions = {
  pointerdown : {
    buttonChar      : () => { /*console.log("открываем окно buttonChar");*/      },   
    buttonQuests    : () => { /*console.log("открываем окно buttonQuests");*/    },  
    buttonMap       : () => { /*console.log("открываем окно buttonMap");*/       },    
    buttonMenu      : () => { /*console.log("открываем окно buttonMenu");*/      },  
    buttonInv       : () => { /*console.log("открываем окно buttonInv");*/       },  
    buttonSpells    : () => { /*console.log("открываем окно buttonSpells");*/    },  
    buttonIconSpell : () => { /*console.log("открываем окно buttonIconSpell");*/ },
    belt            : (key) => { /*console.log("открываем belt - " + key);*/     }, // выполняем действия // либо меняем позиции
  },    
  pointerup : {
    buttonChar      : () => {
      /*console.log("закрываем окно buttonChar");*/
      ControlPanel.toggleVisibility("CharPanelContainer"); // открытие и закрытие окна 
    },   
    buttonQuests    : () => { /*console.log("закрываем окно buttonQuests");*/
    ControlPanel.rerender();
    
  
      },  
    buttonMap       : () => { /*console.log("закрываем окно buttonMap");*/       },    
    buttonMenu      : () => { /*console.log("закрываем окно buttonMenu");*/      },  
    buttonInv       : () => { 
      /*console.log("закрываем окно buttonInv"); */
      ControlPanel.toggleVisibility("InvPanelContainer"); // открытие и закрытие окна 
    },  
    buttonSpells    : () => { /*console.log("закрываем окно buttonSpells");*/    },  
    buttonIconSpell : () => { /*console.log("закрываем окно buttonIconSpell");*/ },  
    belt            : (key) => {/*console.log("закрываем belt - " + key);*/ this.__view(); }, // удалять картинку из интерфейса
  },
};

export class ControlPanelClass {
  constructor(){
    if (!ControlPanelClass.instance) {
      this.panelVisible = {
        characteristicsPanel : false,
        inventoryPanel : false,
      };
      this.UIContainer = {};
      this.MainPanel = MainPanel; // MainPanel 
      this.BeltPanel = BeltPanel; // BeltPane
      this.BulbsPanel = BulbsPanel; // BulbsPanel   
      this.CharacteristicPanel = CharacteristicPanel; // CharacteristicsPanel
      this.InventoryPanel = InventoryPanel; // InventoryPanel

    }
    return ControlPanelClass.instance;
  }

  async init(){

    for (let index = 0; index <= 203; index++) {
      //console.log(index);
      //console.log(await new Objects().getDescription(index));
    }
 
    this.UIContainer = new Container();
    this.UIContainer.label = "controlPanel";
    this.UIContainer.sortableChildren = true;
    this.UIContainer.addChild(await this.MainPanel.init()); // MainPanel
    this.UIContainer.addChild(await this.BeltPanel.init()); // BeltPanel
    this.UIContainer.addChild(await this.BulbsPanel.init()); // BulbsPanel
    this.UIContainer.addChild(await this.CharacteristicPanel.init()); // CharacteristicsPanel
    this.UIContainer.addChild(await this.InventoryPanel.init()); // InventoryPanel
    app.stage.addChild(this.UIContainer); // Добавляем на сцену
    this.rerender();
  }

  // Меняем видимость окон по какому-то событию
  toggleVisibility(name) {
    this.UIContainer.getChildByLabel(name, true).visible = !this.UIContainer.getChildByLabel(name, true).visible;
    this.panelVisible[name] = this.UIContainer.getChildByLabel(name, true).visible;
  }

  // поиск контейнера по имени
  async _searchChildByLabel(label) {
    return UIContainer.getChildByLabel(label, true);
  }

  /**
  * Отрисовка данных уже в готовых контейнерах
  * @param {Array/string} input - Название, что обнавлять
  */
  async rerender(input = ["BulbsPanel",  "CharacteristicPanel", "BeltPanel", "InventoryPanel"]){  
    input = (!Array.isArray(input)) ? [input] : input;
    if (input.includes("BulbsPanel")) { await this.BulbsPanel.rerender(); } // BulbsPanel
    if (input.includes("CharacteristicPanel")) { await this.CharacteristicPanel.rerender(); } // CharacteristicsPanel
    if (input.includes("BeltPanel")) { await this.BeltPanel.rerender(); } // BeltPanel
    if (input.includes("InventoryPanel")) { await this.InventoryPanel.rerender(); } // InventoryPanel
  }
}

const ControlPanel = new ControlPanelClass();
export default ControlPanel;