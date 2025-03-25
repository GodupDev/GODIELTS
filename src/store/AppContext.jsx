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
  const [postsData, setPostsData] = useState([]);
  const [tipsData, setTipsData] = useState([]);
  const [currentPage, setCurrentPage] = useState("/");
  const [profile, setProfile] = useState({
    userID: null,
    displayName: null,
    phone: null,
    dob: null,
    email: null,
    avatar: { public_id: null, url: null },
    gender: "",
    address: null,
  });

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
        postsData,
        setPostsData,
        tipsData,
        setTipsData,
        currentPage,
        setCurrentPage,
        profile,
        setProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
