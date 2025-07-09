import axios from "axios";
import { URL_API } from "./fetcher";
import { get } from "localstorage-with-expire";

export async function getUser() {
  try {
    const token = get("token");
    if (!token) return null;

    const res = await axios.get(`${URL_API}/api/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    return null;
  }
}
