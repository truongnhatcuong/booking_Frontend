import axios from "axios";
import { URL_API } from "./fetcher";

export async function getUser() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return (location.href = "/");

    const res = await axios.get(`${URL_API}/api/auth/user`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error: any) {
    return (location.href = "/");
  }
}
