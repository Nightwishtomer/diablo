import Hero from "hero/hero";

export class InvBag {
  constructor(){
    super();
  }

  async getCell(id){
    const bag = await this.get();
    return bag[id[1]][id[2]];
  }
  
  async get(){
    const data = await Hero.bag;
    return data;
  }
 
  // выполняем  события ячейки пояса
  async action(id){

    //console.log("Реализовать выполнение события ячейки : " + id + " --- " + belt[id]);

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
    const bag = await this.get();
    if (cellFromType === "bag") {  
      const objectsInstance = new Objects(); // Создаем один экземпляр Objects  
      for (const column in bag) {
        for (const row in bag[column]) {
          const cell = bag[column][row];
          if (cell === null) continue; // Пропускаем пустые ячейки
          if (cellFromNumber[0] === "bag" && cellFromNumber[1] == column && cellFromNumber[2] == row) {
            continue; // Пропускаем, если это тот же предмет
          }
          const data = await objectsInstance.getData(cell); // Получаем данные объекта
          const [width, height] = data.textureData.cells; // Извлекаем размеры
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
  async set(id, value = null){
    let data = await this.get();
    data[id[1]][id[2]] = value;
  }

  async delete(keyBelt){

    //belt[keyBelt] = null;
  }
}