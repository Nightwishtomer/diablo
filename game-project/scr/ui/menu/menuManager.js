import { JsonMenu } from "menu/jsonMenu";

export class MenuManager {
  //constructor(app) {
  constructor() {
      //this.app = app;
      this.currentMenu = null;
      console.log("Load module: MenuManager.")
  }

  async showMenu(menuName) {
    //console.log(menuName);
    //if (menuName == "selectPlayer") {
      // this.app.stage.removeChild(this.currentMenu.getContainer());
    //  this.currentMenu = new JsonSelectMenu(menuName);
    //} else {
     this.currentMenu = new JsonMenu(menuName);
    //}

    
    await this.currentMenu.load();
    //this.app.stage.addChild(this.currentMenu.getContainer());
}


}