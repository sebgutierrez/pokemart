"use client";
import React, { useState, useRef } from 'react';

const signUp = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    username: [],
    password: []
  })
  const formData = useRef({
    username: "",
    password: "",
    confirmPassword: "",
    region: ""
  })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(formData.current.password !== formData.current.confirmPassword){
      alert("Oh oh! Passwords don't match!")
      return
    }
    setLoading(true)
    const response = await fetch('/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": formData.current.username,
        "password": formData.current.password,
        "region": formData.current.region,
      }),
    });
    if(response.ok){
      const responseJSON = await response.json()
      if(responseJSON.error){
        setErrors({
          username: responseJSON.error.username,
          password: responseJSON.error.password
        })
      } else {
        alert("Succefully created user!")
      }
    }
    setLoading(false)
  }

  async function onInputChange(e: React.ChangeEvent<HTMLInputElement>){
    e.preventDefault()
    formData.current = {
      ...formData.current,
      [e.target.name]: e.target.value
    }   
  }

  return (
    <div className="mx-12">
      <div className="text-center text-2xl text-blue">Sign Up</div>
      <form onSubmit={onSubmit} className="">
        <div className="flex flex-col">
          <label htmlFor="username" className="">Trainer Name</label>
          <input type="text" id="username" name="username" className="border-2" onChange={onInputChange} required></input>
        </div>
        { 
          errors?.username?.map((error, index) => {
            return (
              <div key={index} className="text-red-400">{error}</div>
            )
          }) 
        }
        <div className="flex flex-col">
          <label htmlFor="password" className="">Password</label>
          <input type="password" id="password" name="password" className="border-2" onChange={onInputChange} required></input>
        </div>
        { 
          errors?.password?.map((error, index) => {
            return (
              <div key={index} className="text-red-400">{error}</div>
            )
          }) 
        }
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" className="border-2" onChange={onInputChange} required></input>
        </div>
        {/* <div className="flex flex-col">
          <label htmlFor="region-select" className="">Region (Optional)</label>
          <select name="region-select" id="region-select" className="border-2" onChange={onSelectChange}>
            <option value="">Region</option>
            <option value="Kanto">Kanto</option>
            <option value="Johto">Johto</option>
            <option value="Hoenn">Hoenn</option>
            <option value="Sinnoh">Sinnoh</option>
            <option value="Unova">Unova</option>
            <option value="Kalos">Kalos</option>
            <option value="Alola">Alola</option>
            <option value="Galar">Galar</option>
            <option value="Paldea">Paldea</option>
          </select>
        </div> */}
        <button className="border-2 cursor-pointer px-4" type="submit">Submit</button>
      </form>
    </div>
  );
};
export default signUp