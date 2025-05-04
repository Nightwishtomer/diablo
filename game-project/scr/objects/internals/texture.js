import textureObjectData from "objects/data/textureObjectData";
import { Texture } from "pixi";
export class internalTexture {
  constructor(textureID){
    this._textureID = textureID; // ID Текстуры
    this._parameter = this._setTextureData();
    this._object = this._createTextureFromData();
    this._name = this._parameter.texture;
  }

  get id(){
    return this._textureID;
  }

  get cells(){
    return this._parameter.cells;
  }

  get dimensions(){
    return this._parameter.dimensions;
  }

  get sprite(){
    return this._object;
  }

  get name(){
    return this._name;
  }

  // Получение данных
  _setTextureData(){
    return textureObjectData[this._textureID];
  }

  // создание текстуры обьекта Sprite
  _createTextureFromData(){
    return Texture.from(this._parameter.texture);
  }

}