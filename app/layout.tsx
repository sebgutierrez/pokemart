import "./globals.css";
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="flex items-center justify-end border-2 border-red-500 px-2 gap-x-2">
          <ul className="flex gap-x-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            {/* <li>
              <Link href="/auth">Sign In</Link>
            </li> */}
            <li>
              <Link href="/auth">Sign Up</Link>
            </li>
          </ul>
          <div className="border-l-2 pl-2 border-slate-900/10 cursor-pointer">
            <div className="inline-flex items-center justify-center w-[30px] h-[30px]">
              Bag
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
