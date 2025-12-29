import { useState } from "react";
import emailjs from "@emailjs/browser";
import logo from "../../assets/mas_logo.png";

const SERVICE_ID = "service_6aortmj"; // your SMTP service
const TEMPLATE_ID = "template_hnf1p28"; // 🔴 REPLACE with real template ID
const PUBLIC_KEY = "DM_12DqWUPEMSUyxU";

export default function BusinessPlanForm() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (value) => {
    setFormData((prev) => {
      const selected = prev.designItems || [];
      return {
        ...prev,
        designItems: selected.includes(value)
          ? selected.filter((v) => v !== value)
          : [...selected, value],
      };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2_000_000) {
      alert("File size must not exceed 2MB");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: file,
    }));
  };

  const saveToDashboard = (data) => {
    const existing = JSON.parse(localStorage.getItem("serviceRequests") || "[]");
    existing.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem("serviceRequests", JSON.stringify(existing));
  };

  const sendToEmail = async (payload) => {
    return emailjs.send(SERVICE_ID, TEMPLATE_ID, payload, PUBLIC_KEY);
  };

  const generateWhatsAppText = (obj) => {
    let msg = `NEW SERVICE REQUEST\n\n`;
    for (const key in obj) {
      if (!obj[key]) continue;
      if (obj[key] instanceof File) continue;
      msg += `• ${key}: ${obj[key]}\n`;
    }
    return encodeURIComponent(msg);
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.serviceType) {
      alert("Please fill out your name, email, and select a service type.");
      return false;
    }

    switch (formData.serviceType) {
      case "business":
        if (!formData.businessName || !formData.ownerType) {
          alert("Please fill out Business Name and select type.");
          return false;
        }
        if (formData.ownerType === "businessPlan") {
          const requiredFields = [
            "mission",
            "vision",
            "productsServices",
            "targetMarket",
            "competitors",
            "marketingStrategy",
            "financialOverview",
            "estimatedRevenue",
            "estimatedExpenses",
            "fundingNeeded",
            "conclusion",
          ];
          for (const field of requiredFields) {
            if (!formData[field]) {
              alert(`Please fill out the Business Plan field: ${field}`);
              return false;
            }
          }
        }
        if (formData.ownerType === "businessProfile") {
          const requiredFields = [
            "businessType",
            "establishedYear",
            "location",
            "servicesOffered",
            "achievements",
            "staffCount",
            "contactInfo",
          ];
          for (const field of requiredFields) {
            if (!formData[field]) {
              alert(`Please fill out the Business Profile field: ${field}`);
              return false;
            }
          }
        }
        break;

      case "graphicDesign":
        if ((formData.designItems || []).length === 0 && !formData.designOther) {
          alert("Please select at least one design item or specify in Other.");
          return false;
        }
        if (formData.printingRequired) {
          const requiredFields = ["printQuantity", "printSize", "printPaper", "printColor", "expectedDelivery"];
          for (const field of requiredFields) {
            if (!formData[field]) {
              alert(`Please fill out the printing field: ${field}`);
              return false;
            }
          }
        }
        break;

      case "ictTraining":
        const trainingFields = ["trainingType", "trainingDuration", "trainingLocation"];
        for (const field of trainingFields) {
          if (!formData[field]) {
            alert(`Please fill out the ICT Training field: ${field}`);
            return false;
          }
        }
        break;

      case "computerRepair":
        const repairFields = ["deviceType", "deviceBrand", "deviceModel", "issueDescription"];
        for (const field of repairFields) {
          if (!formData[field]) {
            alert(`Please fill out the Computer Repair field: ${field}`);
            return false;
          }
        }
        break;

      case "other":
        if (!formData.otherServiceDescription) {
          alert("Please describe the service you need.");
          return false;
        }
        break;

      default:
        return true;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
     // Filter out files for JSON payload
      const cleanData = { ...formData };
      for (const key in cleanData) {
        if (cleanData[key] instanceof File) delete cleanData[key];
      }

      const emailPayload = {
        from_name: formData.name,
        from_email: "info@masartngs.com", // Your verified EmailJS email
        user_email: formData.email,       // Optional reply-to
        serviceType: formData.serviceType,
        message: JSON.stringify(cleanData, null, 2),
      };

      await sendToEmail(emailPayload);
      saveToDashboard(formData);

      const message = generateWhatsAppText(formData);
      window.open(`https://wa.me/265884349608?text=${message}`, "_blank");

      alert("Your request has been sent successfully!");
      setFormData({});
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-9 shadow rounded bg-white mt-6">
      <div className="flex justify-center mb-6">
        <img src={logo} alt="Logo" className="h-16" />
      </div>

      <h2 className="text-2xl font-bold text-center mb-2">Request for Service</h2>
      <p className="text-center py-2">
        Please fill out this form with as much detail as possible regarding your request.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* COMMON FIELDS */}
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          value={formData.name || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          value={formData.email || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="serviceType"
          required
          value={formData.serviceType || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Service Type</option>
          <option value="business">Business Plan / Profile</option>
          <option value="graphicDesign">Graphic Design</option>
          <option value="ictTraining">ICT Training</option>
          <option value="computerRepair">Computer Repair</option>
          <option value="other">Other Services</option>
        </select>

        {/* BUSINESS PLAN & PROFILE */}
        {formData.serviceType === "business" && (
          <div className="border rounded p-4 space-y-3">
            <h3 className="font-bold text-center text-lg">Please choose whether you want us to prepare a Business Plan or a Business Profile.</h3>

            <input
              name="businessName"
              placeholder="Business Name"
              value={formData.businessName || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <select
              name="ownerType"
              value={formData.ownerType || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Type</option>
              <option value="businessPlan">Business Plan</option>
              <option value="businessProfile">Business Profile</option>
            </select>

            {/* PLAN FIELDS */}
            {formData.ownerType === "businessPlan" && (
              <>
                <input
                  name="mission"
                  placeholder="Mission"
                  value={formData.mission || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  name="vision"
                  placeholder="Vision"
                  value={formData.vision || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <textarea
                  name="productsServices"
                  placeholder="Products & Services"
                  value={formData.productsServices || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  name="targetMarket"
                  placeholder="Target Market"
                  value={formData.targetMarket || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  name="competitors"
                  placeholder="Competitors"
                  value={formData.competitors || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  name="marketingStrategy"
                  placeholder="Marketing Strategy"
                  value={formData.marketingStrategy || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  name="financialOverview"
                  placeholder="Financial Overview"
                  value={formData.financialOverview || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  name="estimatedRevenue"
                  placeholder="Estimated Revenue"
                  value={formData.estimatedRevenue || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  name="estimatedExpenses"
                  placeholder="Estimated Expenses"
                  value={formData.estimatedExpenses || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  name="fundingNeeded"
                  placeholder="Funding Needed"
                  value={formData.fundingNeeded || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <textarea
                  name="conclusion"
                  placeholder="Conclusion"
                  value={formData.conclusion || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </>
            )}

            {/* PROFILE FIELDS */}
            {formData.ownerType === "businessProfile" && (
              <>
                <input
                  name="businessType"
                  placeholder="Business Type"
                  value={formData.businessType || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  name="establishedYear"
                  placeholder="Established Year"
                  value={formData.establishedYear || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  name="location"
                  placeholder="Location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <textarea
                  name="servicesOffered"
                  placeholder="Services Offered"
                  value={formData.servicesOffered || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <textarea
                  name="achievements"
                  placeholder="Achievements"
                  value={formData.achievements || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  name="staffCount"
                  placeholder="Staff Count"
                  value={formData.staffCount || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  name="contactInfo"
                  placeholder="Contact Info"
                  value={formData.contactInfo || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <textarea
                  name="additionalNotes"
                  placeholder="Additional Notes"
                  value={formData.additionalNotes || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </>
            )}
          </div>
        )}

        {/* GRAPHIC DESIGN */}
        {formData.serviceType === "graphicDesign" && (
          <div className="border rounded p-4 space-y-3">
            <h2 className="font-bold text-lg">Graphic Design</h2>
             <h3 className="text-lg">Please choose whether you want us to prepare a Business Plan or a Business Profile.</h3>


            <div className="grid grid-cols-2 gap-2">
              {[
                "Ad",
                "Logo",
                "Newsletter",
                "Brochure",
                "Booklet",
                "Flier",
                "Invitation/Reply/Envelope Set",
                "Poster/Banner",
                "Program",
                "Signage",
                "Infographics",
                "Business Card",
              ].map((item) => (
                <label key={item} className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={(formData.designItems || []).includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                  />
                  {item}
                </label>
              ))}
            </div>

            <input
              name="designOther"
              placeholder="Other (Specify)"
              value={formData.designOther || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={formData.printingRequired || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    printingRequired: e.target.checked,
                  }))
                }
              />
              Printing Required
            </label>

            {formData.printingRequired && (
              <div className="border rounded p-3 space-y-2 mt-2">
                <h4 className="font-semibold">Printing Details</h4>
                <input
                  name="printQuantity"
                  type="number"
                  placeholder="Quantity"
                  value={formData.printQuantity || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  name="printSize"
                  placeholder="Size"
                  value={formData.printSize || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
                <select
                  name="printPaper"
                  value={formData.printPaper || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Paper</option>
                  <option value="matte">Matte</option>
                  <option value="gloss">Gloss</option>
                </select>
                <select
                  name="printColor"
                  value={formData.printColor || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Color</option>
                  <option value="full">Full Color</option>
                  <option value="bw">Black & White</option>
                </select>
                <input
                  type="date"
                  name="expectedDelivery"
                  placeholder="Expected Delivery Date"
                  value={formData.expectedDelivery || ""}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
            )}

            <textarea
              name="designNotes"
              placeholder="Extra Notes"
              value={formData.designNotes || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="file"
              name="designFile"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
            />
          </div>
        )}

        {/* ICT TRAINING */}
        {formData.serviceType === "ictTraining" && (
          <div className="border rounded p-4 space-y-3">
            <h3 className="font-bold text-lg">ICT Training</h3>

            <input
              name="trainingType"
              placeholder="Training Type"
              value={formData.trainingType || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="trainingDuration"
              placeholder="Duration"
              value={formData.trainingDuration || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="trainingLocation"
              placeholder="Location"
              value={formData.trainingLocation || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <textarea
              name="trainingNotes"
              placeholder="Notes"
              value={formData.trainingNotes || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        )}

        {/* COMPUTER REPAIR */}
        {formData.serviceType === "computerRepair" && (
          <div className="border rounded p-4 space-y-3">
            <h3 className="font-bold text-lg">Computer Repair</h3>

            <input
              name="deviceType"
              placeholder="Device Type"
              value={formData.deviceType || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="deviceBrand"
              placeholder="Brand"
              value={formData.deviceBrand || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              name="deviceModel"
              placeholder="Model"
              value={formData.deviceModel || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            <textarea
              name="issueDescription"
              placeholder="Describe the issue"
              value={formData.issueDescription || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        )}

        {/* OTHER SERVICES */}
        {formData.serviceType === "other" && (
          <div className="border rounded p-4 space-y-3">
            <h3 className="font-bold text-lg">Other Service</h3>

            <textarea
              name="otherServiceDescription"
              placeholder="Describe the service you need"
              value={formData.otherServiceDescription || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white font-bold ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit You Quotation"}
        </button>
      </form>
    </div>
  );
}
