import React from "react";
import AppDownload from "../components/AppDownload";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import JobList from "../components/JobList";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <JobList />
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Home;
