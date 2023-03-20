import React from "react";
import Image from "next/image";

const Layout = ({ children, footer }) => (
  <div className="flex flex-col">
    <div className="w-28 m-auto">
      <Image
        src="https://imgur.com/a/o1PipDy"
        alt="Ghi điểm tiến lên"
        width={112}
        height={62}
        className="w-full m-auto"
      />
    </div>
    <div className="px-4 flex-1">{children}</div>
    {footer && <div>{footer}</div>}
  </div>
);

export default Layout;
