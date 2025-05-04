//import Hero from "hero/hero";
import { StatProperty } from "hero/statProperty";
export class ProtectionClass extends StatProperty {
  constructor(baseValue = 0){
    super(baseValue);
    
  }

  /** Вывод В консоль */
  view(){
    console.log("protectionClass:");
    console.table(this);
  }
}