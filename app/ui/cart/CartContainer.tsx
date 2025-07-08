"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import CartItem from "./CartItem";

// TODO: replace any with proper type
const CartItemContainer = ({ pokeDollars, cartItems, totalCost, totalQuantities }: any ) => {
	const [cart, setCart] = useState(cartItems)
	const [currentTotal, setCurrentTotal] = useState(totalCost)
	const [currentQuantities, setCurrentQuantities] = useState(totalQuantities)

	if (cart.data.length === 0) {
		return <div className="text-lg">Your shopping cart is empty.</div>
	}

	const cartItemsList = cart.data.map((item: any, index: number) => {
		return (
			<CartItem 
				key={index} 
				cart={cart} 
				cartItem={item} 
				setCart={setCart} 
				setCurrentTotal={setCurrentTotal} 
				setCurrentQuantities={setCurrentQuantities}
			/>
		)
	})

	const remainingBalance = pokeDollars - currentTotal

	return (
		<div className="mx-12 my-8">
			<ul className=" flex flex-col w-full gap-y-2">{cartItemsList}</ul>
			<div className="text-right">
				Total ${currentTotal}
			</div>
			<div className="text-right">
				Remaining Balance ${remainingBalance}
			</div>
			<div className="flex justify-end">
				{ 
					remainingBalance > 0 ? (
						<button className="px-3 py-2 rounded-full bg-blue-600 text-white">
							<Link href="/checkout">Checkout ({currentQuantities}) items</Link>
						</button>
					) : (
						<button className="px-3 py-2 rounded-full bg-blue-600 text-white cursor-not-allowed">
							<p>Insufficient funds!</p>
						</button>
					)
				}
			</div>
		</div>
	);
};

export default CartItemContainer;