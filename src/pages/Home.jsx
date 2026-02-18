import { useEffect, useState } from "react";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [textIndex, setTextIndex] = useState(0);
  const [imagePositions, setImagePositions] = useState([]);
  const [bubbleData, setBubbleData] = useState([]);

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

  const texts = [
    "Innovating the Future",
    "Building Intelligent Systems",
    "Empowering Digital Transformation",
    "Engineering Tomorrow’s Technology",
    "Join The Quantum Movement",
  ];

  // Generate random floating positions ONCE
  useEffect(() => {
    const generatedPositions = images.map(() => ({
      top: Math.random() * 80,
      left: Math.random() * 80,
      duration: 6 + Math.random() * 6,
      delay: Math.random() * 5,
    }));
    setImagePositions(generatedPositions);

    const generatedBubbles = Array.from({ length: 20 }).map(() => ({
      size: 20 + Math.random() * 60,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 10,
    }));
    setBubbleData(generatedBubbles);
  }, []);

  // Headline rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fullscreen slideshow after 8 seconds
  useEffect(() => {
    const startDelay = setTimeout(() => {
      let index = 0;
      setActiveIndex(index);

      const interval = setInterval(() => {
        index = (index + 1) % images.length;
        setActiveIndex(index);
      }, 5000);

      return () => clearInterval(interval);
    }, 8000);

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* FLOATING IMAGES */}
      {activeIndex === null &&
        imagePositions.map((pos, index) => (
          <img
            key={index}
            src={images[index]}
            alt="tech"
            className="absolute w-36 h-28 md:w-60 md:h-44 object-cover rounded-xl opacity-70 animate-float"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              animationDuration: `${pos.duration}s`,
              animationDelay: `${pos.delay}s`,
            }}
          />
        ))}

      {/* FULLSCREEN SLIDESHOW */}
      {activeIndex !== null && (
        <img
          src={images[activeIndex]}
          alt="fullscreen"
          className="absolute w-full h-full object-cover transition-opacity duration-1000"
        />
      )}

      {/* BUBBLES */}
      {bubbleData.map((bubble, i) => (
        <div
          key={i}
          className="absolute bg-cyan-400/20 rounded-full blur-xl animate-bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10"></div>

      {/* CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">

        <h1 className="text-3xl md:text-6xl font-bold mb-4 tracking-wide bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          QUANTUM TECH
        </h1>

        <h2
          key={textIndex}
          className="text-xl md:text-3xl font-semibold mb-6 animate-fade"
        >
          {texts[textIndex]}
        </h2>

        <p className="max-w-2xl text-sm md:text-lg mb-8 text-gray-300">
          A next-generation technology company creating secure, scalable, and
          intelligent digital solutions for the modern world.
        </p>

        <div className="flex gap-6 flex-wrap justify-center">
          <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-full font-semibold transition-all duration-300 shadow-xl">
            Login
          </button>

          <button className="px-8 py-3 border-2 border-white hover:bg-white hover:text-black rounded-full font-semibold transition-all duration-300">
            Sign Up
          </button>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes float {
            0% { transform: translate(0px, 0px); }
            50% { transform: translate(30px, -40px); }
            100% { transform: translate(-20px, 20px); }
          }

          .animate-float {
            animation: float ease-in-out infinite alternate;
          }

          @keyframes bubble {
            0% { transform: translateY(100vh); opacity: 0; }
            30% { opacity: 0.4; }
            100% { transform: translateY(-20vh); opacity: 0; }
          }

          .animate-bubble {
            bottom: -100px;
            animation: bubble linear infinite;
          }

          @keyframes fade {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fade {
            animation: fade 0.8s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
