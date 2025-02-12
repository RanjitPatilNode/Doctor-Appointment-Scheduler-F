import { useGetDashboardStatsQuery } from "../Api/dashboardApi";
import { FaUserMd, FaUserInjured, FaCalendarCheck } from "react-icons/fa";

const Dashboard = () => {
    const { data, error, isLoading } = useGetDashboardStatsQuery();
    const stats = data?.data; 

    return (
        <div className="p-4">
            <div className="bg-gray-200 p-4 rounded-md shadow-md">
            
                <h3 className="text-3xl font-bold text-blue-500 mb-6">Welcome to the Admin Dashboard!</h3>


                
                {isLoading && <p className="text-blue-500">Loading stats...</p>}
                {error && <p className="text-red-500">Failed to load stats!</p>}

                
                {stats && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                       
                        <div className="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <FaCalendarCheck className="text-blue-500 text-4xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Appointments</h3>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalAppointments}</p>
                                <p className="text-gray-500 text-sm">Manage all scheduled appointments efficiently.</p>
                            </div>
                        </div>



                      
                        <div className="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <FaUserMd className="text-green-500 text-4xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Doctors</h3>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</p>
                                <p className="text-gray-500 text-sm">Track and manage doctors working in the hospital.</p>
                            </div>
                        </div>


                        <div className="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4">
                            <div className="bg-red-100 p-3 rounded-lg">
                                <FaUserInjured className="text-red-500 text-4xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Patients</h3>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
                                <p className="text-gray-500 text-sm">Monitor patient records and healthcare history.</p>
                            </div>
                        </div>

                    </div>
                )}

               
                <div className="mt-6 p-4 bg-white rounded-md shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Dashboard Overview</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>Track real-time updates on hospital operations.</li>
                        <li>Monitor scheduled appointments with ease.</li>
                        <li>Manage doctor and patient records effectively.</li>
                        <li>Ensure smooth hospital administration.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
