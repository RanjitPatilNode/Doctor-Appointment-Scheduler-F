import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddDoctorMutation } from "../Api/createDoctorApi"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const AddDoctor = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        speciality: "",
        consultingTime: "",
    });

    const navigate = useNavigate();
    const [addDoctor, { isLoading }] = useAddDoctorMutation(); 

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "consultingTime" ? Number(value) : value, 
        });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await addDoctor(formData).unwrap(); 

            console.log("API Response:", response); 

            
            if (response?.success || response?.status === 200 || response?.message?.toLowerCase().includes("success")) {
                toast.success("Doctor added successfully!");

                
                setTimeout(() => {
                    navigate("/doctor"); 
                    setTimeout(() => {
                        window.location.reload(); 
                    }, 500);
                }, 1500);
            } else {
                throw new Error("Unexpected API response: " + JSON.stringify(response));
            }
        } catch (error) {
            toast.error("Failed to add doctor. Please try again.");
            console.error("Error:", error);
        }
    };



    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Add Doctor</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Doctor Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Speciality</label>
                        <input
                            type="text"
                            name="speciality"
                            value={formData.speciality}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Consulting Time (in minutes)</label>
                        <input
                            type="number" 
                            name="consultingTime"
                            value={formData.consultingTime}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="e.g., 30"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => navigate("/doctor")}
                            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading} 
                            className={`px-4 py-2 text-white rounded-md ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                        >
                            {isLoading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;
