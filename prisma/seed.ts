import { prisma } from "./prisma-client"
import { Prisma } from '@prisma/client';
import fsPromises from "fs/promises"
import path from "path";

async function seed(){

	let seedData
	const currDir = process.cwd();
	try {
		const jsonData = await fsPromises.readFile(path.join(currDir,'prisma','items.json'), 'utf8');
		seedData = JSON.parse(jsonData);
	} catch (err) {
		console.error("Error:", err);
	}

	await Promise.all(
		seedData.items.map(async (item: Prisma.ItemCreateInput) => {
			await prisma.item.create({
				data: {
					...item
				}
			})
		})
	)
};
seed()
  .then(async () => {
	await prisma.$disconnect()
  })
  .catch(async (e) => {
	console.error(e)
	await prisma.$disconnect()
	process.exit(1)
  })