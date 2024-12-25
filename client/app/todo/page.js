"use client";

import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import InputField from "../components/InputField";
import { AppContext } from "../Context/AppContext";
import { useRouter } from "next/navigation";

const TodoApp = () => {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const [newTask, setNewTask] = useState({
    name:"",
    status:0,
  });
  const [saveError, setSaveError] = useState({});
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState("");
  const router = useRouter();

  async function getTasks(){
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  }

  // Fetch Tasks
  useEffect(() => {
    getTasks();
  }, []);

  // Create Task
  const handleAddTask = async (e) => {
    e.preventDefault();
  
    const res = await fetch("/api/tasks", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTask),
    });

    const data = await res.json();

    if(data.errors){
      setSaveError(data.errors);
    }else{
      // Add the new task to the task list
      setTasks([...tasks, data.task]);
      console.log(tasks)
      // Clear the input field
      setNewTask({ name: "", status: 0 });
      setSaveError({});
    }
    
  };

  // Update Task
  const handleUpdateTask = async () => {
    if (editTask.trim()) {
      const updatedTask = { name: editTask, status: tasks[editIndex].status };
      const res = await fetch(`/api/tasks/${tasks[editIndex].id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });
      const data = await res.json();

      if (res.status === 403) {
        console.error("Forbidden: You do not have permission to update this task.");
        alert("Forbidden: You do not have permission to update this task.");
        return;
      }

      if (!res.errors) {
        const updatedTasks = tasks.map((task, index) =>
          index === editIndex ? { ...task, ...updatedTask } : task
        );
        setTasks(updatedTasks);
        setEditIndex(null);
        setEditTask("");
      }
    }
    
  };

  // Delete Task
  const handleDeleteTask = async (index) => {
    const res = await fetch(`/api/tasks/${tasks[index].id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.status === 403) {
      console.error("Forbidden: You do not have permission to delete this task.");
      alert("Forbidden: You do not have permission to delete this task.");
      return;
    }

    if (!res.errors) {
      const filteredTasks = tasks.filter((_, i) => i !== index);
      setTasks(filteredTasks);
    }
    
  };

  // Toggle Completion
  const toggleCompletion = async (index) => {
    const updatedTask = {
      name: tasks[index].name,
      status: tasks[index].status === 1 ? 0 : 1,
    };

    const res = await fetch(`/api/tasks/${tasks[index].id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTask),
    });

    if (res.status === 403) {
      console.error("Forbidden: You do not have permission to update this task.");
      alert("Forbidden: You do not have permission to update this task.");
      return;
    }

    if (!res.errors) {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, ...updatedTask } : task
      );
      setTasks(updatedTasks);
    }
  };

  async function handleLogout(e) {
    e.preventDefault();
    const res = await fetch("/api/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
      },
      
    });

    const data = await res.json();

    if (res.ok) {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      router.push("/");
    } 
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 shadow-lg border rounded">
      <h2 className="text-xl font-bold mb-6 text-center">To-Do List</h2>

      {/* Logout Button */}
      <div className="mb-4 flex justify-end">
        <form onSubmit={handleLogout}>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </form>
      </div>

      <div className="mb-4 ">
        <form onSubmit={handleAddTask} className="flex items-center justify-center space-x-2">
          <div className="flex-grow">
            <InputField
              label="New Task"
              type="text"
              name="task"
              value={newTask.name}
              handleChange={(e) => setNewTask({...newTask,name:e.target.value})}
            />
            {saveError.title && <p className="error">{saveError.title[0]}</p>}
          </div>
          <button
            
            className="w-1/4 bg-blue-500 text-white py-2 px-4 rounded mt-1"
          >
            Add Task
          </button>
        </form>
      </div>

      {tasks.map((task, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={task.status == 1 ? true : false}
              onChange={() => toggleCompletion(index)}
            />
            {editIndex === index ? (
              <InputField
                type="text"
                value={editTask}
                handleChange={(e) => setEditTask(e.target.value)}
              />
            ) : (
              <span className={task.status == 1 ? "line-through" : ""}>{task.name}</span>
            )}
          </div>
          <div className="flex space-x-2">
            {editIndex === index ? (
              <button
                onClick={handleUpdateTask}
                className="bg-green-500 text-white px-4 py-1 rounded"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditIndex(index);
                  setEditTask(task.name);
                }}
                className="bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDeleteTask(index)}
              className="bg-red-500 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoApp;
