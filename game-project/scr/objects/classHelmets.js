import data from "objects/data/dataHelmetsObjects";
import Hero from "hero/hero";
import { Description } from "objects/internals/description";
import { internalPrice } from "objects/internals/price";
import { internalTexture } from "objects/internals/texture";
import { internalRequired } from "objects/internals/required";


import { internalDurability } from "objects/internals/durability";
import { internalArmorClass } from "objects/internals/armorClass";
import { internalArmorType } from "objects/internals/armorType";
import { internalHeaviness } from "objects/internals/heaviness";

export class classHelmets {
  constructor(ObjectID, linkID){
    const objectData = data[linkID];
    if (!objectData.activity){ return null;}

    this._Obj = { 
      id : ObjectID,
      type : objectData.type,
      name : objectData.name,
      belt : objectData.belt,
      description : objectData.description,
      descriptionData : null,
      price : new internalPrice(objectData.price),
      required : objectData.required,
      canBeUsed : new internalRequired(objectData.required).value,
      texture : new internalTexture(objectData.textureObjectId),
      action : this._setAction(objectData.action),
      isUsed : false,
    };   
  //console.log(this._Obj.armorClass.value);
  //console.log(this._Obj.durability.max);
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

  get belt(){
    return this._Obj.belt;
  }
  get description(){
    return this._Obj.description;
  }

  get price(){
    return this._Obj.price;
  }
  
  get texture(){
    return this._Obj.texture;
  }

  get isUsed(){
    return this._Obj.isUsed;
  }

  get canBeUsed(){
    return new internalRequired(this._Obj.required).value;
  }
  get descriptionData(){
    return this._Obj.descriptionData;
  }
   
  // применить предмет
  use(){
    

    this._delete();   
  }

  // отменить предмет
  cancelUse(){

  }



  // Setting value recovery
  _setAction(action){
    /*
    for (let i = 0; i < action.length; i++) {
      if (action[i].type == "partial"){ // Пересчитываем значения для частичных
        action[i].percentValue.value = this._getRandomInt([action[i].percentValue.min, action[i].percentValue.max]);
      }
    }
    return action;
    */
  }
/*
  // Рандомное целое число в диапазоне от min до max включительно
  _getRandomInt([min, max]) {
    min = Math.ceil(min);   // округляем вверх (если передали дробь)
    max = Math.floor(max);  // округляем вниз
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
*/
  _delete() {
    this._Obj.isUsed = true;
  }
}
