import { Assets, Sprite } from "pixi";
import hardURLs from "hardURLs"; // hardURLs
import Settings from "settings";

const diabloLogoSmal = await Assets.load(hardURLs.assets.images.ui.logo.diabloLogoSmal);


export function logo(pos = {x:(Settings.graphics.resolution.width/2), y:25}, anchor = {x:0.5, y:0} ){
  const result = new Sprite(diabloLogoSmal);
  result.x = pos.x;
  result.y = pos.y;
  result.anchor.set(anchor.x, anchor.y);
  result.label = "diabloLogo";
  return result;
}
