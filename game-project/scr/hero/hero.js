import { Stat } from "hero/stat";
import { Life } from "hero/life";
import { Mana } from "hero/mana";
import { Strength } from "hero/strength";
import { Dexterity } from "hero/dexterity";
import { Magic } from "hero/magic";
import { Vitality } from "hero/vitality";


import { ArmorClass } from "hero/armorClass";
import { ChanceToHit } from "hero/chanceToHit";
import { Demage } from "hero/demage";
import { Resist } from "hero/resist";
//import { ResistMagic } from "hero/resistMagic";
//import { ResistFire } from "hero/resistFire";
import { Experience } from "hero/experience";
import { Gold } from "hero/gold";

import { InvBelt } from "hero/inventory/belt"; // Подключение файла. Для получения пояса
import { InvBag } from "hero/inventory/bag"; // Подключение файла. Для получения мешка
import { InvPerson } from "hero/inventory/person"; // Подключение файла. Для получения персонажа
import { Object } from "objects/object"; // object

import rogueData from "data/hero/rogue";
import sorcererData from "data/hero/sorcerer";
import warriorData from "data/hero/warrior";

class HeroClass {
  constructor() {
      if (HeroClass.instance) {
          return HeroClass.instance; // Если объект уже создан, возвращаем его
      }
      HeroClass.instance = this; // Сохраняем ссылку на единственный объект
      console.warn("НОВЫЙ КЛАСС ГЕРОЯ");
      
      this.name = null; // Имя героя
      this.type = null; // Тип героя

      this.charMain = {
        life : undefined, // Жизни
        mana : undefined,  // Мана
      };
      
      this.char = {
        strength        : undefined, // текущее Сила
        dexterity       : undefined, // текущее Ловкость Dexterity
        magic           : undefined, // текущее Магия
        vitality        : undefined, // текущее Живучесть
      };

      this.property = {
        demage          : undefined, // Повреждения
        armorClass      : undefined, // Класс брони (AC)
        chanceToHit     : undefined, // Шанс попадания
      };

      this.resist = {
        magic     : undefined, // Защита от Магии
        fire      : undefined, // Защита от Огня
        lightning : undefined, // Защита от Молнии
      },

      // +++++++++++++++++++++++++++++
      
      this.experience = undefined; // Опыт
      /*
      this.experience = { // Опыт
        level       : 1, 
        experience  : 0, // Опыт героя
        toNextLevel : 0, // до следующего уровня
        newPoints   : 2, // Новые очки опыта
      };
      */
      
      this.gold = undefined; // Золото
      
      this.inventory = { 
        belt : undefined,
        bag : undefined,
        person : undefined,
      };




/*

this.position = {
    iso: { // isometric В изометрических координатах (для вывода на карту)
      x : null,
      y : null,
    }, 
    cart: { // cartesian В Декартовых координатах (для вывода на карту)
      x : null,
      y : null,
    },
    cell : { // Текущая ячейка в игровом поле
      x : null,
      y : null,
    },
  };
  this.experience = { // Опыт
    //id          : null, // Id уровенья героя
    level       : 1, // Уровень героя
    experience  : 0, // Опыт героя
    toNextLevel : 0, // до следующего уровня
    newPoints   : 2, // Новые очки опыта
  };
  characteristics : { // характеристики

    current : {}, // текущий Значение. естественное Значение + БОНУСЫ
      // lives : characteristics.lives, // Жизни
      // manna : characteristics.manna, // Мана
      // strength  : characteristics.strength,  // текущее Сила
      // dexterity : characteristics.dexterity, // текущее Ловкость Dexterity
      // magic     : characteristics.magic,     // текущее Магия
      // vitality  : characteristics.vitality,  // текущее Живучесть
      // demage          : [0, 0], // Повреждения
      // armorClass      : 0, // Класс брони (AC)
      // chanceToHit     : 0, // Шанс попадания


    natural : {}, // естественное Значение.
      // lives : characteristics.lives, // Жизни
      // manna : characteristics.manna, // Мана
      // strength  : characteristics.strength,  // Сила
      // dexterity : characteristics.dexterity, // Ловкость Dexterity
      // magic     : characteristics.magic,     // Магия
      // vitality  : characteristics.vitality,  // Живучесть
      // demage          : [0, 0], // Повреждения
      // armorClass      : 0, // Класс брони (AC)
      // chanceToHit     : 0, // Шанс попадания


    maximal : {}, // Максимальные характеристики 
      // strength  : maxCharacteristics.strength,  // Сила
      // dexterity : maxCharacteristics.dexterity, // Ловкость
      // magic     : maxCharacteristics.magic,     // Магия
      // vitality  : maxCharacteristics.vitality,  // Живучесть
    added : {}, // Дополнительные характеристики 
      // strength  : addCharacteristics.strength,  // Сила
      // dexterity : addCharacteristics.dexterity, // Ловкость
      // magic     : addCharacteristics.magic,     // Магия
      // vitality  : addCharacteristics.vitality,  // Живучесть
    demage          : [0, 0], // Повреждения
    armorClass      : 0, // Класс брони (AC)
    chanceToHit     : 0, // Шанс попадания

    
  },

//  addCharacteristics : { // дополнительные хорактеристики
//    vitalityFromThings: 0, // Живучесть с вещей
//    bonusesFromThings:  0, // Бонусы с вещей
//    magicFromThings: 0, // Магия с вещей
//    mannaFromThings:  0,
//  },



  gold : 100, // денег у героя
  resist : { // Защита
    magic     : 0, // Защита от Магии
    fire      : 0, // Защита от Огня
    lightning : 0, // Защита от Молнии
  },
 
  inventory : { // Инвентарь
    belt : { // пояс
      0 : null, // Ячейка пояса 0
      1 : 1, // Ячейка пояса 1
      2 : null, // Ячейка пояса 2
      3 : 2, // Ячейка пояса 3
      4 : null, // Ячейка пояса 4
      5 : 3, // Ячейка пояса 5
      6 : null, // Ячейка пояса 6
      7 : 4, // Ячейка пояса 7
    },
    person : {


      head       : 192, // голова
      neck       : null, // шея
      tors       : null, // торс
      leftHand  : null, // левая рука
      leftRing  : null, // левое кольцо
      rightHand : null, // правая рука
      rightRing : null, // правое кольцо
    }, // Персонаж
    bag : {
      0 : {  0 : 120,  1 : null, 2 : 122,  3 : null, 4 : null, 5 : null, 6 : 188,  7 : null, 8 : null, 9 : null, },
      1 : {  0 : null, 1 : 111,  2 : null, 3 : null, 4 : null, 5 : null, 6 : null, 7 : null, 8 : 193,  9 : null, },
      2 : {  0 : null, 1 : null, 2 : null, 3 : null, 4 : null, 5 : 2,    6 : null, 7 : null, 8 : null, 9 : null, },
      3 : {  0 : 42,   1 : null, 2 : null, 3 : null, 4 : null, 5 : null, 6 : null, 7 : null, 8 : null, 9 : null, },
    }, // Вещьмешок
    
  },

*/

      this.updateFinalStats();
  }

  updateFinalStats() {
      // Тут твоя логика пересчёта характеристик
  }

  async init(typeHero, nameHero) {
    console.warn("НОВЫЙ КЛАСС ГЕРОЯ init");
    this.name = nameHero; // Имя героя
    this.type = typeHero; // Тип героя


    const data = await this._loadStartCharacteristics(this.type);
    //console.log(data);
    if (data) {
      //this._startCharacteristics = data; // Получение стартовых характеристик
      //this._setStartCharacteristics(); // Установка характеристик
      //console.log(data);
      const characteristicsBase = data.characteristics.base;
      const characteristicsMax  = data.characteristics.max;
      
      this.charMain.life = new Life(characteristicsBase.life);
      this.charMain.mana = new Mana(characteristicsBase.mana);





      this.char.strength  = new Strength(characteristicsBase.strength, characteristicsMax.strength);    // Strength, Max Strength
      this.char.dexterity = new Dexterity(characteristicsBase.dexterity, characteristicsMax.dexterity); // Dexterity, Max Dexterity
      this.char.magic     = new Magic(characteristicsBase.magic, characteristicsMax.magic);             // Magic, Max Magic
      this.char.vitality  = new Vitality(characteristicsBase.vitality, characteristicsMax.vitality);    // Vitality, Max Vitality
      this.property.demage          = new Demage([0, 1]); // Повреждения
      this.property.armorClass      = new ArmorClass(6); // Класс брони (AC)
      this.property.chanceToHit     = new ChanceToHit(0); // Шанс попадания
      this.resist.magic     = new Resist(10); // Защита от Магии
      this.resist.fire      = new Resist(20); // Защита от Огня
      this.resist.lightning = new Resist(30); // Защита от Молнии

      
      this.experience = new Experience(0); // Опыт
      this.experience.addExperience(2000); // Опыт
     




      this.gold = new Gold(1000); // Золото

      
      this.inventory.belt   = new InvBelt(null);   // Данные пояса
      this.inventory.bag    = new InvBag(null);    // Данные мешка
      this.inventory.person = new InvPerson(null); // Данные персонажа



/*
        bag : {
          0 : {  0 : 120,  1 : null, 2 : 122,  3 : null, 4 : null, 5 : null, 6 : 188,  7 : null, 8 : null, 9 : null, },
          1 : {  0 : null, 1 : 111,  2 : null, 3 : null, 4 : null, 5 : null, 6 : null, 7 : null, 8 : 193,  9 : null, },
          2 : {  0 : null, 1 : null, 2 : null, 3 : null, 4 : null, 5 : 2,    6 : null, 7 : null, 8 : null, 9 : null, },
          3 : {  0 : 42,   1 : null, 2 : null, 3 : null, 4 : null, 5 : null, 6 : null, 7 : null, 8 : null, 9 : null, },
        }, // Вещьмешок
        
*/

this.inventory.belt.setCell(1, new Object(1));
this.inventory.belt.setCell(3, new Object(2));
this.inventory.belt.setCell(5, new Object(3));
this.inventory.belt.setCell(6, new Object(5));
this.inventory.belt.setCell(7, new Object(4));
//this.inventory.belt.view();

this.inventory.person.setCell("head", new Object(188));


this.inventory.bag.setCell([0, 0], new Object(120));
this.inventory.bag.setCell([0, 2], new Object(122));
this.inventory.bag.setCell([0, 6], new Object(188));
this.inventory.bag.setCell([1, 1], new Object(111));
this.inventory.bag.setCell([1, 8], new Object(193));
this.inventory.bag.setCell([2, 5], new Object(2)  );
this.inventory.bag.setCell([3, 0], new Object(42) );


      /*
      console.table(this.charMain);
      console.table(this.char);
      console.table(this.property);
      console.table(this.resist);
      console.table(this.gold);
      console.table(this.experience);
      
*/
this.charMain.life.damage(20);

let objectP  = new Object(1);
console.log("objectP : ");   
console.log(objectP);
//objectP.use();

console.log(objectP);
//console.log(object.name, object.type, object.textureName);
     
          /*
          console.table(this);
          
          console.log(this.life.value);
          this.life.damage(30);console.log("damage: 30");
          console.log(this.life.value);
          this.life.healing(15);console.log("healing: 15");
          console.log(this.life.value)
          this.life.restore();console.log("restore");
          console.log(this.life.value);
          console.log("-----------------------------------------------");
          this.life.view();
          this.mana.view();
          */
    }


  }













  // Служебные функции ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Загрузка стартовых данных игрока, в зависимости от типа
  async _loadStartCharacteristics(type) {
    console.log(type);
    if(type == "rogue"){
      return rogueData;
    }
    if(type == "sorcerer"){
      return sorcererData;
    }
    if(type == "warrior"){
      return warriorData;
    }
  }


}





const Hero = new HeroClass();
export default Hero;