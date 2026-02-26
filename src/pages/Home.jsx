import { useEffect, useState } from "react";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);

  const images = [
    "/Q1.jpg",
    "/Q2.png",
    "/Q3.jpg",
    "/Q4.jpg",
    "/Q5.jpg",
    "/Q6.jpg",
    "/Q7.jpg",
    "/Q8.jpg",
    "/Q9.jpg",
  ];

  // Start fullscreen slideshow after 5 seconds
  useEffect(() => {
    const startDelay = setTimeout(() => {
      let index = 0;
      setActiveIndex(index);

      const interval = setInterval(() => {
        index = (index + 1) % images.length;
        setActiveIndex(index);
      }, 5000);

      return () => clearInterval(interval);
    }, 5000);

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">

      {/* Floating Images (first 5 seconds only) */}
      {activeIndex === null &&
        images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="tech"
            className={`absolute w-40 h-32 md:w-60 md:h-44 object-cover rounded-2xl opacity-70 floating floating-${index % 6}`}
          />
        ))}

      {/* Fullscreen Image Slideshow */}
      {activeIndex !== null && (
        <img
          src={images[activeIndex]}
          alt="fullscreen"
          className="absolute w-full h-full object-cover transition-opacity duration-1000"
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">

        <h1 className="text-3xl md:text-6xl font-bold mb-6 tracking-wide">
          QUANTUM TECH
        </h1>

        <p className="max-w-2xl text-sm md:text-lg mb-8 text-gray-200">
          Powering innovation. Transforming businesses. Building the future of
          intelligent systems, digital platforms, and secure technology
          solutions. Join a company that leads tomorrow.
        </p>

        <div className="flex gap-6 flex-wrap justify-center">
          <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-full font-semibold transition-all duration-300 shadow-lg">
            Login
          </button>

          <button className="px-8 py-3 border-2 border-white hover:bg-white hover:text-black rounded-full font-semibold transition-all duration-300">
            Sign Up
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          .floating {
            animation: float 6s ease-in-out infinite;
          }

          .floating-0 { top: 10%; left: 10%; animation-delay: 0s; }
          .floating-1 { top: 20%; right: 15%; animation-delay: 1s; }
          .floating-2 { bottom: 20%; left: 20%; animation-delay: 2s; }
          .floating-3 { bottom: 10%; right: 10%; animation-delay: 3s; }
          .floating-4 { top: 40%; left: 40%; animation-delay: 4s; }
          .floating-5 { bottom: 40%; right: 40%; animation-delay: 5s; }

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-30px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
}
