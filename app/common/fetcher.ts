import axios from "axios";
import { RALLY_API } from "./constants";

export const fetcher = (url: string) =>
  axios.get(RALLY_API + url).then((res) => res.data);
