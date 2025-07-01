// Adapted from https://github.com/vvo/iron-session/blob/main/examples/next/src/app/app-router-client-component-redirect-route-handler-fetch/lib.ts
import { SessionOptions } from "iron-session";

export interface SessionData {
  username: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  username: "",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  // Private key
  password: process.env.SESSION_PASSWORD,
  cookieName: "pokemart-cookie-name",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};