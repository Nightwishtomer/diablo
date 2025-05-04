import { Application, Assets, Sprite, Container, Text, formatShader, Texture, AnimatedSprite, Rectangle, Graphics, getMaxFragmentPrecision, autoDetectRenderer } from "pixi";



/**
 * Создание Контейнера
 * @param {string} label - Название Контейнера
 * @param {string} hitArea - Автор Контейнера
 * @param {boolean} interactive - Интерактивность Контейнера
 * @param {boolean} visible - Автор Контейнера
 * @param {string} author - Автор Контейнера
 * @param {string} author - Автор Контейнера
 * @param {string} author - Автор Контейнера
 */
//"make" in car
export function UIcreateContainer(param){
  console.warn("UI - create Container");
  const container = new Container(); // Контейнер

  if ( "label" in param ) { // label
    container.label = param.label + " Container";
  } else {
    container.label = "Container"
  }

  if ( "hitArea" in param ) { // hitArea
    if ( param.hitArea !== null ) {
      container.hitArea = param.hitArea;
    }
  }

  if ( "interactive" in param ) { // interactive
    container.interactive = param.interactive;
  } else {
    container.interactive = false;
  }

  if ( "visible" in param ) { // visible
    container.visible = param.visible;
  } else {
    container.visible = true;
  }

  return container;
}
/*
export function UIcreateContainer(label = "Container", hitArea = null, interactive = false, visible = true){
  console.warn("UI - create Container");
  const container = new Container(); // Контейнер главного меню
  container.label = label;
  if ( hitArea !== null ) {
    container.hitArea = hitArea;
  }
  container.interactive = interactive;
  container.visible = visible;
  
  return container;
}
*/
/**
 * Создание Спрайта
 * @param {string} label - Название Спрайта
 * @param {string} texture - Текстура Спрайта
 * @param {string} position - Позиция Спрайта
 * @param {string} dimensions - Размеры Спрайта
 * @param {string} anchor - Анхор Спрайта
 */
export function UIcreateSprite(param){
  console.warn("UI - create Sprite");
  const sprite = new Sprite();
  //label, texture, position, dimensions = null, anchor

  if ( "label" in param ) { // label
    sprite.label = param.label + " Sprite";
  } else {
    sprite.label = "Sprite";
  }

  if ( "texture" in param ) { // texture
    sprite.texture = param.texture;
  } else {
    sprite.texture = false;
  }

  if ( "position" in param ) { // position
    sprite.x = param.position.x;
    sprite.y = param.position.y;
  }

  if ( "dimensions" in param ) { // dimensions
    if (dimensions !== null) {
      sprite.width = dimensions.width;
      sprite.height = dimensions.height;
    }
  }

  if ( "anchor" in param ) { // anchor
    sprite.anchor.set(param.anchor[0], param.anchor[1]);
  }
  
  return sprite;
}

/*
export function UIcreateSprite(label, texture, position, dimensions = null, anchor){
  console.warn("UI - create Sprite");
  const sprite = new Sprite(texture); // Спрайт главного меню
  sprite.label = label;
  sprite.x = position.x;
  sprite.y = position.y;
  if (dimensions !== null) {
    sprite.width = dimensions.width;
    sprite.height = dimensions.height;
  }
  sprite.anchor.set(anchor[0], anchor[1]);

  
  return sprite;
}
*/