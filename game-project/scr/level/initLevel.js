
import { CathedralGenerator } from "level/cathedralGenerator";
import { LEVELSETTINGS } from "data/level/levelData";
import { Doors } from "level/doors"


export class InitLevel {
  constructor(levelNum){
    //this.level = {};

   
    this.levelNum = levelNum; // Номер уровня
    this.levelType = null; // Тип уровня: Cathedral,
    this.levelMap = {}; // готовый уровень

    this.comparisonArrays = { // Массивы для сравнения
      doors : [ // тип ячеек с дверями 
        LEVELSETTINGS.cathedral.mapLegend.door,      // ASCII Значек дверь // ASCII Icon door
        LEVELSETTINGS.cathedral.mapLegend.doorGrate, // ASCII Значек дверь с решеткой // ASCII Icon door with grate
      ],
      solidCells : [ // тип не проходимых ячеек
        " ",                                        // Занятое пространстов. Твердь. стена.
        LEVELSETTINGS.cathedral.mapLegend.wall,     // ASCII Значек стена // ASCII Icon wall
        LEVELSETTINGS.cathedral.mapLegend.grate,    // ASCII Значек решетка // ASCII Icon grate
        LEVELSETTINGS.cathedral.mapLegend.cornerTL, // ASCII Значек угол верх Лево // ASCII Icon corner top left
        LEVELSETTINGS.cathedral.mapLegend.cornerTR, // ASCII Значек угол верх право // ASCII Icon corner top right
        LEVELSETTINGS.cathedral.mapLegend.cornerBL, // ASCII Значек угол низ Лево // ASCII Icon corner bottom left
        LEVELSETTINGS.cathedral.mapLegend.cornerBR, // ASCII Значек угол низ право // ASCII Icon corner bottom right
      ],
    };
    this.doorsCellsArry = [ 
      LEVELSETTINGS.cathedral.mapLegend.door,      // ASCII Значек дверь // ASCII Icon door
      LEVELSETTINGS.cathedral.mapLegend.doorGrate, // ASCII Значек дверь с решеткой // ASCII Icon door with grate
    ]; 
    this.solidCellsArray = [
      " ",                                        // Занятое пространстов. Твердь. стена.
      LEVELSETTINGS.cathedral.mapLegend.wall,     // ASCII Значек стена // ASCII Icon wall
      LEVELSETTINGS.cathedral.mapLegend.grate,    // ASCII Значек решетка // ASCII Icon grate
      LEVELSETTINGS.cathedral.mapLegend.cornerTL, // ASCII Значек угол верх Лево // ASCII Icon corner top left
      LEVELSETTINGS.cathedral.mapLegend.cornerTR, // ASCII Значек угол верх право // ASCII Icon corner top right
      LEVELSETTINGS.cathedral.mapLegend.cornerBL, // ASCII Значек угол низ Лево // ASCII Icon corner bottom left
      LEVELSETTINGS.cathedral.mapLegend.cornerBR, // ASCII Значек угол низ право // ASCII Icon corner bottom right
    ];
  }

  // генерируем карту
  init(){
    this._determineMapType(); // определяем тип карты. какой уровень подземелья.

    if(this.levelType == "cathedral"){ // Cathedral
      //this.map = 
      const generator = new CathedralGenerator();
      this.level = generator.generate();
      generator._printMap(); // Вывод карты в консоль

      this.levelMap = {
        levelNum : this.levelNum,
        levelType : this.levelType,
        size: {
          width : LEVELSETTINGS[this.levelType].size.width,
          height : LEVELSETTINGS[this.levelType].size.height,
        },
        level : this.level,
        tiles: [ // 80x80 массив тайлов карты
          { x: 0, y: 0, id: "floor_01" },
          { x: 1, y: 0, id: "wall_01" }
        ],
        doors : [], // массив с дверями
        passability: [], // 80x80 массив проходимости (0 — непроходимо, 1 — проходимо)
        objects: [ // Объекты (сундуки, двери и т.д.)
          { x: 2, y: 0, type: "door", state: "closed", locked: true }
        ],
        monsters: [  // Монстры на карте
          { x: 5, y: 5, type: "skeleton", hp: 30 }
        ],
        actions: [],   // Действия на клетках (например, скрипты)
        //events: [ { x: 4, y: 0, type: "trap", effect: "damage", damage: 10 } ]
        miniMap: []    // Упрощенная карта для миникарты (только вертикальные и горизонтальные стены)




      };

      
      this.Doors = new Doors(this.levelMap.level); // инициализируем обработчик дверей

      this._fillingLevelTiles(); // 80x80 массив тайлов карты
      this.levelMap.doors = this.Doors.getAll(); // заполнение массива с дверями

      this.levelMap.passability = this._fillingLevelPassability(); // 80x80 массив проходимости (0 — непроходимо, 1 — проходимо)
      this._fillingLevelObjects(); // Объекты (сундуки, двери и т.д.)
      this._fillingLevelMonsters();  // Монстры на карте
      this._fillingLevelCtions();   // Действия на клетках (например, скрипты)
      this.levelMap.miniMap = this._fillingLevelMiniMap(); // Упрощенная мини карта

      console.log(this.levelMap);


      //console.log("До : " + this.Doors.getState(10));
      //this.Doors.changeState(10);
      //console.log("После : " + this.Doors.getState(10));


      return;
    }
    
    if(this.levelType == "catacombs"){ // Catacombs
      
      return;
    }
    
    if(this.levelType == "caves"){ // Caves
      
      return;
    }

    if(this.levelType == "hell"){ // Hell
      
      return;
    }






  }

  // определяем тип карты. какой уровень подземелья.
  _determineMapType(){
    if ( (this.levelNum >= 1) && (this.levelNum <= 4)) {
      //Church

      this.levelType = "cathedral";
      console.log("Level : Church " + this.levelNum);
      // return 
      //this.generationChurch(this.level); // создание уровня церквей.
    }
    if ( (this.levelNum >= 5) && (this.levelNum <= 8)) {
      //Catacombs
      this.levelType = "catacombs";
      console.log("Level : Catacombs " + this.levelNum);
    }
    if ( (this.levelNum >= 9) && (this.levelNum <= 12)) {
      //Caves
      this.levelType = "caves";
      console.log("Level : Caves " + this.levelNum);
    }
    if ( (this.level >= 13) && (this.levelNum <= 16)) {
      //Hell
      this.levelType = "hell";
      console.log("Level : Hell " + this.levelNum);
    }
  }

  // 80x80 массив тайлов карты
  _fillingLevelTiles(){ 
    console.log("this._fillingLevelTiles() // 80x80 массив тайлов карты");
  }



  // + 
  // 80x80 массив проходимости (0 — непроходимо, 1 — проходимо)
  _fillingLevelPassability(){ 
    console.log("this._fillingLevelPassability() // 80x80 массив проходимости (0 — непроходимо, 1 — проходимо)");
    return this.levelMap.level.map(
      row => row.map(
        cell => this.comparisonArrays.solidCells.includes(cell) ? 0 : 1
      )
    );
  }

  
  // Объекты (сундуки, двери и т.д.)
  _fillingLevelObjects(){ 
    console.log("this._fillingLevelObjects() // Объекты (сундуки, двери и т.д.)");
  }

  
  // Монстры на карте
  _fillingLevelMonsters(){  
    console.log("this._fillingLevelMonsters() // Монстры на карте");
  }
  
  // Действия на клетках (например, скрипты)
  _fillingLevelCtions(){   
    console.log("this._fillingLevelCtions() // Действия на клетках (например, скрипты)");
  }
  















  // Упрощенная мини карта
  _fillingLevelMiniMap(){
    //console.log("this._fillingLevelMiniMap() // Упрощенная мини карта");
    let miniMap = []; // пустая заготовка для мини карты
    miniMap = this._createEmpty(LEVELSETTINGS[this.levelType].size.width, LEVELSETTINGS[this.levelType].size.height, " "); // создание пустышки массива
    miniMap = this.levelMap.map;
    return miniMap;
  }



  // создание массива width x height, data тип клетками.
  _createEmpty(width, height, data = true){
    return Array.from({ length: height }, () =>
      Array(width).fill(data) // '#' — стена, '.' — пол, " " - не проходимая ячейка.
    );
  }

  // создание массива width x height, data тип клетками.
  _createEmptyImpassable(width, height, data = true){

  }

}





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
