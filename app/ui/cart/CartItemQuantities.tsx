"use client";
import React, { useState, useRef } from 'react';
import "../../../public/spritesheet-32x32.css"

async function changeQuantity(cartItemRef, cart, setCart){
	fetch('/cart/items/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			"itemId": cartItemRef.current.id,
			"quantity": cartItemRef.current.quantity
		})
	})
	.then((res) => res.json())
	.then((res) => {
		if(cartItemRef.current.quantity === 0){
			const filteredCartItems = cart.data.filter((cartItem: any) => { return cartItem.id !== res.data.id })
			setCart({ data: filteredCartItems })
		}
	})
}

// TODO: replace any with proper type
const CartItemQuantities = ({ cartItem, cart, setCart, setCurrentTotal, setCurrentQuantities }: any ) => {
	const cartItemRef = useRef({
		id: cartItem.item.id,
		buyPrice: cartItem.item.buyPrice,
		quantity: cartItem.quantity
	}) 

	async function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>){
		// Don't change on default checked option
		if(e.target.selectedIndex !== 0){
			const prevQuantity = cartItemRef.current.quantity
			const currentItemTotal = cartItemRef.current.buyPrice * prevQuantity
			const newItemTotal = cartItemRef.current.buyPrice * Number(e.target.options[e.target.selectedIndex].value)

			cartItemRef.current = {
				...cartItemRef.current,
				quantity: Number(e.target.options[e.target.selectedIndex].value)
			}
			
			setCurrentTotal((prev: number) => prev - currentItemTotal + newItemTotal)
			setCurrentQuantities((prev: number) => prev - prevQuantity + Number(e.target.options[e.target.selectedIndex].value))
			await changeQuantity(cartItemRef, cart, setCart)
		}
	}

	return (
		<div className="relative flex justify-end items-center">
			<div className="flex items-center gap-x-1.5">
				<label htmlFor="select-quantity">Qty:&nbsp;</label>
				<select className="w-[60px]" name="select-quantity" id="select-quantity" onChange={onSelectChange}>
					<option defaultChecked value={ cartItemRef.current.quantity }>{ cartItemRef.current.quantity }</option>
					<option value="0">0</option>
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
				<div className="text-[20px]">x&nbsp;{ cartItemRef.current.buyPrice }</div>
			</div>
		</div>
	);
};

export default CartItemQuantities;