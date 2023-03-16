import React from "react";
import Image from "next/image";
import titleImg from "@/assets/images/title.jpg";

const Layout = ({ children }) => (
  <>
    <div>
      <Image src={titleImg} alt="Ghi điểm tiến lên" className="w-28 m-auto" />
    </div>
    <div className="px-4">{children}</div>
  </>
);

export default Layout;
