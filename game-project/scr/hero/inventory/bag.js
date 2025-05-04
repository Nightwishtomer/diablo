import { Object } from "objects/object"; // objects
import ControlPanel from "controlPanel/controlPanel"; // controlPanel/controlPanel
export class InvBag {
  constructor(value = null){
    this._data = [
      [ value, value, value, value, value, value, value, value, value, value ],
      [ value, value, value, value, value, value, value, value, value, value ],
      [ value, value, value, value, value, value, value, value, value, value ],
      [ value, value, value, value, value, value, value, value, value, value ]
    ];
  }

  //getCell([type = null, row = null, column = null]){
  getCell([row = null, column = null]){
    // console.log(row, column);
    // row - строка
    // column - столбец
    if ( row == null || column == null ) return;
    return this._data[row][column];
  }
  
  get(){
    return this._data;
  }
 
  // выполняем  события ячейки пояса Кликом
  actionClick(id){
    const row = id[0];
    const column = id[1];
    //console.log(this._data[row][column]);
    if(this._data[row][column].type == "potion"){
      this._data[row][column].use();
      this._cleaning(); // очистка от использованных предметов 
      ControlPanel.rerender(); // перерисовываем панель после изменения
    }
   
  }
  // выполняем  события ячейки пояса
  action(id){
    const row = id[0];
    const column = id[1];
    console.log(this._data[row][column]);
    this._data[row][column].use();

    this._cleaning(); // очистка от использованных предметов

  
    ControlPanel.rerender(); // перерисовываем панель после изменения
    //console.log("Реализовать выполнение события ячейки : " + id + " --- " + belt[id]);
    //console.log("Реализовать в файле ./game-project/scr/hero/belt.js");
  }

  /**
  * Проверка, можно ли ставить предмет в ячейку рюкзака
  * @param {number} posCellY - Позиция ячейки для проверки
  * @param {number} posCellX - Позиция ячейки для проверки
  * @param {number} obJCellWidth - Ширина обьекта.
  * @param {number} objCellHeight - Высота обьекта.
  * @param {string} cellFromType - Тип, откуда предмет перемещается.
  * @param {Array} cellFromNumber - Ячейки, откуда предмет перемещается.
  * @returns {boolean} - Можно ли ставить предмет. true - можно, false - нельзя
  * @example 
  * await new InvBag().check( 1, 2, 2, 3, "bag", ["bag", 3, 3]);
  */
  async check(posCellY, posCellX, obJCellWidth, objCellHeight, cellFromType, cellFromNumber){
    let temp = Array.from({ length: 4 }, () => Array(10).fill(false)); // Создаём массив 4x10 с `false`
    const bag = this._data;
    if (cellFromType === "bag") {  
      const objectsInstance = new Object(1); // Создаем один экземпляр Objects  
      //console.log(objectsInstance);
      for (const column in bag) {
        for (const row in bag[column]) {
          const dataCell = bag[column][row];
          if (dataCell === null) continue; // Пропускаем пустые ячейки
          if (cellFromNumber[0] === "bag" && cellFromNumber[1] == column && cellFromNumber[2] == row) {
            continue; // Пропускаем, если это тот же предмет
          }
          //const data = await objectsInstance.getData(dataCell); // Получаем данные объекта
          //console.log(data);
          const [width, height] = dataCell.texture.cells; // Извлекаем размеры
          // Помечаем занятые клетки
          for (let y = +column; y < +column + height; y++) {
            for (let x = +row; x < +row + width; x++) {
              temp[y][x] = true;
            }
          }
        }
      }
    }
    // Проверяем, влезает ли предмет в границы
    const maxY = +posCellY + +objCellHeight;
    const maxX = +posCellX + +obJCellWidth;
    if (maxY - 1 > 3 || maxX - 1 > 9) return false; // Вышли за границы
    // Проверяем пересечения
    for (let y = +posCellY; y < maxY; y++) {
      for (let x = +posCellX; x < maxX; x++) {
        if (temp[y][x]) return false; // Ячейка занята
      }
    }
    return true;
  }

  // устанавливаем значение ячейки
  setCell([row = null, column = null], value = null){
    // row - строка
    // column - столбец
    if ( row == null || column == null ) return;
    this._data[row][column] = value;
  }

  delete([row = null, column = null]){
    if ( row == null || column == null ) return;
    this._data[row][column] = null;
  }



  // очистка от использованных предметов
  _cleaning(){


    for (const column in this._data) {
      for (const row in this._data[column]) {
        const element = this._data[column][row];

        if (element !== null){
        
          if(element.isUsed == true){
            //console.log(element);
            this._data[column][row] = null;
          }
        }
   

      }
    }

  }


  view() {
    console.log("Bag: ");
    console.table(this._data);
  }
}