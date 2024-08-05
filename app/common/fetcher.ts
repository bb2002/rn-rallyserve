import axios from "axios";
import { RALLY_API } from "./constants";
import { AuthorizationToken } from "./getAxios";

export const fetcher = (url: string) =>
  axios
    .get(RALLY_API + url, {
      headers: {
        ...(AuthorizationToken
          ? { Authorization: `Bearer ${AuthorizationToken}` }
          : {}),
      },
    })
    .then((res) => res.data);
