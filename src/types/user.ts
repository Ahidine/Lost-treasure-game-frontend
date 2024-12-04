export type Treasure = {
  name: string;
  date: string;
  attempts: number;
  id?: string;
};

export type User = {
  id: string | null;
  loading: boolean;
  error: string | null;
  name: string | null;
  token: string | null;
  treasures: Treasure[];
  email: string | null;
  isAuthenticated: boolean;
};
