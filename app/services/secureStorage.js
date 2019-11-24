import * as SecureStore from "expo-secure-store";

export const SAVED_LANGUAGE = "SAVED_LANGUAGE";

export async function getSavedItem(Key) {
  return await SecureStore.getItemAsync(Key).catch(error => {
    console.log("Secure item get error: ", error);
  });
}

export function setSaveItem(Key, value) {
  SecureStore.setItemAsync(Key, value).catch(error => {
    console.log("Secure item set error: ", error);
  });
}
