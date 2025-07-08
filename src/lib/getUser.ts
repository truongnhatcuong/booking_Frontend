import axios from "axios";
import { URL_API } from "./fetcher";

export async function getUser() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    console.log(token);

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
