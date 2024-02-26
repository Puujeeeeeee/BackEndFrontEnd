import Image from "next/image";
import React from "react";
export default function Hero() {
  return (
    <div className=" ">
      <Image
        src="/image/Gogo-zurag.jpeg"
        alt="background image"
        width={3000}
        height={1000}
      ></Image>
    </div>
  );
}
