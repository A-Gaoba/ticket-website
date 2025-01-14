"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import Image from 'next/image';

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

  const handleSaveAsImage = async () => {
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
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${formData.personName}.png`;
      link.click();
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <main className="min-h-screen flex flex-col items-center justify-center text-white">
        <div className="bg-white text-red-600 p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-center text-3xl font-bold mb-6">Event Ticket Generator</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveAsImage();
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
              Save Ticket as Image
            </button>
          </form>
        </div>

        {/* Ticket Design */}
        <div
          ref={ticketRef}
          className="w-full h-auto text-white rounded-lg flex flex-col items-center justify-between py-4 px-6 mt-10 shadow-lg"
          style={{
            backgroundImage: 'url(/bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Header Section with Logo and Ticket Number */}
          <div className="w-full flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <Image src="/logo.png" alt="Sharrafa Logo" className="h-36 w-36" />
            </div>
            {/* Ticket Number */}
            <div className="bg-red-600 px-6 py-2 rounded-full shadow-md">
              <p className="text-2xl mb-4">03255</p>
            </div>
          </div>

          {/* Ticket Information */}
          <div className="w-full space-y-4 text-center mt-6">
            {/* Person Name */}
            <div className="bg-white text-red-600 rounded-full py-1 shadow-md">
              <p className="text-base font-bold flex justify-center items-center mb-4">{formData.personName || "اسم الشخص"}</p>
            </div>

            {/* Number of Attendees and Event Type (side by side) */}
            <div className="flex space-x-4 justify-between">
              <div className="w-1/2 bg-white text-red-600 rounded-full py-1 shadow-md">
                <p className=" text-base font-bold flex justify-center items-center mb-4">{formData.numberOfAttendees || "عدد الاشخاص"}</p>
              </div>
              <div className="w-1/2 bg-white text-red-600 rounded-full py-1 shadow-md">
                <p className="text-base font-bold flex justify-center items-center mb-4">{formData.eventName || "اسم الفعالية"}</p>
              </div>
            </div>

            {/* Time and Address (side by side) */}
            <div className="flex space-x-4 justify-between">
              {/* Time */}
              <div className="w-1/2 h-24 bg-white text-red-600 rounded-xl flex justify-center items-center shadow-md">
                <p className="text-base font-bold flex justify-center items-center mb-4">
                  {formData.dateTime
                    ? new Date(formData.dateTime).toLocaleString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                    : "الوقت"}
                </p>
              </div>

              {/* Address */}
              <div className="w-1/2 h-24 bg-white text-red-600 rounded-xl flex justify-center items-center shadow-md">
                <p className="text-base font-bold flex justify-center items-center mb-4">{formData.address || "العنوان"}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-sm mt-6 text-white">ENJOY IN <span className=" font-bold">RUSSIA..</span></p>
        </div>
      </main>
    </div>

  );
}
