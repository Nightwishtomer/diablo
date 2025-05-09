import hardURLs from "hardURLs"; // hardURLs
export async function loadMenuData(file, menuName) {
  try {
    const response = await fetch(hardURLs.assets.data.ui.menu.menuLoader + file + ".json");

      if (!response.ok) throw new Error("Ошибка загрузки JSON");
      const result = await response.json();
      return await result[menuName];
  } catch (error) {
      console.error("Ошибка загрузки меню:", error);
      return null;
  }
}