import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    surname: "",
    age: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (form.phone.length < 10) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        username: form.username,
        surname: form.surname,
        age: form.age,
        phone: form.phone,
        email: form.email
      });

      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-xl shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
        />

        {/* Surname */}
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.surname ? "border-red-500" : "border-gray-300"
          }`}
        />

        {/* Age */}
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.age ? "border-red-500" : "border-gray-300"
          }`}
        />

        {/* Phone with react-phone-input-2 */}
        <PhoneInput
          country={"us"}
          value={form.phone}
          onChange={(phone) => setForm({ ...form, phone })}
          inputClass={`w-full p-2 border rounded ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          }`}
        />

        {/* Error messages */}
        {Object.values(errors).map((err, index) => (
          <p key={index} className="text-red-500 text-sm">
            {err}
          </p>
        ))}

        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Create Account
        </button>
      </form>
    </div>
  );
}
