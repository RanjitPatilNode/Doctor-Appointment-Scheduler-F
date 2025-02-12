import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


const bookedAppointments = {
    "2025-02-10": ["10:00 AM", "11:30 AM", "2:00 PM"],
    "2025-02-11": ["9:00 AM", "12:00 PM", "4:30 PM"],
    "2025-02-12": ["10:00 AM", "1:30 PM", "3:00 PM"],
};

const CalenderView = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [bookedSlots, setBookedSlots] = useState([]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date.toISOString().split("T")[0];
        setBookedSlots(bookedAppointments[formattedDate] || []);
    };

    
    const tileClassName = ({ date, view }) => {
        if (view === "month") {
            const formattedDate = date.toISOString().split("T")[0];
            return bookedAppointments[formattedDate] ? "bg-blue-100 rounded-full" : "";
        }
        return "";
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold mb-4">Appointment Calendar</h2>

            
            <div className="flex flex-col md:flex-row items-start gap-6 bg-white shadow-lg p-6 rounded-lg">
                
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        tileClassName={tileClassName}
                        className="border rounded-md"
                    />
                </div>

                
                <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">Scheduled Appointments:</h3>
                    {bookedSlots.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                            {bookedSlots.map((slot, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                                >
                                    {slot}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No appointments scheduled for this date.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalenderView;
