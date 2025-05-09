import hardURLs from "hardURLs"; // hardURLs
// загрузка данных
export async function LoadData(type = false, file = false) {
  if(!type || !file) return false;
  try {
      const response = await fetch(hardURLs.assets.data.ui.menu.loadData + type + "/" + file + ".json");
      if (!response.ok) {
          throw new Error(`Ошибка загрузки: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Ошибка при загрузке стартовых характеристик:", error);
      return null;
  }
}
