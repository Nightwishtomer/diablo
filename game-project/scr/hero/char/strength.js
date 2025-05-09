import { Stat } from "hero/stat";
export class Strength extends Stat {
  constructor(baseValue = 0, maxValue = 0){
    super(baseValue, maxValue);

  }

  /** Вывод В консоль */
  view(){
    console.log("Strength:");
    console.table(this);
  }
}