import { Treasure } from "../types/user";
import api from "./api";

export class UserService {
  async registerUser(name: string, email: string, password: string) {
    try {
      const response = await api.post("/api/auth/register", {
        name,
        email,
        password,
      });
      return response.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      return response.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async addTreasure(id: string, treasure: Treasure) {
    try {
      const response = await api.post(`/api/users/${id}/rewards`, treasure);
      return response.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
