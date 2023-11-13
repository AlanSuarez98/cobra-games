import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./BarOpt.css";
const BarOpt = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  onClearSearch,
  isSearchActive,
  setIsSearchActive,
}) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsSearchActive(true);
  };

  return (
    <div className="barOpt">
      <div className="search">
        <input
          type="text"
          placeholder="GTA V"
          id="searchHome"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {(isSearchActive || searchTerm !== "") && ( // Ajusta la condición para mostrar la "x"
          <button onClick={onClearSearch}>
            <FontAwesomeIcon icon={faTimes} id="btnClear" />
          </button>
        )}
        <button onClick={onSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} id="btnSearch" />
        </button>
      </div>
    </div>
  );
};

export default BarOpt;
