import React from "react";
import "./header.css";

const Header = () => (
    <div className="header align-items-center bg-header jumbotron header-hgt header-pad head-mar-top nav-shadow neon text-center yx-auto text-center">
        <h1 className="flicker-1 header-font">
            Click on an image to earn points,
      </h1>
        <h1 className="flicker-1 header-font">
            but don't click on any more than once!
      </h1>
    </div>
);


export default Header;