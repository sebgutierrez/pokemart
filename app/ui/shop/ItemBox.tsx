"use client";
import React, { useRef } from 'react';
import { ItemDisplayProps } from "../types/shop";

const ItemDisplay = ({ item, session }: ItemDisplayProps) => {
	const cartButton = useRef({
		quantity: 0
	}) 

	async function onInputChange(e: React.ChangeEvent<HTMLInputElement>){
		cartButton.current = {
			...cartButton.current,
			quantity: Number(e.target.value)
		}
		console.log(cartButton.current)
	}

	async function addToCart(){
		if(session.isLoggedIn !== true){
			return
		}
		fetch('/cart/items/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"itemId": item.id,
				"quantity": cartButton.current.quantity
			}),
		})
		.then((res) => res.json())
		.then((res) => {
		})
		.catch((error) => {
			console.error("Error adding item to cart: ", error)
		})
	}

	return (
		<div className="flex w-full gap-x-4 border-2 border-red-500 px-8 py-4">
			<div className="w-full flex flex-col border-black rounded-md">
				<div className="w-full border-2 border-black pl-2 py-3 rounded-lg">{item.name}</div>
				<div className="border-2 border-black flex justify-center items-center">
					<div className="relative w-[60px] h-[60px] pl-[12px] pt-[12px] border-2 border-black rounded-full">
						<div className={"pkspr-" + item.cssClass + " scale-200"}></div>
					</div>
				</div>
				<div className="border-2 border-black">
					<div className="">{item.description}</div>
					<div className="">{item.category}</div>
					<div className="">{item.debutGeneration}</div>
					<div className="">{item.buyPrice}</div>
				</div>
				<div className="flex">
					<label htmlFor="add-to-cart">Qty:</label>
					<input name="add-to-cart" id="add-to-cart" type="number" onChange={onInputChange}/>
					<button onClick={addToCart}>Add to Cart</button>
				</div>
			</div>
		</div>
	)
}
export default ItemDisplay