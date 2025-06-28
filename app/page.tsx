import Link from 'next/link';

const Home = () => {
  return (
    <div className="">
      <div className="w-full relative">
        <header className="flex justify-end border-2 border-red-500 py-4 px-4">
          <ul className="flex gap-x-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/sign-up">Sign In</Link>
            </li>
            <li>
              <Link href="/sign-up">Sign Up</Link>
            </li>
          </ul>
        </header>
      </div>
    </div>
  );
};

export default Home;