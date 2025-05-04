export class Demage {
  constructor([min = 0, max = 0]) {
    this._baseValue = [min, max]; // Базовое значение
    this.min = min;
    this.max = max;
    this._bonus = [0, 0]; // Бонус от предметов
    this._tempBonus = [0, 0]; // Временные бонусы
    this._cachedValue = [0, 0]; // Кешированное значение
    this._maxValue = [0, 0]; // Максимально допустимое значение
    this._calculateValue(); // Первоначальный расчет  
  }

  // Теперь этот метод не возвращает значение, а обновляет кеш
  _calculateValue() {
      this._cachedValue[0] = this._baseValue[0] + this._bonus[0] + this._tempBonus[0];
      this._cachedValue[1] = this._baseValue[1] + this._bonus[1] + this._tempBonus[1];
  }

  // Геттер просто берет уже готовое значение
  get value() {
    // Добавить рендом для получения данных
    return this._cachedValue; 
  } 
  get valueText() {
    return this._cachedValue[0] + " - " + this._cachedValue[1];
    
  }

  get base() {
      return this._baseValue;
  }

  get totalBonus() {
      return [this._bonus[0] + this._tempBonus[0], this._bonus[1] + this._tempBonus[1]];
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
  setBonus([min = 0, max = 0]) {
    this._bonus = [min, max];
    this._calculateValue();
  }

  addTempBonus([min = 0, max = 0]) {
    this._tempBonus[0] += min;
    this._tempBonus[1] += max;
    this._calculateValue();
  }

  subtractTempBonus([min = 0, max = 0]) {
    this._tempBonus[0] -= min;
    this._tempBonus[1] -= max;
    this._calculateValue();
  }

  removeTempBonus() {
    this._tempBonus = [0, 0];
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
    /** Вывод В консоль */
    view(){
      console.log("Demage:");
      console.table(this);
    }
}