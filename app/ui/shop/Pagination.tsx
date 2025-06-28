"use client";
import React from 'react';
import { PaginationButtonProps } from '../types/shop';

const Pagination = ({ pagination, onPageChange }: PaginationButtonProps) => {
	
	const lowerBoundCheck = pagination.currentPage - 1 > 0
	const upperBoundCheck = pagination.currentPage + 1 <= Math.ceil(pagination.totalCount / pagination.perPage)
	const totalPages = Math.ceil(pagination.totalCount / pagination.perPage)
	const prevPage = lowerBoundCheck ? pagination.currentPage - 1 : pagination.currentPage
	const nextPage = upperBoundCheck ? pagination.currentPage + 1 : pagination.currentPage

	const pageButtonsArray = []
	for (let i = 1; i <= totalPages; i++){
		let buttonHighlightClass = pagination.currentPage == i ? "text-green-400" : "text-blue-400"
		pageButtonsArray.push(
			<li 
				key={"page#" + i} 
				className={`border-2 border-black ${buttonHighlightClass}`}
				onClick={() => onPageChange(i)}
			>
				<button className="cursor-pointer px-2 py-1">
					{i}
				</button>
			</li>
		)
	}

	return (
		<div className="flex flex-row w-full px-2 justify-center gap-x-2">
			<button className="px-2 py-1" onClick={() => onPageChange(prevPage)}>
				&lt;
			</button>
			<ul className="flex gap-x-2 px-2 border-2 border-black">
				{pageButtonsArray}
			</ul>
			<button className="px-2 py-1" onClick={() => onPageChange(nextPage)}>
				&gt;
			</button>
		</div>
	)
}
export default Pagination