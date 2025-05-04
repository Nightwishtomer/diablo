//import Hero from "hero/hero";
import { Stat } from "hero/stat";
export class Vitality extends Stat {
  constructor(baseValue = 0, maxValue = 0){
    super(baseValue, maxValue);
    
  }

  /** Вывод В консоль */
  view(){
    console.log("Vitality:");
    console.table(this);
  }
}