"use client";
import React from 'react';
import { PaginationButtonProps } from '../types/shop';

const PrevPageButton = ({ pagination, onPageChange }: PaginationButtonProps) => {
	const lowerBoundCheck = pagination.currentPage - 1 > 0
	const prevPage = lowerBoundCheck ? pagination.currentPage - 1 : pagination.currentPage
	return (
		<div className="px-2">
			{
				lowerBoundCheck ? (
					<button className="px-2 py-1 text-green-500" onClick={() => onPageChange(prevPage)}>
						test
					</button>
				) : (
					<button className="px-2 py-1 text-red-500" onClick={() => onPageChange(prevPage)}>
						test
					</button>
				)
			}
		</div>
	)
}
export default PrevPageButton