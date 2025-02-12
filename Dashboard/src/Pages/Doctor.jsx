import React from "react";
import DataTable from "react-data-table-component";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetAllDoctorsQuery } from "../Api/doctorApi";

const customStyles = {
    table: { style: { border: "1px solid #ddd" } },
    rows: { style: { borderBottom: "1px solid #ddd" } },
    headRow: { style: { borderBottom: "2px solid #ddd" } },
};
const Doctor = () => {

    const navigate = useNavigate();
    
    const { data: doctorData, error, isLoading } = useGetAllDoctorsQuery();
    const doctorList = doctorData?.data || [];
   

    const columns = [
        { name: "Doctor Name", selector: (row) => row.name, sortable: true },
        { name: "Speciality", selector: (row) => row.speciality },
        { name: "Email", selector: (row) => row.email, sortable: true },
        { name: "Mobile", selector: (row) => row.mobile },
        { name: "Consulting Time", selector: (row) => row.consultingTime ? `${row.consultingTime} minutes` : "Unknown" },

        {
            name: "Action",
            cell: (row) => (
                <div className="flex gap-2">
                    <button className="text-blue-500 hover:text-blue-700"
                        onClick={() => navigate(`/updatedoctor/${row._id}`)}
                    >
                        <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700"
                      onClick={() => navigate("/deletedoctor", { state: { doctorId: row._id } })}
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
                    <h4 className="font-bold text-lg">Doctor Schedule List</h4>
                    <button
                        className="flex items-center px-4 py-2 bg-sky-500 text-white text-sm rounded-md hover:bg-blue-700"
                        onClick={() => navigate("/adddoctor")}
                    >
                        <FaPlus className="mr-2" /> Add Doctor
                    </button>
                </div>

               
                {isLoading && (
                    <div className="flex justify-center items-center py-4">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                {error && <p className="text-red-500">Failed to fetch doctors</p>}


                {!isLoading && !error && (
                    <DataTable
                        columns={columns}
                        data={doctorList}
                        pagination
                        highlightOnHover
                        striped
                        responsive
                        defaultSortField="name"
                        customStyles={customStyles}
                    />

                )}
            </div>
        </div>
    );
};

export default Doctor;
