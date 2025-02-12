import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookAppointment from "./Pages/BookAppointment";
import Homepage from "./Pages/Homepage";
import SidebarMenu from "./Components/SidebarMenu";
import Doctor from "./Pages/Doctor";
import Calender from "./Pages/Calender";
import AddDoctor from "./Pages/AddDoctor";
import Appointment from "./Pages/Appointment";
import { ToastContainer } from "react-toastify";
import UpdateDoctor from "./Pages/UpdateDoctor";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import DeleteDoctor from "./Pages/DeleteDoctor";
import UpdateAppointment from "./Pages/UpdateAppointment";
import DeleteAppointment from "./Pages/DeleteAppointment";
import ViewAppointment from "./Pages/ViewAppointment";
import Login from "./Pages/Login";

const App = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = () => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <ToastContainer position="top-right" autoClose={2000} />

            <Routes>
             
                <Route path="/" element={isAuthenticated ? <Navigate to="/homepage" replace /> : <Navigate to="/login" replace />} />

              
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

               
                <Route path="/*" element={isAuthenticated ? <AuthenticatedLayout /> : <Navigate to="/login" replace />} />
            </Routes>
        </div>
    );
};


const AuthenticatedLayout = () => {
    return (
        <div className="flex w-full">
            
            <div className="w-64">
                <SidebarMenu />
            </div>

            
            <div className="flex-1 p-4 overflow-auto w-[calc(100%-16rem)]">
                <Routes>
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/bookappointment" element={<BookAppointment />} />
                    <Route path="/appointments" element={<Appointment />} />
                    <Route path="/doctor" element={<Doctor />} />
                    <Route path="/calender" element={<Calender />} />
                    <Route path="/adddoctor" element={<AddDoctor />} />
                    <Route path="/updatedoctor/:id" element={<UpdateDoctor />} />
                    <Route path="/deletedoctor" element={<DeleteDoctor />} />
                    <Route path="/updateappointment" element={<UpdateAppointment />} />
                    <Route path="/deleteAppointment" element={<DeleteAppointment />} />
                    <Route path="/viewappointment/:id" element={<ViewAppointment />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
