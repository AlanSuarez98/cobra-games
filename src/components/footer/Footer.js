import React from "react";
import logo from "../../Logo.png";
import "./Footer.css";
import Icon from "../icon/Icon";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const handleInstagramClick = () => {
    window.open(`https://www.instagram.com/cobragames.ok/`, "_blank");
  };

  const handleWhatsappClick = () => {
    window.open(`https://wa.me/543416697243`, "_blank");
  };
  return (
    <div className="containerFooter">
      <div className="containerLogo">
        <img src={logo} alt="" />
      </div>
      <div className="containerSocial">
        <h1>Cobra Games</h1>
        <p>Tienda online de venta de videojuegos</p>
        <div className="socialIcon">
          <button onClick={handleInstagramClick}>
            <Icon css={"iconSocial"} icon={faInstagram} />
          </button>
          <button onClick={handleWhatsappClick}>
            <Icon css={"iconSocial"} icon={faWhatsapp} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
