import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDeleteDoctorMutation } from "../Api/deleteDoctor";
import { toast } from "react-toastify";
import {useNavigate } from "react-router-dom"; 


const DeleteDoctor = ({ onClose }) => {
    const { state } = useLocation();
    const navigate = useNavigate(); 
    const doctorId = state?.doctorId;
    const [deleteDoctor] = useDeleteDoctorMutation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Received doctorId from state:", doctorId);
    }, [doctorId]);

    const handleConfirmDelete = async () => {
        if (!doctorId || doctorId.trim() === "") {
            toast.error("Invalid doctor ID!");
            return;  
        }
    
        console.log("Sending DELETE request for Doctor ID:", doctorId);
        setLoading(true);
        try {
            const response = await deleteDoctor(doctorId).unwrap();
            console.log("Delete response:", response);
            toast.success("Doctor deleted successfully!");
            setTimeout(() => {
                navigate("/doctor"); 
                window.location.reload();
            }, 1500);
        } catch (err) {
            console.error("Failed to delete doctor:", err);
            toast.error(err?.data?.message || "Failed to delete doctor.");
        } finally {
            setLoading(false);
            onClose();  
        }
    };
    

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold text-gray-800">Confirm Delete</h2>
                <p className="text-gray-600">Are you sure you want to delete this doctor?</p>
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        onClick={() => navigate("/doctor")}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={handleConfirmDelete}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDoctor;
