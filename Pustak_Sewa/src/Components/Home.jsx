import React from "react";
import Hero from "./Hero";
import Books from "./Books";
import Donate from "./Donate";

function Home({
  bookIllus,
  bookImg1,
  bookImg2,
  bookImg3,
  bookImg4,
  bookImg5,
  illustration,
  books,
  error,
  book,
  setBook,
  setLoading,
}) {
  return (
    <>
      <Hero
        bookImg1={bookImg1}
        bookImg2={bookImg2}
        bookImg3={bookImg3}
        bookImg4={bookImg4}
        bookImg5={bookImg5}
        illustration={illustration}
        setLoading={setLoading}
      />
      {error && <p>{error}</p>}
      <Books books={books} setLoading={setLoading} setBook={setBook} />
      <Donate bookIllus={bookIllus}></Donate>
    </>
  );
}

export default Home;
