import { createTrainer } from '../../../prisma/api';
import { genSalt, hash } from "bcrypt-ts";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "../../session/util";
import { SessionData } from "../../session/util";
import { redirect } from "next/navigation"

async function usernameValidator(username: string): Promise<string[]> {
	let errors = []
	if(username.length <= 2){
		errors.push("Trainer name must be longer than 2 characters")
	}
	let unicode, i, len
	for(i = 0, len = username.length; i < len; i++){
		unicode = username.charCodeAt(i)
		if (!(unicode > 47 && unicode < 58) && // (0-9)
			!(unicode > 64 && unicode < 91) && // (A-Z)
			!(unicode > 96 && unicode < 123)) { // (a-z)
			errors.push("Trainer name must be alphanumeric")
			break
   		}
	}
	return errors
}

async function passwordValidator(password: string): Promise<string[]>{
	let errors = []
	if(password.length <= 3){
		errors.push("Password must be longer than 3 characters")
	}
	let unicode, i, len
	for(i = 0, len = password.length; i < len; i++){
		unicode = password.charCodeAt(i)
		if (!(unicode > 47 && unicode < 58) && // (0-9)
			!(unicode > 64 && unicode < 91) && // (A-Z)
			!(unicode > 96 && unicode < 123)) { // (a-z)
			errors.push("Password must be alphanumeric")
			break
   		}
	}
	// Bcrypt has a maximum password input size of 72 bytes or else it will truncate it
	if(Buffer.byteLength(password, "utf8") > 72) {
		errors.push("Password is too long")
	}
	return errors
}

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
	let usernameErrors = await usernameValidator(username)
	if(usernameErrors.length != 0){
		return Response.json({ 
			error: {
				username: usernameErrors
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
	let passwordErrors = await passwordValidator(password)
	if(passwordErrors.length != 0){
		return Response.json({ 
			error: {
				password: passwordErrors
			}
		})
	}

	const salt = await genSalt(10)
	const hashedPassword = await hash(password, salt)

	const trainer = await createTrainer({
		username: username,
		password: hashedPassword
	})

	if(trainer.error !== undefined){
		return Response.json({ 
			error: {
				username: [trainer.error] 
			}
		})
	}

	const session = await getIronSession<SessionData>(await cookies(), sessionOptions)

	session.isLoggedIn = true
	session.username = username
	session.userId = trainer.data.id.toString()

	await session.save()

	return Response.json({ url: "/shop" })
}