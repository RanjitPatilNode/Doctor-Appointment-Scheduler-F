import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserMd, FaCalendarCheck, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";

const SidebarMenu = () => {
    const [isOpen, setIsOpen] = useState(true); // Sidebar toggle

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-6 left-4 z-50 bg-blue-500 text-white p-2 rounded-lg shadow-md"
            >
                {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>

            {/* Sidebar Container */}
            <div
                className={`fixed top-0 left-0 h-[90vh] m-2 mt-8 rounded-b-lg ${isOpen ? "w-64" : "w-0 md:w-64"
                    } bg-gradient-to-b from-blue-500 to-blue-700 text-white p-5 border-r border-blue-900 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden`}
            >
                {/* Sidebar Header */}
                <h1 className="text-2xl font-bold mb-6 text-center">VitalAppointments </h1>

                {/* Navigation Links */}
                <nav className="space-y-4">
                    <Link
                        to="/"
                        className="flex items-center space-x-3 py-3 px-4 hover:bg-blue-600 rounded-lg transition-all border"
                    >
                        <FaTachometerAlt size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        to="/doctor"
                        className="flex items-center space-x-3 py-3 px-4 hover:bg-blue-600 rounded-lg transition-all border"
                    >
                        <FaUserMd size={20} />
                        <span>Doctor</span>
                    </Link>
                    <Link
                        to="/appointments"
                        className="flex items-center space-x-3 py-3 px-4 hover:bg-blue-600 rounded-lg transition-all border"
                    >
                        <FaCalendarCheck size={20} />
                        <span>Appointment</span>
                    </Link>
                    <Link
                        to="/calender"
                        className="flex items-center space-x-3 py-3 px-4 hover:bg-blue-600 rounded-lg transition-all border"
                    >
                        <FaCalendarCheck size={20} />
                        <span>Calendar</span>
                    </Link>
                    <Link
                        to="/login"
                        className="flex items-center space-x-3 py-3 px-4  hover:bg-blue-600 rounded-lg transition-all border shadow-md"
                    >
                        <FaSignOutAlt size={20} />
                        <span className="font-semibold">Log Out</span>
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default SidebarMenu;
