import Hero from "hero/hero";
export class internalRequired {
  constructor(required){
    this._required = required;
    this._value = this._checkRequired();
  }
  
  get value(){
    return this._value;
  }

  // проверка необходимых условий использования предмета
  _checkRequired(){
    if (this._required || Object.keys(this._required).length !== 0) { // обьект не пустой, далее проверяем поля
      for (const [key, value] of Object.entries(this._required)) { // проходимся по списку
        const heroStatMap = {
          strength: Hero.char.strength.value,
          dexterity: Hero.char.dexterity.value,
          magic: Hero.char.magic.value,
          level: Hero.experience.level
        };     
        const heroValue = heroStatMap[key];
        if (value > heroValue) {
          return false; // Нельзя использовать
        }
      }
    }
    return true; // можно использовать    
  }
  
}