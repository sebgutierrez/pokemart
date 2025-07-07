"use client"
import React from 'react';
import "../../../public/spritesheet-32x32.css"
import CartItemQuantities from './CartItemQuantities'

// TODO: replace any with proper type
const CartItem = ({ cartItem, cart, setCart, setCurrentTotal, setCurrentQuantities }: any ) => {
	const className = "pkspr-" + cartItem.item.cssClass + " scale-150"

	return (
		<li className="flex items-center gap-x-2 relative w-full" key={cartItem.id}>
			<div className="flex w-full justify-between px-2 items-center py-1 border-2 black rounded-full ">
				<div className="flex w-full justify-between items-center">
					<div className="flex gap-x-2 items-center">
						<div className="relative w-[40px] h-[40px] pl-[2px] pt-[2px] border-2 border-black rounded-full">
							<div className={className}></div>
						</div>
						<div className="text-[20px]">{cartItem.item.name}</div>
					</div>
					<CartItemQuantities 
						cartItem={cartItem} 
						cart={cart} 
						setCart={setCart} 
						setCurrentTotal={setCurrentTotal}
						setCurrentQuantities={setCurrentQuantities}
					/>
				</div>
			</div>
		</li>
  	);
};

export default CartItem;