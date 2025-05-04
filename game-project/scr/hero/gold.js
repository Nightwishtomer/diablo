export class Gold {
  constructor(value = 0) {
      this._value = value; // Значение

  }



  // Геттер просто берет уже готовое значение
  get value() {
      return this._value;
  }

 
  // Максимально допустимое значение
  get maxValue(){
      return this._maxValue;
  }

  // Все изменения теперь вызывают `calculateValue()`
  set (value) {
      this._value = value;
  }

  add(value) {
      this._value += value;
  }

  subtract(value) {
      this._value -= value;
  }

  remove() {
      this.this._value = 0;
  }

 
}