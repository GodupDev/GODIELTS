import { createContext, useState } from "react";
import { getData } from "./services/firebase";
// Tạo context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [searchedData, setSearchedData] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("en-US");
  const [favouriteWords, setFavouriteWords] = useState([]);
  const [myPostsData, setMyPostsData] = useState([]);
  const [currentPage, setCurrentPage] = useState("/");

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        theme,
        setTheme,
        searchedData,
        setSearchedData,
        currentLanguage,
        setCurrentLanguage,
        favouriteWords,
        setFavouriteWords,
        myPostsData,
        setMyPostsData,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
