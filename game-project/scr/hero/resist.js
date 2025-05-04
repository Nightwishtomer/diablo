export class Resist {
  constructor( baseValue = 0 ) {
      
    this._baseValue = baseValue;     // Базовое значение
    this._bonus     = 0; // Бонус от предметов
    this._tempBonus     = 0; // Временные бонусы
    this._cachedValue = 0; // Кешированное значение
    this._calculateValue();     // Первоначальный расчет

  }

  // Этот метод не возвращает значение, а обновляет кеш
  _calculateValue() {
    this._cachedValue = this._baseValue + this._bonus + this._tempBonus;
  }
  

  // Геттер просто берет уже готовое значение
  get valueText() {
    return this._cachedValue + "%";
}
  get value() {
      return this._cachedValue;
  }

  get base() {
      return this._baseValue;
  }

  get totalBonus() {
      return this._bonus + this._tempBonus;
  }

  get equipmentBonus() {
      return this._bonus;
  }

  get temporaryBonus() {
      return this._tempBonus;
  }

  // Максимально допустимое значение
  get maxValue(){
      return this._maxValue;
  }

  // Все изменения теперь вызывают `calculateValue()`


  setBonus(value) {
      this._bonus = value;
      this._calculateValue();
  }

  addTempBonus(value) {
      this._tempBonus += value;
      this._calculateValue();
  }

  removeTempBonus(value) {
      this._tempBonus -= value;
      this._calculateValue();
  }

  deleteTempBonus() {
    this._tempBonus = 0;
    this._calculateValue();
  }
/*
  increaseBase(amount) {
      this._baseValue += amount;
      this._calculateValue();
  }

  decreaseBase(amount) {
      this._baseValue = Math.max(0, this._baseValue - amount);
      this._calculateValue();
  }
*/

  // 
}