"use client";
import React, { useState } from 'react';
import "../../../public/spritesheet-32x32.css"
import { Prisma } from '@prisma/client';

// TODO: replace any with proper type
const CartItem = ({ cartItem, cart, setCart }: any ) => {
	const [loading, setLoading] = useState(false)
	const [updatedCartItem, setUpdatedCartItem] = useState(cartItem)

	async function changeQuantity(quantity: number, operator: string){
		setLoading(true)
		const newQuantity = operator === "+" ? updatedCartItem.quantity + 1 : updatedCartItem.quantity - 1
		fetch('/cart/items/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"itemId": updatedCartItem.item.id,
				"quantity": newQuantity
			})
		})
		.then((res) => res.json())
		.then((res) => {
			if(newQuantity > 0){
				setUpdatedCartItem({
					...updatedCartItem,
					quantity: res.data.quantity
				})
			} else {
				const filteredCartItems = cart.data.filter((cartItem: any) => { return cartItem.id !== res.data.id })
				setCart({ data: filteredCartItems })
			}
		})
		setLoading(false)
	}

	if(loading){
		return <div className="text-lg">Loading...</div>
	}

	const className = "pkspr-" + updatedCartItem.item.cssClass + " scale-150"

	return (
		<li className="flex items-center gap-x-2 relative w-full" key={updatedCartItem.id}>
			<div className="flex w-full justify-between px-2 items-center py-1 border-2 border-black rounded-full ">
				<div className="flex items-center">
					<div className="relative w-[40px] h-[40px] pl-[2px] pt-[2px] border-2 border-black rounded-full">
						<div className={className}></div>
					</div>
					<div className="text-[20px] pl-2">{updatedCartItem.item.name}</div>
				</div>
				<div className="flex px-2">
					<button className="p-2" onClick={() => changeQuantity(cartItem.quantity, "+")}>+</button>
					<button className="p-2" onClick={() => changeQuantity(cartItem.quantity, "-")}>-</button>
				</div>
				<div className="flex gap-x-1.5">
					<div className="text-[20px]">{updatedCartItem.item.buyPrice}</div>
					<div className="text-[20px] pr-2">x {updatedCartItem.quantity}</div>
				</div>
			</div>
		</li>
  	);
};

export default CartItem;