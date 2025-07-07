import axios from "./axios";

export const fetcher = (url: string | undefined) =>
  axios.get(url || "", { withCredentials: true }).then((res) => res.data);

export const URL_API = process.env.NEXT_PUBLIC_URL_API;
