"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

const SignIn = () => {
  const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({
		username: [],
		password: []
	})
	const formData = useRef({
		username: "",
		password: ""
	})

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault()
		setLoading(true)
		const response = await fetch('/sign-in/auth/', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			"username": formData.current.username,
			"password": formData.current.password
			}),
		});
		if(response.ok){
			const responseJSON = await response.json()
			if(responseJSON.url){
				router.push(responseJSON.url)
			}
		  if(responseJSON.error){
				setErrors({
					username: responseJSON.error.username,
					password: responseJSON.error.password
				})
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
	  <div className="text-center text-2xl text-blue">Sign In</div>
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
		<button className="border-2 cursor-pointer px-4" type="submit">Submit</button>
	  </form>
	  <div className="">
		<Link href="/sign-up" className="underline">Don't have an account?</Link>
	  </div>
	</div>
  );
};
export default SignIn