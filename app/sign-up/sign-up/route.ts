
import { signUp } from '../../../prisma/api';
import { genSalt, hash } from "bcrypt-ts";

async function usernameValidator(username: string): Promise<string[]> {
	let errors = []
	if(username.length <= 4){
		errors.push("Username must be longer than 4 characters")
	}
	let unicode, i, len
	for(i = 0, len = username.length; i < length; i++){
		unicode = username.charCodeAt(i)
		if (!(unicode > 47 && unicode < 58) && // (0-9)
			!(unicode > 64 && unicode < 91) && // (A-Z)
			!(unicode > 96 && unicode < 123)) { // (a-z)
			errors.push("Username must be alphanumeric")
			break
   		}
	}
	return errors
}

async function passwordValidator(password: string): Promise<string[]>{
	let errors = []
	if(password.length <= 4){
		errors.push("Password must be longer than 4 characters")
	}
	let unicode, i, len
	for(i = 0, len = password.length; i < length; i++){
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
		Response.json({ 
			error: {
				username: "No username was submitted" 
			}
		})
	}
	let usernameErrors = await usernameValidator(username)
	if(usernameErrors.length != 0){
		Response.json({ 
			error: {
				username: usernameErrors
			}
		})
	}
	const password = formData.password
	if(!password){
		Response.json({ 
			error: {
				password: "No password was submitted"
			}
		})
	}
	let passwordErrors = await passwordValidator(password)
	if(passwordErrors.length != 0){
		Response.json({ 
			error: {
				password: passwordErrors
			}
		})
	}

	const salt = await genSalt(10)
	const hashedPassword = await hash(password, salt)

	const response = await signUp({
		username: username,
		password: hashedPassword
	})

	if(response && response.error){
		return Response.json({ error: response.error })
	}
	return Response.json({ data: response })
}