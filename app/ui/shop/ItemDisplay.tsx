"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ItemDisplayProps } from "../types/shop";

const ItemDisplay = ({ item, session }: ItemDisplayProps) => {
	const [checkOut, setCheckOut] = useState(false)
	const [notification, setNotification] = useState("")
	const cartButton = useRef({
		quantity: 0
	}) 

	async function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>){
		// Don't change on default checked option
		if(e.target.selectedIndex !== 0){
			cartButton.current = {
				...cartButton.current,
				quantity: Number(e.target.options[e.target.selectedIndex].value)
			}
		}
	}

	async function addToCart(){
		if(session.isLoggedIn !== true){
			setNotification("You must be logged in to add to your cart.")
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
		.then(res => res.json())
		.then(res => {
			if(res.error){
				setNotification(res.error)
			} else {
				setCheckOut(true)
			}
		})
		.catch((error) => {
			setNotification("Error adding item to cart. Try again.")
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
					<label htmlFor="add-to-cart">Qty:&nbsp;</label>
					<select className="w-[60px]" name="add-to-cart" id="add-to-cart" onChange={onSelectChange}>
						<option defaultChecked value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
						<option value="11">11</option>
						<option value="12">12</option>
						<option value="13">13</option>
						<option value="14">14</option>
						<option value="15">15</option>
						<option value="16">16</option>
						<option value="17">17</option>
						<option value="18">18</option>
						<option value="19">19</option>
						<option value="20">20</option>
						<option value="21">21</option>
						<option value="22">22</option>
						<option value="23">23</option>
						<option value="24">24</option>
						<option value="25">25</option>
					</select>
					<button onClick={addToCart}>Add to Cart</button>
				</div>
				{
					checkOut === true ? (
						<div className="flex justify-end">
							<button className="px-3 py-2 rounded-full bg-blue-600 text-white">
								<Link href="/cart">View Cart & Checkout</Link>
							</button>
						</div>
					) : null
				}
				{
					notification !== "" ? (
						<div className="absolute w-full bottom-20">
							<p className="px-4 py-1 bg-slate-600 text-white">{notification}</p>
						</div>
					) : null
				}
			</div>
		</div>
	)
}
export default ItemDisplay