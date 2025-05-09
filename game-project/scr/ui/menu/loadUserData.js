import hardURLs from "hardURLs"; // hardURLs
export async function loadUserData() {
  try {
    const response = await fetch(hardURLs.assets.data.ui.menu.loadUserData);
      if (!response.ok) throw new Error("Ошибка загрузки userSaveData.JSON");
      const result = await response.json();
      return await result;
  } catch (error) {
      console.error("Ошибка загрузки userSaveData.json :", error);
      return null;
  }
}