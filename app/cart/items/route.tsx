import { Prisma } from '@prisma/client';
import { getCartItem, getCartItems, updateCartItem, deleteCartItem, createCartItem } from '../../../prisma/api';
import { getSession } from "../../session/util";
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {

	const formData = await request.json()
	const formQuantity = await formData.quantity
	const formItemId = await formData.itemId

	const session = await getSession()
	if(!session.isLoggedIn){
		return Response.json({ error: "You must be logged in to add items to your cart." })
	}

	const getCartItemQuery: Prisma.CartItemFindFirstArgs = {
		select: {
			id: true,
			quantity: true
		},
		where: {
			itemId: formItemId,
			trainerId: Number(session.userId)
		}
	}

	const existingCartItem = await getCartItem(getCartItemQuery)
	
	if(existingCartItem.error){
		return Response.json({ error: existingCartItem.error })
	}
	
	if(existingCartItem.data && Number(formQuantity) === 0){

		const deleteCartItemQuery: Prisma.CartItemDeleteArgs = {
			where: {
				id: existingCartItem.data.id,
				itemId: Number(formItemId)
			}
		}

		const cartItem = await deleteCartItem(deleteCartItemQuery)

		if(cartItem.error){
			return Response.json({ error: cartItem.error })
		}

		revalidatePath('/cart')
		return Response.json({ revalidated: true, data: cartItem.data })
	}
	
	if(existingCartItem.data){

		const updateCartItemQuery: Prisma.CartItemUpdateArgs = {
			select: {
				id: true,
				quantity: true
			},
			where: {
				id: existingCartItem.data.id
			},
			data: {
				quantity: formQuantity
			}
		}

		const cartItem = await updateCartItem(updateCartItemQuery)

		if(cartItem.error){
			return Response.json({ error: cartItem.error })
		}

		return Response.json({ data: cartItem.data })
	}	

	const createCartItemQuery: Prisma.CartItemCreateArgs = {
		select: {
			id: true,
			quantity: true
		},
		data: {
			quantity: formQuantity,
			itemId: formItemId,
			trainerId: Number(session.userId),
		}
	}
	const cartItem = await createCartItem(createCartItemQuery)
	
	if(cartItem.error){
		return Response.json({ error: cartItem.error })
	}

	return Response.json({ data: cartItem.data })
}

export async function GET(){
	const session = await getSession()

	const cartWhere: Prisma.CartItemWhereInput = {
		trainerId: Number(session.userId)
	}

	const cartSelect: Prisma.CartItemSelect = {
		quantity: true,
		item: {
			select: {
				id: true,
				name: true,
				buyPrice: true,
				sellPrice: true,
				cssClass: true
			}
		}
	}

	const cartItems = await getCartItems(cartWhere, cartSelect)

	if(cartItems.error){
		return Response.json({ error: cartItems.error })
	}

	return Response.json({ data: cartItems.data })
}