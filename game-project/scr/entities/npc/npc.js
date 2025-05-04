export const NPCsData = {
  0 : {
    name : "Griswold",
    buyCoef  : 1.0,   // игрок покупает
    sellCoef : 0.25, // игрок продаёт
    sells : ["bows", "maces", "swords", "armors", "shields", "helmets"],
    buys  : ["bows", "maces", "swords", "armors", "shields", "helmets"],
    description : "Кузнец, продаёт и покупает снарягу. Надёжен."
  },
  1 : {
    name : "Adria",
    buyCoef  : 1.3,
    sellCoef : 0.2,
    sells : ["staffs", "potions", "scrolls", "book", "amulets", "rings", "oils", "runes", "staffs"],
    buys  : ["staffs", "potions", "scrolls", "book", "amulets", "rings", "oils", "runes", "staffs"],
    description : "Ведьма. Продаёт магию, скупает магию."

  },
  2 : {
    name : "Pepin",
    buyCoef  : 1.1,
    sellCoef : 0.3,
    sells : ["potions", "scrolls", "elixirs"],
    buys  : ["potions", "elixirs"],
    description : "Лекарь. Самое нужное для выживания."
  },

  3 : {
    name : "Wirt",
    buyCoef  : 5.0,
    sellCoef : 0.0, // не покупает
    sells : ["bows", "maces", "swords", "armors", "rare"],
    buys  : [],
    description : "Мутный мальчик. Продаёт редкость. Дорого, как из рук в eBay."
  } 
};

/*
  amulets  - амулеты
  rings    - кольца
  oils     - масла
  runes    - руны
  staffs   - посохи
  bows     - луки
  maces    - булавы
  swords   - мечи
  armors   - доспехи
  helmets  - шлемы
  shields  - щиты
  elixirs  - эликсиры
  potionss - зелья
  crolls   - свитки   // сделать
  books    - книги    // сделать
*/



export class NPC {
  constructor(id = null){
    this._data = NPCsData[id];
    this._id = id; // id
    // console.log("npc " + this._data.name);
    // console.log(this._data);
  }

  get name(){
    return this._data.name;
  }
  get buyCoef(){
    return this._data.buyCoef;
  }
  
  get sellCoef(){
    return this._data.sellCoef;
  }
 
  get sells(){
    return this._data.sells;
  }
  
  get buys(){
    return this._data.buys;
  }

  get description(){
    return this._data.description;
  }
//  buy
  // sell

}