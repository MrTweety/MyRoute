import { AsyncStorage } from "react-native";

export const STORAGE_KEY_USER_ROUTERS = "STORAGE_KEY_USER_ROUTERS";
export const STORAGE_KEY_USER_COORDS = "BACKGROUND_LOCATION_USER_COORDS";
export const STORAGE_KEY_USER_DISTANCE = "BACKGROUND_LOCATION_USER_DISTANCE";
export const STORAGE_KEY_USER_TIME = "BACKGROUND_LOCATION_USER_TIME";

export async function getSavedItemNotSecure(Key, nullIfEmpty = false) {
  try {
    const item = await AsyncStorage.getItem(Key);
    return item ? JSON.parse(item) : nullIfEmpty ? null : [];
  } catch (e) {
    console.log("Error: ", e.message);
    return [];
  }
}
