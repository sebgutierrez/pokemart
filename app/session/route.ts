// Adapted from: https://github.com/vvo/iron-session/blob/main/examples/next/src/app/app-router-client-component-route-handler-swr/session/route.ts

import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "./util";
import { SessionData } from "./util";
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)

  const action = new URL(request.url).searchParams.get("action")
  if (action === "logout") {
    session.destroy()
	redirect("/")
  }

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession)
  }

  return Response.json(session)
}