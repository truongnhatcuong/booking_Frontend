import { LocalStorageExpiry } from "localstorage-expiry";
import axios from "./axios";

export const fetcher = async (url: string) => {
  const lsExpiry = new LocalStorageExpiry();
  const token = lsExpiry.get("token");
  const res = await axios.get(url, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const URL_API = process.env.NEXT_PUBLIC_URL_API;
