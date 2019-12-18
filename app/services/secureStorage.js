import * as SecureStore from "expo-secure-store";

export const SAVED_LANGUAGE = "SAVED_LANGUAGE";
export const SAVED_JWT_TOKEN = "SAVED_JWT_TOKEN2";
export const ROUTES_PHOTOS = "ROUTES_PHOTOS";

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

export function deleteSavedItem(Key) {
  SecureStore.deleteItemAsync(Key).catch(error => {
    console.log("Secure item delete error: ", error);
  });
}

export async function addItemToKey(Key, value) {
  let savedItems = JSON.parse(await getSavedItem(Key));
  if (savedItems !== null) {
    savedItems.push(value);
    setSaveItem(Key, JSON.stringify(savedItems));
  } else {
    setSaveItem(Key, JSON.stringify([value]));
  }
}
