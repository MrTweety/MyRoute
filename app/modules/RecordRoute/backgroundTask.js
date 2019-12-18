import { AsyncStorage } from "react-native";
import { locationEventsEmitter, taskEventName } from "./locationEventsEmitter";
import haversine from "../../services/haversine";
import {
  getSavedItemNotSecure,
  STORAGE_KEY_USER_COORDS,
  STORAGE_KEY_USER_DISTANCE
} from "../../services/storage";

export default async ({ data: { locations }, error }) => {
  if (error) {
    console.log("Error", error);
    return;
  }
  try {
    if (locations && locations.length > 0) {
      const savedLocations = await getSavedItemNotSecure(
        STORAGE_KEY_USER_COORDS
      );
      const savedDistance = await getSavedItemNotSecure(
        STORAGE_KEY_USER_DISTANCE
      );

      const newLocations = locations.map(({ coords, timestamp }) => ({
        ...coords,
        timestamp: timestamp
      }));
      // if (__DEV__)
      // console.log(`Received new locations at ${new Date()}:`, locations);

      endElement = savedLocations[savedLocations.length - 1]; // for distance

      savedLocations.push(...newLocations);

      //TODO: wydajniejszy algorytm
      const newUniqueLocations = [];
      const map = new Map();
      for (const item of savedLocations) {
        if (!map.has(item.timestamp)) {
          map.set(item.timestamp, true); // set any value to Map
          newUniqueLocations.push({
            ...item
          });
        }
      }

      const locationsForDistance = endElement
        ? [endElement, ...newLocations]
        : newLocations; // for distance

      if (savedDistance == null || savedDistance.length == 0) {
        distance = 0;
      } else {
        distance = parseFloat(savedDistance);
      }

      locationsForDistance.forEach((item, index, array) => {
        if (index + 1 < array.length) {
          distance += haversine(item, array[index + 1], { unit: "km" });
        }
      });

      await AsyncStorage.setItem(
        STORAGE_KEY_USER_COORDS,
        JSON.stringify(newUniqueLocations)
      ).catch(e => console.log("Error: ", e.message));

      await AsyncStorage.setItem(
        STORAGE_KEY_USER_DISTANCE,
        JSON.stringify(distance)
      ).catch(e => console.log("Error: ", e.message));

      locationEventsEmitter.emit(taskEventName, {
        savedLocations: newUniqueLocations,
        distance: distance
      });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
