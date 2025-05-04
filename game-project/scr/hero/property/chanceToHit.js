//import Hero from "hero/hero";
import { StatProperty } from "hero/statProperty";
export class ChanceToHit extends StatProperty {
  constructor(baseValue = 0){
    super(baseValue);
    
  }

  get valueText() {
    return this._cachedValue + "%";
  }

  /** Вывод В консоль */
  view(){
    console.log("chanceToHit:");
    console.table(this);
  }
}