import React from "react";
import titleImg from "../../assets/images/title.jpg";

const Layout = ({ children, footer }) => (
  <div className="flex flex-col pb-[15px]">
    <div className="w-28 m-auto">
      <img
        src={titleImg.src}
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
