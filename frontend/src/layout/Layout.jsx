import React from "react";
import Navbar from "./Navbar";
import Drawer from "./Drawer";

const Layout = ({ children }) => {
  return (
    <main className="relative w-full">
      <Navbar />
      <Drawer />
      <section style={{ top: "7rem" }} className="absolute left-24 overflow-hidden w-[90%]">

      {children}
      </section>
    </main>
  );
};

export default Layout;
