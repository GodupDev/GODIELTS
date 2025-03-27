// Core React and hooks
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import PropTypes from "prop-types";

// Routing
import { useLocation } from "react-router-dom";

// Animation and date handling
import { motion } from "framer-motion";
import dayjs from "dayjs";

// Context and Firebase services
import { AppContext } from "../../store/AppContext";
import { logout, getData, addData, auth } from "../../store/services/firebase";

// UI Components and Ant Design
import { Image, Menu, Tooltip, message, Button, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";

// Local assets and components
import LogoIELTS from "../../assets/images/GodIELTS.png";
import SearchBar from "../ui/SearchBar";
import IconUser from "../icon/IconUser";
import IconLanguage from "../icon/IconLanguage";
import AuthModals from "../modals/AuthModals";
import ProfileModal from "../modals/ProfileModals";

// Navigation menu items
const menuItems = [
  { key: "home", label: "Home", path: "/" },
  { key: "dictionary", label: "Dictionary", path: "/dictionary" },
  { key: "tips", label: "IELTS Tips", path: "/tips" },
  { key: "forum", label: "Community Forum", path: "/forum" },
  { key: "postmanage", label: "Post Manage", path: "/postmanage" },
];

// Header component with navigation and user interface
const Header = () => {
  // Supported languages for the application
  const languages = useMemo(
    () => [
      { code: "en", name: "English", flag: "🇬🇧" },
      { code: "en-US", name: "American English", flag: "🇺🇸" },
      { code: "zh", name: "Chinese", flag: "🇨🇳" },
      { code: "ja", name: "Japanese", flag: "🇯🇵" },
    ],
    [],
  );

  // UI state management
  const location = useLocation();
  const [uiState, setUiState] = useState({
    isScrolled: false,
    languageMenuOpen: false,
    profileMenuOpen: false,
    loginVisible: false,
    registerVisible: false,
    profileVisible: false,
    open: false,
    loading: false,
  });

  // Context values for app-wide state
  const {
    currentLanguage,
    setCurrentLanguage,
    user,
    setUser,
    setCurrentPage,
    setProfile,
    profile,
    setPostsData,
    setTipsData,
    searchedData,
    setSearchedData,
  } = useContext(AppContext);

  // Profile data management functions
  const fetchProfileData = useCallback(async (user, setProfile) => {
    const profileData = await getData(`usersProfile/${user.uid}`);
    const posts = await getData("severData/postsData");
    setPostsData(posts.postsData ? posts.postsData : []);
    const tips = await getData("severData/tipsData");
    setTipsData(tips.tipsData ? tips.tipsData : []);

    if (!user) return;
    try {
      if (profileData && Object.keys(profileData).length > 0) {
        setProfile({ ...profileData });
      } else {
        await initializeProfileData(user, setProfile);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      message.error("Failed to load profile data");
    }
  }, []);

  const initializeProfileData = useCallback(async (user, setProfile) => {
    if (!user) return;
    try {
      const defaultProfile = {
        userID: user.uid || "",
        displayName: user.displayName || "",
        email: user.email || "",
        dob: dayjs().format("YYYY-MM-DD"),
        gender: "",
        phone: "",
        address: "",
        avatar: {
          public_id: "avatar/avatar/default-avatar_alalkf",
          url: "https://res.cloudinary.com/djthxaxtd/image/upload/v1742132004/avatar/avatar/default-avatar_alalkf.png",
        },
      };
      setProfile(defaultProfile);
      await addData(`usersProfile/${user.uid}`, defaultProfile);
    } catch (error) {
      console.error("Error initializing profile:", error);
      message.error("Failed to initialize profile data");
    }
  }, []);

  // Profile data initialization
  useEffect(() => {
    if (auth.currentUser) {
      fetchProfileData(auth.currentUser, setProfile);
    }
  }, [auth.currentUser, fetchProfileData, setProfile]);

  // Language change handler
  const handleLanguageChange = useCallback(
    async (languageCode) => {
      try {
        setUiState((prev) => ({ ...prev, languageMenuOpen: false }));
        setCurrentLanguage(languageCode);
        message.success("Language changed successfully");
      } catch (error) {
        console.error("Error changing language:", error);
        message.error("Failed to change language");
      }
    },
    [setCurrentLanguage],
  );

  // Scroll event handler for header effects
  const handleScroll = useCallback(() => {
    setUiState((prev) => ({
      ...prev,
      isScrolled: window.scrollY > 10,
    }));
  }, []);

  // Cleanup scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Logout functionality
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      setUser(null);
      message.success("Logged out successfully");
      setUiState((prev) => ({ ...prev, profileVisible: false }));
      setCurrentPage("/");
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
      message.error(error.message || "Error logging out");
    }
  }, [setUser, setCurrentPage]);

  // Profile menu items
  const profileUI = useMemo(
    () => [
      {
        code: "profile",
        item: "Profile",
        onClick: () =>
          setUiState((prev) => ({ ...prev, profileVisible: true })),
      },
      { code: "logout", item: "Log Out", onClick: handleLogout },
    ],
    [handleLogout],
  );

  // Authentication modal handlers
  const showLogin = useCallback(() => {
    setUiState((prev) => ({
      ...prev,
      loginVisible: true,
      profileMenuOpen: false,
    }));
  }, []);

  const showRegister = useCallback(() => {
    setUiState((prev) => ({
      ...prev,
      registerVisible: true,
      profileMenuOpen: false,
    }));
  }, []);

  const profileRef = useRef(null);
  const languageRef = useRef(null);

  const handleOutsideClick = (event) => {
    const path = event.composedPath ? event.composedPath() : [event.target];
    const isInsideProfile =
      profileRef.current && path.includes(profileRef.current);
    const isInsideLanguage =
      languageRef.current && path.includes(languageRef.current);

    if (uiState.profileMenuOpen || uiState.languageMenuOpen) {
      if (!isInsideProfile && !isInsideLanguage) {
        setUiState({ profileMenuOpen: false, languageMenuOpen: false });
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const currentKey =
    menuItems.find((item) => item.path === location.pathname)?.key || "home";

  const TooltipButton = React.forwardRef(
    ({ children, tooltip, onClick, className }, ref) => {
      return (
        <Tooltip placement="bottom" title={tooltip}>
          <motion.button
            ref={ref}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white/90 transition-all duration-300 flex items-center justify-center ${className}`}
          >
            {children}
          </motion.button>
        </Tooltip>
      );
    },
  );

  TooltipButton.displayName = "TooltipButton";
  TooltipButton.propTypes = {
    children: PropTypes.node.isRequired,
    tooltip: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
  };

  const handleMenuClick = (path) => {
    setCurrentPage(path);
    setSearchedData("");
  };
  const renderMenu = (horizontal = false) => (
    <Menu
      mode={horizontal ? "horizontal" : "vertical"}
      selectedKeys={[currentKey]}
      className="xl:!bg-transparent !bg-[#374151] !border-none flex-1 justify-start max-w-none overflow-x-auto overflow-y-hidden items-center"
      items={menuItems.map((item) => ({
        key: item.key,
        label: (
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-sm font-medium tracking-wide whitespace-nowrap"
            onClick={() => {
              handleMenuClick(item.path);
            }}
          >
            {item.label}
          </motion.span>
        ),
        className:
          "!bg-transparent hover:!bg-white/5 !rounded-xl !text-white/70 hover:!text-white/90 border border-transparent hover:border-white/10",
      }))}
    />
  );

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`sticky top-0 left-0 w-full z-50 ${
        uiState.isScrolled ? "shadow-xl backdrop-blur-sm" : ""
      } bg-[#101727]`}
    >
      {/* Gradient Background */}
      <div
        className={`w-full absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/98 to-gray-900/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 ${
          uiState.isScrolled ? "!via-gray-900/95 !to-gray-900/90" : ""
        }`}
      />

      {/* Main Content */}
      <div className="w-full relative max-w mx-auto sm:px-6 !pl-5 pr-5">
        <div className="h-20 flex items-center justify-between gap-4 sm:gap-8">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 sm:gap-5 group cursor-pointer shrink-0"
            onClick={() => setCurrentPage("/")}
          >
            <div className="relative flex items-center justify-center">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-full blur-2xl group-hover:from-blue-500/40 group-hover:to-indigo-500/40 transition-all duration-300" />

              {/* Logo Container */}
              <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 p-[3px]">
                {/* Logo Image */}
                <div className="w-full h-full rounded-full border border-white/10 overflow-hidden bg-gray-900 flex justify-center items-center">
                  <Image
                    src={LogoIELTS}
                    alt="GodIELTS Logo"
                    preview={false}
                    width={90}
                    height={50}
                    className="hover:scale-110 transition-transform duration-300 sm:w-[70px] sm:h-[50px]"
                  />
                </div>
              </div>
            </div>

            {/* Logo Text */}
            <div className="flex flex-col group-hover:translate-x-1 transition-transform duration-300">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent mb-0 leading-none">
                GODIELTS
              </h1>
              <p className="text-[11px] sm:text-[13px] font-medium text-white/50 group-hover:text-white/70 transition-colors mt-1.5">
                Master IELTS Easily
              </p>
            </div>
          </motion.div>

          <div>
            <div className="hidden flex-1 xl:block">{renderMenu(true)}</div>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden xl:block w-[400px]">
              <SearchBar
                setSearchedData={setSearchedData}
                searchedData={searchedData}
              />
            </div>

            <div>
              <div className="flex gap-2 sm:gap-3 items-center">
                {user ? (
                  <div>
                    <div ref={profileRef}>
                      <TooltipButton
                        tooltip="Profile"
                        onClick={() =>
                          setUiState((prev) => ({
                            ...prev,
                            profileMenuOpen: !prev.profileMenuOpen,
                            languageMenuOpen: false,
                          }))
                        }
                        className="relative"
                      >
                        {profile?.avatar ? (
                          <img
                            src={profile?.avatar.url}
                            alt="Avatar Preview"
                            className="rounded-full object-cover border border-gray-700 w-7 h-7"
                          />
                        ) : (
                          <IconUser />
                        )}
                        {uiState.profileMenuOpen && (
                          <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/10 overflow-hidden">
                            {profileUI.map(({ code, item, onClick }) => (
                              <div
                                key={code}
                                role="button"
                                tabIndex={0}
                                className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors duration-200 flex items-center gap-2"
                                onClick={onClick}
                              >
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </TooltipButton>
                    </div>
                    <ProfileModal
                      visible={uiState.profileVisible}
                      onCancel={() =>
                        setUiState((prev) => ({
                          ...prev,
                          profileVisible: false,
                        }))
                      }
                    />
                  </div>
                ) : (
                  <>
                    <div className="hidden sm:flex gap-2">
                      <Button onClick={showLogin}>Login</Button>
                      <Button onClick={showRegister}>Register</Button>
                    </div>

                    <AuthModals
                      loginVisible={uiState.loginVisible}
                      registerVisible={uiState.registerVisible}
                      setLoginVisible={(visible) =>
                        setUiState((prev) => ({
                          ...prev,
                          loginVisible: visible,
                        }))
                      }
                      setRegisterVisible={(visible) =>
                        setUiState((prev) => ({
                          ...prev,
                          registerVisible: visible,
                        }))
                      }
                    />
                  </>
                )}
                <div ref={languageRef}>
                  <TooltipButton
                    tooltip="Language"
                    onClick={() =>
                      setUiState((prev) => ({
                        ...prev,
                        languageMenuOpen: !prev.languageMenuOpen,
                        profileMenuOpen: false,
                      }))
                    }
                    className="relative"
                  >
                    <IconLanguage
                      size={20}
                      strokeWidth={2}
                      className="hover:text-blue-400"
                    />
                    {uiState.languageMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/10 overflow-hidden">
                        {languages.map((language) => (
                          <div
                            key={language.code}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleLanguageChange(language.code)}
                            className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors duration-200 flex items-center gap-2"
                          >
                            {language.flag && <span>{language.flag}</span>}
                            <span>{language.name}</span>
                            {language.code === currentLanguage && (
                              <span className="!text-white">✓</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </TooltipButton>
                </div>
                {/* <TooltipButton onClick={() => {}} className="">
                  <IconAdaptive />
                </TooltipButton> */}
                {/* Mobile Menu */}
                <div className="xl:hidden">
                  <Dropdown
                    menu={{
                      items: [
                        ...menuItems.map((item) => ({
                          key: item.key,
                          onClick: () => handleMenuClick(item.path),
                          label: item.label,
                        })),
                        {
                          key: "login",
                          onClick: () => showLogin(),
                          label: (
                            <span className="text-blue-500 font-bold">
                              Login
                            </span>
                          ),
                        },
                      ],
                    }}
                    trigger={["click"]}
                    open={uiState.open}
                    onOpenChange={(newOpen) =>
                      setUiState((prev) => ({ ...prev, open: newOpen }))
                    }
                    overlayClassName="bg-gray-800 border-gray-600 rounded-lg text-white"
                  >
                    <span>
                      <Button
                        icon={<MenuOutlined />}
                        className="!bg-gray-800 !text-white !border-gray-600 hover:!bg-blue-600"
                      />
                    </span>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block xl:hidden  w-full pb-3">
          <SearchBar
            setSearchedData={setSearchedData}
            searchedData={searchedData}
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
