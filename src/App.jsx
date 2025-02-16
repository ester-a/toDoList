import React, { useState, useEffect } from "react";
import "./index.css";
import { ToDoList } from "./toDoList";
import { WelcomePage } from "./welcomePage";


// Function to get cookie value
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    let [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value.trim());
  }
  return null;
};

function App() {
  const [name, setName] = useState("");

  // Load the username from cookies when the app starts
  useEffect(() => {
    const savedName = getCookie("username");
    if (savedName) {
      setName(savedName);
    }
  }, []);

  // Function to handle user login
  const handleNameSubmit = (submittedName) => {
    setName(submittedName);
  };

  return (
    <div className="App">
      {name ? (
        <ToDoList userName={name} />
      ) : (
        <WelcomePage onLogin={handleNameSubmit} />
      )}
    </div>
  );
}

export default App;
