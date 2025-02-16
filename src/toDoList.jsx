import React, { useState, useEffect } from "react";

// set the date component
function DateComponent() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const IntervalId = setInterval(() => {
      setDate(date);
    }, 60000);

    return () => {
      clearInterval(IntervalId);
    };
  }, [date]);

  const dayOfWeek = daysOfWeek[date.getDay()];
  return (
    <>
      <p>{dayOfWeek} {date.toLocaleDateString("cs-CZ")}</p>
    </>
  );
}
// Component for editing task
function EditInput({
  index,
  tasks,
  setEditIndex,
  editInput,
  setEditInput,
  setTasks,
}) {
  const handleEditInputChange = (e) => {
    setEditInput(e.target.value);
  };

  const saveTask = (index) => {
    var updatedTasks = [...tasks];
    updatedTasks[index] = editInput;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveTask(index);
    }
  }

  return (
    <>
      <input
        className="editInput"
        type="text"
        value={editInput}
        onChange={handleEditInputChange}
        onKeyDown={handleKeyDown} 
      />
      <span className="icon edit-icon" onClick={() => saveTask(index)}>
        <i className="fa-solid fa-floppy-disk"></i>
      </span>
    </>
  );
}
//Component with initial view before aditing or deleting
function RegularView({ index, setEditIndex, setEditInput, task, setTasks }) {
  const editTask = (index) => {
    setEditIndex(index);
    setEditInput(task);
  };

  const deleteTask = (index) => {
    setTasks((prevState) => prevState.filter((_, i) => i !== index));
  };

  return (
    <>
      {task} {/* Render the specific task */}
      <div className="icons">
        <span className="icon edit-icon" onClick={() => editTask(index)}>
          <i className="fa-solid fa-pen"></i>
        </span>
        <span className="icon edit-icon" onClick={() => deleteTask(index)}>
          <i className="fa-solid fa-trash"></i>
        </span>
      </div>
    </>
  );
}


const clearCookie = () => {
    document.cookie = "username=; path=/; max-age=0"; 
    window.location.reload(); 
  };

// Parent Component
export function ToDoList({ userName }) {
  const [tasks, setTasks] = useState([]); 
  const [input, setInput] = useState(""); 
  const [editInput, setEditInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks((prevState) => [...prevState, input]); 
      setInput(""); 
    }
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <>
    <button onClick={clearCookie} className="change">Change name</button>
      <div className="container">
        <h2>{userName}, get Things Done!</h2>
        <DateComponent />
        <input
          type="text"
          value={input}
          onChange={handleInputChange} 
          onKeyDown={handleKeyDown} 
          placeholder="What is your task today?"
        />
        <button className="btn addTask" onClick={addTask}>
          Add task
        </button>
        <button className="btn" onClick={clearTasks}>
          Clear
        </button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {editIndex === index ? (
                <EditInput
                  index={index}
                  tasks={tasks}
                  setEditIndex={setEditIndex}
                  editInput={editInput}
                  setEditInput={setEditInput}
                  setTasks={setTasks}
                />
              ) : (
                <RegularView
                  index={index}
                  setEditIndex={setEditIndex}
                  setEditInput={setEditInput}
                  task={task}
                  setTasks={setTasks}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
