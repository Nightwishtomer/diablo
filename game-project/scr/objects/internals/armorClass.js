
import { randomMath } from "utils/math";
export class internalArmorClass {
  constructor(imputValue = [0, 0]){
    this._imputValue = imputValue;
    this._baseValue = null; 
    
    //this._maxValue = maxValue; // Базовое значение
    
    this._setValue();
    //console.log("BaseValue ArmorClass", this._imputValue, this._baseValue);
  }

  get value(){
    return this._baseValue;
  }
/*
  get max(){
    return this._maxValue;
  }
*/
  _setValue(){
    this._baseValue = randomMath(this._imputValue);
  }
 /*
  increase(amount = 1) {
    this._baseValue = Math.max(0, this._baseValue + amount);
    return this._baseValue;
  }

  decrease(amount = 1) {
    this._baseValue = Math.min(this._maxValue, this._baseValue - amount);
    return this._baseValue;
  }

  reset() {
    this._baseValue = maxValue;
    return this._baseValue;
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



*/














}