/* eslint-disable no-unused-vars */
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError(true);
        return;
      }

      const userData = querySnapshot.docs[0].data();

      await signInWithEmailAndPassword(auth, userData.email, password);

      navigate("/home");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full p-2 border rounded ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-2 border rounded ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />

        {error && <p className="text-red-500 text-sm">Try Again</p>}

        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}
