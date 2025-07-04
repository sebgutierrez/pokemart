// Adapted from https://github.com/vvo/iron-session/blob/main/examples/next/src/app/app-router-client-component-redirect-route-handler-fetch/lib.ts
import { SessionOptions, getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  userId?: string;
  username: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  userId: "",
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

export async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.username = defaultSession.username;
    session.userId = defaultSession.userId;
  }

  return session;
}