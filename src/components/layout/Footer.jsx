import { Layout } from "antd";
import IconSocialMedia from "../icon/IconSocialMedia";

const Footer = () => {
  return (
    <Layout.Footer className="bg-gray-900 text-white text-center py-4 sm:py-6 mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-base sm:text-lg font-semibold">GODIELTS</p>
        <p className="text-xs sm:text-sm">© 2025 GODEV. NGUYEN TRONG TIEN.</p>
        <p className="text-[10px] sm:text-xs mt-1">
          Contact: nguyentrongtiendev06@gmail.com | +84 772400912
        </p>

        <div className="flex justify-center space-x-3 sm:space-x-4 mt-2 sm:mt-3">
          <a
            href="https://mail.google.com"
            className="transform hover:scale-110 transition-transform"
          >
            <IconSocialMedia socialMedia="Gmail" />
          </a>
          <a
            href="https://www.linkedin.com/in/nguyen-trong-tien-24b613339/"
            className="text-gray-400 hover:text-white transform hover:scale-110 transition-transform"
          >
            <IconSocialMedia socialMedia="Linkedin" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100064574541387"
            className="text-gray-400 hover:text-white transform hover:scale-110 transition-transform"
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
