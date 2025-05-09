import hardURLs from "hardURLs"; // hardURLs
// загрузка данных
export async function LoadData(file = false) {
  if(!file) return false;
  try {
      const response = await fetch(hardURLs.assets.data.objects.json + file + ".json");
      if (!response.ok) {
          throw new Error(`Ошибка загрузки объектов: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Ошибка при загрузке объектов:", error);
      return null;
  }
}
