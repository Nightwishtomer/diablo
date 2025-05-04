export const heroesLevel = [
  [ 1, 0, 1999], 
  [ 2, 2000, 4619 ],
  [ 3, 4620, 8039 ],
  [ 4, 8040, 12488 ],
  [ 5, 12489, 18257 ],
  [ 6, 18258, 25711 ] ,
  [ 7, 25712, 35308 ],
  [ 8, 35309, 47621 ],
  [ 9, 47622, 63363 ],
  [ 10, 63364, 83418 ],
  [ 11, 83419, 108878 ],
  [ 12, 108879, 141085 ],
  [ 13, 141086, 181682 ],
  [ 14, 181683, 231074 ],
  [ 15, 231075, 313655 ],
  [ 16, 313656, 424066 ],
  [ 17, 424067, 571189 ],
  [ 18, 571190, 766568 ],
  [ 19, 766569, 1025153 ],
  [ 20, 1025154, 1366226 ],
  [ 21, 1366227, 1814567 ],
  [ 22, 1814568, 2401894 ],
  [ 23, 2401895, 3168650 ],
  [ 24, 3168651, 4166199 ],
  [ 25, 4166200, 5459522 ],
  [ 26, 5459523, 7130495 ],
  [ 27, 7130496, 9281873 ],
  [ 28, 9281874, 12042091 ],
  [ 29, 12042092, 15571030 ],
  [ 30, 15571031, 20066899 ],
  [ 31, 20066900, 25774404 ],
  [ 32, 25774405, 32994398 ],
  [ 33, 32994399, 42095201 ],
  [ 34, 42095202, 53525810 ],
  [ 35, 53525811, 67831217 ],
  [ 36, 67831218, 85670060 ],
  [ 37, 85670061, 107834822 ],
  [ 38, 107834823, 135274798 ],
  [ 39, 135274799, 169122008 ],
  [ 40, 169122009, 210720230 ],
  [ 41, 210720231, 261657252 ],
  [ 42, 261657253, 323800419 ],
  [ 43, 323800420, 399335439 ],
  [ 44, 399335440, 490808348 ],
  [ 45, 490808349, 601170413 ],
  [ 46, 601170414, 733825616 ],
  [ 47, 733825617, 892680221 ],
  [ 48, 892680222, 1082908611 ],
  [ 49, 1082908612, 1310707108 ],
  [ 50, 1310707109, 9999999999 ],
];    

export class Experience {
  constructor(baseExperienceValue = 0) {
    this._level = 1; // Уровень героя
    this._experienceValue = baseExperienceValue; // Опыт героя
    this._toNextLevel = 0; // очки для следующего уровня
    this._newPoints = 0; // Новые очки опыта


    this._calculateValue(); // Первоначальный расчет
  }


  // Теперь этот метод не возвращает значение, а обновляет кеш
  _calculateValue() {
    for (let i = 0; i < heroesLevel.length; i++) {
      const [level, minExp, maxExp] = heroesLevel[i];
      if (this._experienceValue >= minExp && this._experienceValue <= maxExp) {
        

        if (this._level !== level) {
          // уровень еизменился
          
            this.setNewPoints();
          
        }
        this._level = level;
        
          
          this._toNextLevel = maxExp + 1;
      

        return level;
      }
    }
    // Если не найден уровень — можно вернуть null или 0, в зависимости от твоей логики
    return null;
  }

  get level(){
    return this._level;
  }

  get experience(){
    return this._experienceValue;
  }

  get toNextLevel(){
    return this._toNextLevel;
  }

  get newPoints(){
    return this._newPoints;
  }

  addExperience(value){
    this._experienceValue += value;
    this._calculateValue();
  }


  setNewPoints() {
    this._newPoints = 5; 
  }

  decreaseNewPoints() {
    if (this._newPoints >= 1){
      this._newPoints--;
    }
  }



/*


  addTempBonus(value) {
      this._tempBonus += value;
      this._calculateValue();
  }
  
  subtractTempBonus(value) {
      this._tempBonus -= value;
      this._calculateValue();
  }
  
  removeTempBonus() {
      this._tempBonus = 0;
      this._calculateValue();
  }
*/

/*


  increaseBase(amount) {
      this._baseValue += amount;
      this._calculateValue();
  }

  decreaseBase(amount) {
      this._baseValue = Math.max(0, this._baseValue - amount);
      this._calculateValue();
  }
*/

  // 
}