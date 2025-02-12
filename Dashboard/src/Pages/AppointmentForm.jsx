import { useState } from "react";
import { useAddAppointmentMutation } from "../Api/createAppointmentApi";
import { useGetAllDoctorsQuery } from "../Api/doctorApi";
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify"; 

const AppointmentForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        mobile: "",
        address: "",
        gender: "",
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
        maritalStatus: "",
        patientType: "",
    });

    const { data: doctorData, isLoading: isDoctorsLoading, error: doctorError } = useGetAllDoctorsQuery();
    const [addAppointment, { isLoading: isAppointmentLoading, isError: isAppointmentError, error: appointmentError }] = useAddAppointmentMutation();

    
    const generateTimeSlots = () => {
        const slots = [];
        let start = new Date();
        start.setHours(10, 0, 0, 0);
        let end = new Date();
        end.setHours(17, 0, 0, 0);

        while (start < end) {
            slots.push(start.toTimeString().slice(0, 5));
            start = new Date(start.getTime() + 20 * 60000);
        }
        return slots;
    };
    const timeSlots = generateTimeSlots();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.appointmentDate || !formData.appointmentTime) {
            toast.error("❌ Please select both date and time!");
            return;
        }

        const formattedData = {
            ...formData,
            appointmentTime: new Date(`${formData.appointmentDate}T${formData.appointmentTime}:00`).toISOString(),
        };

        try {
            await addAppointment(formattedData).unwrap();
            toast.success("Appointment booked successfully!");

            setTimeout(() => {
                navigate("/appointments");
            }, 2000);

            setFormData({
                name: "",
                age: "",
                mobile: "",
                address: "",
                gender: "",
                doctorId: "",
                appointmentDate: "",
                appointmentTime: "",
                maritalStatus: "",
                patientType: "",
            });
        } catch (err) {
            console.error("Failed to book appointment:", err);
            toast.error(`❌ ${err?.data?.message || "Failed to book appointment!"}`);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-xl w-full max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">📅 Book an Appointment</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-3">
                        <div>
                            <label className="block text-gray-700 font-medium">Patient Name</label>
                            <input className="border p-3 w-full rounded-md" type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Age</label>
                            <input className="border p-3 w-full rounded-md" type="number" name="age" value={formData.age} onChange={handleChange} required />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Mobile Number</label>
                            <input className="border p-3 w-full rounded-md" type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Address</label>
                            <textarea className="border p-3 w-full rounded-md" name="address" value={formData.address} onChange={handleChange} required></textarea>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Gender</label>
                            <select className="border p-3 w-full rounded-md" name="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Select Doctor</label>
                            <select className="border p-3 w-full rounded-md" name="doctorId" value={formData.doctorId} onChange={handleChange} required>
                                <option value="">Choose a Doctor</option>
                                {isDoctorsLoading ? <option>Loading...</option> : doctorData?.data?.map((doc) => (
                                    <option key={doc._id} value={doc._id}>{doc.name}</option>
                                ))}
                            </select>
                        </div>

                        
                        <div>
                            <label className="block text-gray-700 font-medium">Appointment Date</label>
                            <input className="border p-3 w-full rounded-md" type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} required />
                        </div>

                    
                        <div>
                            <label className="block text-gray-700 font-medium">Appointment Time</label>
                            <select className="border p-3 w-full rounded-md" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} required>
                                <option value="">Select Time</option>
                                {timeSlots.map((time) => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Marital Status</label>
                            <select className="border p-3 w-full rounded-md" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
                                <option value="">Select Marital Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Patient Type</label>
                            <select className="border p-3 w-full rounded-md" name="patientType" value={formData.patientType} onChange={handleChange} required>
                                <option value="">Select Patient Type</option>
                                <option value="New">New</option>
                                <option value="Old">Existing</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-6 w-full hover:bg-blue-600 transition">
                    {isAppointmentLoading ? "Submitting..." : "Book Appointment"}
                </button>
            </form>
        </div>
    );
};

export default AppointmentForm;
