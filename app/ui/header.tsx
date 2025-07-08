import React from 'react'
import Link from 'next/link'
import { SessionData } from "../session/util"
import './header.css'

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
				<ul className="flex items-center gap-x-4 px-4">
					<li className="">
						<Link href="/">Home</Link>
					</li>
					<li className="">
						<Link href="/shop">Shop</Link>
					</li>
					<li>
						<Link href="/cart">
							<div className="inline-flex items-center justify-center w-full h-[30px] border-2 cursor-pointer">
								Cart
							</div>
						</Link>
					</li>
				</ul>
				<div className="flex border-l-2 pl-2 gap-x-4">
					{
						session.isLoggedIn === true ? (
							<div className="profile-menu">
								<p className="">Profile</p>
								<ul className="profile-sub-menu">
									<li className="">
										<p className="text-black">Balance: {session.pokeDollars}</p>
										<Link href="/session?action=logout">Log Out</Link>
									</li>
								</ul>
							</div>
						) : (
							<div className="">
								<Link href="/sign-in">Sign In</Link>
							</div>
						)
					}
				</div>
			</div>
      	</header>
	)
}

export default Header;