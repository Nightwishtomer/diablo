// ui/menus/loadUserData.js
export async function loadUserData() {
  try {
    const response = await fetch("./game-project/data/user/userSaveData.json");
      if (!response.ok) throw new Error("Ошибка загрузки userSaveData.JSON");
      const result = await response.json();
      return await result;
  } catch (error) {
      console.error("Ошибка загрузки userSaveData.json :", error);
      return null;
  }
}