import { prisma } from "./prisma-client"
import { Prisma } from '@prisma/client';
import fsPromises from "fs/promises"
import path from "path";

async function devSeed(){

	await prisma.item.deleteMany()
	await prisma.trainer.deleteMany()
	await prisma.itemBag.deleteMany()

	let seedData
	const currDir = process.cwd();
	try {
		const jsonData = await fsPromises.readFile(path.join(currDir,'prisma','dev-seed.json'), 'utf8');
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
	await Promise.all(
		seedData.trainers.map(async (trainer: Prisma.TrainerCreateInput) => {
			await prisma.trainer.create({
				data: {
					...trainer
				}
			})
		})
	)
	await Promise.all(
		seedData.itemBags.map(async (itemBag: Prisma.ItemBagCreateInput) => {
			await prisma.itemBag.create({
				data: {
					...itemBag
				}
			})
		})
	)
};
devSeed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })