"use client";
import React from 'react';
import { ItemDisplayProps } from "../types/shop";

const ItemDisplay = ({ item }: ItemDisplayProps) => {
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
			</div>
		</div>
	)
}
export default ItemDisplay