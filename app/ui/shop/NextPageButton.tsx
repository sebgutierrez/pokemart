"use client";
import React from 'react';
import { PaginationButtonProps } from '../types/shop';

const NextPageButton = ({ pagination, onPageChange }: PaginationButtonProps) => {
	const upperBoundCheck = pagination.currentPage + 1 <= Math.ceil(pagination.totalCount / pagination.perPage)
	const nextPage = upperBoundCheck ? pagination.currentPage + 1 : pagination.currentPage
	return (
		<div className="px-2">
			{
				upperBoundCheck ? (
					<button className="px-2 py-1 text-green-500" onClick={() => onPageChange(nextPage)}>
						test
					</button>
				) : (
					<button className="px-2 py-1 text-red-500" onClick={() => onPageChange(nextPage)}>
						test
					</button>
				)
			}
		</div>
	)
}
export default NextPageButton