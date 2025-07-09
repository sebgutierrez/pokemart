import React from 'react';
import "../globals.css";
import Link from 'next/link'
import ShippingAddress from '../ui/checkout/ShippingAddress';
import { getSession } from '../session/util';
import { Prisma } from '@prisma/client';
import { getCartItems } from "../../prisma/api"

const Checkout = async () => {
	const session = await getSession();

	const trainerBalance = session.pokeDollars

	const cartWhere: Prisma.CartItemWhereInput = {
		trainerId: Number(session.userId)
	}

	const cartSelect: Prisma.CartItemSelect = {
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

	const error = cartItems.error ? cartItems.error : null

	const itemsMarkup = cartItems.data.map((item, index) => {
		return (
			<li className="" key={index}>{item.item.name} x {item.quantity}</li>
		)
	})

	return (
		<div className="flex flex-col gap-y-4">
			<div className="flex flex-col border-2 border-black">
				<span className="font-bold">Cart Summary</span>
				<Link href="/cart">(Edit)</Link>
				<ul>
					<li>Items</li>
					{ 
						error !== "" ? (
							itemsMarkup
						) : (
							<div className="">{error}</div>
						)
					}
					<li>Total</li>
					<li>${totalCost}</li>
				</ul>
			</div>
			<ShippingAddress></ShippingAddress>
			<div className="flex flex-col border-2 border-black"> 
				<span className="font-bold">Order Summary</span>
				<ul className="flex flex-col">
					<li>Subtotal ${totalCost}</li>
					<li>Shipping Free</li>
					<li>Total ${totalCost}</li>
					<li>Remaining Balance ${trainerBalance - totalCost}</li>
				</ul>
				<button>(Place Order)</button>
			</div>
		</div>
	)
}

export default Checkout;