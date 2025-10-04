import React from "react";
import Navbar from "./Navbar";
import Drawer from "./Drawer";

const Layout = ({ children }) => {
  return (
    <main className="relative">
      <Navbar />
      <Drawer />
      <section className="absolute top-48 left-24 overflow-hidden">

      {children}
      </section>
    </main>
  );
};

export default Layout;
