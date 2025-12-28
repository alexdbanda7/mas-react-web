import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

import locationIcon from "../assets/location.png";
import addressIcon from "../assets/address.png";
import whatsappIcon from "../assets/whatsapp.png";
import clockIcon from "../assets/clock.png";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceType: "", // Added to match template
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    // Map formData to match EmailJS template
    const templateParams = {
      name: formData.name,
      email: formData.email,
      serviceType: formData.serviceType || "General Inquiry",
      message: formData.message,
    };

    try {
      await emailjs.send(
        "service_6aortmj",         // Your EmailJS service ID
        "template_hnf1p28",   // Your EmailJS template ID
        templateParams,
        "DM_12DqWUPEMSUyxU"       // Your EmailJS public key
      );

      setFormData({ name: "", email: "", serviceType: "", message: "" });
      setToast({
        type: "success",
        message: "Message sent successfully! We’ll get back to you shortly.",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      setToast({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello, my name is ${formData.name || "—"}.\nI contacted you via your website and would like to know more about your services.`
  );

  return (
    <>
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white animate-slideIn
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

      <div className="min-h-screen bg-white px-4 py-8 md:p-10 flex items-center justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Contact Us</h1>
            <p className="mb-6 text-gray-700">
              Let’s talk about your project. Send us a message and we’ll respond within one business day.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-900"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <input
                type="text"
                name="serviceType"
                placeholder="Service Type (optional)"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-900"
              />

              <textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-900 resize-none"
              />

              <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="px-6 py-3 bg-gray-300 text-blue-900 rounded-full font-semibold hover:bg-gray-400 transition"
                >
                  ← Back to Home
                </button>

                <button
                  type="submit"
                  disabled={isSending}
                  className="px-6 py-3 bg-blue-900 text-white rounded-full font-semibold flex items-center justify-center min-w-[160px]"
                >
                  {isSending ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6 text-gray-800">
            <a
              href={`https://wa.me/265884349608?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 text-green-600 hover:underline"
            >
              <img src={whatsappIcon} alt="WhatsApp" className="w-6 h-6" />
              <span className="font-medium">Chat on WhatsApp</span>
            </a>

            <div className="flex items-start space-x-4">
              <img src={locationIcon} alt="Location" className="w-6 h-6 mt-1" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-sm">Lilongwe City</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <img src={addressIcon} alt="Address" className="w-6 h-6 mt-1" />
              <div className="text-sm">
                <p className="font-semibold">Address</p>
                Mas Art & General Supplies<br />
                P.O Box 31808<br />
                Lilongwe 3<br />
                Call: +265884349608 / 999385699
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <img src={clockIcon} alt="Hours" className="w-6 h-6 mt-1" />
              <div className="text-sm">
                <p className="font-semibold">Business Hours</p>
                Mon – Fri: 8:00 AM – 5:00 PM
              </div>
            </div>

            <iframe
              title="MAS Location"
              className="w-full h-40 rounded-lg border"
              loading="lazy"
              src="https://www.google.com/maps?q=Lilongwe%20City&output=embed"
            />
          </div>
        </div>
      </div>

      <a
        href={`https://wa.me/265884349608?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 p-4 rounded-full shadow-lg hover:scale-110 transition animate-pulse"
        aria-label="Chat on WhatsApp"
      >
        <img src={whatsappIcon} alt="WhatsApp" className="w-7 h-7" />
      </a>
    </>
  );
}
