import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdatePatientMutation } from "../Api/updaateAppointment";
import { useGetAllDoctorsQuery } from "../Api/doctorApi";
import { toast } from "react-toastify";

const UpdateAppointment = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [updatePatient, { isLoading }] = useUpdatePatientMutation();

    const appointmentData = state?.appointment || {};

    const { data: doctorData, error: doctorError, isLoading: isDoctorsLoading } = useGetAllDoctorsQuery();


    useEffect(() => {
        if (!appointmentData._id) {
            toast.error("No appointment data found!");
            navigate("/appointments");
        }
    }, [appointmentData, navigate]);

    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toISOString().slice(0, 16); 
    };

    
    const [formData, setFormData] = useState({
        patientId: appointmentData._id || "",
        doctorId: appointmentData.doctorId?._id || "",
        name: appointmentData.name || "",
        age: appointmentData.age || "",
        appointmentTime: formatDateForInput(appointmentData.appointmentTime), 
        dateOfBirth: appointmentData.dateOfBirth || "",
        mobile: appointmentData.mobile || "",
        address: appointmentData.address || "",
        maritalStatus: appointmentData.maritalStatus || "",
        gender: appointmentData.gender || "",
        patientType: appointmentData.patientType || "",
    });

    useEffect(() => {
        setFormData({
            patientId: appointmentData._id || "",
            doctorId: appointmentData.doctorId?._id || "",
            name: appointmentData.name || "",
            age: appointmentData.age || "",
            appointmentTime: formatDateForInput(appointmentData.appointmentTime), 
            dateOfBirth: appointmentData.dateOfBirth || "",
            mobile: appointmentData.mobile || "",
            address: appointmentData.address || "",
            maritalStatus: appointmentData.maritalStatus || "",
            gender: appointmentData.gender || "",
            patientType: appointmentData.patientType || "",
        });
    }, [appointmentData]);

   
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("🔍 Payload sent to API:", formData); 

        try {
            const response = await updatePatient(formData).unwrap();
            console.log("✅ API Response:", response); 

            if (response.error_code === 200) {
                toast.success("Appointment updated successfully!");
                setTimeout(() => {
                    navigate("/appointments");
                    window.location.reload();
                }, 1500);
            } else {
                toast.error(response.message || "Failed to update appointment.");
            }
        } catch (error) {
            console.error("❌ Update Error:", error);
            toast.error(error?.data?.message || "Failed to update appointment.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Update Appointment</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                 
                    <div>
                        <label className="block text-gray-700 font-medium">Patient Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                   
                    <div>
                        <label className="block text-gray-700 font-medium">Appointment Date & Time</label>
                        <input
                            type="datetime-local"
                            name="appointmentTime"
                            value={formData.appointmentTime}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                  
                    <div>
                        <label className="block text-gray-700 font-medium">Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                 
                    <div>
                        <label className="block text-gray-700 font-medium">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     
                        <div>
                            <label className="block text-gray-700 font-medium">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
                                required
                            />
                        </div>

                      
                        <div>
                            <label className="block text-gray-700 font-medium">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth?.split("T")[0]} 
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div>
                            <label className="block text-gray-700 font-medium">Marital Status</label>
                            <select
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
                                required
                            >
                                <option value="">Select</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                            </select>
                        </div>

                      
                        <div>
                            <label className="block text-gray-700 font-medium">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
                                required
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                   
                    <div>
                        <label className="block text-gray-700 font-medium">Select Doctor</label>
                        <select
                            name="doctorId"
                            value={formData.doctorId}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
                            required
                        >
                            <option value="">Choose a Doctor</option>
                            {doctorData?.data?.map((doc) => (
                                <option key={doc._id} value={doc._id}>
                                    {doc.name}
                                </option>
                            ))}
                        </select>
                    </div>

                   
                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/appointments")}
                            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            {isLoading ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default UpdateAppointment;
