import { LEVELSETTINGS } from "data/level/levelData";

export class Doors {
  constructor(levelMap){
    this._levelMap = levelMap;
    this._doors = this._init(); 
  }

  _init(){
    let doors = {}; 
    let doorsSet = new Set([ 
      LEVELSETTINGS.cathedral.mapLegend.door,      // ASCII Значек дверь // ASCII Icon door
      LEVELSETTINGS.cathedral.mapLegend.doorGrate, // ASCII Значек дверь с решеткой // ASCII Icon door with grate
    ]); // Оптимизируем проверку наличия элемента
    const level = this._levelMap; // Сохраняем ссылку на карту для быстрого доступа
    let id = 0;
    for (let y = 0; y < level.length; y++) {
      let row = level[y]; // Сохраняем строку для быстрого доступа
      for (let x = 0; x < row.length; x++) {
        if (doorsSet.has(row[x])) {
          doors[id] = {
            id: id,
            state: false, // Состояние открытости
            position: [y, x], // Положение [Y, X]
            action: () => {},
          };
          id++; // Инкрементируем сразу
        }
      }
    }
    return doors;
  }


  // вывод массива с дверми
  getAll(){
    return this._doors;
  }

  // получение  двери
  getDoor(id){
    return this._doors[id];
  }
  
  // --- GET ---
  
  // получение состояния двери
  getState(id){
    return this._doors[id].state;
  }
  
  // получение Положение двери
  getPosition(id){
    return this._doors[id].position;
  }

  // получение действия двери
  getAction(id){
    return this._doors[id].action;
  }

  // --- SET ---

  // установка состояния двери
  setState(id, newState = false){
    if ((id in this._doors)) {
      this._doors[id].state = newState;
      return true;
    } else {
      return false;
    }
  }
  
  // установка Положение двери
  setPosition(id, newPosition){
    if ((id in this._doors)) {
      this._doors[id].position = newPosition;
      return true;
    } else {
      return false;
    }
  }

  // установка действия двери
  setAction(id, newAction = ()=>{}){
    if ((id in this._doors)) {
      this._doors[id].action = newAction;
      return true;
    } else {
      return false;
    }
  }


  
  // установка противоположного состояния
  changeState(id){
    if ((id in this._doors)) {
      this.setState(id, !this.getState(id));
      return true;
    } else {
      return false;
    }
  }



           

}

/****************************************** */







//------------------------------------------------------------------------------------------------
//
// Class Name: Doors
// Properties: levelMap - Массив с картой
// Global Variables:
//   this._levelMap =  - Массив с картой, равен levelMap
//   this._doors - Обьект с дверьми по id
//   
// ------------------------------------------------------------------------------------------------
// 
// Function: _init()
// Description: генерация обьекта дверей.
// Result: (Object) this._doors
// 
// ------------------------------------------------------------------------------------------------
// 
// Function: getAll()
// Description: вывод массива с дверми
// Result: (Object) door
// 
// ------------------------------------------------------------------------------------------------
// 
// Function: getDoor(id) 
// Description: получение  двери
// Properties:
// |    Name	  |   Type  |  Default  | 	Description  |
// |     id     |  Number | 	-----	  |    id двери    |
// Result: (Object) door 
// 
// ------------------------------------------------------------------------------------------------
// 
// Function: getState(id)
// Description: получение состояния двери
// Properties:
// |    Name	  |   Type  |  Default  | 	Description  |
// |     id     |  Number | 	-----	  |    id двери    |
// Result: (Boolean) door.state
// 
// ------------------------------------------------------------------------------------------------
// 
// Function: getPosition(id)
// Description: получение Положение двери
// Properties:
// |    Name	  |   Type  |  Default  | 	Description  |
// |     id     |  Number | 	-----	  |    id двери    |
// Result: (Array) door.position - [y, x]
// 
// ------------------------------------------------------------------------------------------------
// 
// Function: getAction(id)
// Description: получение действия двери
// Properties:
// |    Name	  |   Type  |  Default  | 	Description  |
// |     id     |  Number | 	-----	  |    id двери    |
// Result: (Function) door.action
// 
// ------------------------------------------------------------------------------------------------
// 
// Function: setState(id, newState)
// Description: установка состояния двери
// Properties:
// |    Name	  |   Type  |  Default  |         	Description         |
// |     id     |  Number | 	-----	  |            id двери           |
// | newState   | Boolean | 	false	  | true - открыт /false - закрыт |
// Result: (Boolean) true/false
// 
// ------------------------------------------------------------------------------------------------
// 
// Function: setPosition(id, newPosition)
// Description: установка Положение двери
// Properties:
// |     Name	   |   Type  |  Default   | Description |
// |     id      |  Number |  	-----	  |  id двери   |
// | newPosition |   Array |  	-----	  |   [y, x]    |
// Result: Boolean (true/false)
// 
// ------------------------------------------------------------------------------------------------
// 
// Function: setAction(id, newAction)
// Description: установка действия двери
// Properties:
// |    Name	  |   Type   |  Default | 	Description   |
// |     id     |  Number  | 	-----	  |    id двери     |
// | newAction  | function |  ()=>{}	|  пустая функция |
// Result: Boolean (true/false)
// 
// ------------------------------------------------------------------------------------------------
//
// Function: changeState(id)
// Description: установка противоположного состояния
// Properties:
// |    Name	  |   Type  |  Default  | 	Description  |
// |     id     |  Number  | 	-----	  |    id двери     |
// Result: Boolean (true/false)
//
// ------------------------------------------------------------------------------------------------








// ------------------------------------------------------------------------------------------------
//
// Function: 
// Description:
// Properties:
// |    Name	  |   Type  |  Default  | 	Description  |
// | ---------- | ------- | 	-----	  |  ------------- |
// | ---------- | ------- | 	-----	  |  ------------- |
// Result:
//
// ------------------------------------------------------------------------------------------------