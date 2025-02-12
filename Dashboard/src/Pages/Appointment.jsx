import React from "react";
import DataTable from "react-data-table-component";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetAllAppointmentsQuery } from "../Api/appointmentApi";
import { format } from "date-fns";

const customStyles = {
    table: { style: { border: "1px solid #ddd" } },
    rows: { style: { borderBottom: "1px solid #ddd" } },
    headRow: { style: { borderBottom: "2px solid #ddd" } },
};

const Appointment = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetAllAppointmentsQuery();

    console.log("API Response:", data, "Error:", error, "Loading:", isLoading);

    
    const columns = [
        { name: "Sr.No.", selector: (row, index) => index + 1, sortable: true, minWidth: "80px", maxWidth: "100px", },
        { name: "Doctor Name", selector: (row) => row.doctorId?.name || "N/A", minWidth: "150px", maxWidth: "200px", }, // Fetch doctor name from doctorId
        {
            name: "Day", selector: (row) => row.appointmentTime ?
                format(new Date(row.appointmentTime), "EEEE") : "N/A", sortable: true,
        },
        {
            name: "Date", selector: (row) => row.appointmentTime ?
                format(new Date(row.appointmentTime), "dd-MM-yyyy") : "N/A", sortable: true,
        },
        {
            name: "Time", selector: (row) => row.appointmentTime ?
                format(new Date(row.appointmentTime), "hh:mm a") : "N/A", sortable: true,
        },

        { name: "Patient Name", selector: (row) => row.name || "N/A", sortable: true },
       
        {
            name: "Action",
            cell: (row) => (
                <div className="flex gap-2">

                    <button
                        className="text-green-500 hover:text-green-700"
                        onClick={() => navigate(`/viewappointment/${row._id}`, { state: { appointment: row } })}
                    >
                        <FaEye />
                    </button>



                    <button className="text-blue-500 hover:text-blue-700"
                        onClick={() => navigate("/updateappointment", { state: { appointment: row } })}
                    >
                        <FaEdit />
                    </button>
                    <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => navigate("/deleteAppointment", { state: { appointmentId: row._id } })}

                    >
                        <FaTrash />
                    </button>


                </div>
            ),
        },
    ];




    return (
        <div className="p-4">
            <div className="bg-gray-200 p-4 rounded-md shadow-md">
                
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg font-bold">Appointment List</h1>
                    <button
                        className="flex items-center px-4 py-2 bg-sky-500 text-white text-sm rounded-md hover:bg-blue-700"
                    
                        onClick={() => navigate("/bookappointment")}
                    >
                        <FaPlus className="mr-2" />
                        Take Appointment
                    </button>
                </div>

                
                {isLoading ? (
                    <div className="flex justify-center items-center py-4">
                        <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <p className="text-center text-red-500">Error fetching data</p>
                ) : (
                    <DataTable
                        columns={columns}
                        data={data?.data ? [...data.data].sort((a, b) => new Date(b.appointmentTime) - new Date(a.appointmentTime)) : []}
                        pagination
                        highlightOnHover
                        striped
                        responsive
                        defaultSortField="patientName"
                        customStyles={customStyles}
                    />
                )}

            </div>
        </div>
    );
};

export default Appointment;
