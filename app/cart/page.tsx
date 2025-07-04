import { Prisma } from '@prisma/client';
import React from 'react';
import "../globals.css";
import { getSession } from '../session/util';
import { getCartItems } from '../../prisma/api';
import CartItemList from '../ui/cart/CartItemList';

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
			<CartItemList cartItems={cartItems} />
		</div>
	)
}

export default CartPage;