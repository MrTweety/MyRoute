import * as Location from "expo-location";

export default enableNetworkProviderAsync = async () => {
  try {
    // A promise resolving as soon as the user accepts the dialog. Rejects if denied.
    await Location.enableNetworkProviderAsync();
  } catch (error) {
    return error.message;
  }

  return null;
};
