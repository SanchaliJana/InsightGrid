

// import { useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";


// function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/login", form);
//       setMessage(res.data.msg);
//       localStorage.setItem("token", res.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setMessage(err.response?.data?.msg || "Login failed");
//     }
//   };

//   return (
    
//     <div className="flex flex-col min-h-screen">
//       {/* Content Section */}
//       <div
//         className="flex flex-grow bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://denison.edu/sites/default/files/styles/original/public/section-hero/2023-03/shutterstock_1142996930.jpg?itok=7l0a1nMB')",
//         }}
//       >
//         {/* Left Panel */}
//         <div className="w-full max-w-lg bg-white/15 backdrop-blur-md flex flex-col justify-center px-20 py-20 shadow-xl rounded-r-xl">
//           <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">
//             Excel Analytics
//           </h2>

//           {message && (
//             <p
//               className={`text-center mb-4 text-sm ${
//                 message.toLowerCase().includes("success")
//                   ? "text-green-700"
//                   : "text-red-500"
//               }`}
//             >
//               {message}
//             </p>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full py-3 bg-teal-700 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-400 transition duration-300"
//             >
//               Login
//             </button>
//           </form>

//           <p className="mt-6 text-center text-sm text-white">
//             Don't have an account?{" "}
//             <a
//               href="/register"
//               className="text-yellow-400 font-medium hover:underline"
//             >
//               Register here
//             </a>
//           </p>
//         </div>

//         {/* Right Side Spacer */}
//         <div className="flex-1" />
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";



function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      setMessage(res.data.msg);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      

      {/* Content Section */}
      <div
        className="flex flex-grow bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://denison.edu/sites/default/files/styles/original/public/section-hero/2023-03/shutterstock_1142996930.jpg?itok=7l0a1nMB')",
        }}
      >
        {/* Left Panel */}
        <div className="w-full max-w-lg bg-white/15 backdrop-blur-md flex flex-col justify-center px-20 py-20 shadow-xl rounded-r-xl">
          <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">
            Smarter Excel starts here — just one click away!
          </h2>

          {message && (
            <p
              className={`text-center mb-4 text-sm ${
                message.toLowerCase().includes("success")
                  ? "text-green-700"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-teal-700 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-400 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-yellow-400 font-medium hover:underline"
            >
              Register here
            </a>
          </p>
        </div>

        {/* Right Side Spacer */}
        <div className="flex-1" />
      </div>

      
    </div>
  );
}

export default Login;
