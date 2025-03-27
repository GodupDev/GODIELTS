import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Dictionary from "./pages/Dictionary/main";
import HomePage from "./pages/Home/main";
import ManagePage from "./pages/Manage/main";
import TipsPage from "./pages/Tips/main";
import ForumPage from "./pages/Forum/main";
import MyPosts from "./pages/PostManage/main";
import { ConfigProvider, theme } from "antd";
import { AppContext } from "./store/AppContext";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const { currentPage, setCurrentPage } = useContext(AppContext);

  useEffect(() => {
    navigate(currentPage);
    console.log(currentPage);
  }, [currentPage, navigate]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#3B82F6",
          colorBgBase: "#030712",
          borderRadius: 8,
          colorBgElevated: "rgba(255, 255, 255, 0.05)",
          colorBorderSecondary: "rgba(255, 255, 255, 0.1)",
          controlItemBgHover: "rgba(255, 255, 255, 0.1)",
        },
        components: {
          DatePicker: {
            colorBgContainer: "#374151", // Màu nền input
            colorText: "white", // Màu chữ trong input
            colorBorder: "#4b5563", // Màu viền
            colorPrimary: "#3b82f6", // Màu khi chọn ngày
            controlItemBgHover: "#1f2937", // Màu hover trên lịch
            colorBgElevated: "#1f2937", // Màu nền popup lịch
          },
        },
      }}
    >
      <div className="flex flex-col h-[100vh] min-w-2.5 bg-gray-950 text-white/90">
        <Header />
        <main className="pt-5 flex-grow container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/manage" element={<ManagePage />} />
            <Route path="/tips" element={<TipsPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/postmanage" element={<MyPosts />} />
            <Route path="*" element={setCurrentPage("/")} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ConfigProvider>
  );
};

export default App;
