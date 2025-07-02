import React from 'react';
import "./globals.css";
import { getSession } from './session/util';
import Header from './ui/header';

const Home = async () => {
  const session = await getSession()

  return (
    <section>
      <Header session={session}/>
      <div className="">
        Home
      </div>
    </section>
  );
};

export default Home;