"use client";
import React, { useState, useRef } from 'react';
import "../../public/spritesheet-32x32.css"
import ItemList from '../ui/shop/ItemList';
import ItemBox from '../ui/shop/ItemBox';
import { Item } from '../ui/types/shop';

const ShopPage = () => {
  const [session, setSession] = useState({
    username: "",
    isLoggedIn: false
  })
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState({
    id: "",
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
    fetch('/shop/items/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "category": itemQuery.current.category,
        "sort": itemQuery.current.sort
      }),
    })
		.then((res) => res.json())
		.then((res) => {
      const items = res.data
      const session = res.session
      setItems(items)
      setSelectedItem({...items[0]})
      setPagination({
        ...pagination,
        currentPage: 1,
        totalCount: items.length
      })
      setSession({
        username: session.username,
        isLoggedIn: session.isLoggedIn
      })
      setLoading(false)
		})
  }

  async function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>){
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
                <option value="All">All</option>
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
      { 
        loading === false ? (
          <div className="flex mx-12">
            { 
              items && items.length > 0 && (
                <div className="flex">
                  <ItemList 
                    items={items} 
                    onSelectItem={onSelectItem} 
                    pagination={pagination} 
                    setPagination={setPagination}
                  ></ItemList>
                  <ItemBox 
                    item={selectedItem} 
                    session={session}
                  ></ItemBox>
                </div>
              ) 
            }
          </div>
        ) : (
          <p>Loading...</p>
        )
      }
    </div>
	)
}
export default ShopPage;