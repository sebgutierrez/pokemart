"use client";
import React, { useState, useRef } from 'react';
import "../../public/spritesheet-32x32.css"
import ItemContainer from '../ui/shop/ItemListContainer';
import ItemDisplay from '../ui/shop/ItemDisplay';
import { Item } from '../ui/types/shop';


const Shop = () => {
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
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalCount: 0
  })
  const itemQuery = useRef({
    category: "",
    sort: ""
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
        "category": itemQuery.current.category,
        "sort": itemQuery.current.sort
      }),
    });
    if(response.ok){
      const responseJSON = await response.json()
      const items = responseJSON.data
      setItems(items)
      setSelectedItem({...items[0]})
      setPagination({
        ...pagination,
        currentPage: 1,
        totalCount: items.length
      })
    }
    setLoading(false)
  }

  async function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>){
    e.preventDefault()
    // Don't store the empty option
    if(e.target.selectedIndex != 0){
      const select = e.target.name
      if(select === "category-select"){
        itemQuery.current = {
          ...itemQuery.current,
          category: e.target.options[e.target.selectedIndex].value
        }
      } 
      if(select === "sort-select"){
        itemQuery.current = {
          ...itemQuery.current,
          sort: e.target.options[e.target.selectedIndex].value
        }
      }
    }
  }

  async function onSelectItem(item: Item){
    setSelectedItem(item)
  }

	return (
    <div className=""> 
      <div className="flex justify-between">
        <form onSubmit={onSubmit} className="flex">
          <div className="flex">
            <div className="border-2 border-black">
              <select 
                name="category-select" 
                id="category-select" 
                onChange={onSelectChange}
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
                name="sort-select" 
                id="sort-select"
                onChange={onSelectChange}
              >
                <option value="">Sort By</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="buyPrice-asc">Price (Low to High)</option>
                <option value="buyPrice-desc">Price (High to Low)</option>
              </select>
            </div>
          </div> 
          <button className="border-2 border-black" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="flex mx-12">
        { !loading && <ItemContainer items={items} onSelectItem={onSelectItem} pagination={pagination} setPagination={setPagination}></ItemContainer> }
        { !loading && <ItemDisplay item={selectedItem} /> }
      </div>
    </div>
	)
}
export default Shop;