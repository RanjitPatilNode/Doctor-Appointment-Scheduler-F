import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginAdminMutation } from "../Api/authApi";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();
    const [loginAdmin, { isLoading }] = useLoginAdminMutation();

    const handleLogin = async (e) => { 
        e.preventDefault();
        setMessage(null);

        try {
            const response = await loginAdmin({ email, password }).unwrap();
            localStorage.setItem("token", response.token);
            setIsAuthenticated(true);
            navigate("/homepage");

            setMessage("✅ Login successful! ");
            setIsSuccess(true);

            setTimeout(() => navigate("/homepage"), 2000);
        } catch (err) {
            setMessage("❌ Login failed! Check your credentials.");
            setIsSuccess(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-[100%] min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                 
                    <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                   
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-300 shadow-md"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {message && (
                    <p className={`mt-4 text-sm font-medium text-center ${isSuccess ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
