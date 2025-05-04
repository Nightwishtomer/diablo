export class internalDurability {
  constructor(maxValue = 0){
    this._maxValue = maxValue; // Базовое значение
    this._baseValue = null;
    this._setValue();
  }

  get value(){
    return this._baseValue;
  }

  get max(){
    return this._maxValue;
  }

  _setValue(){
    this._baseValue = this._maxValue;
  }
 
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
}