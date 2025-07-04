import React from 'react'
import Link from 'next/link';
import { SessionData } from "../session/util"

const Header = async ({ session }: { session: SessionData } ) => {
	return (
		<header className="flex items-center justify-between border-2 border-red-500 px-2 gap-x-2">
			{
				session.username !== '' ? (
					<p className="px-4">
						Hi, {session.username}!
					</p>
				) : (
					<p></p>
				)
			}
			<div className="flex items-center">
				<ul className="flex gap-x-4 px-4">
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/shop">Shop</Link>
					</li>
					{
						session.isLoggedIn === true ? (
							<li>
								<Link href="/session?action=logout">Log Out</Link>
							</li>
						) : (
							<li>
								<Link href="/sign-in">Sign In</Link>
							</li>
						)
					}
				</ul>
				<div className="flex border-l-2 pl-2 pr-2 gap-x-2">
					<Link href="/bag">
						<div className="inline-flex items-center justify-center w-[30px] h-[30px] cursor-pointer">
							Bag
						</div>
					</Link>
					<Link href="/cart">
						<div className="inline-flex items-center justify-center w-[30px] h-[30px] cursor-pointer">
							Cart
						</div>
					</Link>
				</div>
			</div>
      	</header>
	)
}

export default Header;