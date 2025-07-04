import React from 'react';
import "../globals.css";
import { getSession } from '../session/util';
import Header from "../ui/header";
import Link from "next/link";

export default async function CartLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getSession();
	
	if(session.isLoggedIn === false) {
		return (
			<div>
				<p className="text-lg">
					<Link href="/sign-in" className="underline">Sign In</Link> to view your cart.
				</p>
			</div>
		)
	}

	return (
		<section>
			<Header session={session}/>
			<main>{children}</main>
		</section>
	)
}