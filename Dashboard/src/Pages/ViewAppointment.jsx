import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FaArrowLeft } from "react-icons/fa";

const ViewAppointment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const appointment = location.state?.appointment || {};

    return (
        <div className="flex justify-center items-start min-h-screen mt-10 bg-gray-100 p-4">
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6">
                
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition duration-200"
                >
                    <FaArrowLeft className="mr-2" /> Back
                </button>

              
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Appointment Details</h2>

               
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <DetailItem label="Doctor Name" value={appointment.doctorId?.name} />
                    <DetailItem label="Patient Name" value={appointment.name} />
                    <DetailItem
                        label="Date"
                        value={appointment.appointmentTime ? format(new Date(appointment.appointmentTime), "dd-MM-yyyy") : "N/A"}
                    />
                    <DetailItem
                        label="Day"
                        value={appointment.appointmentTime ? format(new Date(appointment.appointmentTime), "EEEE") : "N/A"}
                    />
                    <DetailItem
                        label="Time"
                        value={appointment.appointmentTime ? format(new Date(appointment.appointmentTime), "hh:mm a") : "N/A"}
                    />
                    <div className="flex flex-col">
                        <p className="font-semibold text-gray-600">Status:</p>
                        <span className={`px-3 py-1 w-fit rounded-lg font-semibold text-sm shadow-md 
                            ${appointment.status === "Confirmed" ? "bg-green-100 text-green-800" :
                                appointment.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                    "bg-red-100 text-red-800"}`}
                        >
                            {appointment.status || "N/A"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};


const DetailItem = ({ label, value }) => (
    <div className="flex flex-col">
        <p className="font-semibold text-gray-600">{label}:</p>
        <p className="text-lg text-gray-800 font-medium">{value || "N/A"}</p>
    </div>
);

export default ViewAppointment;
