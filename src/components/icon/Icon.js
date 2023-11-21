import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Icon = ({ icon, css }) => {
  return <FontAwesomeIcon className={css} icon={icon} />;
};

export default Icon;
