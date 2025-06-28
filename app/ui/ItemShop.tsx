"use client";
import React, { useState, useRef } from 'react';
import ItemContainer from './ItemContainer';

type Item = {
  name: string,
  category: string,
  description: string,
  buyPrice: string,
  debutGeneration: string,
  cssClass: string
}

const ItemShop = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState({
    name: "",
    category: "",
    description: "",
    buyPrice: "",
    debutGeneration: "",
    cssClass: ""
  })
  const categoryAndSortOptions = useRef({
    category: "",
    name: "",
    price: ""
  })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    setLoading(true)
    const response = await fetch('/shop/items/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "category": categoryAndSortOptions.current.category,
        "name": categoryAndSortOptions.current.name,
        "price": categoryAndSortOptions.current.price
      }),
    });
    if(response.ok){
      const items = await response.json()
      setItems(items)
      setSelectedItem({
        ...items[0]
      })
    }
    setLoading(false)
  }

  async function onCategoryAndSortChange(e: React.ChangeEvent<HTMLSelectElement>){
    e.preventDefault()
    // Don't store the empty option
    if(e.target.selectedIndex != 0){
      categoryAndSortOptions.current = {
        ...categoryAndSortOptions.current,
        [e.target.name]: e.target.options[e.target.selectedIndex].value
      }
    }
  }

  async function onSelectItem(item: Item){
    setSelectedItem(item)
  }

	return (
    <div>
      <div className="flex justify-between">
        <form onSubmit={onSubmit} className="flex">
          <div className="flex">
            <div className="border-2 border-black">
              <select 
                name="category" 
                id="category-select" 
                onChange={onCategoryAndSortChange}
              >
                <option value="">Category</option>
                <option value="Poké Ball">Poké Ball</option>
                <option value="Recovery Items">Recovery Items</option>
                <option value="Battle Items">Battle Items</option>
                <option value="Vitamins">Vitamins</option>
                <option value="Other Items">Other Items</option>
              </select>
            </div>
            <div className="border-2 border-black">
              <select 
                name="name" 
                id="name-select"
                onChange={onCategoryAndSortChange}
              >
                <option value="">Name</option>
                <option value="asc">Name (A-Z)</option>
                <option value="desc">Name (Z-A)</option>
              </select>
            </div>
            <div className="border-2 border-black">
              <select 
                name="price" 
                id="price-select"
                onChange={onCategoryAndSortChange}
              >
                <option value="">Price</option>
                <option value="asc">Price (Low to High)</option>
                <option value="desc">Price (High to Low)</option>
              </select>
            </div>
          </div> 
          <button className="border-2 border-black" type="submit">
            Search
          </button>
        </form>
        <div className="flex">

        </div>
      </div>
      <div className="flex mx-12">
        { !loading && <ItemContainer items={items} onSelectItem={onSelectItem}></ItemContainer> }
        { !loading && (
          <div className="flex w-full gap-x-4 border-2 border-red-500 px-8 py-4">
            <div className="w-full flex flex-col border-black rounded-md">
              <div className="w-full border-2 border-black pl-2 py-3 rounded-lg">{selectedItem.name}</div>
              <div className="border-2 border-black flex justify-center items-center">
                <div className="relative w-[60px] h-[60px] pl-[12px] pt-[12px] border-2 border-black rounded-full">
                  <div className={"pkspr-" + selectedItem.cssClass + " scale-200"}></div>
                </div>
              </div>
              <div className="border-2 border-black">
                <div className="">{selectedItem.description}</div>
                <div className="">{selectedItem.category}</div>
                <div className="">{selectedItem.debutGeneration}</div>
                <div className="">{selectedItem.buyPrice}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
	)
}
export default ItemShop;