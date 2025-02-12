import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import { useGetAllDoctorsQuery } from "../Api/doctorApi";
import { useUpdateDoctorMutation } from "../Api/updateDoctor";

const UpdateDoctor = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 

    const { data: doctorData } = useGetAllDoctorsQuery();
    const [updateDoctor] = useUpdateDoctorMutation();
    const [formData, setFormData] = useState({
        name: "",
        speciality: "",
        email: "",
        mobile: "",
        consultingTime: "",
    });

    useEffect(() => {
        if (doctorData?.data) {
            const doctor = doctorData.data.find((doc) => doc._id === id);
            if (doctor) {
                setFormData({
                    name: doctor.name || "",
                    speciality: doctor.speciality || "",
                    email: doctor.email || "",
                    mobile: doctor.mobile || "",
                    consultingTime: doctor.consultingTime || "",
                });
            }
        }
    }, [doctorData, id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updateDoctor({ id, updatedDoctor: formData }).unwrap(); 

            console.log("Update Response:", response); 

            if (response.error_code === 200) { 
                toast.success("Doctor Updated Successfully!");
                // refetch();

                setTimeout(() => {
                    navigate("/doctor"); 
                    window.location.reload();
                }, 1500);  

            } else {
                toast.error("Failed to update doctor. Please try again.");
            }
        } catch (error) {
            console.error("Update Error:", error);
            toast.error("An error occurred while updating.");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Edit Doctor Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

           
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Doctor Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Doctor Name"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

               
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Speciality</label>
                    <input
                        type="text"
                        name="speciality"
                        value={formData.speciality}
                        onChange={handleChange}
                        placeholder="Enter Speciality"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

              
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

              
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Mobile</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter Mobile Number"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Consulting Time (minutes)</label>
                    <input
                        type="number"
                        name="consultingTime"
                        value={formData.consultingTime}
                        onChange={handleChange}
                        placeholder="Enter Consulting Time"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

              
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateDoctor;
