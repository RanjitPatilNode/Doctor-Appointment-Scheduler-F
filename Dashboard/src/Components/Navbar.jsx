import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-sky-700 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold">Appointment Scheduler</h1>
      <div>
        <Link to="/dashboard" className="mx-4">Dashboard</Link>
        <Link to="/doctor" className="mx-4">Doctor</Link>
        <Link to="/appointments" className="mx-4">Book Appointment</Link>
        <Link to="/calender" className="mx-4">Calender</Link>
      </div>
    </nav>
  );
};
export default Navbar;