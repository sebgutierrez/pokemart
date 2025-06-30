import { Prisma } from '@prisma/client';
import { getItems } from '../../../prisma/api';

const categorySelectOptions = ["Poké Ball", "Recovery Items", "Battle Items", "Vitamins", "Other Items"]
const sortSelectOptions = ["name-asc", "name-desc", "buyPrice-asc", "buyPrice-desc"]

export async function POST(request: Request) {
	const formData = await request.json();
	const categoryValue = formData.category
	if(!categoryValue){
		Response.json({ error: "No category was submitted" })
	}
	let query
	if(!categorySelectOptions.includes(categoryValue)){
		Response.json({ error: "Invalid category" })
	} else {
		query = {
			where: {
				category: categoryValue
			}
		}
	}
	const sortValue = formData.sort
	if(!formData.sort && !sortSelectOptions.includes(sortValue)){
		Response.json({ error: "Invalid sorting method" })
	} else {
		const [sortField, sortMethod] = sortValue.split("-")
		query = {
			...query,
			orderBy: {
				[sortField]: sortMethod
			}
		}
	}
	const items = await getItems(query as Prisma.ItemFindManyArgs)
	return Response.json({ data: items })
}