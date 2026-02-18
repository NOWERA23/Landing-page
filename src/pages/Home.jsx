import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

export default function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;

      if (!user) {
        navigate("/login");
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUsername(docSnap.data().username);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* HEADER */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">My Dashboard</h1>

        <div className="flex items-center gap-4">
          <span className="text-lg">
            Welcome back, <span className="font-semibold">{username}</span> 👋
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* BODY SECTION */}
      <div className="flex flex-1">

        {/* SIDEBAR */}
        <aside className="w-64 bg-gray-800 text-white p-6 hidden md:block">
          <h2 className="text-xl font-bold mb-6">Menu</h2>

          <nav className="flex flex-col gap-4">
            <button className="text-left hover:bg-gray-700 p-2 rounded">
              Dashboard
            </button>

            <button className="text-left hover:bg-gray-700 p-2 rounded">
              Profile
            </button>

            <button className="text-left hover:bg-gray-700 p-2 rounded">
              Settings
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 bg-gray-100 p-10">
          <h2 className="text-3xl font-bold mb-6">
            Dashboard Overview
          </h2>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-lg">
              This is your personalized dashboard, {username}.
            </p>
          </div>
        </main>

      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center p-4">
        © 2026 My App. All rights reserved.
      </footer>

    </div>
  );
}
