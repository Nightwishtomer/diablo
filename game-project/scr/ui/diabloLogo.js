import { Assets, Sprite } from "pixi";
import Settings from "settings";

const diabloLogoSmal = await Assets.load('./game-project/assets/images/ui/logo/diabloLogoSmal.png');

export function logo(pos = {x:(Settings.graphics.resolution.width/2), y:25}, anchor = {x:0.5, y:0} ){
  const result = new Sprite(diabloLogoSmal);
  result.x = pos.x;
  result.y = pos.y;
  result.anchor.set(anchor.x, anchor.y);
  result.label = "diabloLogo";
  return result;
}
