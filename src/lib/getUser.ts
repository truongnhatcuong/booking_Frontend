import axios from "axios";
import { URL_API } from "./fetcher";

export async function getUser() {
  try {
    if (typeof window === "undefined") {
      return null;
    }

    // Import localstorage-with-expire chỉ khi ở client
    const localstorage = (await import("localstorage-with-expire")).default;

    const token = localstorage.get("token");
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
