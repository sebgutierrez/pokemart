import React from 'react';
import "../globals.css";
import { getSession } from '../session/util';
import Header from "../ui/header";

export default async function BagLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getSession();
	
	return (
		<section>
			<Header session={session}/>
			{ 
				session.isLoggedIn === true ? (
					<main>{children}</main>
				) : (
					<p className="text-lg">Sign In to view your purchased items.</p>
				)
			}
		</section>
	)
}