import { Prisma } from '@prisma/client';
import { getItems } from '../../../prisma/api';
import { getSession } from "../../session/util";

const categorySelectOptions = ["Poké Ball", "Recovery Items", "Battle Items", "Vitamins", "Other Items"]
const sortSelectOptions = ["name-asc", "name-desc", "buyPrice-asc", "buyPrice-desc"]

export async function POST(request: Request) {

	const formData = await request.json();
	const categoryValue = formData.category

	let query: Prisma.ItemFindManyArgs = {}
	if(categorySelectOptions.includes(categoryValue) && categoryValue !== "All"){
		query = {
			where: {
				category: categoryValue
			}
		}
	}
	const sortValue = formData.sort
	if(sortSelectOptions.includes(sortValue)){
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