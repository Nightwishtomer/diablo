import { Hero, HeroData } from "hero/hero";

export class ActionsLib {
  constructor(){
   
  }

  async addButtonCharacteristics(data){
 
    const hero = await Hero;
    const actions = {
      AddStrength : () => {
        
        this._increaseStrength(data.action);
      },
      AddMagic    : () => {
       
        this._increaseMagic(data.action);
      },
      AddDexerity : () => {
        
        this._increaseDexerity(data.action);
      },
      AddVitality : () => {
        
        this._increaseVitality(data.action);
      },
    };
    
    actions[data.name]();

  }

  // увеличение Strength на 1
  async _increaseStrength(action){
    const hero = await Hero;
    console.log("Выполняем AddStrength");
    console.log(hero[action]);
    hero[action] = hero[action] + 1;
    console.log(hero[action]);
  }

  // увеличение Magic на 1
  async _increaseMagic(action){
    const hero = await Hero;
    console.log("Выполняем AddMagic");
    console.log(hero[action]);
    hero[action] = hero[action] + 1;
    console.log(hero[action]);
  }

  // увеличение Dexerity на 1
  async _increaseDexerity(action){
    const hero = await Hero;
    console.log("Выполняем AddDexerity");
    console.log(hero[action]);
    hero[action] = hero[action] + 1;
    console.log(hero[action]);

  }

  // увеличение Vitality на 1
  async _increaseVitality(action){
    const hero = await Hero;
    console.log("Выполняем AddVitality");
    console.log(hero[action]);
    hero[action] = hero[action] + 1;
    console.log(hero[action]);

  }



}
