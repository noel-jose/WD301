import React from "react";
import logo from "../logo.svg";

export default function Header(props: { title: string }) {
  return (
    <div className="flex gap-2 items-center">
      <img src={logo} className="animate-spin h-16 w-16" alt="logo" />
      {/* <h1 className="text-center text-xl font-semibold flex-1 p-2">
        {props.title}
      </h1> */}
      <div className="flex gap-2 items-center">
        {[
          { page: "Home", url: "/" },
          { page: "about", url: "/about" },
        ].map((link) => (
          <a
            key={link.url}
            href={link.url}
            className="text-gray-800 p-2 m-2 uppercase"
          >
            {link.page}
          </a>
        ))}
      </div>
    </div>
  );
}
