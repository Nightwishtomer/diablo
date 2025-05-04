export const MemoryData = {
  objects : { },

};

export class Memory {
  constructor(){ }

  /**
  * Получение данных из памяти по типу и номеру
  * @param {string} type - тип
  * @param {string} id - номер ячейки памяти
  * @returns {object} - Возвращает данные из памяти
  * @example 
  * new Memory().get("objects", 2);
  */
  get(type, id) {
    return (this._existenceCheck(type, id)) ? MemoryData[type][id] : false;
  }

  /**
  * Добавление данных из памяти по типу и номеру
  * @param {string} type - тип
  * @param {string} id - номер ячейки памяти
  * @param {object} data - данные ячейки памяти
  * @returns {boolean} - Возвращает результат редактирования: true / false
  * @example 
  * new Memory().get("objects", 2, {});
  */
  add(type, id, data) {
    try {
      const result = this._existenceCheck(type, id);
      if (!result) MemoryData[type][id] = data;
      return result;
    } catch (error) {
      console.error(`Ошибка при добавлении данных:`, error);     
      return false;
    }
  }

  /**
  * Удаление данных из памяти по типу и номеру
  * @param {string} type - тип
  * @param {string} id - номер ячейки памяти
  * @returns {boolean} - Возвращает результат редактирования: true / false
  * @example 
  * new Memory().get("objects", 2);
  */
  delete(type, id) {
    const result = this._existenceCheck(type, id); // проверка существования
    if (result) {
      delete MemoryData[type][id]; // удаление
      return true;
    } else {
      return false; // если элемент не найден
    }
  }

  /**
  * Редактирование данных из памяти по типу и номеру
  * @param {string} type - тип
  * @param {string} id - номер ячейки памяти
  * @param {object} data - номер ячейки памяти
  * @returns {boolean} - Возвращает результат редактирования: true / false
  * @example 
  * new Memory().get("objects", 2);
  */
  edit(type, id, data){
    const result = this._existenceCheck(type, id);
    if (result) MemoryData[type][id] = data;
    return result;
  }

  /**
  * Редактирование данных из памяти по типу и номеру
  * @param {string} type - тип
  * @param {string} id - номер ячейки памяти
  * @param {object} data - номер ячейки памяти
  * @returns {boolean} - Возвращает результат редактирования: true / false
  * @example 
  * new Memory().get("objects", 2);
  */
  //проверка существования
  _existenceCheck(type, id){
    return (MemoryData[type] && MemoryData[type][id]) ? true : false;
  }
}