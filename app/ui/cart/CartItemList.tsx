"use client";
import React, { useState } from 'react';
import CartItem from "./CartItem";

// TODO: replace any with proper type
const CartItemList = ({ cartItems }: any ) => {
	const [cart, setCart] = useState(cartItems)
	const [total, setTotal] = useState(0)

	console.log("initial cart: ", cart.data)

	if (cart.data.length === 0) {
		return <div className="text-lg">Your shopping cart is empty.</div>
	}

	let totalCost = 0
	const cartItemsList = cart.data.map((item: any, index: number) => {
		totalCost += item.item.buyPrice * item.quantity
		return (
			<CartItem cartItem={item} cart={cart} setCart={setCart} key={index}/>
		)
	})

  return (
    <div className="mx-12 my-8">
      <ul className=" flex flex-col w-full gap-y-2">{cartItemsList}</ul>
	  <div className="text-right">
		Total: ${totalCost}
	  </div>
    </div>
  );
};

export default CartItemList;