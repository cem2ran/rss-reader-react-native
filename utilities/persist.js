// @flow
import { AsyncStorage } from "react-native";

import DEFAULT_SOURCES from "../constants/Sources";

const SOURCES_KEY = "@Mainstream:sources";

export const persistSources = async (sources: Object) =>
  persist(SOURCES_KEY, sources);

export const loadSources = async () => load(SOURCES_KEY, DEFAULT_SOURCES);

async function load(key, defaultValue) {
  try {
    const data = await AsyncStorage.getItem(key).then(JSON.parse);
    return data !== null ? data : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

async function persist(key, data) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
}
