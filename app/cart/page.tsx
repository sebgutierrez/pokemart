import { Prisma } from '@prisma/client';
import React from 'react';
import "../globals.css";
import { getSession } from '../session/util';
import { getCartItems } from '../../prisma/api';
import CartContainer from '../ui/cart/CartContainer';

const CartPage = async () => {

	const session = await getSession()

	let cartWhere: Prisma.CartItemWhereInput = {
		trainerId: Number(session.userId)
	}

	let cartSelect: Prisma.CartItemSelect = {
		id: true,
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

	let totalCost = 0
	if(cartItems.data){
		totalCost = cartItems.data.reduce((acc, curr) => acc + curr.item.buyPrice * curr.quantity, 0)
	}

	let error = cartItems.error ? cartItems.error : null

	if(error){
		return (
			<div className="">
				<p className="text-lg">{error}</p>			
			</div>
		)
	}

	return (
		<div className="">
			<CartContainer cartItems={cartItems} totalCost={totalCost} />
		</div>
	)
}

export default CartPage;