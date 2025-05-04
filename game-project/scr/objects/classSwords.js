import data from "objects/data/dataSwordsObjects";
import Hero from "hero/hero";
// import { objectsLib } from "objects/objectsLib";
// import { LoadData } from "objects/loadData"; // objects/loadData
// import { Memory } from "utils/memory"; // utils/memory
import textureObjectData from "objects/data/textureObjectData";
import { Application, Assets, Sprite, Container, Rectangle, Texture, AnimatedSprite, Ticker } from "pixi";
import { Description } from "objects/internals/description";
import { internalPrice } from "objects/internals/price";
import { internalTexture } from "objects/internals/texture";
import { internalRequired } from "objects/internals/required";
import { internalDurability } from "objects/internals/durability";
import { internalArmorClass } from "objects/internals/armorClass";
import { internalArmorType } from "objects/internals/armorType";
import { internalHeaviness } from "objects/internals/heaviness";


export class classSwords { // extends objectsLib {
  constructor(ObjectID, linkID){
    const objectData = data[linkID];
    if (!objectData.activity){ return null;}
    this._Obj = { 
      id : ObjectID,
      type : objectData.type,
      name : objectData.name,
      action : objectData.action,
      activity : objectData.activity,
      belt : objectData.belt,
      cursor : objectData.cursor,
      damage : objectData.damage,
      description : objectData.description,
      descriptionData : null,
      indestructible : objectData.indestructible,
      price : objectData.price,
      armorClass : null,
      armorType : null, 
      unique : objectData.unique,
      texture : new internalTexture(objectData.textureObjectId),
      required : objectData.required,
      canBeUsed : new internalRequired(objectData.required).value,
      weight : objectData.weight,
      wamage : objectData.damage,
      doubleHand : objectData.doubleHand,

    };
    this._Obj.durability = new internalDurability(objectData.durability),
    this._Obj.armorClass = new internalArmorClass(objectData.armorClass),
    this._Obj.armorType = new internalArmorType(this._Obj.armorClass.value),
    this._Obj.heaviness = new internalHeaviness(this._Obj.armorClass.value),
    this._Obj.descriptionData = new Description("objects", this._Obj);

   }


  get id(){
    return this._Obj.id;
  }
  get type(){
    return this._Obj.type;
  }
  get name(){
    return this._Obj.name;
  }
  get action(){
    return this._Obj.action;
  }
  get activity(){
    return this._Obj.activity;
  }
  get belt(){
    return this._Obj.belt;
  }
  get cursor(){
    return this._Obj.cursor;
  }
  get damage(){
    return this._Obj.damage;
  }

  get description(){
    return this._Obj.description;
  }
  get durability(){
    return this._Obj.durability;
  }
  
  get indestructible(){
    return this._Obj.indestructible;
  }
  get price(){
    return this._Obj.price;
  }
  get armorClass(){

    return this._Obj.armorClass;
  }
  //get required(){
  //  return this._ObjRequired;
  //}
  //get textureObjectId(){
  //  return this._ObjTextureObjectId;
  //}
  get unique(){
    return this._Obj.unique;
  }
  
  get texture(){
    return this._Obj.texture;
  }
  
  get canBeUsed(){
    return this._Obj.canBeUsed;
  }
  get descriptionData(){
    return this._Obj.descriptionData;
  }


      _setDurability(durabilityMax){
    return durabilityMax;
  }
    
  // применить предмет
    use(){
      console.log("применить предмет:: ТИП: " + this._Obj.type + " ИМЯ: " + this._Obj.name + " classSwords");
      Hero.property.demage.addTempBonus(this.damage); // Урон
      // Прочность
    }
  
    // отменить предмет
    cancelUse(){
      console.log("отменить предмет:: ТИП: " + this._Obj.type + " ИМЯ: " + this._Obj.name + " classSwords");
      Hero.property.demage.subtractTempBonus(this.damage); // Урон
      // Прочность
    }
  





 // Вычисление защиты
 _ArmorClassSet(ArmorClassData){
  if (this._isUndefined(ArmorClassData)) {
    return false;
  }
  if (Array.isArray(ArmorClassData)) {
    return this._getRandomInt(ArmorClassData);
  } else {
    return ArmorClassData
  }
}
  // ArmorSpriteType
  _ArmorType(armorClass){
    //console.log("+++ ArmorClass:", armorClass);
  }
 

 

  

 

  // Рандомное целое число в диапазоне от min до max включительно
  _getRandomInt([min, max]) {
    min = Math.ceil(min);   // округляем вверх (если передали дробь)
    max = Math.floor(max);  // округляем вниз
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _isUndefined(value) {
    return typeof value === 'undefined';
  }
}

/*
  "1" : {
    "name"            : "Dagger",
    "type"            : "sword",
    "damage"          : [1, 4],
    "durability"        : 16, 
    "required"        : {},
    "price"           : 60,
    "action"          : "",
    "unique"          : false,
    "textureObjectId" : 63,
    "doubleHand"      : false,
    "activity"        : true,
    "belt"            : false, 
    "cursor"          : true,
    "indestructible" : false,
    "description"     : "Мечи. "
  },*/