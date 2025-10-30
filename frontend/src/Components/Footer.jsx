import React from "react";
import { BsGeoAltFill, BsTelephoneFill, BsEnvelopeFill } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">

        {/* Useful Links Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Useful Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="#aboutus" className="hover:text-teal-400 transition-colors">About Us</a>
            </li>
            <li>
              <a href="#services" className="hover:text-teal-400 transition-colors">Services</a>
            </li>
            <li>
              <a href="#logins" className="hover:text-teal-400 transition-colors">Logins</a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-teal-400 transition-colors">Gallery</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-teal-400 transition-colors">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="flex items-start mb-2">
            <BsGeoAltFill className="text-teal-400 text-xl mr-2" />
            <span>
              A/p: Loni Tal:Rahata<br />
              Dist:Ahmednagar (Maharashtra)<br />
              Pin: 413736 India
            </span>
          </p>
          <p className="flex items-start mb-2">
            <BsTelephoneFill className="text-teal-400 text-xl mr-2" />
            <span>
              +91 9022146933<br />
              Fax: +91 9022146933
            </span>
          </p>
          <p className="flex items-center">
            <BsEnvelopeFill className="text-teal-400 text-xl mr-2" />
            <span>contact@pmtpims.org</span>
          </p>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-900 text-center py-4">
        <span>© 2025 Ghorpade Vishal. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
