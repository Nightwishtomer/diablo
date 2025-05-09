import { Assets } from "pixi";
import { app } from "index";
import Settings from "settings";
import hardURLs from "hardURLs"; // hardURLs

/**
 * Получение данных из памяти по типу и номеру
 * @param {string} cursorName - Имя текстуры
 * @example 
 * loadCursor("objcurs_110.png");
 */
export async function loadCursor(cursorName = Settings.cursor.default) {
    // Загружаем JSON и спрайт-лист
    const [cursorData, spriteBase] = await Promise.all([
      Assets.load(hardURLs.data.ui.cursor.cursor),
      Assets.load(hardURLs.assets.images.items.objcurs),
    ]);

    if (!cursorData[cursorName]) {
      console.error(`Курсор "${cursorName}" не найден в JSON`);
      return;
    }
    //const { x, y, width, height, hotspotX, hotspotY } = cursorData[cursorName];
    let { x, y, width, height, hotspotX, hotspotY } = cursorData[cursorName];
    hotspotX = 0;
    hotspotY = 0;
    // Создаём canvas, чтобы получить Data URL
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = spriteBase.source.label;
    img.onload = () => {
      ctx.drawImage(img, -x, -y); // Вырезаем нужную область
      const cursorUrl = canvas.toDataURL("image/png");
      //console.warn("Устанавливаем новый курсор: " + cursorName)
      // Устанавливаем курсор
      app.renderer.events.cursorStyles[cursorName] = `url(${cursorUrl}) ${hotspotX} ${hotspotY}, auto`;
      app.renderer.events.setCursor(cursorName);
      app.renderer.events.cursorStyles.default = `url(${cursorUrl}) ${hotspotX} ${hotspotY}, auto`;
    };
}