"use client";

import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function EventTicketWebsite() {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    personName: "",
    eventName: "",
    numberOfAttendees: "",
    dateTime: "",
    address: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGeneratePDF = async () => {
    const ticketElement = ticketRef.current;

    if (!ticketElement) {
      console.error("Ticket element is not available.");
      return;
    }

    try {
      const canvas = await html2canvas(ticketElement, {
        scale: 2, // High-resolution rendering
        useCORS: true,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("event-ticket.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white">
      <div className="bg-white text-red-600 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-center text-3xl font-bold mb-6">Event Ticket Generator</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGeneratePDF();
          }}
          className="space-y-4"
        >
          <input
            type="text"
            name="personName"
            placeholder="Enter your name"
            value={formData.personName}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg text-red-700"
            required
          />
          <select
            name="eventName"
            value={formData.eventName}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg text-red-700 bg-white"
            required
          >
            <option value="" disabled>
              اختر الفعالية
            </option>
            <option value="كلاب الهاسكي">كلاب الهاسكي</option>
            <option value="الدب">الدب</option>
            <option value="الأكواخ في الريف الروسي">الأكواخ في الريف الروسي</option>
            <option value="سيارات الدريفت">سيارات الدريفت</option>
            <option value="هليكوبتر">هليكوبتر</option>
            <option value="دبابات كبيرة">دبابات كبيرة</option>
          </select>
          <input
            type="number"
            name="numberOfAttendees"
            placeholder="Enter number of attendees"
            value={formData.numberOfAttendees}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg text-red-700"
            required
          />
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg text-red-700"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Enter the event address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg text-red-700"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg"
          >
            Generate PDF Ticket
          </button>
        </form>
      </div>

      {/* Ticket Design */}
      <div
        ref={ticketRef}
        className="w-[450px] h-auto text-white rounded-lg flex flex-col items-center justify-between p-6 mt-10 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #FF0000 0%, #D00000 100%)',
        }}      >
        {/* Header Section with Logo and Ticket Number */}
        <div className="w-full flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="Sharrafa Logo" className="h-16 w-auto" />
          </div>
          {/* Ticket Number */}
          <div className="bg-red-800 px-6 py-2 rounded-full shadow-md">
            <p className="text-2xl">03255</p>
          </div>
        </div>

        {/* Ticket Information */}
        <div className="w-full space-y-4 text-center mt-6">
          {/* Person Name */}
          <div className="bg-white text-red-700 rounded-full py-3 shadow-md">
            <p className="text-xl">{formData.personName || "اسم الشخص"}</p>
          </div>

          {/* Number of Attendees and Event Type (side by side) */}
          <div className="flex space-x-4 justify-between">
            <div className="w-1/2 bg-white text-red-700 rounded-full py-3 shadow-md">
              <p className="text-xl">{formData.numberOfAttendees || "عدد الاشخاص"}</p>
            </div>
            <div className="w-1/2 bg-white text-red-700 rounded-full py-3 shadow-md">
              <p className="text-xl">{formData.eventName || "اسم الفعالية"}</p>
            </div>
          </div>

          {/* Time */}
          <div className="bg-white text-red-700 rounded-full py-3 shadow-md">
            <p className="text-xl">
              {formData.dateTime
                ? new Date(formData.dateTime).toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }).replace(",", " -")
                : "الوقت"}
            </p>
          </div>

          {/* Address */}
          <div className="bg-white text-red-700 rounded-full py-3 shadow-md">
            <p className="text-xl">{formData.address || "العنوان"}</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm mt-6">ENJOY IN RUSSIA..</p>
      </div>

    </div>
  );
}
