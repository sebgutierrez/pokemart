"use client";
import React from 'react';

export type Item = {
  name: string,
  category: string,
  description: string,
  buyPrice: string,
  debutGeneration: string,
  cssClass: string
}

export type ItemContainerProps = {
  items: Item[],
  onSelectItem: (item: Item) => void,
}

const ItemContainer = ({ items, onSelectItem }: ItemContainerProps) => {
  return (
    <ul className="w-[36vw] gap-y-2 flex min-h-[60vh] overflow-y-visible flex-col rounded-md">
      {
        items.map((item: Item) =>{
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
  );
};

export default ItemContainer;