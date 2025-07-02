import { Prisma } from '@prisma/client';
import { getItems } from '../../../prisma/api';
import { getSession } from "../../session/util";

const categorySelectOptions = ["Poké Ball", "Recovery Items", "Battle Items", "Vitamins", "Other Items"]
const sortSelectOptions = ["name-asc", "name-desc", "buyPrice-asc", "buyPrice-desc"]

export async function POST(request: Request) {

	const formData = await request.json();
	const categoryValue = formData.category
	if(!categoryValue){
		return Response.json({ error: "No category was submitted" })
	}
	let query: Prisma.ItemFindManyArgs
	if(!categorySelectOptions.includes(categoryValue)){
		return Response.json({ error: "Invalid category" })
	} else {
		query = {
			where: {
				category: categoryValue
			}
		}
	}
	const sortValue = formData.sort
	if(!formData.sort && !sortSelectOptions.includes(sortValue)){
		return Response.json({ error: "Invalid sorting method" })
	} else {
		const [sortField, sortMethod] = sortValue.split("-")
		query = {
			...query,
			orderBy: {
				[sortField]: sortMethod
			}
		}
	}

	const response = await getItems(query)
	if(response.error){
		return Response.json({ error: response.error })
	}

	const session = await getSession()

	return Response.json({ data: response.data, session: session })
}