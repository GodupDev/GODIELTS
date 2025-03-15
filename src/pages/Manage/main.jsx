import React, { useState } from "react";
import { Table, Button, Input, Space, Typography, Tag, Popconfirm } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { AppContext } from "../../store/AppContext";
import { useContext } from "react";

const { Title } = Typography;

const ManagePage = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      key: "1",
      word: "abandon",
      type: "word",
      level: "B2",
      topic: "general",
      lastModified: "2024-03-06",
    },
    // Add more sample data here
  ]);

  const columns = [
    {
      title: "Word/Phrase",
      dataIndex: "word",
      key: "word",
      sorter: (a, b) => a.word.localeCompare(b.word),
      filteredValue: [searchText],
      onFilter: (value, record) =>
        record.word.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "word" ? "blue" : "green"}>
          {type.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Word", value: "word" },
        { text: "Phrase", value: "phrase" },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (level) => <Tag color="purple">{level}</Tag>,
      filters: [
        { text: "A1", value: "A1" },
        { text: "A2", value: "A2" },
        { text: "B1", value: "B1" },
        { text: "B2", value: "B2" },
        { text: "C1", value: "C1" },
        { text: "C2", value: "C2" },
      ],
      onFilter: (value, record) => record.level === value,
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
      render: (topic) => <Tag color="orange">{topic}</Tag>,
    },
    {
      title: "Last Modified",
      dataIndex: "lastModified",
      key: "lastModified",
      sorter: (a, b) => new Date(a.lastModified) - new Date(b.lastModified),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            ghost
          />
          <Popconfirm
            title="Delete this item?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    console.log("Edit:", record);
    // Implement edit functionality
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key));
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="mb-6 flex justify-between items-center">
        <Title level={2}>Manage Words & Phrases</Title>
        <Button type="primary" size="large">
          Add New
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search words..."
          prefix={<SearchOutlined />}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
          className="max-w-md"
        />
      </div>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          total: data.length,
          pageSize: 10,
          showTotal: (total) => `Total ${total} items`,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        className="bg-white rounded-lg shadow-sm"
      />
    </motion.div>
  );
};

export default ManagePage;
