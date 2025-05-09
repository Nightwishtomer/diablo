import { Assets, Texture, AnimatedSprite } from "pixi";
import hardURLs from "hardURLs"; // hardURLs
await Assets.load(hardURLs.assets.data.ui.spiner.pentagramSpiner);
await Assets.load(hardURLs.assets.data.ui.spiner.pentagramSpinerMin);

export class PentagramSpiner {
  constructor({x = 0, y = 0} , type){
    this.x = x;
    this.y = y;
    this.type = type;
    return this.render();
  }

  render(){
    const frames = [];
    for (let i = 0; i < 8; i++) {
      const val = i < 10 ? `0${i}` : i;
      if(this.type == "big"){
        frames.push(Texture.from(`pentagramSpiner00${val}.png`));
      } else if(this.type == "small") {
        frames.push(Texture.from(`pentagramSpinerMin00${val}.png`));
      }
    }
    const spiner = new AnimatedSprite(frames);
    spiner.x = this.x;
    spiner.y = this.y;
    spiner.anchor.set(0.5);
    spiner.animationSpeed = 0.3;
    spiner.label = "spinner";
    spiner.play();
    return spiner;
  }


}
