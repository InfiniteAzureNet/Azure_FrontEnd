import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Gallery from "./components/Gallery";
import Price_Product from "./components/Price_Product";
import Testimoni from "./components/Testimoni";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Gallery />
      <Price_Product />
      <Testimoni />
      <Contact />
      <Footer />
    </>
  );
}
