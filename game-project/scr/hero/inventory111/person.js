import Hero from "hero/hero";
export class InvPerson {
  constructor(){
    super();
    this.HERO = Hero;
  }

 /**
  * Получение данных о персонаже
  * @param {string} type - тип ячейки персонажа
  * @returns {object} - Данные о одежде
  */
  async getCell(type){
    return await (await Hero)[type];
  }
  
  /**
   * Получение данных о одежде персонажа
   * @returns 
   */
  async get(){
    const HERO = await Hero;
    const data = {
      head : HERO.head,
      neck : HERO.neck,
      tors : HERO.tors,
      leftHand : HERO.leftHand,
      leftRing : HERO.leftRing,
      rightHand : HERO.rightHand,
      rightRing : HERO.rightRing,
    };
    return data;
  }
  
  /**
   * Выполняем  события ячейки
   * @param {string} type - тип ячейки
   * @returns {boolean} - результат
   */
  async action(type){
    console.log("выполняем  события ячейки " + type);



    const ObjectID = await this.getCell(type);
    if (ObjectID) {
      const dataObject = await (await new Objects()).getData(ObjectID);
      console.log("Выполняем действие предмета '" + dataObject.name + "' с id-" + dataObject.id + ".  action:" + dataObject.action);
    }
    return false;
  }

  /**
   * Проверяем, пуста ли яячейка
   * @param {string} type - тип ячейки
   * @returns {boolean} - значение, пуста ли ячейка
   */
  async check(type){
    const ObjectID = await this.getCell(type);
    return (ObjectID == null) ? false : true;
  }

  /**
   * Устанавливаем значение ячейки персонажа
   * @param {string} type - тип ячейки 
   * @param {string} value  - значение
   */
  async set(type, value = null) {
    const HERO = await Hero;
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
        HERO[slotMap[type]] = value;
    }
    this.action(); // Добавление характеристик персонажу
  }

  async delete(type = null){
    //const belt = Hero.belt;
    //belt[keyBelt] = null;

    if (id == null) return;




  }
}