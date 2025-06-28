"use client";
import React from 'react';
import { Item, ItemContainerProps } from "./types/items";

const ItemContainer = ({ items, onSelectItem, pagination, setPagination }: ItemContainerProps) => {

  const startIndex = (pagination.currentPage - 1) * pagination.perPage
  const endIndex = startIndex + pagination.perPage - 1
  const realEndIndex = endIndex > pagination.totalCount ? pagination.totalCount : endIndex

  const batch = items.slice(startIndex, realEndIndex)

  async function onPageChange(page: number){
    setPagination({
      ...pagination,
      currentPage: page
    })
  }

  return (
    <div className="flex flex-col">
      <ul className="w-[36vw] gap-y-2 flex min-h-[60vh] overflow-y-visible flex-col rounded-md">
        {
          batch.map((item: Item) =>{
            const className = "pkspr-" + item.cssClass + " scale-150"
            return (
              <li className="flex items-center gap-x-2 relative w-full" onClick={() => onSelectItem(item)} key={item.cssClass}>
                <div className="flex w-full px-2 items-center py-1 border-2 border-black rounded-full ">
                  <div className="relative w-[40px] h-[40px] pl-[2px] pt-[2px] border-2 border-black rounded-full">
                    <div className={className}></div>
                  </div>
                  <div className="text-[20px] pl-2">{item.name}</div>
                </div>
              </li>
            )
          })
        }
      </ul>
      <div className="flex">
        {
          pagination.currentPage - 1 != 0 && 
          (<button className="px-2 py-1" onClick={() => onPageChange(pagination.currentPage - 1)}>&lt;</button>)
        }
        {
          pagination.currentPage + 1 <= Math.ceil(pagination.totalCount / pagination.perPage) && 
          (<button className="px-2 py-1" onClick={() => onPageChange(pagination.currentPage + 1)}>&gt;</button>)
        }
      </div>
    </div>
  );
};

export default ItemContainer;