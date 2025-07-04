"use client"
import React, { useState, useEffect } from 'react';
import "../globals.css";

const Bag = async () => {
	const [bagItems, setBagItems] = useState({})
	const [loading, setLoading] = useState(false)

	// useEffect((() => {
	// 	setLoading(true)
	// 	fetch("/app-router-client-component-redirect-route-handler-fetch/session")
	// 	.then((res) => res.json())
	// 	.then((response) => {
	// 		const bagItems = response.bagItems
	// 		setBagItems(bagItems);
	// 		setLoading(false);
	// 	});
	// }), [bagItems])

	return (
		<p>
			Your Items
		</p>
	)
}

export default Bag;