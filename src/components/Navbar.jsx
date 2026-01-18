import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/mas_logo.png";

// Import social media icons
import facebookIcon from "../assets/facebook1.png";
import twitterIcon from "../assets/x.png";
import instagramIcon from "../assets/instagram.png";
import linkedinIcon from "../assets/linkedinlogo.png";
import tiktokIcon from "../assets/tiktok.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const socialLinks = [
    { icon: facebookIcon, url: "https://www.facebook.com/share/14P7fxui499/", name: "Facebook" },
    { icon: twitterIcon, url: "https://x.com/alex_banda7?t=7aRCcxFeRshaAgUmp8OGRA&s=09", name: "X" },
    { icon: instagramIcon, url: "https://www.instagram.com/alexd.banda7?igsh=cnY1M2JvZWthOXcz", name: "Instagram" },
    { icon: linkedinIcon, url: "https://linkedin.com/alexdbanda7", name: "LinkedIn" },
    { icon: tiktokIcon, url: "https://vm.tiktok.com/ZMH3GBTNUnVAy-mAeYb/", name: "TikTok" },
  ];

  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        navigate("admin/login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <nav className="bg-gray-300 text-black py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/gallery" className="nav-link">Gallery</Link>
          <Link to="/contact" className="nav-link">Contact</Link>

          <div className="flex gap-4">
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
        </div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="fixed inset-x-0 top-16 z-50 flex flex-col items-center bg-gray-300 p-4 space-y-4 md:hidden max-w-6xl mx-auto left-0 right-0">
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/services" className="nav-link" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link to="/gallery" className="nav-link" onClick={() => setIsOpen(false)}>Gallery</Link>

            <div className="flex gap-4 mt-2">
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
          </div>
        </>
      )}
    </nav>
  );
}
