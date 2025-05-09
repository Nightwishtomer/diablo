import { Lives } from "hero/lives";
import { Manna } from "hero/manna";



import { InvPerson } from "hero/inventory/person";
import { InvBag } from "hero/inventory/bag";



import rogueData from "data/hero/startHeroesData/rogue";
import sorcererData from "data/hero/startHeroesData/sorcerer";
import warriorData from "data/hero/startHeroesData/warrior";

export const HeroData = {

  name : null, // Имя героя
  type : null, // Тип героя
  position : {
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
  },
  experience : { // Опыт
    //id          : null, // Id уровенья героя
    level       : 1, // Уровень героя
    experience  : 0, // Опыт героя
    toNextLevel : 0, // до следующего уровня
    newPoints   : 2, // Новые очки опыта
  },
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
      // protectionClass : 0, // Класс защиты

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
      // protectionClass : 0, // Класс защиты

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
    protectionClass : 0, // Класс защиты
    
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


};







export class InitHero {
  constructor(input){
    this.name = input.newClassName;
    this.heroType = input.newClassType;
    HeroData.name = this.name; //  Установка Имя героя
    HeroData.type = this.heroType; // Установка Тип героя    
    this._init();

    //console.log(Hero.livesC());
  }


  _loadStartCharacteristics() {
    if(this.heroType == "rogue"){
      return rogueData;
    }
    if(this.heroType == "sorcerer"){
      return sorcererData;
    }
    if(this.heroType == "warrior"){
      return warriorData;
    }
  }


  
  async _init(){
    const data = await this._loadStartCharacteristics();
    if (data) {
      this._startCharacteristics = data; // Получение стартовых характеристик
      this._setStartCharacteristics(); // Установка характеристик
    }
  }
  


  

  //Установка стартовых хорактеристик
  _setStartCharacteristics(){
    if (!this._startCharacteristics) return;

    const characteristics = this._startCharacteristics.characteristics;
    const maxCharacteristics = this._startCharacteristics.maxCharacteristics;

    HeroData.characteristics.current = { // текущий Значение. естественное Значение + БОНУСЫ
      lives : characteristics.lives, // Жизни
      manna : characteristics.manna, // Мана
      strength  : characteristics.strength,  // текущее Сила
      dexterity : characteristics.dexterity, // текущее Ловкость Dexterity
      magic     : characteristics.magic,     // текущее Магия
      vitality  : characteristics.vitality,  // текущее Живучесть
    };

    HeroData.characteristics.natural = { // естественное Значение.
      lives : characteristics.lives, // Жизни
      manna : characteristics.manna, // Мана
      strength  : characteristics.strength,  // Сила
      dexterity : characteristics.dexterity, // Ловкость Dexterity
      magic     : characteristics.magic,     // Магия
      vitality  : characteristics.vitality,  // Живучесть
    };

    HeroData.characteristics.maximal = { // Максимальные характеристики
      strength  : maxCharacteristics.strength,  // Сила
      dexterity : maxCharacteristics.dexterity, // Ловкость
      magic     : maxCharacteristics.magic,     // Магия
      vitality  : maxCharacteristics.vitality,  // Живучесть
    };

    HeroData.characteristics.added = { // Дополнительные характеристики 
      strength  : 0,  // Сила
      dexterity : 0, // Ловкость
      magic     : 0,     // Магия
      vitality  : 0,  // Живучесть
    };
  }
}


export class HeroClass {
  constructor(){
    if (!HeroClass.instance) {
      //this.halth = 100;
    }
    return HeroClass.instance;
    //this.tileWidth  = Settings.graphics.tile.width;  // Ширина тайла (подставь своё значение)
    //this.tileHeight = Settings.graphics.tile.height; // Высота тайла (подставь своё значение)
    //this.tileWidth = 0.5;  // Ширина тайла (подставь своё значение)
    //this.tileHeight = 0.5; // Высота тайла (подставь своё значение)
    this._updating = false; // Флаг, чтобы избежать зацикливания
   
  }


// Имя героя
get name(){ return HeroData.name; }
set name(value){ HeroData.name = value; }
// Тип героя
get type(){ return HeroData.type; }
set type(value){ HeroData.type = value; }


// isometric Позиция в поле X
get posIsoX(){ return HeroData.position.iso.x; }
set posIsoX(value){ HeroData.position.iso.x = value; }
// isometric Позиция в поле Y
get posIsoY(){ return HeroData.position.iso.y; }
set posIsoY(value){ HeroData.position.iso.y = value; }

// cartesian Позиция в поле X
get posCartX(){ return HeroData.position.cart.x; }
set posCartX(value){ HeroData.position.cart.x = value; }
// cartesian Позиция в поле Y
get posCartY(){ return HeroData.position.cart.y; }
set posCartY(value){ HeroData.position.cart.y = value; }


// offset
//updatePosOffsetIsoX(value){ HeroData.position.iso.x += value; } // isometric offset Позиция в поле X
//updatePosIsoY(value){ HeroData.position.iso.y += value; } // isometric offset Позиция в поле Y
//updatePosCartX(value){ HeroData.position.cart.x += value; } // cartesian offset Позиция в поле X
//updatePosCartY(value){ HeroData.position.cart.y += value; } // cartesian offset Позиция в поле Y

// Позиция в ячейке X
get posCellX(){ return HeroData.position.cell.x; }
set posCellX(value){ HeroData.position.cell.x = value; }
// Позиция в ячейке Y
get posCellY(){ return HeroData.position.cell.y; }
set posCellY(value){ HeroData.position.cell.y = value; }












   // === Изометрические координаты ===
    get posIsoX() { return HeroData.position.iso.x; }
    set posIsoX(value) {
        if (HeroData.position.iso.x !== value) { // Проверка на изменение
            HeroData.position.iso.x = value;
            this._updateCartesian();
        }
    }

    get posIsoY() { return HeroData.position.iso.y; }
    set posIsoY(value) {
        if (HeroData.position.iso.y !== value) { // Проверка на изменение
            HeroData.position.iso.y = value;
            this._updateCartesian();
        }
    }

    // === Декартовы координаты ===
    get posCartX() { return HeroData.position.cart.x; }
    set posCartX(value) {
        if (HeroData.position.cart.x !== value) { // Проверка на изменение
            HeroData.position.cart.x = value;
            this._updateIsometric();
        }
    }

    get posCartY() { return HeroData.position.cart.y; }
    set posCartY(value) {
        if (HeroData.position.cart.y !== value) { // Проверка на изменение
            HeroData.position.cart.y = value;
            this._updateIsometric();
        }
    }








    // === Обновление декартовых координат ===
    _updateCartesian() {
      if (this._updating) return; // Проверка на повторный вызов
      this._updating = true;
      //HeroData.position.cart.x = (HeroData.position.iso.x - HeroData.position.iso.y) * (this.tileWidth / 2);
      //HeroData.position.cart.y = (HeroData.position.iso.x + HeroData.position.iso.y) * (this.tileHeight / 2);
      HeroData.position.cart.x = ( (2 * HeroData.position.iso.y) + HeroData.position.iso.x ) / 2;
      HeroData.position.cart.y = ( (2 * HeroData.position.iso.y) - HeroData.position.iso.x ) / 2;
      this._updating = false;
    }







    // === Обновление изометрических координат ===
    _updateIsometric() {
      if (this._updating) return; // Проверка на повторный вызов
      this._updating = true;
      //HeroData.position.iso.x = (HeroData.position.cart.x / (this.tileWidth / 2) + HeroData.position.cart.y / (this.tileHeight / 2)) / 2;
      //HeroData.position.iso.y = (HeroData.position.cart.y / (this.tileHeight / 2) - HeroData.position.cart.x / (this.tileWidth / 2)) / 2;
      HeroData.position.iso.x = HeroData.position.cart.x  - HeroData.position.cart.y;
      HeroData.position.iso.y = (HeroData.position.cart.x + HeroData.position.cart.y ) / 2;
      this._updating = false;
    }






// Id уровенья героя
//get exp_id(){ return HeroData.experience.id; }
//set exp_id(value){ HeroData.experience.id = value; }

// Уровень героя
get level(){ return HeroData.experience.level; }
set level(value){ HeroData.experience.level = value; }

// Опыт героя
get experience(){ return HeroData.experience.experience; }
set experience(value){ HeroData.experience.experience = value; }

// Опыт до следующего уровня
get toNextLevel(){ return HeroData.experience.toNextLevel; }
set toNextLevel(value){ HeroData.experience.toNextLevel = value; }


// Новые очки
get newPoints(){ return HeroData.experience.newPoints ?? 0; }
set newPoints(value){
 // HeroData.experience.newPoints = value;

  if (value >= 0) { HeroData.experience.newPoints = value; return true; }
  return false;
}



// увеличить
incNewPoints(){
  this.newPoints += 1;
}

// уменьшить
decNewPoints(){
    this.newPoints -= 1;
}

//-------------------------

// Жизни 
get livesN(){ return HeroData.characteristics.natural.lives; }
set livesN(value){ HeroData.characteristics.natural.lives = value; }
// Жизни текущее значение
get livesC(){ 
  //console.log("бла бла");
  //console.log(HeroData.characteristics.current);
  return HeroData.characteristics.current.lives; }
set livesC(value){ HeroData.characteristics.current.lives = value; }

// Манна
get mannaN(){ return HeroData.characteristics.natural.manna; }
set mannaN(value){ HeroData.characteristics.natural.manna = value; }
// Манна текущее значение
get mannaC(){ return HeroData.characteristics.current.manna ; }
set mannaC(value){ HeroData.characteristics.current.manna = value; }

//---------------
// Жизнь. отношение 
get livesRatio(){
  return new Lives().ratio;
}
// Манна. отношение 
get mannaRatio(){
  return new Manna().ratio;
}




































//---------------

// Сила
get strengthN(){ return HeroData.characteristics.natural.strength; }
set strengthN(value){ 
  if (value <= this.strengthM) { 
    HeroData.characteristics.natural.strength = value;
    HeroData.characteristics.current.strength = HeroData.characteristics.natural.strength + HeroData.characteristics.added.strength;
    return true; }
  return false;
}
// текущее Сила
get strength(){ return this.strengthC;}

get strengthC(){ return HeroData.characteristics.current.strength; }
//set strengthC(value){ HeroData.characteristics.current.strength = value; }
// Максимальная Сила
get strengthM(){ return HeroData.characteristics.maximal.strength; }
// Дополнительная Сила 
get strengthA(){ return HeroData.characteristics.added.strength; }
set strengthA(value){ 
  HeroData.characteristics.added.strength = value;
  HeroData.characteristics.current.strength = HeroData.characteristics.natural.strength + HeroData.characteristics.added.strength;
  return true;
}



// Магия
get magic() { return this.magicC; }
get magicN(){ return HeroData.characteristics.natural.magic; }
set magicN(value){
  if (value <= this.magicM) {
    HeroData.characteristics.natural.magic = value;
    HeroData.characteristics.current.magic = HeroData.characteristics.natural.magic + HeroData.characteristics.added.magic;
    return true;
  }
  return false;
}
// текущее Магия
get magicC(){ return HeroData.characteristics.current.magic; }
//set magicC(value){ HeroData.characteristics.current.magic = value; }
// Максимальная Магия
get magicM(){ return HeroData.characteristics.maximal.magic; }
// Дополнительная Магия 
get magicA(){ return HeroData.characteristics.added.magic; }
set magicA(value){ 
  HeroData.characteristics.added.magic = value;
  HeroData.characteristics.current.magic = HeroData.characteristics.natural.magic + HeroData.characteristics.added.magic;
  return true;
}



// Ловкость Dexterity
get dexterityN(){ return HeroData.characteristics.natural.dexterity; }
set dexterityN(value){
  if (value <= this.dexterityM) {
    HeroData.characteristics.natural.dexterity = value;
    HeroData.characteristics.current.dexterity = HeroData.characteristics.natural.dexterity + HeroData.characteristics.added.dexterity;
    return true;
  }
  return false;
}
// текущее Ловкость Dexterity

get dexterity(){ return this.dexterityC; }
get dexterityC(){ return HeroData.characteristics.current.dexterity; }
//set dexterityC(value){ HeroData.characteristics.current.dexterity = value; }
// Максимальная Ловкость
get dexterityM(){ return HeroData.characteristics.maximal.dexterity; }
// Дополнительная Ловкость 
get dexterityA(){ return HeroData.characteristics.added.dexterity; }
set dexterityA(value){
  HeroData.characteristics.added.dexterity = value;
  HeroData.characteristics.current.dexterity = HeroData.characteristics.natural.dexterity + HeroData.characteristics.added.dexterity;
  return true;
}



// Живучесть
get vitalityN(){ return HeroData.characteristics.natural.vitality; }
set vitalityN(value){
  if (value <= this.vitalityM) {
    HeroData.characteristics.natural.vitality = value;
    HeroData.characteristics.current.vitality = HeroData.characteristics.natural.vitality + HeroData.characteristics.added.vitality;
    return true;
  }
  return false;
}
// текущее Живучесть
get vitalityC(){ return HeroData.characteristics.current.vitality; }
//set vitalityC(value){ HeroData.characteristics.current.vitality = value; }
// Максимальная Живучесть
get vitalityM(){ return HeroData.characteristics.maximal.vitality; }
// Дополнительная Живучесть 
get vitalityA(){ return HeroData.characteristics.added.vitality; }
set vitalityA(value){
  HeroData.characteristics.added.vitality = value;
  HeroData.characteristics.current.vitality = HeroData.characteristics.natural.vitality + HeroData.characteristics.added.vitality;
  return true;
}


// ----------------









































// Повреждения
get demage(){ return HeroData.characteristics.demage; }
set demage(value){ HeroData.characteristics.demage = value; }
//--
//get demageN(){ return HeroData.characteristics.natural.demage; }
//set demageN(value){ HeroData.characteristics.natural.demage = value; }
// текущее Повреждения
//get demageC(){ return HeroData.characteristics.current.demage; }
//set demageC(value){ HeroData.characteristics.current.demage = value; }

// Класс брони (AC)
get armorClass(){ return HeroData.characteristics.armorClass; }
set armorClass(value){ HeroData.characteristics.armorClass = value; }
//--
//get armorClassN(){ return HeroData.characteristics.natural.armorClass; }
//set armorClassN(value){ HeroData.characteristics.natural.armorClass = value; }
// текущее Класс брони (AC)
//get armorClassC(){ return HeroData.characteristics.current.armorClass; }
//set armorClassC(value){ HeroData.characteristics.current.armorClass = value; }

// Шанс попадания
get chanceToHit(){ return HeroData.characteristics.chanceToHit; }
set chanceToHit(value){ HeroData.characteristics.chanceToHit = value; }
//--
//get chanceToHitN(){ return HeroData.characteristics.natural.chanceToHit; }
//set chanceToHitN(value){ HeroData.characteristics.natural.chanceToHit = value; }
// текущее Шанс попадания
//get chanceToHitC(){ return HeroData.characteristics.current.chanceToHit; }
//set chanceToHitC(value){ HeroData.characteristics.current.chanceToHit = value; }

// Класс защиты
get protectionClassN(){ return HeroData.characteristics.natural.protectionClass; }
set protectionClassN(value){ HeroData.characteristics.natural.protectionClass = value; }
// текущее Класс защиты
get protectionClassC(){ return HeroData.characteristics.current.protectionClass; }
set protectionClassC(value){ HeroData.characteristics.current.protectionClass = value; }





/*
// Живучесть с вещей
get clothesCha_vitalityFromThings(){ return HeroData.clothesCharacteristics.vitalityFromThings; }
set clothesCha_vitalityFromThings(value){ HeroData.clothesCharacteristics.vitalityFromThings = value; }
// Бонусы с вещей
get clothesCha_bonusesFromThings(){ return HeroData.clothesCharacteristics.bonusesFromThings; }
set clothesCha_bonusesFromThings(value){ HeroData.clothesCharacteristics.bonusesFromThings = value; }
// Магия с вещей
get clothesCha_magicFromThings(){ return HeroData.clothesCharacteristics.magicFromThings; }
set clothesCha_magicFromThings(value){ HeroData.clothesCharacteristics.magicFromThings = value; }
// Мана с вещей
get clothesCha_mannaFromThings(){ return HeroData.clothesCharacteristics.mannaFromThings; }
set clothesCha_mannaFromThings(value){  HeroData.clothesCharacteristics.mannaFromThings = value; }
// денег у героя
get gold(){ return HeroData.gold; }
set gold(value){ HeroData.gold = value; }
*/

// Деньги
get gold(){ return HeroData.gold; }
set gold(value){ HeroData.gold = value; }

// пояс 0
get belt(){ return HeroData.inventory.belt; } // Array
set belt(value){ HeroData.inventory.belt = value; } // Array


// голова
get head(){ return HeroData.inventory.person.head; }
set head(value){ HeroData.inventory.person.head = value; }
// шея
get neck(){ return HeroData.inventory.person.neck; }
set neck(value){ HeroData.inventory.person.neck = value; }
// торс
get tors(){ return HeroData.inventory.person.tors; }
set tors(value){ HeroData.inventory.person.tors = value; }
// левая рука
get leftHand(){ return HeroData.inventory.person.leftHand; }
set leftHand(value){ HeroData.inventory.person.leftHand = value; }
// левое кольцо
get leftRing(){ return HeroData.inventory.person.leftRing; }
set leftRing(value){ HeroData.inventory.person.leftRing = value; }
// правая рука
get rightHand(){ return HeroData.inventory.person.rightHand; }
set rightHand(value){ HeroData.inventory.person.rightHand = value; }
// правое кольцо
get rightRing(){ return HeroData.inventory.person.rightRing; }
set rightRing(value){ HeroData.inventory.person.rightRing = value; }






// Мешек
get bag(){ return HeroData.inventory.bag; }
set bag(value){ HeroData.inventory.bag = value; }


// Защита от Магии
get resistMagic(){ return HeroData.resist.magic; }
set resistMagic(value){ HeroData.resist.magic = value; }
// Защита от Огня
get resistFire(){ return HeroData.resist.fire; }
set resistFire(value){ HeroData.resist.fire = value; }
// Защита от Молнии
get resistLightning(){ return HeroData.resist.lightning; }
set resistLightning(value){ HeroData.resist.lightning = value; }





/*


// Пересчет Манна
setManna(){
  let cManna = new Manna().update();
}


// Пересчет Класс защиты
setProtectionClass(){
  let cProtectionClass = new ProtectionClass().update();
  HeroData.characteristics.protectionClass = cProtectionClass
} 

// Получение Жизни
getLives(){ return [HeroData.characteristics.lives, HeroData.characteristics.currentLives]; }

// Получение Манна
getManna(){ return [HeroData.characteristics.manna, HeroData.characteristics.currentManna]; }

// Получение Класс брони (AC)
getArmorClass(){ return HeroData.characteristics.armorClass; }

// Получение Шанс попадания 
getChanceToHit(){ return HeroData.characteristics.chanceToHit; } 

// Получение Класс защиты
getProtectionClass(){ return HeroData.characteristics.protectionClass; } 

// Функция для обнавления героя (сюда добавлять все обнавления)
updateHero(){
  this.updateExperience(); // обнавляем опыт
}

// Функция измениия опыта. новое значение добавляеться в  HeroData.experience.experience.  
setExperienc(addExperienc) {
  addExperienc = Number(addExperienc); // перевод в числовую переменную
  if(isNaN(addExperienc)){return;} // проверка на число
  HeroData.experience.experience += addExperienc; // добавляем опыт
  this.updateExperience(); // Обновление опыта, после его изменения
}

// Функция обнавления опыта. пересчет значения уровня в зависимости от колличеста опыта у героя.
updateExperience() {
  let heroLevel = this.getHeroLevel(); // получаем данные героя
  let heroesLevel = this.benchmarkData.getBenchmarkData("heroesLevel"); // получаем лист опыта
  let minLevel = heroesLevel[0]; // минимальный уровень
  let maxLevel = heroesLevel[heroesLevel.length - 1]; // максимальный уровень
  for (let i = 0; i < heroesLevel.length; i++) {
    // проверяем не меньше ли нуля
    if (heroLevel.experience < minLevel.requiredExperience ) {
      HeroData.experience.id = minLevel.id;
      HeroData.experience.level = minLevel.level;
      HeroData.experience.experience = minLevel.requiredExperience;
      HeroData.experience.toNextLevel = heroesLevel[1].level;
      console.log("проверяем не меньше ли нуля");
      break;
    }
    // проверяем уровень героя
    if(heroLevel.experience < heroesLevel[i].requiredExperience){
      HeroData.experience.id = heroesLevel[i-1].id;
      HeroData.experience.level = heroesLevel[i-1].level;
      HeroData.experience.toNextLevel = heroesLevel[i].level;
      console.log("проверяем уровень героя");
      break;
    }
    //проверяем больше ли максимального уровня
    if (heroLevel.experience > maxLevel.requiredExperience ) {
      HeroData.experience.id = maxLevel.id;
      HeroData.experience.level = maxLevel.level;
      HeroData.experience.toNextLevel = maxLevel.level;
      console.log("проверяем больше ли максимального уровня");
      break;
    }
  }
}


*/

}


const Hero = new HeroClass();
export default Hero;