import { Application, Assets, Sprite, Container, Texture, AnimatedSprite, Ticker } from "pixi";
import {TextBig} from "text/textBig"; // текст textBigGold
import {TextSmall} from "text/textSmall"; // текст textSmal



export class DText {

  constructor (text, type) {
    this.text = this.textParsing(text);
    this.type = type;
    
    
    if(this.type == "big"){ 
      return this.renderBig(); // Big
    }else if (this.type == "small") {
      return this.renderSmall(); // Small
    } 
  }

  renderBig(){ // Отрисовка большого текста
    //console.log(new TextBig(this.text));
    return new TextBig(this.text);
  }
  
  renderSmall(){ // Отрисовка маленького текста
    return new TextSmall(this.text);
  }
  
  textParsing(data){ // Разборка текста по буквам
    return data.toString().split('');
  }
}