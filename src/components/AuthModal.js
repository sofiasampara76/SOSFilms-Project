import React, { useState } from "react";
import bcrypt from "bcryptjs";

const AuthModal = ({ mode, setMode, onClose, onLogin }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = form;

    if (mode === "register" && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      if (mode === "login") {
        const response = await fetch(`http://localhost:3005/users?email=${email}`);
        const users = await response.json();

        if (!users.length) return alert("User not found");

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return alert("Incorrect password");

        localStorage.setItem("user", JSON.stringify(user));
        onLogin(user);
        window.location.reload();
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await fetch("http://localhost:3005/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password: hashedPassword,
            favouriteFilms: [],
            favouriteSeries: [],
          }),
        });

        if (!response.ok) throw new Error("Registration failed");
        const newUser = await response.json();

        localStorage.setItem("user", JSON.stringify(newUser));
        onLogin(newUser);
      }
    } catch (err) {
      console.error("Auth error:", err);
      alert("Authentication failed");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-toggle">
          <button
            className={mode === "login" ? "active-auth-tab" : ""}
            onClick={() => setMode("login")}
          >
            Log In
          </button>
          <button
            className={mode === "register" ? "active-auth-tab" : ""}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>
        <h2>{mode === "login" ? "Log In" : "Register"}</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {mode === "register" && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit">{mode === "login" ? "Log In" : "Register"}</button>
          <p className="close-modal" onClick={onClose}>
            Cancel
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
