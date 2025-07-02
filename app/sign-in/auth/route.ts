import { fetchTrainerHash } from "../../../prisma/api";
import { compare } from "bcrypt-ts";
import { redirect } from "next/navigation"
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "../../session/util";
import { SessionData } from "../../session/util";

export async function POST(request: Request) {
	const formData = await request.json();
	const username = formData.username
	if(!username){
		return Response.json({ 
			error: {
				username: ["No trainer name was submitted"] 
			}
		})
	}
	const password = formData.password
	if(!password){
		return Response.json({ 
			error: {
				password: ["No password was submitted"]
			}
		})
	}

	const response = await fetchTrainerHash({
		where: {
			username: username
		}
	})

	if(response.error){
		return Response.json({ 
			error: {
				username: [response.error]
			}
		})
	}

	const isCorrectPassword = await compare(password, response.data as string)

	if(!isCorrectPassword){
		return Response.json({ 
			error: {
				password: ["Incorrect password"]
			}
		})
	}

	const session = await getIronSession<SessionData>(await cookies(), sessionOptions)

	session.isLoggedIn = true
	session.username = username

	await session.save()

	return Response.json({ url: "/shop" })
}