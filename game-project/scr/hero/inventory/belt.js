import ControlPanel from "controlPanel/controlPanel"; // controlPanel/controlPanel
export class InvBelt {
  constructor(value = null){
    this._data = [
      value, // Ячейка пояса 0
      value, // Ячейка пояса 1
      value, // Ячейка пояса 2
      value, // Ячейка пояса 3
      value, // Ячейка пояса 4
      value, // Ячейка пояса 5
      value, // Ячейка пояса 6
      value, // Ячейка пояса 7
    ];
  } 

  // получаем данные id ячейки пояса
  getCell(id){
    return this._data[id];
  }
  
  // устанавливаем значение ячейки
  setCell(id, value = null){
    this._data[id] = value;
  }
 
  // выполняем  события ячейки пояса
  action(id){
    const belt = this._data;
    //console.log("Реализовать выполнение события ячейки : " + id + " --- " + belt[id]);
   // console.log("Реализовать в файле ./game-project/scr/hero/belt.js");
    this._data[id].use(); // 

    this._cleaning(); // очистка от использованных предметов

    ControlPanel.rerender(); // перерисовываем панель после изменения
    //console.log(this._data[id]);
  }

  check(id){
    return (this._data[id] == null) ? false : true;
  }

  delete(id){
    this._data[id] = null;
  }

  // очистка от использованных предметов
  _cleaning(){
    for (let i = 0; i < this._data.length; i++) {
      const element = this._data[i];
 
      //console.log("-----");
      
      if (element !== null){
        
        if(element.isUsed == true){
          //console.log(element);
          
          this._data[i] = null;
        }
      }
     // console.log("-----");
    }
  }

  view() {
    console.log("Belt: ");
    console.table(this._data);
  }

}










      /*
      
      inventory : { // Инвентарь
        belt : { // пояс
          0 : null, // Ячейка пояса 0
          1 : 1, // Ячейка пояса 1
          2 : null, // Ячейка пояса 2
          3 : 2, // Ячейка пояса 3
          4 : null, // Ячейка пояса 4
          5 : 3, // Ячейка пояса 5
          6 : null, // Ячейка пояса 6
          7 : 4, // Ячейка пояса 7
        },
      
        
      },*/
