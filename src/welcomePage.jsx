import React, { useState, useEffect } from "react";


const formatName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

// Function to get cookie value
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    let [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
};


export function WelcomePage({ onLogin }) {
  const [name, setName] = useState("");

  useEffect(() => {
    const savedName = getCookie("username");
    if (savedName) {
      onLogin(savedName); 
    }
  }, [onLogin]);

  const handleSubmit = () => {
    if (name.trim() !== "") {
      const formattedName = formatName(name); 
      document.cookie = `username=${name}; path=/; max-age=31536000`; 
      onLogin(formattedName);
    }
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="welcome-page">
      <h1>Welcome!</h1>
      <p>Please enter your name to start:</p>
      <input
        type="text"
        value={name}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Write your name here"
        id="welcome-input"
      />
      <button className="btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}