import { useState } from "react";
import emailjs from "@emailjs/browser";
import logo from "../../assets/mas_logo.png";

const SERVICE_ID = "service_6aortmj"; // your SMTP service
const TEMPLATE_ID = "template_hnf1p28"; // 🔴 REPLACE with real template ID
const PUBLIC_KEY = "DM_12DqWUPEMSUyxU";

/* ================= TOOLTIP ================= */
// const Tooltip = ({ text }) => (
//   <span
//     className="relative group ml-1 cursor-pointer text-gray-500"
//     aria-label={text}
//     role="tooltip"
//   >
//     ℹ️
//     <span className="absolute z-10 hidden group-hover:block w-60 p-2 text-xs text-white bg-gray-800 rounded shadow-lg -top-2 left-6">
//       {text}
//     </span>
//   </span>
// );

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
          <option value="ictTraining">ICT Support or Training</option>
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
          <div className="border rounded p-4 space-y-4">
            <h2 className="font-bold text-lg">Graphic Design</h2>

            <p className="text-sm text-gray-600">
              Please select the type of design you need. Select all that apply. If printing
              is required, tick the checkbox below and complete the printing details.
            </p>

            {/* DESIGN TYPE CHECKLIST */}
            <div>
              <p className="font-medium mb-2">Design Type</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Ad",
                  "Logo",
                  "Newsletter",
                  "Brochure",
                  "Booklet",
                  "Flyer",
                  "Invitation/Reply/Envelope Set",
                  "Poster/Banner",
                  "Program",
                  "Signage",
                  "Infographics",
                  "Business Cards",
                ].map((item) => (
                  <label key={item} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={(formData.designItems || []).includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* OTHER */}
            <div>
              <label className="text-sm font-medium">Other</label>
              <input
                name="designOther"
                placeholder="Specify another design type"
                value={formData.designOther || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>

            {/* PRINTING REQUIRED */}
            <label className="flex items-center gap-2 mt-2 font-medium">
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

            {/* PRINTING DETAILS */}
            {formData.printingRequired && (
              <div className="border rounded p-3 space-y-3 mt-2 bg-gray-50">
                <h4 className="font-semibold">Printing Details</h4>

                <div>
                  <label className="text-sm font-medium">Quantity *</label>
                  <input
                    name="printQuantity"
                    type="number"
                    value={formData.printQuantity || ""}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Size</label>
                  <input
                    name="printSize"
                    placeholder="e.g. A4, 8.5 x 11"
                    value={formData.printSize || ""}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Paper Type</label>
                  <select
                    name="printPaper"
                    value={formData.printPaper || ""}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mt-1"
                  >
                    <option value="">Select paper type</option>
                    <option value="matte">Matte</option>
                    <option value="gloss">Gloss</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Color</label>
                  <select
                    name="printColor"
                    value={formData.printColor || ""}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mt-1"
                  >
                    <option value="">Select color option</option>
                    <option value="full">Full Color</option>
                    <option value="bw">Black & White</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Needed By *</label>
                  <input
                    type="date"
                    name="expectedDelivery"
                    value={formData.expectedDelivery || ""}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                </div>
              </div>
            )}

            {/* NOTES */}
            <div>
              <label className="text-sm font-medium">Extra Notes</label>
              <textarea
                name="designNotes"
                placeholder="Include deadlines, special instructions, or references"
                value={formData.designNotes || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>

            {/* FILE UPLOAD */}
            <div>
              <label className="text-sm font-medium">Attach files if you already have artwork, need printing only, or want to share a sketch or concept(optional)</label>
              <input
                type="file"
                name="designFile"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className="mt-1"
              />
            </div>
          </div>
        )}

{/* ICT SUPPORT / TRAINING */}
{formData.serviceType === "ictTraining" && (
  <div className="border rounded p-4 space-y-4">
    <h3 className="font-bold text-lg">ICT Support or Training</h3>

    <p className="text-sm text-gray-600">
      Please select the type of ICT service you need so we can gather the right
      information.
    </p>

    {/* SERVICE SELECTION */}
    <div>
      <label className="font-medium block mb-2">
        Service Type <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="ictServiceType"
            value="support"
            checked={formData.ictServiceType === "support"}
            onChange={handleChange}
          />
          ICT Support
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="ictServiceType"
            value="training"
            checked={formData.ictServiceType === "training"}
            onChange={handleChange}
          />
          ICT Training
        </label>
      </div>
    </div>

    {/* ICT SUPPORT FORM */}
    {formData.ictServiceType === "support" && (
      <div className="border rounded p-3 space-y-3 bg-gray-50">
        <h4 className="font-semibold">ICT Support Details</h4>

        <div>
          <label className="text-sm font-medium">
            Type of Issue <span className="text-red-500">*</span>
          </label>
          <input
            name="supportIssueType"
            placeholder="e.g. Network, Hardware, Software"
            value={formData.supportIssueType || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Urgency Level <span className="text-red-500">*</span>
          </label>
          <select
            name="supportUrgency"
            value={formData.supportUrgency || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
            required
          >
            <option value="">Select urgency</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Location</label>
          <input
            name="supportLocation"
            placeholder="On-site or Remote"
            value={formData.supportLocation || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Issue Description</label>
          <textarea
            name="supportNotes"
            placeholder="Describe the issue in detail"
            value={formData.supportNotes || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>
      </div>
    )}

            {/* ICT TRAINING FORM */}
            {formData.ictServiceType === "training" && (
              <div className="border rounded p-3 space-y-3 bg-gray-50">
                <h4 className="font-semibold">ICT Training Details</h4>

                <div>
                  <label className="text-sm font-medium">
                    Training Topic <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="trainingTopic"
                    placeholder="e.g. Microsoft Excel, Cybersecurity, Basic Computing"
                    value={formData.trainingTopic || ""}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="trainingDuration"
                    placeholder="e.g. 2 hours, 1 day, 1 week"
                    value={formData.trainingDuration || ""}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Preferred Location</label>
                  <input
                    name="trainingLocation"
                    placeholder="On-site or Online"
                    value={formData.trainingLocation || ""}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Additional Notes</label>
                  <textarea
                    name="trainingNotes"
                    placeholder="Number of participants, skill level, goals"
                    value={formData.trainingNotes || ""}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                </div>
              </div>
            )}
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
