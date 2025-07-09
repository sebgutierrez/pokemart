import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "../../session/util";
import { SessionData } from "../../session/util";
import { redirect } from 'next/navigation'

export async function POST(request: NextRequest) {
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