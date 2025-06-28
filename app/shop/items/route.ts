import { getItems } from '../../../prisma/api';

const categorySelectOptions = ["Poké Ball", "Recovery Items", "Battle Items", "Vitamins", "Other Items"]
const sortSelectOptions = ["name-asc", "name-desc", "buyPrice-asc", "buyPrice-desc"]

export async function POST(request: Request) {
	const formData = await request.json();
	const categorySelect = formData.category
	if(!categorySelect){
		throw new Error("No category was submitted")
	}
	const sortSelect = formData.sort
	const categoryValue = categorySelect
	const sortValue = sortSelect
	let query
	if(!categorySelectOptions.includes(categoryValue)){
		throw new Error("Invalid category")
	} else {
		query = {
			where: {
				category: categoryValue
			}
		}
	}
	if(sortSelect && !sortSelectOptions.includes(sortValue)){
		throw new Error("Invalid sorting method")
	} else {
		const [sortField, sortMethod] = sortValue.split("-")
		query = {
			...query,
			orderBy: {
				[sortField]: sortMethod
			}
		}
	}
	const items = await getItems(query)
	return Response.json(items)
}