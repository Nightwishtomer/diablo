import { LEVELSETTINGS } from "./../../../diablo/game-project/data/level/levelData.js"

export class CathedralGenerator {
  constructor() {
    this.levelSettings = LEVELSETTINGS.cathedral; // загрузка данных уровня
    this.width = this.levelSettings.size.width;
    this.height = this.levelSettings.size.height;

    
    
    this.centralRoomConfig = this.levelSettings.centralRoom.size; // конфиг центральных комнат
    this.map = this._createEmptyMap();
    this.rooms = []; // массив с комнатами
    this.countCentralRooms = 0; // Колличество центральных комнат
    this.busyCells = []; // Пробный массив для хранения занятых ячеек
  }
  
  // генерируем карту
  generate(){ 
    this.countCentralRooms = this._rendom(1, 3); // Колличество центральных комнат
    this.generateCentralRooms(); // создание центральных комнат и коридора
    this.generateRooms(); // создание комнат 
    this.generateDoors(); // создание дверей // устанавливаем двери и проходы
    return this.map;
  }

  // создание комнат
  generateRooms(){
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].type != "corridor") { // создание комнат не для коридора
        this.L5roomGen(this.rooms[i], this.levelSettings.recursionDepth); // Рекурсивная функция генерирования комнат
      }
    }
  }

  // создание дверей
  generateDoors(){
    let commonWalls = [];
    // Получаем массивы стен: Север, Юг, Запад , Восток
    for (let i = 0; i < this.rooms.length; i++) {
      if(this.rooms[i].type != "corridor"){
        this.rooms[i].walls = { north : [], south : [], west  : [], east  : [] }; // стены
        for (let x = 0; x < this.rooms[i].width; x++) {
          if((x != 0) && (x != (this.rooms[i].width - 1))){
            this.rooms[i].walls.north.push((this.rooms[i].posY) + ":" + (this.rooms[i].posX + x)); // north - север
            this.rooms[i].walls.south.push((this.rooms[i].posY + this.rooms[i].height - 1) + ":" + (this.rooms[i].posX + x));// south - юг
          }
        }
        for (let y = 0; y < this.rooms[i].height; y++) {
          if((y != 0) && (y != (this.rooms[i].height - 1))){
            this.rooms[i].walls.west.push((this.rooms[i].posY + y) + ":" + (this.rooms[i].posX)); // west - запад
            this.rooms[i].walls.east.push((this.rooms[i].posY + y) + ":" + (this.rooms[i].posX + this.rooms[i].width - 1)); // east - восток
          }
        }
      } 
    }

    // Сравниваем все массивы между противоположными стенами.
    for (let i = 0; i < this.rooms.length; i++) {
      if(this.rooms[i].type != "corridor"){
        for (let c = 0; c < this.rooms.length; c++) {
          if (this.rooms[c].type != "corridor"){
            let res = [];
            res = this._comparisonTwoArrays(this.rooms[i].walls.north, this.rooms[c].walls.south) // north / south - север / юг
            if (res.length != 0) {
              commonWalls.push(res);
            }
            res = this._comparisonTwoArrays(this.rooms[c].walls.west, this.rooms[i].walls.east) // west / east -  запад / восток
            if (res.length != 0) {   
              commonWalls.push(res);
            }
          }
        }    
      }
    }
   
    // В массиве общих стен, генерируем разные типы стен. Арки, арки с решеткой. остутствие стен.
    for (let index = 0; index < commonWalls.length; index++) {
      
      let randomTypeWall = this._rendom(1, 100) // процент вероятности типа общей стены

      if((randomTypeWall >= 0) && (randomTypeWall <= 9)){ // 10% - нет стены
        for (let i = 0; i < commonWalls[index].length; i++) {
          let pos = commonWalls[index][i].split(":");
          this.map[pos[0]][pos[1]] = this.levelSettings.mapLegend.floor;
        }
      }
      if((randomTypeWall >= 10) && (randomTypeWall <= 29)){ // 20% - арка
        for (let i = 0; i < commonWalls[index].length; i++) {
          let pos = commonWalls[index][i].split(":");
          this.map[pos[0]][pos[1]] = this.levelSettings.mapLegend.arch;
        }
      }
      if((randomTypeWall >= 30) && (randomTypeWall <= 49)){ // 20% - арка с решеткой и 1 дверь
        for (let i = 0; i < commonWalls[index].length; i++) {
          let pos = commonWalls[index][i].split(":");
          this.map[pos[0]][pos[1]] = this.levelSettings.mapLegend.archGrate;
        }
        // добавляем дверь
        let pos = this._generationRandomFromArray(commonWalls[index]).split(":")
        this.map[pos[0]][pos[1]] = this.levelSettings.mapLegend.door;
      }

      if((randomTypeWall >= 50) && (randomTypeWall <= 100)){ // 50% - стены  и 1 дверь
        // добавляем дверь
        let pos = this._generationRandomFromArray(commonWalls[index]).split(":")
        this.map[pos[0]][pos[1]] = this.levelSettings.mapLegend.door;
      }
    }
  }

  // Сравнение двух массивов (находит общие элементы)
  _comparisonTwoArrays(arr1, arr2) {
    const set2 = new Set(arr2);
    return arr1.filter(item => set2.has(item)); 
  }

  // выбираем рендом из массива с возможными исключениями
  _generationRandomFromArray(dataArray, exception){
    if (!Array.isArray(dataArray) || dataArray.length === 0) return null; // Проверка на пустой массив
    let exceptions = Array.isArray(exception) ? new Set(exception) : new Set([exception]); // Делаем Set для быстрого поиска
    let filteredArray = dataArray.filter(item => !exceptions.has(item)); // Убираем исключения
    if (filteredArray.length === 0) return null; // Если после фильтрации массив пуст — возвращаем null
    let rnd = Math.floor(Math.random() * filteredArray.length);
    return filteredArray[rnd];
  }

  // генерируем пустую комнату
  _generationEmptyRoom(room){
    let result = Array.from({ length: room.height }, () => Array(room.width).fill('.'));
    for (let y = 0; y < room.height; y++) {
        for (let x = 0; x < room.width; x++) {
            if (y === 0) { // Первая строка
                result[y][x] = this.levelSettings.mapLegend.wall;
                result[y][0] = this.levelSettings.mapLegend.cornerTL;
                result[y][room.width - 1] = this.levelSettings.mapLegend.cornerTR;
            } else if (y === room.height - 1) { // Последняя строка
                result[y][x] = this.levelSettings.mapLegend.wall;
                result[y][0] = this.levelSettings.mapLegend.cornerBL;
                result[y][room.width - 1] = this.levelSettings.mapLegend.cornerBL;
            } else { // Средние строки
                result[y][0] = this.levelSettings.mapLegend.wall;
                result[y][room.width - 1] = this.levelSettings.mapLegend.wall;
            }
        }
    }
    return result;
  }

  // Рекурсивная функция генерирования комнат V2
  L5roomGen(sourceData, deep){
    if (deep <= 0) return false;
    const direction = this._generationRandomFromArray(["north", "south", "west", "east"]);
    const newRoom = {
        posX: 0,
        posY: 0,
        width: this._generationRandomFromArray([6, 8, 10, 12, 14, 16]),
        height: this._generationRandomFromArray([6, 8, 10, 12, 14, 16]),
        type: "room",
        data: [],
    };
    newRoom.data = this._generationEmptyRoom(newRoom);
        let newRoomPos = {
        start: { posX: 0, posY: 0 },
        end: { posX: 0, posY: 0 }
    };
    switch (direction) {
        case "north": // Север
            newRoomPos.start.posX = sourceData.posX;
            newRoomPos.end.posX = sourceData.posX + sourceData.width - newRoom.width;
            newRoom.posX = this._rendom(newRoomPos.start.posX, newRoomPos.end.posX);
            newRoom.posY = sourceData.posY - newRoom.height + 1;
            break;

        case "south": // Юг
            newRoomPos.start.posX = sourceData.posX;
            newRoomPos.end.posX = sourceData.posX + sourceData.width - newRoom.width;
            newRoom.posX = this._rendom(newRoomPos.start.posX, newRoomPos.end.posX);
            newRoom.posY = sourceData.posY + sourceData.height - 1;
            break;

        case "west": // Запад
            newRoomPos.start.posY = sourceData.posY;
            newRoomPos.end.posY = sourceData.posY + sourceData.height - newRoom.height;
            newRoom.posX = sourceData.posX - newRoom.width + 1;
            newRoom.posY = this._rendom(newRoomPos.start.posY, newRoomPos.end.posY);
            break;

        case "east": // Восток
            newRoomPos.start.posY = sourceData.posY;
            newRoomPos.end.posY = sourceData.posY + sourceData.height - newRoom.height;
            newRoom.posX = sourceData.posX + sourceData.width - 1;
            newRoom.posY = this._rendom(newRoomPos.start.posY, newRoomPos.end.posY);
            break;
    }
    if (this._employmentVerification_3(newRoom)) {
        this._recordRoomInMap(newRoom);
        return true;
    } 
    return this.L5roomGen(sourceData, deep - 1); // Рекурсивный вызов с уменьшением глубины
  }

  //Проверка занятости на карте V3
  _employmentVerification_3(room) {
    // Проверка выхода за границы карты
    if (
        room.posX < 0 || room.posX + room.width > this.width ||
        room.posY < 0 || room.posY + room.height > this.height
    ) {
        return false;
    }

    // Набор символов, которые можно игнорировать при проверке
    const allowedTiles = new Set([this.levelSettings.mapLegend.wall, this.levelSettings.mapLegend.cornerTL, this.levelSettings.mapLegend.cornerTR, this.levelSettings.mapLegend.cornerBL, this.levelSettings.mapLegend.cornerBL]);
      // Проверка занятости ячеек
      for (let y = 0; y < room.height; y++) {
          for (let x = 0; x < room.width; x++) {
              const posY = room.posY + y;
              const posX = room.posX + x;
              const key = `${posY}:${posX}`;
              if (this.busyCells.includes(key) && !allowedTiles.has(this.map[posY][posX])) {
                  return false;
              }
          }
      }
      return true;
  }

  // создание центральных комнат и коридора
  generateCentralRooms(){
    const width = this.centralRoomConfig.width;
    const height = this.centralRoomConfig.height;
    const type = "central";
    if (this.rooms.length < (this.countCentralRooms + 1)) {
      // пока комнат меньше, чем нужно, выполняем код
      let centralRoom = null;
      let direction  = [this._rendom(0,this.width - this.centralRoomConfig.width), this._rendom(0,this.height - this.centralRoomConfig.height)];
      if (this.rooms.length == 1) {
        direction = (this._rendom(0, 2)) ? [this.rooms[0].posX, null] : [null, this.rooms[0].posY]; // Выбираем случайно позиционирование по осям. X или Y // получаем данные  из координат последней комнаты  
        //direction = (false) ? [this.rooms[0].posX, null] : [null, this.rooms[0].posY]; // Выбираем случайно позиционирование по осям. X или Y // получаем данные  из координат последней комнаты 
      }
      centralRoom = this.genChurchOneCentralRoom(type, direction, [width, height]); // Случайное значение X
      if (this.employmentVerification(centralRoom)) {
        if (centralRoom != null){
          this._recordRoomInMap(centralRoom);
          this.genChurchCentralCorridor();
        }
      }
      this.generateCentralRooms();
    } else {
      // комнат достаточно
      //console.log("Ура!!!! все комнаты сгенерированны!!!");
      return;
    }
  }

  // line 3 рендомим коридор между 1 и 2 комнатоми.
  genChurchCentralCorridor() {

    if (this.rooms.length !== 2) return; // Выход, если комнат меньше или больше двух.

    // Функция для нахождения ближайшей и дальней комнаты по оси
    const getSortedRooms = (axis) => {
      let room_1, room_2;
      if (this.rooms[0][axis] < this.rooms[1][axis]) {
        room_1 = this.rooms[0];
        room_2 = this.rooms[1];
      } else {
        room_1 = this.rooms[1];
        room_2 = this.rooms[0];
      }
      return [room_1, room_2];
    };

    let corridor = {
      posX: 0,
      posY: 0,
      width: 12, // Предположим, что это значение фиксировано
      height: 12,
      data: [], // Массив с коридором
      type: "corridor",
    };

    if (this.rooms[0].posX === this.rooms[1].posX) { // Ось по координатам X
      let [room_1, room_2] = getSortedRooms('posY');
      corridor.posX = room_1.posX + 4;
      corridor.posY = room_1.posY + room_1.height - 1;
      corridor.width = room_2.posY - room_1.posY - room_1.height + 2; // Вычисление ширины коридора
    }

    if (this.rooms[0].posY === this.rooms[1].posY) { // Ось по координатам Y
      let [room_1, room_2] = getSortedRooms('posX');
      corridor.posX = room_1.posX + room_1.width - 1;
      corridor.posY = room_1.posY + 4;
      corridor.width = room_2.posX - corridor.posX + 1; // Вычисление ширины коридора
    }

    // Генерация данных коридора
    corridor.data = this.genChurchCentralEmptyCorridor(corridor.width);

    // Поворот данных коридора для оси X
    if (this.rooms[0].posX === this.rooms[1].posX) {
      corridor.data = this._transpose(corridor.data);
      [corridor.height, corridor.width] = [corridor.width, corridor.height]; // Меняем местами высоту и ширину
    }

    this._recordRoomInMap(corridor); // Добавляем коридор в карту
  }

  // транспонирование массива
  _transpose(matrix) {
    return matrix[0].map((_, j) => matrix.map(row => row[j]));
  }

  // генерируем коридор с заданной длиной
  genChurchCentralEmptyCorridor(length){
    let result = [];
    for (let y = 0; y < 12; y++) {
      result[y] = [];
      for (let x = 0; x < length; x++) {
        switch (y) {
          case 0: // первая стена (строка 0)
            result[y][x] = this.levelSettings.mapLegend.wall;
            break;
          case 2: // первая коллонада (строка 1)
            result[y][x] = this.levelSettings.mapLegend.arch;
            break;
          case 9: // первая коллонада (строка 8)
            result[y][x] = this.levelSettings.mapLegend.arch;
            break;
          case 11: // первая стена (строка 10)
            result[y][x] = this.levelSettings.mapLegend.wall;
            break;
          default:
            result[y][x] = this.levelSettings.mapLegend.floor;
            break;
        }
      }
    }
    //console.log(result);
    return result;
  }

  //Запись комнаты в карту
  _recordRoomInMap(room) {
    this.rooms.push(room); //записываем данные о комнате
    for (let y = 0; y < room.height; y++) {
      for (let x = 0; x < room.width; x++) {
        this.map[room.posY + y][room.posX + x] = room.data[y][x]; // записываем в карту

        // понять. нужно ли это
        this.busyCells.push((room.posY + y) + ":" + (room.posX + x));
        // понять. нужно ли это
      }
    }
    
  }

  // генерация одной комнаты 
  // posX, posY - позиции будущей комнаты.
  // если posX, posY = undefined, они обе генерируються рендомно
  genChurchOneCentralRoom(type, [posX, posY], [width, height]){
    //если нет входных размеров. комната с рендомной позицией, не выходящая за края карты
    if((posX == null) || (posX == undefined)){ posX = this._rendom(0, (this.width - width ));}
    if((posY == null) || (posY == undefined)){ posY = this._rendom(0, (this.height - height ));}
    let result = [];
    for (let y = 0; y < height; y++) {
      result[y] = [];
      for (let x = 0; x < width; x++) {
        // первая строка
        if(y == 0){
          result[y][x] = this.levelSettings.mapLegend.wall; result[y][0] = this.levelSettings.mapLegend.cornerTL; result[y][width-1] = this.levelSettings.mapLegend.cornerTR;
        }

        // между первой и последней
        if((y > 0) && (y < (height-1))){
          result[y][x] = this.levelSettings.mapLegend.floor; result[y][0] = this.levelSettings.mapLegend.wall; result[y][width-1] = this.levelSettings.mapLegend.wall;
        }

        // последняя строка
        if(y == (height - 1)){
          result[y][x] = this.levelSettings.mapLegend.wall; result[y][0] = this.levelSettings.mapLegend.cornerBL; result[y][width-1] = this.levelSettings.mapLegend.cornerBL;
        } 
      }  
    }
    if (type == "central"){ // Если комната центральная, то генерируем колонны.
      result = this.genChurchColumns(result, {width, height}); // генерируем колонны
    }
    return { type : type, posX : posX, posY : posY, width : width, height : height, data : result };
  }

  // генерация четырех колон
    genChurchColumns(data, size = {width, height}) {
    let offsetX = Math.floor((size.width + 1) / 3)-1; // Отступ для колонн по оси X
    let offsetY = Math.floor((size.height + 1) / 3)-1 ; // Отступ для колонн по оси Y
    data[offsetY][offsetX] = this.levelSettings.mapLegend.wall; // Коллона на стороне "A"
    data[offsetY][size.width - offsetX - 2] = this.levelSettings.mapLegend.wall; // Коллона на стороне "B"
    data[size.height - offsetY - 2][offsetX] = this.levelSettings.mapLegend.wall; // Коллона на стороне "C"
    data[size.height - offsetY - 2][size.width - offsetX - 2] = this.levelSettings.mapLegend.wall; // Коллона на стороне "D"
    return data;
  }

  //Проверка занятости на карте
  employmentVerification(data) {
    if ((data.posX < 0) || (data.posX >= (this.width - data.width))) return false;
    if ((data.posY < 0) || (data.posY >= (this.height - data.height))) return false;
    if (data == undefined) return false;

    for (let y = 0; y < data.height; y++) {
      for (let x = 0; x < data.width; x++) {     
        if (this.map[data.posY + y][data.posX + x] !== " ") {
          if (this.map[data.posY + y][data.posX + x] !== "%") {
            return false; // error. cell is busy
          }
        }
      }
    }
    return true;
  }

  //функция рендома
   _rendom(min = 0, max = 1){
    // Returns a random integer from MIN to MAX:
    // return Math.floor(Math.random() * Number(max)) + Number(min);
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // Максимум и минимум включаются
  }

  // создание массива Y, X с непроходимыми клетками.
  _createEmptyMap(){
    return Array.from({ length: this.height }, () =>
      Array(this.width).fill(" ") // '#' — стена, '.' — пол, " " - не проходимая ячейка.
    );
  }

  // вывод в консоль
  _printMap(type = true) {
    //
    /// 
    // symbol : " " - не проходимая ячейка.
    // symbol : "." - проходимая ячейка. пол.
    // symbol : "#" - не проходимая ячейка. Стена.
    // symbol : "A" - не проходимая ячейка. Левый верхний угол.
    //  symbol : "B" - не проходимая ячейка. Правый верхний угол.
    //  symbol : "C" - не проходимая ячейка. Левый нижний угол.
    // symbol : "D" - не проходимая ячейка. Правый нижний угол.
    //  symbol : "-" - не проходимая ячейка. Арка.
    // symbol : "+" - не проходимая ячейка. Арка с решеткой.
    // symbol : "*" - не проходимая ячейка. 1 дверь
    // 

    // type - "true". вывод в консоль v.gpt
    if (type) {
      console.log(this.map.map(row => row.join('')).join('|\n'));
    }
        
    // type - "false". вывод в консоль v.1
    if (!type) {
      for (let y = 0; y < this.map.length; y++) {
        let number = y;
        if ((y >= 0) && (y <= 9)){ number += " "; }
        number += " |";
        let line = number + "";
        for (let x = 0; x < this.map[y].length; x++) { line += this.map[y][x] + ""; }
        line += "|";
        console.log(line);
      }
    }

  }
/*
  // создание массива Y, X с непроходимыми клетками.
  _createEmptyMap(){
    return Array.from({ length: this.height }, () =>
      Array(this.width).fill(" ") // '#' — стена, '.' — пол, " " - не проходимая ячейка.
    );
  }
  */
}
