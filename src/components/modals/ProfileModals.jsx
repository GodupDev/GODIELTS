import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../store/AppContext";
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
  Upload,
} from "antd";
import { motion } from "framer-motion";
import { UploadOutlined } from "@ant-design/icons";
import { auth, updateData, updateProfile } from "../../store/services/firebase";
import { uploadImage } from "../../store/services/cloudinary";
import dayjs from "dayjs";

const { Text } = Typography;

const ProfileModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const { profile, setProfile } = useContext(AppContext);

  useEffect(() => {
    if (visible && profile) {
      form.setFieldsValue({
        displayName: profile.displayName || "",
        dob: profile.dob ? dayjs(profile.dob) : null,
        gender: profile.gender || "male",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
      });
    }
  }, [visible, profile, form]);

  useEffect(() => {
    return () => {
      if (imageFile) {
        URL.revokeObjectURL(imageFile.preview);
      }
    };
  }, [imageFile]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formattedValues = {
        ...values,
        dob: values.dob ? dayjs(values.dob).format("YYYY-MM-DD") : null,
      };

      // Update Firebase Authentication display name
      await updateProfile(auth.currentUser, {
        displayName: formattedValues.displayName,
      });

      let avatar = {};
      if (imageFile) {
        avatar = await uploadImage(imageFile);
      }

      // Final profile data to update both Database and AppContext
      const updatedProfile = {
        ...profile,
        ...formattedValues,
        avatar,
      };

      // Update Database
      await updateData(`usersProfile/${auth.currentUser.uid}`, updatedProfile);

      // Update context once, clean and optimized
      setProfile(updatedProfile);

      message.success("Profile updated successfully!");
      onCancel();
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = ({ file }) => {
    file.preview = URL.createObjectURL(file);
    setImageFile(file);
    message.success("Avatar uploaded successfully!");
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
          className="px-6 py-4"
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <div className="flex flex-col items-center mb-4">
              <img
                src={
                  imageFile
                    ? imageFile.preview
                    : profile?.avatar?.url ||
                      "https://via.placeholder.com/96x96?text=Avatar"
                }
                alt="Avatar Preview"
                className="rounded-full object-cover border border-gray-700 w-24 h-24 mb-2"
              />
              <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleUpload}
                accept="image/*"
              >
                <Button
                  icon={<UploadOutlined />}
                  className="bg-blue-500 text-white mt-2"
                >
                  Chọn ảnh
                </Button>
              </Upload>
            </div>

            <Form.Item
              label={<Text className="text-gray-400">Họ và tên</Text>}
              name="displayName"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <Input className="bg-gray-800 border-gray-700 text-white" />
            </Form.Item>

            <div className="flex gap-4">
              <Form.Item
                label={<Text className="text-gray-400">Ngày sinh</Text>}
                name="dob"
                className="flex-1"
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  className="w-full bg-gray-800 border-gray-700 text-white"
                />
              </Form.Item>

              <Form.Item
                label={<Text className="text-gray-400">Giới tính</Text>}
                name="gender"
                className="flex-1"
              >
                <Radio.Group className="text-white">
                  <Radio value="male">Nam</Radio>
                  <Radio value="female">Nữ</Radio>
                  <Radio value="other">Khác</Radio>
                </Radio.Group>
              </Form.Item>
            </div>

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
