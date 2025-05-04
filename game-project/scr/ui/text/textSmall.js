import { Assets, Sprite, Container, Texture } from "pixi";
await Assets.load('./game-project/data/ui/text/textSmall.json');
export class TextSmall {
  constructor(text){
    this.text = text;
    this.dataText = [
      ["A",  "textSmall0000.png", 10], ["B", "textSmall0001.png", 10], ["C", "textSmall0002.png", 10], ["D",  "textSmall0003.png", 10], ["E",  "textSmall0004.png", 10], 
      ["F",  "textSmall0005.png", 10], ["G", "textSmall0006.png", 10], ["H", "textSmall0007.png", 10], ["I",  "textSmall0008.png", 8 ], ["J",  "textSmall0009.png", 10], 
      ["K",  "textSmall0001.png", 10], ["L", "textSmall0011.png", 10], ["M", "textSmall0012.png", 10], ["N",  "textSmall0013.png", 10], ["O",  "textSmall0014.png", 10], 
      ["P",  "textSmall0015.png", 10], ["Q", "textSmall0016.png", 10], ["R", "textSmall0017.png", 10], ["S",  "textSmall0018.png", 10], ["T",  "textSmall0019.png", 10], 
      ["U",  "textSmall0020.png", 10], ["V", "textSmall0021.png", 10], ["W", "textSmall0022.png", 10], ["X",  "textSmall0023.png", 10], ["Y",  "textSmall0024.png", 10], 
      ["Z",  "textSmall0025.png", 10], ["a", "textSmall0000.png", 10], ["b", "textSmall0001.png", 10], ["c",  "textSmall0002.png", 10], ["d",  "textSmall0003.png", 10], 
      ["e",  "textSmall0004.png", 10], ["f", "textSmall0005.png", 10], ["g", "textSmall0006.png", 10], ["h",  "textSmall0007.png", 10], ["i",  "textSmall0008.png", 5 ], 
      ["j",  "textSmall0009.png", 10], ["k", "textSmall0001.png", 10], ["l", "textSmall0011.png", 10], ["m",  "textSmall0012.png", 12], ["n",  "textSmall0013.png", 10], 
      ["o",  "textSmall0014.png", 12], ["p", "textSmall0015.png", 10], ["q", "textSmall0016.png", 10], ["r",  "textSmall0017.png", 10], ["s",  "textSmall0018.png", 10], 
      ["t",  "textSmall0019.png", 10], ["u", "textSmall0020.png", 10], ["v", "textSmall0021.png", 10], ["w",  "textSmall0022.png", 10], ["x",  "textSmall0023.png", 10], 
      ["y",  "textSmall0024.png", 10], ["z", "textSmall0025.png", 10], ["1", "textSmall0026.png", 5 ], ["2",  "textSmall0027.png", 8] , ["3",  "textSmall0028.png", 10], 
      ["4",  "textSmall0029.png", 10], ["5", "textSmall0030.png", 10], ["6", "textSmall0031.png", 10], ["7",  "textSmall0032.png", 10], ["8",  "textSmall0033.png", 10], 
      ["9",  "textSmall0034.png", 10], ["0", "textSmall0035.png", 10], ["-", "textSmall0036.png", 10], ["=",  "textSmall0037.png", 10], ["+",  "textSmall0038.png", 10], 
      ["(",  "textSmall0039.png", 10], [")", "textSmall0040.png", 10], ["[", "textSmall0041.png", 10], ["]",  "textSmall0042.png", 10], ["\"", "textSmall0043.png", 10], 
      ["\"", "textSmall0044.png", 10], ["'", "textSmall0045.png", 10], ["'", "textSmall0046.png", 10], [":",  "textSmall0047.png", 10], [";",  "textSmall0048.png", 10], 
      [",",  "textSmall0049.png", 10], [".", "textSmall0050.png", 10], ["/", "textSmall0051.png", 10], ["?",  "textSmall0052.png", 10], ["!",  "textSmall0053.png", 10], 
      ["&",  "textSmall0054.png", 10], ["%", "textSmall0055.png", 10], ["#", "textSmall0056.png", 10], ["$",  "textSmall0057.png", 10], ["*",  "textSmall0058.png", 10], 
      ["'",  "textSmall0059.png", 10], ["'", "textSmall0060.png", 10], ["@", "textSmall0061.png", 10], ["\\", "textSmall0062.png", 10], ["^",  "textSmall0063.png", 10], 
      ["_",  "textSmall0064.png", 10], ["|", "textSmall0065.png", 10], ["`", "textSmall0066.png", 10]
    ]; 
    return this.renderLine(); // Рисуем и добавляем буквы в Контейнер  
  }

  renderLine(){
    const line = new Container();
    let letter;
    let posX = 0;
    for (let i = 0; i < this.text.length; i++) {
      if(this.text[i] === " ") {
        posX = posX + 10;
      } else {
        for (let b = 0; b < this.dataText.length; b++) {
          if(this.text[i] === this.dataText[b][0]) {
            letter = new Sprite(Texture.from(this.dataText[b][1]));
            letter.x = posX;
            letter.y = 0;
            posX = posX + this.dataText[b][2]; // брать эту переменную из третьего элемента массива
            letter.anchor.set(0.5);
            line.addChild(letter);
          }
        }
      }
    }
    return line;
  }
}