import { Treasure } from "../store/slices/treasuresSlice";
import api from "./api";

export class TreasureService {
  async getTreasures() {
    try {
      const response = await api.get(`/api/treasures`);
      const { treasures } = await response.data;
      return treasures;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
  async addTreasure(treasure: Treasure) {
    try {
      const response = await api.post(`/api/treasures`, treasure);
      const newTreasure = await response.data;
      return newTreasure;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
