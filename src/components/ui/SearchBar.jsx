import { Input } from "antd";
import { useContext, useState } from "react";
import IconSearch from "../icon/IconSearch";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../store/AppContext";

const SearchBar = () => {
  const [tempData, setTempData] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { setSearchedData, searchedData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    const formattedValue = value
      .trim()
      .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
    navigate("/dictionary");
    setSearchedData(formattedValue);
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`
        w-full h-9
        flex items-center gap-2 px-3
        rounded-lg bg-white/5
        border border-white/10
        ${
          isFocused
            ? "bg-white/10 border-white/20 ring-[1px] ring-white/20"
            : "hover:bg-white/8 hover:border-white/15"
        }
        transition-all duration-300
      `}
    >
      <IconSearch
        className={`
        ${isFocused ? "text-white/90" : "text-white/60"} 
        transition-colors duration-300 text-sm
      `}
      />

      <Input
        defaultValue={searchedData}
        className="
          !bg-transparent !border-none !outline-none !shadow-none
          !text-white/90 !placeholder-white/50
          !p-0 !text-sm !font-medium
        "
        placeholder="Search..."
        allowClear={{
          clearIcon: (
            <span className="text-white/50 hover:text-white/90 transition-colors">
              ×
            </span>
          ),
        }}
        value={tempData}
        onChange={(e) => setTempData(e.target.value)}
        onPressEnter={() => handleSearch(tempData)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </motion.div>
  );
};

export default SearchBar;
