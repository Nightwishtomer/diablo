import { NPC } from "npc";
export class internalPrice {
  constructor(baseValue = 0){
    this._baseValue = baseValue; // Базовое значение
    //console.log("Базовое значение цены : " + this._baseValue);
    //this.npc = new NPC(0);
  }

  get value(){
    return this._baseValue;
  }

  get basePrice(){
    return this._baseValue;
  }

  get buyPrice(){
    return this._baseValue;
  }

  get sellPrice(){
    return this._baseValue;
  }

}