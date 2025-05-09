import { StatLM } from "hero/statLM";
export class Mana extends StatLM {
  constructor(baseValue = 0){
    super(baseValue);
   
  }

  /** Вывод В консоль */
  view(){
    console.log("Mana:");
    console.table(this);
  }
}