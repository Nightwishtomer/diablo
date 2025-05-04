//import Hero from "hero/hero";
import { Stat } from "hero/stat";
export class Magic extends Stat {
  constructor(baseValue = 0, maxValue = 0){
    super(baseValue, maxValue);

  }
  
  /** Вывод В консоль */
  view(){
    console.log("Magic:");
    console.table(this);
  }
}