"use client";
import React from 'react';
import { Item, ItemContainerProps } from "../types/shop";
import Pagination from './Pagination';

const ItemContainer = ({ items, onSelectItem, pagination, setPagination }: ItemContainerProps) => {

  const startIndex = (pagination.currentPage - 1) * pagination.perPage
  const endIndex = startIndex + pagination.perPage - 1
  const realEndIndex = endIndex > pagination.totalCount ? pagination.totalCount : endIndex

  const batch = items.slice(startIndex, realEndIndex)

  const listItems = batch.map((item: Item) => {
    const className = "pkspr-" + item.cssClass + " scale-150"
    return (
      <li className="flex items-center gap-x-2 relative w-full" onClick={() => onSelectItem(item)} key={item.cssClass}>
        <div className="flex w-full justify-between px-2 items-center py-1 border-2 border-black rounded-full ">
          <div className="flex items-center">
            <div className="relative w-[40px] h-[40px] pl-[2px] pt-[2px] border-2 border-black rounded-full">
              <div className={className}></div>
            </div>
            <div className="text-[20px] pl-2">{item.name}</div>
          </div>
          <div className="text-[20px] pr-2">{item.buyPrice}</div>
        </div>
      </li>
    )
  })

  async function onPageChange(page: number){
    setPagination({
      ...pagination,
      currentPage: page
    })
  }

  return (
    <div className="flex flex-col">
      <ul className="w-[36vw] gap-y-2 flex min-h-[60vh] overflow-y-visible flex-col rounded-md">
        { listItems }
      </ul>
      <div className="flex">
        <Pagination pagination={pagination} onPageChange={onPageChange}/>
      </div>
    </div>
  );
};

export default ItemContainer;