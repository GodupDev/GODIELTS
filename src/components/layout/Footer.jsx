import { Layout } from "antd";
import IconSocialMedia from "../icon/IconSocialMedia";

const Footer = () => {
  return (
    <Layout.Footer className="bg-gray-900 text-white text-center py-6 mt-auto ">
      <div className="max-w-4xl mx-auto">
        <p className="text-lg font-semibold">GODIELTS</p>
        <p className="text-sm">© 2025 GODEV. NGUYEN TRONG TIEN.</p>
        <p className="text-xs">
          Contact: nguyentrongtiendev06@gmail.com | +84 772400912
        </p>

        <div className="flex justify-center space-x-4 mt-3">
          <a href="nguyentrongtiendev06@gmail.com">
            <IconSocialMedia socialMedia="Gmail" />
          </a>
          <a
            href="https://www.linkedin.com/in/nguyen-trong-tien-24b613339/"
            className="text-gray-400 hover:text-white"
          >
            <IconSocialMedia socialMedia="Linkedin" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100064574541387"
            className="text-gray-400 hover:text-white"
          >
            <IconSocialMedia socialMedia="Facebook" />
          </a>
        </div>

        {/* <div className="flex justify-center space-x-6 mt-4 text-sm">
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            Courses
          </a>
          <a href="#" className="hover:underline">
            Blog
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div> */}
      </div>
    </Layout.Footer>
  );
};

export default Footer;
