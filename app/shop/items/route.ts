
import { Prisma } from '@prisma/client';
import { getItems } from '../../../prisma/api';

const categories = ["Poké Ball", "Recovery Items", "Battle Items", "Vitamins", "Other Items"]
const orderByMethods = ["asc", "desc"]

export async function POST(request: Request) {
	const formData = await request.json();
	const categoryRaw = formData.category
	const nameRaw = formData.name
	const priceRaw = formData.price
	if(!categoryRaw || !nameRaw || !priceRaw){
		throw new Error("No category, name, or price data was submitted")
	}
	const category = categoryRaw as string
	const orderByNameMethod = nameRaw as Prisma.SortOrder
	const orderByPriceMethod = priceRaw as Prisma.SortOrder
	if(!categories.includes(category)){
		throw new Error("Category does not exist")
	}
	if(!orderByMethods.includes(orderByNameMethod)){
		throw new Error("Name sorting method does not exist")
	}
	if(!orderByMethods.includes(orderByPriceMethod)){
		throw new Error("Price sorting option does not exist")
	}
	const items = await getItems({
		where: {
			category: category
		},
		orderBy: [
			{
				name: orderByNameMethod
			},
			{
				buyPrice: orderByPriceMethod
			}
		]
	})
	return Response.json(items)
}