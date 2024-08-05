import axios from "axios";
import { RALLY_API } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getAxios() {
  const authorization = await AsyncStorage.getItem("Authorization");
  console.log("auth", authorization);

  return axios.create({
    baseURL: RALLY_API,
    headers: {
      ...(authorization ? { Authorization: `Bearer ${authorization}` } : {}),
    },
  });
}
