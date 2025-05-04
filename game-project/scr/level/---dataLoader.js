// game-project/scr/level/dataLoader.js
export async function loadLevelData(file, menuName) {
  console.log("loadLevelData loadLevelData loadLevelData loadLevelData loadLevelData loadLevelData");
  try {
    console.log("./game-project/data/level/" + file + ".json     -> " + menuName);
    const response = await fetch("./game-project/data/level/" + file + ".json");

      if (!response.ok) throw new Error("Ошибка загрузки JSON");
      const result = await response.json();
      return await result[menuName];
  } catch (error) {
      console.error("Ошибка загрузки меню:", error);
      return null;
  }
}