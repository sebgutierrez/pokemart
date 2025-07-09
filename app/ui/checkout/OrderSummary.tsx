"use client"
import React from 'react';
import "../../globals.css";
import Link from 'next/link'

const OrderSummary = ({ totalCost, trainerBalance }) => {
	return (
		<div className="flex flex-col border-2 border-black"> 
			<span className="font-bold">Order Summary</span>
			<ul className="flex flex-col">
				<li>Subtotal ${totalCost}</li>
				<li>Shipping Free</li>
				<li>Total ${totalCost}</li>
				<li>Remaining Balance ${trainerBalance - totalCost}</li>
			</ul>
			<Link href="/checkout/order">(Place Order)</Link>
		</div>
	)
}

export default OrderSummary;