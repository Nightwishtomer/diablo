//import * as ObjectsData from "./../../../../diablo/game-project/data/objects/objects.js"; // items
await Assets.load('./../../../../diablo/game-project/data/objects/objcurs.json'); // Ассет. 
import { Application, Assets, Sprite, Container, Rectangle, Texture, AnimatedSprite, Ticker } from "pixi";
//import { Hero, HeroData } from "hero/hero";
import Hero from "hero/hero";
import player from "hero/hero";
import { LoadData } from "objects/loadData"; // objects/loadData
import { Memory } from "utils/memory"; // utils/memory




import { classAmulets } from "objects/classAmulets";
import { classArmors } from "objects/classArmors";
import { classAxes } from "objects/classAxes";
import { classBows } from "objects/classBows";
import { classElixirs } from "objects/classElixirs";
import { classHelmets } from "objects/classHelmets";
import { classMaces } from "objects/classMaces";
import { classOils } from "objects/classOils";
import { classPotions } from "objects/classPotions";
import { classRings } from "objects/classRings";
import { classRunes } from "objects/classRunes";
import { classShields } from "objects/classShields";
import { classStaffs } from "objects/classStaffs";
import { classSwords } from "objects/classSwords";

import { Description } from "objects/internals/description";

export let LoadedData = {};

export class Objects {
  constructor(){
    //this._ObjectsData = ObjectsData;
    //this._HERO = Hero;
    //this.allObjectData = null;
    //this.object = null;
    this.Memory = new Memory();
    //this.init();

  }

  //async init(){
    // this.allObjectData = await LoadData("allObjectData");
    //console.log(this.allObjectData);
 // }

  // получение текстуры обьекта Sprite
  async _getTexture(id){
    const textureObjectData = await LoadData("textureObjectData");
    return textureObjectData[id];
  }



  // создание текстуры обьекта Sprite
  async _creatingTexture(texture){
    //console.log(texture);
    return Texture.from(texture);
  }



  // получение информации о texture
  //async getTextureByTextureId(textureId){
  //  return this._ObjectsData.textureObjectData[textureId];
  //}

  // получение имя текстуры по номеру обьекта для курсора








  // получение данных
  async getData(ObjectID){
    /*
    if (ObjectID in allObjectData) {
      // Amulets
      if (allObjectData[ObjectID] == "amulets" ) { return new classAmulets().get(ObjectID); }
      // Armors
      if (allObjectData[ObjectID] == "armor" ) { return new classArmors().get(ObjectID); }
      // Axes
      if (allObjectData[ObjectID] == "axe" ) { return new classAxes().get(ObjectID); }
      // Bows
      if (allObjectData[ObjectID] == "bows" ) { return new classBows().get(ObjectID); }
      // Elixirs
      if (allObjectData[ObjectID] == "elixir" ) { return new classElixirs().get(ObjectID); }
      // Helmets
      if (allObjectData[ObjectID] == "helmet" ) { return new classHelmets().get(ObjectID); }
      // Maces
      if (allObjectData[ObjectID] == "mace" ) { return new classMaces().get(ObjectID); }
      // Oils
      if (allObjectData[ObjectID] == "oils" ) { return new classOils().get(ObjectID); }
      // Potions
      if (allObjectData[ObjectID] == "potion" ) { return new classPotions().get(ObjectID); }
      // Rings
      if (allObjectData[ObjectID] == "rings" ) { return new classRings().get(ObjectID); }
      // Runes
      if (allObjectData[ObjectID] == "rune" ) { return new classRunes().get(ObjectID); }
      // Shields
      if (allObjectData[ObjectID] == "shield" ) { return new classShields().get(ObjectID); }
      // Staffs
      if (allObjectData[ObjectID] == "staff" ) { return new classStaffs().get(ObjectID); }
      // Swords
      if (allObjectData[ObjectID] == "sword" ) { return new classSwords().get(ObjectID); }
    } else {
      return false;
    }
    */
    //allObjectData

    
    let data = this.Memory.get("objects", ObjectID);
    if (!data) {
      const allObjectData = await LoadData("allObjectData");
      if (!allObjectData[ObjectID]) return false;
      const objectData = allObjectData[ObjectID];
      const typeData = await LoadData(objectData.link.array);
      data = typeData[objectData.link.id]
      data.id = ObjectID;
      data.textureData = await this._getTexture(data.textureObjectId)
      data.texture = await this._creatingTexture(data.textureData.texture);
      data.canBeUsed = this._checkRequired(data.required); // проверка необходимых условий использования предмета
      data.descriptionData = await new Description("objects", data);
      this.Memory.add("objects", data.id, data);     
    }
    
    return data;

  }

  // получение описания текстуры
  async getDescription(ObjectID){
    const data = await this.getData(ObjectID);
    return data.descriptionData;
  }

  // получение имени текстуры
  async getTextureName(ObjectID){
    const data = await this.getData(ObjectID);
    return data.textureData.texture;
  }

  // проверка необходимых условий использования предмета
  _checkRequired(required){
    //console.log(required);


    if (required || Object.keys(required).length !== 0) { // обьект не пустой, далее проверяем поля
      for (const [key, value] of Object.entries(required)) { // проходимся по списку
        const heroStatMap = {
          strength: Hero.char.strength.value,
          dexterity: Hero.char.dexterity.value,
          magic: Hero.char.magic.value,
          level: Hero.experience.level
        };     
        const heroValue = heroStatMap[key];
        if (value > heroValue) {
          return false; // Нельзя использовать
        }
      }
    }
    return true; // можно использовать    
  }


  // проверка на совпадение типов предметов
  async checkingItemTypes(ObjectID, comparisonType){
    //const allObjectData = await LoadData("allObjectData");
    //if (!allObjectData[ObjectID]) return false;
    //const objectData = allObjectData[ObjectID];
    //const typeData = await LoadData(objectData.link.array);
    //data = typeData[objectData.link.id]
  }
}