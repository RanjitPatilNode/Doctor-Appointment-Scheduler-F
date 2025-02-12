import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDeleteAppointmentMutation } from "../Api/deleteAppointmentApi";
import { toast } from "react-toastify";

const DeleteAppointment = ({ onClose }) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const appointmentId = state?.appointmentId;
    const [deleteAppointment] = useDeleteAppointmentMutation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Received appointmentId from state:", appointmentId);
    }, [appointmentId]);
    const appointmentData = state?.appointment || {};

    const handleConfirmDelete = async () => {
        if (!appointmentId) {
            toast.error("Invalid appointment ID!");
            return;
        }
    
        // console.log("Deleting appointment with ID:", appointmentId); 
        setLoading(true);
    
        try {
            await deleteAppointment(appointmentId).unwrap(); 
            toast.success("Appointment deleted successfully!");
            setTimeout(() => {
                navigate("/appointments");
                window.location.reload();
            }, 1500);
        } catch (err) {
            console.error("Failed to delete appointment:", err);
            toast.error("Failed to delete appointment.");
        } finally {
            setLoading(false);
            if (onClose) onClose();
        }
    };
    

    if (!appointmentId) {
        return <p className="text-red-500">Invalid appointment ID!</p>;
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold text-gray-800">Confirm Delete</h2>
                <p className="text-gray-600">Are you sure you want to delete this appointment?</p>
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        onClick={() => navigate("/appointments")}
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

export default DeleteAppointment;
