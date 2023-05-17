import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Netflix Refresh</title>
        <meta
          name="description"
          content="Get notified on added/removed content on Netflix in your Twitter feed daily!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Netflix <span className="text-primary">Refresh</span>
          </h1>
          <div className="flex">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://twitter.com/NetflixRefresh"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Follow Us →</h3>
              <div className="text-lg">
                <p>
                  Get notified on added/removed content on Netflix in your
                  Twitter feed daily!
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
