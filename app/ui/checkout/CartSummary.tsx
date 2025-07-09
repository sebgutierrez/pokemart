import React from 'react';
import Link from 'next/link'

const CartSummary = async ({ totalCost, cartItems, error }) => {

	const itemsMarkup = cartItems.data.map((item, index) => {
		return (
			<li className="" key={index}>{item.item.name} x {item.quantity}</li>
		)
	})

	return (
		<div className="flex flex-col border-2 border-black">
			<span className="font-bold">Cart Summary</span>
			<Link href="/cart">(Edit)</Link>
			<ul>
				<li>Items</li>
				{ 
					error !== "" ? (
						itemsMarkup
					) : (
						null
					)
				}
				<li>Total</li>
				<li>${totalCost}</li>
			</ul>
		</div>
	)
}

export default CartSummary;