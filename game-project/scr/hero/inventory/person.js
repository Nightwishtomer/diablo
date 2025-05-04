//import { Objects } from "objects/objects"; // objects
import ControlPanel from "controlPanel/controlPanel"; // controlPanel/controlPanel
import Hero from "hero/hero";
export class InvPerson {
  constructor(value = null){
    this._data = {
      head: value,
      neck: value,
      tors: value,
      leftHand: value,
      leftRing: value,
      rightHand: value,
      rightRing: value
    };

    this._dataActive = {
      head: value,
      neck: value,
      tors: value,
      leftHand: value,
      leftRing: value,
      rightHand: value,
      rightRing: value
    };
  }

 /**
  * Получение данных о персонаже
  * @param {string} type - тип ячейки персонажа
  * @returns {string} - Данные о одежде
  */
  getCell(type){
    return this._data[type];
  }
  
  /**
   * Получение данных о одежде персонажа
   * @returns 
   */
  get(){
    return this._data;
  }
  
  /**
   * Выполняем  события ячейки
   * @param {string} type - тип ячейки
   * @returns {boolean} - результат
   */
  action(type, actionType){
    ControlPanel.rerender(); // перерисовываем панель после изменения
    const object = this._data[type];
    if (actionType) {
      if (object) {
        object.use();
      }
    }

    console.log("Выполняем действие предмета '" + Object.name + "' с id-" + Object.id + ".  action:" + Object.action);
    
    return false;
  }

  /**
   * Проверяем, пуста ли яячейка
   * @param {string} type - тип ячейки
   * @returns {boolean} - значение, пуста ли ячейка
   */
  check(type){
    return (this._data[type] == null) ? false : true;
  }

  /**
   * Устанавливаем значение ячейки персонажа
   * @param {string} type - тип ячейки 
   * @param {string} value  - значение
   */
  setCell(type, value = null) {
    const slotMap = {
        head: "head",
        neck: "neck",
        tors: "tors",
        leftHand: "leftHand",
        leftRing: "leftRing",
        rightHand: "rightHand",
        rightRing: "rightRing"
    };
    if (slotMap[type]) {
      this._data[type] = value;
      if (!!value){
        this._data[type].use();
      }
    }
  }

  delete(type = null){
    // Если type не задан или данных по type нет — выходим
    if (type == null || this._data[type] == null) return;
    this._data[type].cancelUse();
    this._data[type] = null;
  }

  view() {
    console.log("Person: ");
    console.table(this._data);
  }
}