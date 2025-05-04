import { Assets, Sprite, Container, Texture } from "pixi";
await Assets.load('./game-project/data/ui/text/textBig.json');
await Assets.load('./game-project/data/ui/text/textMed.json');

export class TextBig {
  constructor(text){
    this.text = text;
    this.dataText = [
      ["A", "textBig0000.png", 35], ["B", "textBig0001.png", 35], ["C", "textBig0002.png", 18], ["D", "textBig0003.png", 20], ["E", "textBig0004.png", 15], ["F", "textBig0005.png", 35],
      ["G", "textBig0006.png", 35], ["H", "textBig0007.png", 20], ["I", "textBig0008.png", 35], ["J", "textBig0009.png", 35], ["K", "textBig0001.png", 35], ["L", "textBig0011.png", 35],
      ["M", "textBig0012.png", 35], ["N", "textBig0013.png", 20], ["O", "textBig0014.png", 20], ["P", "textBig0015.png", 15], ["Q", "textBig0016.png", 35], ["R", "textBig0017.png", 35],
      ["S", "textBig0018.png", 15], ["T", "textBig0019.png", 18], ["U", "textBig0020.png", 35], ["V", "textBig0021.png", 35], ["W", "textBig0022.png", 35], ["X", "textBig0023.png", 35],
      ["Y", "textBig0024.png", 35], ["Z", "textBig0025.png", 35], ["1", "textBig0026.png", 35], ["2", "textBig0027.png", 35], ["3", "textBig0028.png", 35], ["4", "textBig0029.png", 35],
      ["5", "textBig0030.png", 35], ["6", "textBig0031.png", 35], ["7", "textBig0032.png", 35], ["8", "textBig0033.png", 35], ["9", "textBig0034.png", 35], ["0", "textBig0035.png", 35],
      ["!", "textBig0036.png", 35], ["#", "textBig0037.png", 35], ["%", "textBig0038.png", 35], ["&", "textBig0039.png", 35], ["*", "textBig0040.png", 35], ["(", "textBig0041.png", 35],
      [")", "textBig0042.png", 35], ["-", 'textBig0043.png', 35], ["+", "textBig0044.png", 35], ["=", "textBig0045.png", 35], ["'", "textBig0046.png", 35], ["\"", "textBig0047.png", 35],
      ["\"", "textBig0048.png", 35], [";", "textBig0049.png", 35], [":", "textBig0050.png", 35], [",", "textBig0051.png", 35], [".", "textBig0052.png", 35], ["?", "textBig0053.png", 35],
      ["/", "textBig0054.png", 35], ["", "textBig0055.png", 35],
      ["a", "textMed0000.png", 20], ["b", "textMed0001.png", 20], ["c", "textMed0002.png", 20], ["d", "textMed0003.png", 20], ["e", "textMed0004.png", 15], ["f", "textMed0005.png", 20],
      ["g", "textMed0006.png", 18], ["h", "textMed0007.png", 16], ["i", "textMed0008.png", 10], ["j", "textMed0009.png", 20], ["k", "textMed0010.png", 20], ["l", "textMed0011.png", 16],
      ["m", "textMed0012.png", 20], ["n", "textMed0013.png", 18], ["o", "textMed0014.png", 20], ["p", "textMed0015.png", 20], ["q", "textMed0016.png", 20], ["r", "textMed0017.png", 16],
      ["s", "textMed0018.png", 20], ["t", "textMed0019.png", 20], ["u", "textMed0020.png", 20], ["v", "textMed0021.png", 20], ["w", "textMed0022.png", 20], ["x", "textMed0023.png", 20],
      ["y", "textMed0024.png", 20], ["z", "textMed0025.png", 20],
    ];
    return this.renderLine(); // Рисуем и добавляем буквы в Контейнер  
  }

  renderLine(){
    const line = new Container();
    let letter;
    let posX = 0;
    for (let i = 0; i < this.text.length; i++) {
      if(this.text[i] === " ") {
        posX = posX + 20;
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