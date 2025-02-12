import React, { useState, useEffect } from "react";

const AppointmentScheduler = ({ formData, setFormData }) => {
    const [timeSlots, setTimeSlots] = useState([]);

    
    useEffect(() => {
        const slots = [];
        for (let hour = 10; hour < 17; hour++) {
            for (let minute of [0, 20, 40]) {
                const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                slots.push(time);
            }
        }
        setTimeSlots(slots); 
    }, []);

    
    const handleChange = (e) => {
        setFormData({ ...formData, appointmentTime: e.target.value });
    };

    return (
        <div>
            <label className="block text-gray-700 font-medium">Appointment Time</label>
            <select
                className="border border-gray-300 p-3 w-full rounded-md focus:ring focus:ring-blue-300"
                name="appointmentTime"
                value={formData.appointmentTime || ""}
                onChange={handleChange}
                required
            >
                <option value="">Select a time slot</option>
                {timeSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                        {slot}
                    </option>
                ))}
            </select>

            
            {!formData.appointmentTime && (
                <p className="text-red-500 text-sm mt-1">Please select a valid time slot.</p>
            )}
        </div>
    );
};

export default AppointmentScheduler;
