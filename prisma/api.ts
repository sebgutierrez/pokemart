import { Prisma } from '@prisma/client';
import  { prisma } from './prisma-client';

export async function getItems(query: Prisma.ItemFindManyArgs) {
	const items = await prisma.item.findMany({
		select: {
			name: true,
			category: true,
			description: true,
			debutGeneration: true,
			cssClass: true,
			buyPrice: true,	
		},
		where: {
			...query.where
		},
		orderBy: {
			...query.orderBy,
		}
	})
	return items
}

export async function signUp(query: Prisma.TrainerCreateInput){
	try {
		await prisma.trainer.create({
			data: {
				...query
			}
		})
	} catch (e) {
		if(e instanceof Prisma.PrismaClientKnownRequestError){
			if(e.code === "P2002"){
				return { error: "User already exists!"}
			}
		}
		return { error: "Unexpected error creating user. Please try again."}
	}
}