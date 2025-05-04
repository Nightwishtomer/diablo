import { randomMath, isBetweenMath, isBetweenInclusiveMath } from "utils/math";
export const dataArmorType = [
      { type : { id : 0, text : "light"  }, value : [6,  11], weight : { id : 0, text : "low"      }, speedFine : "0%",   }, 
      { type : { id : 1, text : "medium" }, value : [12, 17], weight : { id : 1, text : "medium"   }, speedFine : "0%",   }, 
      { type : { id : 1, text : "medium" }, value : [18, 27], weight : { id : 1, text : "medium"   }, speedFine : "-5%",  }, 
      { type : { id : 1, text : "medium" }, value : [28, 38], weight : { id : 2, text : "high"     }, speedFine : "-10%", }, 
      { type : { id : 2, text : "heavy"  }, value : [30, 40], weight : { id : 2, text : "high"     }, speedFine : "-15%", }, 
      { type : { id : 2, text : "heavy"  }, value : [36, 50], weight : { id : 3, text : "veryHigh" }, speedFine : "-20%", }, 
      { type : { id : 2, text : "heavy"  }, value : [48, 65], weight : { id : 3, text : "veryHigh" }, speedFine : "-25%", }, 
    ];
export class internalArmorType {
  constructor(armorClassValue = 0){
    this._armorClassValue = armorClassValue;
    this._baseValueId = null; 
    this._baseValueText = null;
    this._data;

    this._setData();
    this._setValue();
  }

  get value(){
    return this._baseValueId;
  }

  get valueText(){
    return this._baseValueText;
  }

  _setValue(){
    this._baseValueId = this._data.type.id; 
    this._baseValueText = this._data.type.text;
  }

  _setData(){
    for (let i = 0; i < dataArmorType.length; i++) {
      const armorType = dataArmorType[i];
      this._data = armorType;
      return;
    }
  }
}