//import Hero from "hero/hero";
import { StatLM } from "hero/statLM";
export class Life extends StatLM {
  constructor(baseValue = 0){
    super(baseValue);

  }

  /** Вывод В консоль */
  view(){
    console.log("Life:");
    console.table(this);
  }
}