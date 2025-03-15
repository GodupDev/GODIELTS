import React from "react";
import LogoIELTS from "../../assets/images/GodIELTS.png";
import {
  Image,
  Menu,
  Tooltip,
  Drawer,
  message,
  Button,
  Input,
  Space,
  Dropdown,
} from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";
import SearchBar from "../ui/SearchBar";
import IconAdaptive from "../icon/IconAdaptive";
import IconUser from "../icon/IconUser";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import IconLanguage from "../icon/IconLanguage";
import AuthModals from "../modals/AuthModals";
import { useContext, useRef } from "react";
import { AppContext } from "../../store/AppContext";
import { logout } from "../../store/services/firebase";
import ProfileModal from "../modals/ProfileModals";

const menuItems = [
  { key: "home", label: "Home", path: "/" },
  { key: "dictionary", label: "Dictionary", path: "/dictionary" },
  { key: "tips", label: "IELTS Tips", path: "/tips" },
  { key: "forum", label: "Community Forum", path: "/forum" },
  { key: "postmanage", label: "Post Manage", path: "/postmanage" },
];

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "en-US", name: "American English", flag: "🇺🇸" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
];

const Header = ({ setSearchedData, searchedData }) => {
  const location = useLocation();
  const [uiState, setUiState] = useState({
    isScrolled: false,
    languageMenuOpen: false,
    profileMenuOpen: false,
    loginVisible: false,
    registerVisible: false,
    render: false,
    profileVisible: false,
    open: false,
  });

  const {
    isScrolled,
    languageMenuOpen,
    profileMenuOpen,
    loginVisible,
    registerVisible,
    profileVisible,
    open,
  } = uiState;

  const { currentLanguage, setCurrentLanguage, user, setUser, setCurrentPage } =
    useContext(AppContext);

  const handleLanguageChange = useCallback((languageCode) => {
    // TODO: Implement language change logic
    setUiState((prev) => ({ ...prev, languageMenuOpen: false }));
    setCurrentLanguage(languageCode);
  }, []);

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

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      message.success("Logged out successfully");
      setUiState((prev) => ({ ...prev, profileVisible: false }));
      setCurrentPage("/");
    } catch (error) {
      message.error("Error logging out");
    }
  };

  const profile = [
    {
      code: "profile",
      item: "Profile",
      onClick: () => {
        setUiState((prev) => ({ ...prev, profileVisible: true })),
          console.log(profileVisible);
      },
    },
    { code: "logout", item: "Log Out", onClick: handleLogout },
  ];

  const handleProfileChange = useCallback(
    (code) => {
      if (code === "login") {
        showLogin();
      } else if (code === "register") {
        showRegister();
      }
    },
    [showLogin, showRegister],
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setUiState((prev) => ({ ...prev, isScrolled: true }));
      } else {
        setUiState((prev) => ({ ...prev, isScrolled: false }));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    ({ children, tooltip, onClick, className }, ref) => (
      <Tooltip
        placement="bottom"
        title={tooltip}
        classNames={{ root: "tooltip-overlay" }}
        arrow={{ pointAtCenter: true }}
        color="rgba(0, 0, 0, 0.85)"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white/90 transition-all duration-300 flex items-center justify-center ${className}`}
          aria-label={tooltip}
          role="button"
        >
          {children}
        </motion.button>
      </Tooltip>
    ),
  );

  const menu = (
    <Menu
      mode="horizontal"
      theme="dark"
      selectedKeys={[currentKey]}
      className="xl:!bg-transparent !bg-[#374151] !border-none flex-1 justify-start max-w-none overflow-x-auto"
      items={menuItems.map((item) => ({
        key: item.key,
        label: (
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-sm font-medium tracking-wide whitespace-nowrap"
            onClick={() => setCurrentPage(item.path)}
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
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`sticky top-0 left-0  w-full z-50 ${
          isScrolled ? "shadow-xl backdrop-blur-sm" : ""
        }`}
      >
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/98 to-gray-900/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 ${
            isScrolled ? "!via-gray-900/95 !to-gray-900/90" : ""
          }`}
        />

        {/* Main Content */}
        <div className="relative container mx-auto sm:px-6 !pl-5">
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
              <div className="hidden flex-1 xl:block">{menu}</div>
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
                  {user && (
                    <div>
                      <div ref={profileRef}>
                        <TooltipButton
                          onClick={() =>
                            setUiState((prev) => ({
                              ...prev,
                              profileMenuOpen: !prev.profileMenuOpen,
                              languageMenuOpen: false,
                            }))
                          }
                          className="relative"
                        >
                          <IconUser />
                          {profileMenuOpen && profile?.length > 0 && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/10 overflow-hidden">
                              {profile.map(({ code, item, onClick }) => (
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
                        visible={profileVisible}
                        onCancel={() =>
                          setUiState((prev) => ({
                            ...prev,
                            profileVisible: false,
                          }))
                        }
                      />
                    </div>
                  )}
                  {!user && (
                    <>
                      <div className="flex gap-2">
                        <Button onClick={showLogin} className="">
                          Login
                        </Button>

                        <Button onClick={showRegister} className="">
                          Register
                        </Button>
                      </div>
                      <AuthModals
                        loginVisible={loginVisible}
                        registerVisible={registerVisible}
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
                      onClick={() =>
                        setUiState((prev) => ({
                          ...prev,
                          languageMenuOpen: !languageMenuOpen,
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
                      {languageMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/10 overflow-hidden">
                          {languages.map((language) => (
                            <div
                              key={language.code}
                              role="button"
                              tabIndex={0}
                              onClick={() =>
                                handleLanguageChange(language.code)
                              }
                              onKeyPress={(e) =>
                                e.key === "Enter" &&
                                handleLanguageChange(language.code)
                              }
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
                  <TooltipButton onClick={() => {}} className="">
                    <IconAdaptive />
                  </TooltipButton>
                  {/* Mobile Menu */}
                  <div className="xl:hidden">
                    <Dropdown
                      menu={menu}
                      trigger={["click"]}
                      open={open}
                      onOpenChange={(newOpen) =>
                        setUiState((prev) => ({ ...prev, open: newOpen }))
                      }
                    >
                      <Button
                        icon={<MenuOutlined />}
                        className="!bg-transparent text-white border-none"
                      />
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
    </>
  );
};

export default Header;
