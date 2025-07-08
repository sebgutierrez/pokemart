import { fetchTrainer } from "../../../prisma/api";
import { compare } from "bcrypt-ts";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "../../session/util";
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

	const trainer = await fetchTrainer({
		where: {
			username: username
		}
	})

	if(trainer.error){
		return Response.json({ 
			error: {
				username: [trainer.error]
			}
		})
	}

	const isCorrectPassword = await compare(password, trainer?.data?.password as string)

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
	session.userId = trainer?.data?.id.toString()
	session.pokeDollars = trainer?.data?.pokeDollars

	await session.save()

	return Response.json({ url: "/shop" })
}