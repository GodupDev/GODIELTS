import { Layout } from "antd";
import IconSocialMedia from "../icon/IconSocialMedia";

const Footer = () => {
  return (
    <Layout.Footer className="!bg-gray-900 text-white text-center py-4 mt-auto">
      <div className="max-w-4xl mx-auto px-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xl font-semibold">GODIELTS</p>
            <p className="text-sm">© 2025 GODEV. NGUYEN TRONG TIEN.</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Contact:</p>
            <a
              href="mailto:nguyentrongtiendev06@gmail.com"
              className="hover:underline block mb-1 text-sm"
            >
              nguyentrongtiendev06@gmail.com
            </a>
            <p className="text-sm">+84 772400912</p>
          </div>
          <div className="flex justify-center space-x-4">
            <a
              href="https://mail.google.com"
              className="text-gray-400 hover:text-white transform hover:scale-110 transition-transform"
              aria-label="Gmail"
            >
              <IconSocialMedia socialMedia="Gmail" />
            </a>
            <a
              href="https://www.linkedin.com/in/nguyen-trong-tien-24b613339/"
              className="text-gray-400 hover:text-white transform hover:scale-110 transition-transform"
              aria-label="LinkedIn"
            >
              <IconSocialMedia socialMedia="Linkedin" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100064574541387"
              className="text-gray-400 hover:text-white transform hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <IconSocialMedia socialMedia="Facebook" />
            </a>
          </div>
        </div>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
