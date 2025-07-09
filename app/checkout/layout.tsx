import React from 'react';
import "../globals.css";
import { getSession } from '../session/util';
import Header from "../ui/header";

export default async function CheckoutLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getSession();

	return (
		<section>
			<Header session={session}/>
			<main>{children}</main>
		</section>
	)
}