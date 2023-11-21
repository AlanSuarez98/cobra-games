import React from "react";
import logo from "../../Logo.png";
import "./Footer.css";
import Icon from "../icon/Icon";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="containerFooter">
      <div className="containerLogo">
        <img src={logo} alt="" />
      </div>
      <div className="containerSocial">
        <h1>Cobra Games</h1>
        <p>Tienda online de venta de videojuegos</p>
        <div className="socialIcon">
          <Icon css={"iconSocial"} icon={faInstagram} />
          <Icon css={"iconSocial"} icon={faWhatsapp} />
          <Icon css={"iconSocial"} icon={faArrowUp} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
