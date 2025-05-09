import Hero from "hero/hero";

export class Belt {
  constructor(){
    super();
  }

  // получаем данные id ячейки пояса
  async getCell(id){
    const data = await this.get();
    return data[id];
  }
  
  async get(){
    const data = Hero.belt;
    return data;
  }
 
  // выполняем  события ячейки пояса
  async action(id){
    const belt = Hero.belt;
    console.log("Реализовать выполнение события ячейки : " + id + " --- " + belt[id]);

  }

  async check(id){
    const belt = Hero.belt;
    return (belt[id] == null) ? false : true;
  }

  // устанавливаем значение ячейки
  async set(id, value = null){
    const belt = Hero.belt;
    belt[id] = value;
  }

  async delete(keyBelt){
    const belt = Hero.belt;
    belt[keyBelt] = null;
  }
}