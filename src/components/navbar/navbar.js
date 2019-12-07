import React from "react";
// import "./navbar.css"

const Navbar = props => (
  <div className="navbar ">
    <div>Clicky Game</div>
    <div className={props.navMsgColor}>{props.navMessage}</div>
    <div>
      Score: {props.score} <span className="pipe">|</span> Top Score: {props.topScore}
    </div>
  </div>
);

export default Navbar;