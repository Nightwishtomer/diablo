import { loadCursor } from "ui/cursor"; // objects
import ControlPanel from "controlPanel/controlPanel"; // controlPanel/controlPanel
import Hero from "hero/hero";

export let selected = false;
export let cellFromType = null;
export let cellFromNumber = null;
export let cellToType = null;
export let cellToNumber = null;
export let object = null;

export class Draggable {
  constructor() { }

  /**
   * Получить данные ячейки пояса
   * @param {string} type - тип
   * @param {string} id - номер
   * @returns 
   */
  _getDataCell(type, id) {
    const inventoryMap = {
      belt: Hero.inventory.belt,
      person: Hero.inventory.person,
      bag: Hero.inventory.bag,
    };
    const section = inventoryMap[type];
    const object = section?.getCell(id);

    return object ?? false;
  }

  


  /**
   * Какую ячейку переносим
   * @param {string} type - тип 
   * @param {string/} number - номер
   */
  async take( type, number){
    cellFromType = type;
    cellFromNumber = number;
    const movedData = this._getDataCell(cellFromType, cellFromNumber); 
    //console.log(movedData);
    object = movedData; // устанавливаем обьект
    ////console.log(dataCell);
    if (movedData.texture.name) {
      selected = true; // Отмечаем, что что то взяли 
    

        loadCursor(movedData.texture.name);

    }
  }

  /**
   * В какую ячейку переносим
   * @param {string} type - тип 
   * @param {string/} number - номер
   */
  async put(cellToTypeInput, cellToNumberInput){ 
    if (cellToTypeInput == "bag") {       
      //console.log(object);
      const flag = Hero.inventory.bag.check( cellToNumberInput[1], cellToNumberInput[2], object.texture.cells[0], object.texture.cells[1], cellFromType, cellFromNumber);
      if (flag == false ) { 
        this.clear();
        return; 
      }
    }
    if (selected) {
      // проверяем на то, можно ли класть
      cellToType = cellToTypeInput;
      cellToNumber = cellToNumberInput;
      this._action(); // Действие
    }
  }

  /**
   * Сброс данных о перемещении
   */
  async clear(){
    selected = false; // Отмечаем, что в мыши пусто
    loadCursor();
    ControlPanel.rerender();
  }

  /**
   * Выполнение перемещений данных в ячейке
   */
  _action() {
    const inventoryMap = {
      belt: Hero.inventory.belt,
      person: Hero.inventory.person,
      bag: Hero.inventory.bag
    };
    const fromInventory = inventoryMap[cellFromType];
    const toInventory = inventoryMap[cellToType];
    if (!fromInventory || !toInventory) {
      console.error("Некорректный тип ячейки");
      this.clear();
      return;
    }
    let fromData = fromInventory.getCell(cellFromNumber);
    let toData = toInventory.getCell(cellToNumber);
    if (cellFromNumber !== cellToNumber) {
      if (fromData !== null) {
        //console.log(this._checkingItemTypes());
  
        //const Obj = await (await new Objects()).getData(fromData);
        const checkingItemTypes = this._checkingItemTypes(fromData);
        if (!checkingItemTypes) {
          this.clear();
          return;
        }
      }
   
      toInventory.delete(cellToNumber);
      fromInventory.delete(cellFromNumber);

      toInventory.setCell(cellToNumber, fromData);
      fromInventory.setCell(cellFromNumber, toData);


      //toInventory.setCell(cellToNumber, fromData);
      //fromInventory.setCell(cellFromNumber, toData);
    }
    //console.log(object.armorClass);
    //console.log(`Берем "${object.name}" из ячейки: ${cellFromType}-${cellFromNumber} -> Кладем в ячейку: ${cellToType}-${cellToNumber}`);
    this.clear();
  }

  /**
   * проверка на совпадение типов предметов
   * @returns {boolean} true - свободно. false - не свободно
   */
  _checkingItemTypes(concreteObject){ 
    // пояс
    if (cellToType == "belt" && concreteObject.belt == false){ return false; }
    // ГОЛОВУ
    if (cellToType === "person" && cellToNumber === "head" && (concreteObject.type !== "helmet" || !concreteObject.canBeUsed)) { return false; }
    // ШЕЮ
    if (cellToType === "person" && cellToNumber === "neck" && (concreteObject.type !== "amulets" || !concreteObject.canBeUsed)) { return false; }
    // ТОРС
    if (cellToType === "person" && cellToNumber === "tors" && (concreteObject.type !== "armor" || !concreteObject.canBeUsed)) { return false; }
    // ЛЕВУЮ РУКУ
    if ( cellToType === "person" && cellToNumber === "leftHand" && (concreteObject.type !== "axe" && concreteObject.type !== "bows" && concreteObject.type !== "mace" && concreteObject.type !== "staff" && concreteObject.type !== "sword" || !concreteObject.canBeUsed)) { return false; }
    // ПРАВУЮ РУКУ
    if ( cellToType === "person" && cellToNumber === "rightHand" && (concreteObject.type !== "axe" && concreteObject.type !== "bows" && concreteObject.type !== "mace" && concreteObject.type !== "staff" && concreteObject.type !== "sword" || !concreteObject.canBeUsed)) { return false; }
    // ЛЕВОЕ КОЛЬЦО
    if (cellToType === "person" && cellToNumber === "leftRing" && (concreteObject.type !== "rings" || !concreteObject.canBeUsed)) { return false; }
    // ПРАВОЕ КОЛЬЦО
    if (cellToType === "person" && cellToNumber === "rightRing" && (concreteObject.type !== "rings" || !concreteObject.canBeUsed)) { return false; }
    return true;
  }
}