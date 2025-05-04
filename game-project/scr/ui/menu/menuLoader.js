// ui/menus/menuLoader.js
export async function loadMenuData(file, menuName) {
  try {
    console.log("./game-project/data/ui/menu/" + file + ".json     -> " + menuName);
    const response = await fetch("./game-project/data/ui/menu/" + file + ".json");

      if (!response.ok) throw new Error("Ошибка загрузки JSON");
      const result = await response.json();
      return await result[menuName];
  } catch (error) {
      console.error("Ошибка загрузки меню:", error);
      return null;
  }
}