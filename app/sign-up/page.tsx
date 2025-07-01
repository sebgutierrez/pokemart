"use client";
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'

const signUp = () => {
	const router = useRouter()
  const [errors, setErrors] = useState({
		username: [],
		password: [],
		confirmPassword: ""
  })
  const formData = useRef({
		username: "",
		password: "",
		confirmPassword: ""
  })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault()
		if(formData.current.password !== formData.current.confirmPassword){
			setErrors({
				...errors,
				confirmPassword: "Passwords don't match!"
			})
			return
		}
		fetch('/sign-up/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"username": formData.current.username,
				"password": formData.current.password
			}),
		})
		.then((res) => res.json())
		.then((res) => {
			if(res.url){
				router.push(res.url)
			}
			if(res.error){
				setErrors({
					...errors,
					username: res.error.username,
					password: res.error.password
				})
			}
		})
  }

  async function onInputChange(e: React.ChangeEvent<HTMLInputElement>){
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
			<button className="border-2 cursor-pointer px-4" type="submit">Submit</button>
	  </form>
	</div>
  );
};
export default signUp