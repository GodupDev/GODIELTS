import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Typography,
  message,
  DatePicker,
  Radio,
  Spin,
} from "antd";
import { motion } from "framer-motion";
import {
  auth,
  updateData,
  updateProfile,
  getData,
  addData,
} from "../../store/services/firebase";
import dayjs from "dayjs";

const { Text } = Typography;

// Hàm kiểm tra quyền truy cập Firestore
const checkAuthUser = () => {
  if (!auth.currentUser) {
    console.error("User not authenticated!");
    message.error("Bạn cần đăng nhập để thực hiện thao tác này.");
    return false;
  }
  return true;
};

// Hàm lấy dữ liệu hồ sơ
const fetchProfileData = async (user, setProfile, form) => {
  if (!user) return;
  try {
    const profileData = await getData(`usersProfile/${user.uid}`);
    if (profileData) {
      setProfile(profileData);
      form.setFieldsValue({
        displayName: profileData.displayName || "",
        dob: profileData.dob ? dayjs(profileData.dob) : null,
        gender: profileData.gender || "",
        email: user.email || "",
        phone: profileData.phone || "",
        address: profileData.address || "",
      });
    } else {
      await initializeProfileData(user, setProfile, form);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    message.error("Failed to load profile data");
  }
};

// Hàm khởi tạo hồ sơ mới nếu chưa có
const initializeProfileData = async (user, setProfile, form) => {
  if (!user) return;
  try {
    const defaultProfile = {
      displayName: user.displayName || "",
      email: user.email || "",
      dob: null,
      gender: "",
      phone: "",
      address: "",
    };
    await addData(`usersProfile/${user.uid}`, defaultProfile);
    setProfile(defaultProfile);
    form.setFieldsValue(defaultProfile);
  } catch (error) {
    console.error("Error initializing profile:", error);
    message.error("Failed to initialize profile data");
  }
};

const ProfileModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (visible && auth.currentUser) {
      setLoading(true);
      fetchProfileData(auth.currentUser, setProfile, form).finally(() =>
        setLoading(false),
      );
    }
  }, [visible, auth.currentUser]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await updateProfile(auth.currentUser, {
        displayName: values.displayName,
      });
      await updateData(`usersProfile/${auth.currentUser.uid}`, {
        ...values,
        dob: values.dob ? dayjs(values.dob).format("YYYY-MM-DD") : null,
      });
      message.success("Profile updated successfully!");
      onCancel();
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      width={500}
      className="bg-gray-900 rounded-lg shadow-lg"
    >
      <Spin spinning={loading}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 py-8"
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label={<Text className="text-gray-400">Họ và tên</Text>}
              name="displayName"
            >
              <Input className="bg-gray-800 border-gray-700 text-white" />
            </Form.Item>

            <Form.Item
              label={<Text className="text-gray-400">Ngày sinh</Text>}
              name="dob"
            >
              <DatePicker
                format="DD/MM/YYYY"
                getPopupContainer={(trigger) => trigger.parentNode}
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label={<Text className="text-gray-400">Giới tính</Text>}
              name="gender"
            >
              <Radio.Group className="bg-gray-800 border-gray-700 text-white">
                <Radio value="male">Nam</Radio>
                <Radio value="female">Nữ</Radio>
                <Radio value="other">Khác</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label={<Text className="text-gray-400">Địa chỉ Email</Text>}
              name="email"
            >
              <Input
                className="bg-gray-800 border-gray-700 text-white"
                disabled
              />
            </Form.Item>

            <Form.Item
              label={<Text className="text-gray-400">Số điện thoại</Text>}
              name="phone"
            >
              <Input className="bg-gray-800 border-gray-700 text-white" />
            </Form.Item>

            <Form.Item
              label={<Text className="text-gray-400">Địa chỉ liên hệ</Text>}
              name="address"
            >
              <Input className="bg-gray-800 border-gray-700 text-white" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 font-bold"
              >
                Cập nhật hồ sơ
              </Button>
            </Form.Item>
          </Form>
        </motion.div>
      </Spin>
    </Modal>
  );
};

export default ProfileModal;
