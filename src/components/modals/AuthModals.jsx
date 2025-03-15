import React, { useState } from "react";
import { Modal, Form, Input, Button, Typography, message } from "antd";
import { motion } from "framer-motion";
import { GoogleOutlined } from "@ant-design/icons";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signUp,
  signIn,
} from "../../store/services/firebase";
import { AppContext } from "../../store/AppContext";
import { useContext } from "react";

const { Text } = Typography;

const AuthModal = ({ mode, open, onCancel, onSwitch }) => {
  const isLogin = mode === "login";
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithPopup(auth, googleProvider);
      setUser(user);
      message.success("Logged in successfully!");
    } catch (error) {
      console.error("Google sign-in error:", error);
      message.error(error.message);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const user =
        mode === "login"
          ? await signIn(values.email, values.password)
          : await signUp(values.email, values.password);
      setUser(user);
      message.success(
        mode === "login" ? "Đăng nhập thành công" : "Đăng ký thành công",
      );
      onCancel();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={500}
      className="bg-gray-900 rounded-lg shadow-lg"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-6 py-8"
      >
        <h2 className="text-center text-white text-2xl font-semibold mb-6 tracking-wide">
          {isLogin ? "Login" : "Register"}
        </h2>
        <Form layout="vertical" onFinish={handleSubmit}>
          {/* Name field only for registration */}
          {!isLogin && (
            <Form.Item
              label={<span className="text-gray-400">Name</span>}
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                size="large"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </Form.Item>
          )}
          <Form.Item
            label={<span className="text-gray-400">Email</span>}
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              size="large"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </Form.Item>
          <Form.Item
            label={<span className="text-gray-400">Password</span>}
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              ...(!isLogin
                ? [
                    {
                      min: 6,
                      message: "Password must be at least 6 characters!",
                    },
                  ]
                : []),
            ]}
          >
            <Input.Password
              size="large"
              className="bg-gray-800 border-gray-700 text-white"
              autoComplete="new-password"
            />
          </Form.Item>
          {isLogin && (
            <p className="text-gray-400 text-center pt-3 mb-5 cursor-pointer hover:underline">
              Forgot Password?
            </p>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className={`font-bold ${
                isLogin
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
          </Form.Item>
          <div className="flex items-center justify-center my-4">
            <div className="border-t border-gray-600 w-1/3" />
            <span className="text-gray-400 mx-3">OR</span>
            <div className="border-t border-gray-600 w-1/3" />
          </div>
          <Button
            block
            size="large"
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
            onClick={handleGoogleSignIn}
          >
            <GoogleOutlined />
            {isLogin ? "Sign in with Google" : "Sign up with Google"}
          </Button>
          <Text className="text-gray-400 text-center block mt-4">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a
              onClick={onSwitch}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              {isLogin ? "Register now" : "Login here"}
            </a>
          </Text>
        </Form>
      </motion.div>
    </Modal>
  );
};

const AuthModals = ({
  loginVisible,
  registerVisible,
  setLoginVisible,
  setRegisterVisible,
}) => {
  const { auth, setUser } = useContext(AppContext);

  const handleCancel = () => {
    setLoginVisible(false);
    setRegisterVisible(false);
  };

  const switchToRegister = () => {
    setLoginVisible(false);
    setRegisterVisible(true);
  };

  const switchToLogin = () => {
    setRegisterVisible(false);
    setLoginVisible(true);
  };

  return (
    <>
      <AuthModal
        mode="login"
        open={loginVisible}
        onCancel={handleCancel}
        onSwitch={switchToRegister}
      />
      <AuthModal
        mode="register"
        open={registerVisible}
        onCancel={handleCancel}
        onSwitch={switchToLogin}
      />
    </>
  );
};

export default AuthModals;
