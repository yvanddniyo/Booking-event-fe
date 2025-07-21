// src/utls/jwt.ts
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

export function getUserFromToken(): DecodedToken | null {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const decodedToken = jwtDecode<DecodedToken>(token);
  return decodedToken;
}