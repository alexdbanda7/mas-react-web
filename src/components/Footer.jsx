import React from "react";

// Import social media icons from src/assets
import facebookIcon from "../assets/facebook1.png";
import twitterIcon from "../assets/x.png"; // X icon
import instagramIcon from "../assets/instagram.png";
import linkedinIcon from "../assets/linkedinlogo.png";
import tiktokIcon from "../assets/tiktok.png";
// import githubIcon from "../assets/github.png";

export default function Footer() {
  const socialLinks = [
    { icon: facebookIcon, url: "https://www.facebook.com/share/14P7fxui499/", name: "Facebook" },
    { icon: twitterIcon, url: "https://x.com/alex_banda7?t=7aRCcxFeRshaAgUmp8OGRA&s=09", name: "X" },
    { icon: instagramIcon, url: "https://www.instagram.com/alexd.banda7?igsh=cnY1M2JvZWthOXcz", name: "Instagram" },
    { icon: linkedinIcon, url: "https://linkedin.com/alexdbanda7", name: "LinkedIn" },
    { icon: tiktokIcon, url: "https://vm.tiktok.com/ZMH3GBTNUnVAy-mAeYb/", name: "TikTok" },
    // { icon: githubIcon, url: "https://github.com/alexdbanda7", name: "GitHub" },
  ];

  return (
    <footer className="bg-gray-300 text-black py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

        <p className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} MAS Art & General Supplies. All rights reserved.
        </p>

        <div className="flex space-x-4 items-center mb-4 md:mb-0">
          {socialLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110 hover:opacity-80"
            >
              <img src={item.icon} alt={item.name} className="w-6 h-6" />
            </a>
          ))}
        </div>

        <div className="flex space-x-4">
          <a href="/services" className="hover:text-gray-600">Services</a>
          <a href="/contact" className="hover:text-gray-600">Contact</a>
        </div>

      </div>
    </footer>
  );
}
