import React from "react";
import Navbar from "./Navbar";
import Drawer from "./Drawer";

const Layout = ({ children }) => {
  return (
    <main className="relative">
      <Navbar />
      <Drawer />
      <section className="absolute top-24 left-24 overflow-hidden w-[90%]">

      {children}
      </section>
    </main>
  );
};

export default Layout;
