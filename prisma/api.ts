import { Prisma } from '@prisma/client';
import  { prisma } from './prisma-client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export async function getItems(query: Prisma.ItemFindManyArgs) {
	try {
		const items = await prisma.item.findMany({
			select: {
				id: true,
				name: true,
				category: true,
				description: true,
				debutGeneration: true,
				cssClass: true,
				buyPrice: true,	
			},
			...query
		})
		return { data: items }
	} catch (e) {
		return { error: "Unexpected error occured fetching items. Please try again."}
	}
}

export async function createTrainer(query: Prisma.TrainerCreateInput){
	try {
		const trainer = await prisma.trainer.create({
			select: {
				id: true
			},
			data: {
				...query
			}
		})
		return { data: trainer }
	} catch (e) {
		if(e instanceof Prisma.PrismaClientKnownRequestError){
			if(e.code === "P2002"){
				return { error: "Trainer already exists!"}
			}
		}
		return { error: "Unexpected error occurred creating trainer. Please try again."}
	}
}

export async function fetchTrainer(query: Prisma.TrainerFindUniqueArgs) {
	try {
		const trainer = await prisma.trainer.findUnique({
			select: {
				id: true,
				password: true
			},
			where: {
				username: query.where.username
			}
		})
		return trainer ? { data: trainer } : { error: "Trainer does not exist." }
	} catch (e) {
		return { error: "Unexpected error fetching trainer. Please try again."}
	}
}

export async function createCartItem(query: Prisma.CartItemCreateArgs) {
	try {
		const cartItem = await prisma.cartItem.create({
			...query
		})
		return { data: cartItem }
	} catch (e) {
		return { error: "Unexpected error occurred adding item to cart. Please try again."}
	}
}

export async function updateCartItem(query: Prisma.CartItemUpdateArgs){
	try {
		const updatedCartItem = await prisma.cartItem.update({
			...query
		})
		return { data: updatedCartItem }
	} catch (e) {
		return { error: "Unexpected error occurred updating item. Please try again." }
	}
}

export async function getCartItem(query: Prisma.CartItemFindFirstArgs){
	try {
		const cartItemId = await prisma.cartItem.findFirst({
			...query
		})
		return { data: cartItemId }
	} catch (e) {
		return { error: "Unexpected error occurred fetching cart item. Please try again." }
	}
}

export async function getCartItems(
	where: Prisma.CartItemWhereInput,
	select: Prisma.CartItemSelect
) {
	try {
		const cartItems = await prisma.cartItem.findMany({
			where: {
				...where
			},
			select: {
				...select
			}
		})
		return { data: cartItems }
	} catch (e) {
		return { error: "Unexpected error occurred fetching cart items. Please try reloading the page."}
	}
}

export async function deleteCartItem(query: Prisma.CartItemDeleteArgs){
	try {
		const deletedCartItem = await prisma.cartItem.delete({
			...query
		})
		return { data: deletedCartItem }
	} catch (e) {
		return { error: "Unexpected error occurred removing item. Please try again." }
	}
}
