import { Prisma } from '@prisma/client';
import  { prisma } from './prisma-client';

export async function getItems(query: Prisma.ItemFindManyArgs) {
	try {
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
		return { data: items }
	} catch (e) {
		return { error: "Unexpected error occured fetching items. Please try again."}
	}
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
				return { error: "Trainer already exists!"}
			}
		}
		return { error: "Unexpected error occurred creating trainer. Please try again."}
	}
}

export async function fetchTrainerHash(query: Prisma.TrainerFindUniqueArgs) {
	try {
		const trainerHash = await prisma.trainer.findUnique({
			select: {
				password: true
			},
			where: {
				username: query.where.username
			}
		})
		return trainerHash ? { data: trainerHash.password } : { error: "Trainer does not exist." }
	} catch (e) {
		return { error: "Unexpected error fetching trainer. Please try again."}
	}
}