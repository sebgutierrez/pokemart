import { Prisma } from '@prisma/client';
import  { prisma } from './prisma-client';

type ItemQueryParams = {
	where: Prisma.ItemWhereInput
	orderBy: Prisma.ItemOrderByWithRelationInput[] 
}

export async function getItems(queryParams: ItemQueryParams) {
	let items
	try {
		items = prisma.item.findMany({
			select: {
				name: true,
				category: true,
				description: true,
				debutGeneration: true,
				cssClass: true,
				buyPrice: true,	
			},
			where: {
				...queryParams.where
			},
			orderBy: [
				...queryParams.orderBy,
			]
		})
	} catch (error) {
		throw new Error("Failed to fetch items.")
	}
	return items;
}