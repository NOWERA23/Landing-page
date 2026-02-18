import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center">

      {/* Background Grid Images */}
      <div className="absolute inset-0 grid grid-cols-3 gap-6 p-10 opacity-20">

        {/* Horizontal Motion */}
        <img src="/Q1.jpg" className="animate-horizontal rounded-xl" />
        <img src="/Q2.png" className="animate-horizontal rounded-xl" />
        <img src="/Q3.jpg" className="animate-horizontal rounded-xl" />

        {/* Vertical Motion */}
        <img src="/Q4.jpg" className="animate-vertical rounded-xl" />
        <img src="/Q5.jpg" className="animate-vertical rounded-xl" />
        <img src="/Q6.jpg" className="animate-vertical rounded-xl" />

        {/* Static or slight movement */}
        <img src="/Q7.jpg" className="animate-horizontal rounded-xl" />
        <img src="/Q8.jpg" className="animate-vertical rounded-xl" />
        <img src="/Q9.jpg" className="animate-horizontal rounded-xl" />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 text-center max-w-3xl px-6">

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Innovating The Future Of Technology
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8">
          We are a next-generation tech company building intelligent digital 
          solutions for creators, businesses, and visionaries.
          Join us and become part of a movement shaping tomorrow.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">

          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-black px-8 py-3 rounded-xl text-lg font-semibold hover:bg-gray-200 transition"
          >
            Create Account
          </button>

        </div>
      </div>

    </div>
  );
}
